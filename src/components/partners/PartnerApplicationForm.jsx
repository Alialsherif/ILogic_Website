import { createElement, useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/useLocale';
import { useSocialLinks } from '../useSocialLinks';
import { ArrowIcon } from '../home/BrandElements';
import { PARTNER_DRAFT_KEY, PARTNER_COOLDOWN_KEY, formSteps, systemTypes, systemStages, collaborationTypes, normalizeWhatsApp, validatePartnerField, validatePartnerStep, validatePartnerFiles, restorePartnerDraft, persistPartnerDraft } from '../../data/partnerForm';

const stepKeys = ['about', 'system', 'collaboration'];
const format = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
const browserStorage = () => { try { return typeof window === 'undefined' ? null : window.sessionStorage; } catch { return null; } };
const fieldConfig = {
  fullName: { required: true, max: 80, autoComplete: 'name' },
  email: { type: 'email', required: true, max: 254, autoComplete: 'email', dir: 'ltr' },
  whatsapp: { type: 'tel', required: true, autoComplete: 'tel', dir: 'ltr', hint: 'phoneHint' },
  country: { required: true, autoComplete: 'country-name' },
  bio: { multiline: true, max: 500 },
  systemName: { required: true, max: 80 },
  technologies: { hint: 'technologiesHint', dir: 'auto' },
  demoUrl: { type: 'url', required: true, dir: 'ltr', hint: 'demoHint' },
  problem: { multiline: true, required: true, max: 800, hint: 'rangeHint' },
  differentiator: { multiline: true, required: true, max: 800, hint: 'rangeHint' },
  currentClients: { multiline: true, max: 300 },
};

function FieldLabel({ name, required }) {
  const { t } = useLocale();
  return <>{t(`partner.form.${name}`)} {required ? <span className="partner-form-required" aria-hidden="true">*</span> : <span className="partner-form-optional">({t('partner.form.optional')})</span>}</>;
}

function FormField({ name, value, error, onChange, onBlur }) {
  const { t } = useLocale();
  const config = fieldConfig[name];
  const id = `partner-field-${name}`;
  const counter = config.multiline && config.max;
  const describedBy = [config.hint && `${id}-hint`, counter && `${id}-counter`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return <div className={`partner-form-field${config.multiline ? ' is-wide' : ''}`}>
    <label htmlFor={id}><FieldLabel name={name} required={config.required} /></label>
    {createElement(config.multiline ? 'textarea' : 'input', {
      id, name, value, type: config.multiline ? undefined : config.type || 'text',
      required: config.required, maxLength: config.max, rows: config.multiline ? 4 : undefined,
      autoComplete: config.autoComplete || 'off', dir: config.dir,
      'aria-invalid': !!error, 'aria-describedby': describedBy,
      onChange: event => onChange(name, event.target.value), onBlur: () => onBlur(name),
    })}
    <div className="partner-field-meta">{config.hint && <p className="partner-form-hint" id={`${id}-hint`}>{t(`partner.form.${config.hint}`)}</p>}{counter && <p className="partner-form-counter" id={`${id}-counter`} dir="ltr">{format(t('partner.form.counter'), { count: value.length, max: config.max })}</p>}</div>
    {error && <p className="partner-form-field-error" id={`${id}-error`}>{t(error)}</p>}
  </div>;
}

function ChoiceField({ name, choices, prefix, value, error, onChange, onBlur }) {
  const { t } = useLocale();
  return <fieldset className="partner-form-choice-group is-wide" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) onBlur(name); }}>
    <legend><FieldLabel name={name} required /></legend>
    <div className="partner-form-radio-options">{choices.map(choice => <label key={choice} htmlFor={`partner-${name}-${choice}`}>
      <input id={`partner-${name}-${choice}`} type="radio" name={name} value={choice} checked={value === choice} required onChange={() => onChange(name, choice)} aria-invalid={!!error} aria-describedby={error ? `partner-${name}-error` : undefined} />
      <span>{t(`partner.form.${prefix}.${choice}`)}</span>
    </label>)}</div>
    {error && <p className="partner-form-field-error" id={`partner-${name}-error`}>{t(error)}</p>}
  </fieldset>;
}

function FormSuccess({ referenceCode }) {
  const { t } = useLocale();
  const [copyState, setCopyState] = useState('');
  const title = useRef(null);
  useEffect(() => { title.current?.focus(); }, []);
  const copyReference = async () => {
    try { await navigator.clipboard.writeText(referenceCode); setCopyState('partner.form.copied'); }
    catch { setCopyState('partner.form.copyError'); }
  };
  return <div className="partner-form-success" role="status">
    <svg className="partner-form-success-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="32" cy="32" r="28"/><path d="m19 32 9 9 18-19"/></svg>
    <h3 tabIndex={-1} ref={title}>{t('partner.form.success.title')}</h3><p>{t('partner.form.success.text')}</p>
    <div className="partner-form-reference"><span>{t('partner.form.success.reference')}</span><bdi dir="ltr">{referenceCode}</bdi><button type="button" className="home-button-outline primary-btn-one" onClick={copyReference}>{t('partner.form.copy')}</button></div>
    <p className="partner-form-hint" aria-live="polite">{copyState && t(copyState)}</p>
  </div>;
}

// Frontend only: no network client, service config, request or upload is included.
// A future caller may supply a submission callback; success requires its confirmed reference.
export default function PartnerApplicationForm({ onSubmitApplication }) {
  const { t, language } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  const [draft, setDraft] = useState(() => restorePartnerDraft(browserStorage()));
  const [files, setFiles] = useState([]);
  const [reselectFiles, setReselectFiles] = useState(draft.hadFiles);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const formRef = useRef(null);
  const stepHeading = useRef(null);
  const errorBox = useRef(null);
  const submissionLock = useRef(false);
  const lastSubmission = useRef(0);
  const pendingStepFocus = useRef(false);
  const { step, values } = draft;
  const busy = status === 'submitting';
  const progress = format(t('partner.form.progress'), { step: step + 1 });

  useEffect(() => {
    if (status !== 'success') persistPartnerDraft(browserStorage(), { values, step, hadFiles: files.length > 0 || reselectFiles });
  }, [values, step, files.length, reselectFiles, status]);
  useEffect(() => {
    if (pendingStepFocus.current) {
      stepHeading.current?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      pendingStepFocus.current = false;
    }
  }, [step]);
  useEffect(() => { if (status === 'error') errorBox.current?.focus(); }, [status]);

  const changeValue = (name, value) => {
    setDraft(previous => ({ ...previous, values: { ...previous.values, [name]: value } }));
    setErrors(previous => previous[name] ? { ...previous, [name]: validatePartnerField(name, value) } : previous);
  };
  const blurField = name => {
    if (name === 'whatsapp') changeValue(name, normalizeWhatsApp(values.whatsapp));
    setErrors(previous => ({ ...previous, [name]: validatePartnerField(name, values[name]) }));
  };
  const focusInvalid = (name, targetStep = step) => {
    if (targetStep !== step) setDraft(previous => ({ ...previous, step: targetStep }));
    requestAnimationFrame(() => {
      const input = formRef.current?.querySelector(`[name="${name}"]`);
      input?.focus(); input?.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
  };
  const nextStep = () => {
    if (busy) return;
    const found = validatePartnerStep(values, step);
    setErrors(previous => ({ ...previous, ...found }));
    if (Object.keys(found).length) { focusInvalid(Object.keys(found)[0]); return; }
    pendingStepFocus.current = true;
    setDraft(previous => ({ ...previous, step: Math.min(2, previous.step + 1) }));
  };
  const previousStep = () => {
    if (busy) return;
    pendingStepFocus.current = true; setStatus('idle');
    setDraft(previous => ({ ...previous, step: Math.max(0, previous.step - 1) }));
  };
  const chooseFiles = event => {
    const incoming = Array.from(event.target.files || []);
    const merged = [...files];
    incoming.forEach(file => { if (!merged.some(existing => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified)) merged.push(file); });
    const error = validatePartnerFiles(merged);
    setErrors(previous => ({ ...previous, files: error }));
    if (!error) { setFiles(merged); setReselectFiles(false); }
    event.target.value = '';
  };

  const submit = async event => {
    event?.preventDefault();
    if (submissionLock.current || busy || status === 'success') return;
    if (formRef.current?.elements.namedItem('company_website')?.value) return;
    if (step < 2) { nextStep(); return; }
    const found = Object.assign({}, ...formSteps.map((_, index) => validatePartnerStep(values, index)));
    const fileError = validatePartnerFiles(files);
    if (fileError) found.files = fileError;
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      focusInvalid(first, formSteps.findIndex(fields => fields.includes(first))); return;
    }
    if (!onSubmitApplication || navigator.onLine === false) {
      setSubmissionError(onSubmitApplication ? 'partner.form.error.submit' : 'partner.form.unavailable'); setStatus('error'); return;
    }
    let storedLast = 0;
    try { storedLast = Number(browserStorage()?.getItem(PARTNER_COOLDOWN_KEY)) || 0; } catch { /* In-memory guard still applies. */ }
    if (Date.now() - Math.max(storedLast, lastSubmission.current) < 60000) { setSubmissionError('partner.form.error.cooldown'); setStatus('error'); return; }
    submissionLock.current = true; setStatus('submitting'); setSubmissionError('');
    try {
      const result = await onSubmitApplication({ ...values, whatsapp: normalizeWhatsApp(values.whatsapp) }, files, language);
      if (!/^ILP-[A-Z0-9]{6}$/.test(result?.referenceCode || '')) throw new Error('A confirmed reference is required.');
      lastSubmission.current = Date.now();
      setReferenceCode(result.referenceCode); setStatus('success');
      try { const storage = browserStorage(); storage?.removeItem(PARTNER_DRAFT_KEY); storage?.setItem(PARTNER_COOLDOWN_KEY, String(lastSubmission.current)); } catch { /* A blocked store cannot prevent confirmation. */ }
      setFiles([]);
    } catch { setSubmissionError('partner.form.error.submit'); setStatus('error'); }
    finally { submissionLock.current = false; }
  };

  const renderField = name => <FormField key={name} name={name} value={values[name]} error={errors[name]} onChange={changeValue} onBlur={blurField} />;
  if (status === 'success') return <div className="partner-application-card"><FormSuccess referenceCode={referenceCode}/></div>;

  return <form className="partner-application-card" id="partner-application-form" ref={formRef} noValidate onSubmit={submit} aria-describedby={!onSubmitApplication ? 'partner-form-availability' : undefined} aria-busy={busy}>
    <header className="partner-form-header"><p id="partner-form-progress-label" aria-live="polite" aria-atomic="true">{progress} — {t(`partner.form.step.${stepKeys[step]}`)}</p><div className="partner-form-progress" role="progressbar" aria-labelledby="partner-form-progress-label" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}><span style={{ width: `${(step + 1) / 3 * 100}%` }}/></div><ol className="partner-form-step-labels">{stepKeys.map((key,index) => <li key={key} aria-current={index === step ? 'step' : undefined} className={index < step ? 'is-complete' : ''}><span aria-hidden="true">{String(index + 1).padStart(2,'0')}</span>{t(`partner.form.step.${key}`)}</li>)}</ol></header>
    <h3 className="partner-form-step-title" ref={stepHeading} tabIndex={-1}>{t(`partner.form.step.${stepKeys[step]}`)}</h3><p className="partner-form-required-note">{t('partner.form.requiredNote')}</p>
    <fieldset className="partner-form-step" hidden={step !== 0} disabled={busy} aria-label={t('partner.form.step.about')}><div className="partner-form-grid">{formSteps[0].map(renderField)}</div></fieldset>
    <fieldset className="partner-form-step" hidden={step !== 1} disabled={busy} aria-label={t('partner.form.step.system')}><div className="partner-form-grid">
      {renderField('systemName')}
      <div className="partner-form-field"><label htmlFor="partner-field-systemType"><FieldLabel name="systemType" required/></label><select id="partner-field-systemType" name="systemType" required value={values.systemType} onChange={event => changeValue('systemType', event.target.value)} onBlur={() => blurField('systemType')} aria-invalid={!!errors.systemType} aria-describedby={errors.systemType ? 'partner-systemType-error' : undefined}><option value="">{t('partner.form.choose')}</option>{systemTypes.map(type => <option key={type} value={type}>{t(`partner.form.type.${type}`)}</option>)}</select>{errors.systemType && <p className="partner-form-field-error" id="partner-systemType-error">{t(errors.systemType)}</p>}</div>
      <ChoiceField name="systemStage" choices={systemStages} prefix="stage" value={values.systemStage} error={errors.systemStage} onChange={changeValue} onBlur={blurField}/>
      {['technologies','demoUrl','problem','differentiator'].map(renderField)}
    </div></fieldset>
    <fieldset className="partner-form-step" hidden={step !== 2} disabled={busy} aria-label={t('partner.form.step.collaboration')}><div className="partner-form-grid">
      {renderField('currentClients')}
      <div className="partner-form-field is-wide"><label id="partner-files-label" htmlFor="partner-files"><FieldLabel name="files"/></label><div className="partner-file-picker"><input id="partner-files" type="file" name="files" multiple accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" onChange={chooseFiles} aria-labelledby="partner-files-label" aria-invalid={!!errors.files} aria-describedby={`partner-files-hint${errors.files ? ' partner-files-error' : ''}`} /><span aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V3m-5 5 5-5 5 5M4 15v5h16v-5"/></svg>{t('partner.form.selectFiles')}</span></div><p className="partner-form-hint" id="partner-files-hint">{t('partner.form.fileHint')}</p><p className="partner-form-hint">{t('partner.form.fileLocal')}</p>
        {files.length > 0 && <ul className="partner-selected-files">{files.map((file,index) => <li key={`${file.name}-${file.lastModified}`}><span dir="auto">{file.name}</span><small dir="ltr">{(file.size / 1024 / 1024).toFixed(1)} MB</small><button type="button" aria-label={format(t('partner.form.removeFile'), { name: file.name })} onClick={() => { setFiles(previous => previous.filter((_, fileIndex) => fileIndex !== index)); setErrors(previous => ({ ...previous, files: '' })); }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button></li>)}</ul>}
        {reselectFiles && <p className="partner-form-hint" role="status">{t('partner.form.fileReselect')}</p>}{errors.files && <p className="partner-form-field-error" id="partner-files-error">{t(errors.files)}</p>}
      </div>
      <ChoiceField name="collaboration" choices={collaborationTypes} prefix="collaboration" value={values.collaboration} error={errors.collaboration} onChange={changeValue} onBlur={blurField}/>
      <div className="partner-form-consent is-wide"><label htmlFor="partner-consent"><input id="partner-consent" name="consent" type="checkbox" required checked={values.consent} onChange={event => changeValue('consent', event.target.checked)} onBlur={() => blurField('consent')} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'partner-consent-error' : undefined}/><span>{t('partner.form.consent')}</span></label>{errors.consent && <p className="partner-form-field-error" id="partner-consent-error">{t(errors.consent)}</p>}<span className="partner-form-privacy-placeholder">{t('partner.form.privacy')}</span><span dangerouslySetInnerHTML={{ __html: '<!-- TODO(owner): privacy policy page -->' }}/></div>
    </div></fieldset>
    <div className="partner-form-honeypot" aria-hidden="true"><label htmlFor="partner-company-website">Company website</label><input id="partner-company-website" name="company_website" type="text" autoComplete="off" tabIndex={-1}/></div>
    {status === 'error' && <div className="partner-form-feedback" role="alert" tabIndex={-1} ref={errorBox}><p>{t('partner.form.error.submit')}</p>{submissionError !== 'partner.form.error.submit' && <p className="partner-form-hint">{t(submissionError)}</p>}<div className="partner-feedback-actions"><button className="home-text-link" type="button" onClick={submit}>{t('partner.form.retry')}</button>{whatsapp && <a className="home-text-link" href={whatsapp.url} target="_blank" rel="noopener noreferrer">{t('partner.apply.whatsapp')}<ArrowIcon/></a>}</div></div>}
    <div className="partner-form-actions">{step > 0 && <button key="back" type="button" className="primary-btn-one home-button-outline" onClick={previousStep} disabled={busy}>{t('partner.form.back')}</button>}{step < 2 ? <button key="next" type="button" className="primary-btn-one" onClick={nextStep}>{t('partner.form.next')}<ArrowIcon/></button> : <button key="submit" type="submit" className="primary-btn-one" disabled={busy}>{busy && <span className="partner-form-spinner" aria-hidden="true"/>}{t(busy ? 'partner.form.submitting' : 'partner.form.submit')}{!busy && <ArrowIcon/>}</button>}</div>
    {!onSubmitApplication && <p className="partner-form-hint" id="partner-form-availability">{t('partner.form.unavailable')}</p>}<p className="partner-form-hint partner-draft-note">{t('partner.form.draft')}</p>
  </form>;
}

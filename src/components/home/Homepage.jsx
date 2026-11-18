import { useState } from 'react';
import { useLocale } from '../../i18n/useLocale';
import { LocalizedLink as Link } from '../../i18n/LocalizedLink';
import { useSocialLinks } from '../useSocialLinks';
import { ArrowIcon, SectionHeading, LogicHeadline } from './BrandElements';
import { IdentityBackdrop, ProcessOrbits } from './IdentityElements';
import BrandLogo from '../BrandLogo';
import SocialLinks from '../SocialLinks';
import LogicMarquee from './LogicMarquee';
import HomeServices from './HomeServices';
import HomeSectors from './HomeSectors';
import BrandText from './BrandText';
import HeroVisual from './HeroVideo';
import AssetFrame from './ProjectMedia';
import useProjectRotation from './useProjectRotation';
import badge from '../../assets/img/ilogic-badge.svg';
import monogram from '../../assets/img/shape/ilogic-monogram.svg';
import assets from '../../data/homeAssets.json';
import { projects, processSteps, roadmap, labChoices, faqKeys, validateLabInterest } from '../../data/homeContent';

function LabInterestForm() {
  const { t } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  const [values, setValues] = useState({ choice: '', email: '', website: '' });
  const [errors, setErrors] = useState({});
  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validateLabInterest(values));
    // TODO: Connect an approved form backend before enabling submission. User requested continuing without integration.
    // No request, storage, mailing-list enrollment or success message is performed.
  };
  return <form id="lab-interest" className="home-lab-form ab-contact" onSubmit={handleSubmit} aria-describedby="lab-availability">
    <fieldset><legend>{t('home.lab.question')}</legend><div className="home-radio-chips">{labChoices.map(choice => <label key={choice}><input type="radio" name="system" value={choice} required checked={values.choice === choice} onChange={() => { setValues({ ...values, choice }); setErrors({ ...errors, choice: '' }); }} /><span>{t(`home.lab.${choice}`)}</span></label>)}</div>{errors.choice && <p className="home-field-error" role="alert">{t(errors.choice)}</p>}</fieldset>
    <div className="home-lab-email"><label htmlFor="lab-email">{t('home.lab.email')}</label><input id="lab-email" name="email" type="email" autoComplete="email" dir="ltr" maxLength={254} required value={values.email} onChange={event => setValues({ ...values, email: event.target.value })} onBlur={() => setErrors({ ...errors, email: validateLabInterest(values).email })} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'lab-email-error' : undefined} />{errors.email && <p id="lab-email-error" className="home-field-error" role="alert">{t(errors.email)}</p>}</div>
    <div className="home-honeypot" aria-hidden="true"><label htmlFor="lab-website">{t('home.lab.honeypot')}</label><input id="lab-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => setValues({ ...values, website: event.target.value })} /></div>
    <button className="primary-btn-one" type="submit" disabled aria-describedby="lab-availability">{t('home.lab.join')} <ArrowIcon /></button><p id="lab-availability" className="home-form-note">{t('home.lab.unavailable')}</p>{whatsapp && <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="home-text-link">{t('home.cta.whatsapp')} <ArrowIcon /></a>}
  </form>;
}

export default function Homepage() {
  const { t, language } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  const carousel = useProjectRotation(projects.length, Math.max(0, projects.findIndex(project => project.key === 'loyalty')), language);
  const selectedProject = carousel.selected;
  const arrow = language === 'ar' ? '←' : '→';
  return <div className="ilogic-home">
    <section className="ab-hero home-hero home-hero--cinematic identity-section p-relative overflow-hidden" aria-labelledby="home-title"><HeroVisual background /><div className="ab-hero-shape" aria-hidden="true"><div className="ab-hero-shape-3 position-absolute"><img src={monogram} alt="" width="96" height="112" /></div></div><div className="container"><div className="ab-hero-content">
      <div className="home-hero-layout"><div className="home-hero-message"><p className="ab-section-subtitle home-hero-eyebrow">{t('home.hero.eyebrow')}</p><h1 id="home-title" className="hero-heading"><span className="ab-hero-title">{t('home.hero.title')}</span><span className="ab-hero-title ab-hero-title-right">{t('home.hero.highlight')}</span></h1><div className="home-hero-copy"><p>{t('home.hero.text')}</p><div className="home-actions"><Link className="primary-btn-one" to="/contact#contact-form">{t('home.hero.start')} <ArrowIcon /></Link><a className="primary-btn-one home-button-outline" href="#works">{t('home.hero.works')} <ArrowIcon /></a></div></div></div></div>
      <div className="home-signature-badge" aria-hidden="true"><div className="rotate360"><img src={badge} alt="" width="160" height="160" /></div></div>
      <nav className="home-hero-social" aria-label={t('home.social.label')}><SocialLinks text /></nav>
    </div></div></section>

    <section id="story" className="ab-about-area ab-bg-dark pt-120 pb-120 identity-section" aria-labelledby="story-title" data-home-reveal><IdentityBackdrop variant="story" /><div className="container"><div className="row gy-5"><div className="col-lg-4"><SectionHeading eyebrow="home.story.eyebrow" title="home.story.title" id="story-title" beforeTitle={<div className="home-about-logo"><BrandLogo /></div>} /></div><div className="col-lg-8 home-about-copy"><div className="home-about-columns"><div className="home-about-definition"><p className="home-intro"><strong>{t('home.story.identity')}</strong></p><p className="home-intro">{t('home.story.services')}</p></div><aside className="home-about-innovation" aria-labelledby="about-innovation-title"><h3 id="about-innovation-title">{t('home.story.innovatorsTitle')}</h3><p className="home-intro">{t('home.story.innovators')}</p><Link className="home-about-partners" to="/partners">{t('home.story.partners')}</Link></aside></div><p className="home-intro home-about-closing">{t('home.story.text')}</p></div></div></div></section>

    <LogicMarquee items={['since', 'projects', 'team', 'region'].map(key => `home.trust.${key}`)} label="home.hero.eyebrow" className="identity-marquee-trust" />

    <HomeSectors />

    <HomeServices />

    <section ref={carousel.root} {...carousel.interactions} id="works" className="ab-bg-dark pt-120 pb-120 identity-section" aria-labelledby="works-title" data-home-reveal><IdentityBackdrop variant="works" /><div className="container"><div className="home-heading-row"><SectionHeading eyebrow="home.works.eyebrow" title="home.works.title" id="works-title" /><Link className="primary-btn-one" to="/projects">{t('home.works.all')} <ArrowIcon /></Link></div><div className="home-showcase"><div className="home-showcase-rail" aria-hidden="true"><span>{t('home.works.' + projects[selectedProject].key + '.tag')}</span></div><div id="home-project-stage" className="home-showcase-stage">{projects.map((project, index) => <article key={project.key} hidden={index !== selectedProject} className="home-work-card br-16"><figure><AssetFrame assetKey={project.asset} />{['loyalty', 'behavior'].includes(project.key) && <figcaption>{t('home.works.illustration')}</figcaption>}</figure><div className="home-work-body"><p className="home-project-tag">{t(`home.works.${project.key}.tag`)}</p><h3><BrandText text={t(`home.works.${project.key}.title`)} /></h3>
      {project.key === 'loyalty' && <><LogicHeadline as="p" problem="home.works.loyalty.headline.problem" solution="home.works.loyalty.headline.solution" /><ol className="home-flow-chips">{['scan', 'pay', 'points'].map((step, index) => <li key={step} style={{ '--step': index }}><span>{t(`home.works.loyalty.${step}`)}</span>{index < 2 && <span aria-hidden="true">{arrow}</span>}</li>)}</ol></>}
      {project.key === 'behavior' ? <p>{t('home.works.behavior.text')}</p> : <dl>{['problem', 'logic'].map(key => <div key={key}><dt>{t(`home.works.${key}`)}</dt><dd>{t(`home.works.${project.key}.${key}`)}</dd></div>)}</dl>}
      {/* TODO: result metric — obtain verified data for every project before rendering any result line. */}
      {project.href && <a className="home-text-link" href={project.href} target="_blank" rel="noopener noreferrer">{t('home.works.visit')}<ArrowIcon /><span className="visually-hidden"> — <BrandText text={t(`home.works.${project.key}.title`)} /></span></a>}
    </div></article>)}</div><div className="home-showcase-rail" aria-hidden="true"><span><BrandText text={t('home.works.' + projects[selectedProject].key + '.title')} /></span></div></div>
    <div className="home-showcase-controls" role="group" aria-label={t('home.works.title')} onKeyDown={event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      carousel.move((event.key === 'ArrowRight' ? 1 : -1) * (language === 'ar' ? -1 : 1));
    }}>
      <button type="button" className="home-showcase-arrow" aria-label={t('home.works.previous')} aria-controls="home-project-stage" onClick={() => carousel.move(-1)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={language === 'ar' ? 'M5 12h14m-6-6 6 6-6 6' : 'M19 12H5m6-6-6 6 6 6'} /></svg></button>
      <button type="button" className="home-showcase-rotation" aria-label={t(carousel.enabled ? 'home.works.rotationPause' : 'home.works.rotationPlay')} aria-controls="home-project-stage" onClick={carousel.toggle}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{carousel.enabled ? <path d="M8 5v14M16 5v14" /> : <path d="m8 5 11 7-11 7z" />}</svg></button>
      <button type="button" className="home-showcase-arrow" aria-label={t('home.works.next')} aria-controls="home-project-stage" onClick={() => carousel.move(1)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={language === 'ar' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} /></svg></button>
      <span className="visually-hidden" aria-live={carousel.rotating ? 'off' : 'polite'} aria-atomic="true"><BrandText text={t('home.works.' + projects[selectedProject].key + '.title')} /></span>
    </div></div></section>

    <LogicMarquee />

    <section id="process" className="ab-workflow ab-bg-dark pt-120 pb-120 identity-section" aria-labelledby="process-title" data-home-reveal><IdentityBackdrop variant="process" /><div className="container"><SectionHeading eyebrow="home.process.eyebrow" title="home.process.title" id="process-title" /><ProcessOrbits steps={processSteps} prefix="home.process" /></div></section>

    <section id="lab" className="ab-bg pt-120 pb-120 identity-section" aria-labelledby="lab-title"><IdentityBackdrop variant="story" /><div className="container"><SectionHeading eyebrow="home.lab.eyebrow" title="home.lab.title" id="lab-title"><p className="home-intro">{t('home.lab.text')}</p></SectionHeading><ol className="home-roadmap">{roadmap.map(stage => <li key={stage.key}><h3>{t(`home.lab.${stage.key}`)}</h3><span className={`home-status home-status-${stage.status}`}>{t(`home.lab.${stage.status}`)}</span></li>)}</ol><LabInterestForm /></div></section>

    <section id="partners" className="ab-bg-dark pt-120 pb-120 identity-section" aria-labelledby="partners-title" data-home-reveal>
      <IdentityBackdrop variant="services" />
      <div className="container"><div className="row align-items-center gy-5">
        <div className="col-lg-7">
          <p className="ab-section-subtitle">{t('home.partners.eyebrow')}</p>
          <LogicHeadline as="h2" id="partners-title" className="home-logic-section" problem="home.partners.problem" solution="home.partners.solution" />
          <p className="home-intro">{t('home.partners.text')}</p>
          <ol className="home-partner-steps">{['submit', 'review', 'launch'].map((key, index) => <li key={key}>{t(`home.partners.${key}`)}{index < 2 && <span aria-hidden="true">{arrow}</span>}</li>)}</ol>
          <Link to="/partners#apply" className="primary-btn-one">{t('home.partners.submit')} <ArrowIcon /></Link>
        </div>
        <div className="col-lg-5"><figure className="home-partner-visual">
          <img src={assets.partners.src} alt={t('home.partners.visual.alt')} width={assets.partners.width} height={assets.partners.height} loading="lazy" decoding="async" />
        </figure></div>
      </div></div>
    </section>

    <section id="faq" className="ab-bg pt-120 pb-120" aria-labelledby="faq-title"><div className="container"><div className="row gy-4"><div className="col-lg-4"><SectionHeading eyebrow="home.faq.eyebrow" title="home.faq.title" id="faq-title" /></div><div className="col-lg-8"><div className="home-faq">{faqKeys.map(key => <details key={key} name="homepage-faq"><summary><h3>{t(`home.faq.${key}.question`)}</h3><span className="home-faq-toggle" aria-hidden="true" /></summary><p>{t(`home.faq.${key}.answer`)}</p></details>)}</div></div></div></div></section>

    <section id="contact" className="home-final-cta ab-bg-dark pt-120 pb-120 identity-section" aria-labelledby="cta-title"><IdentityBackdrop variant="footer" /><div className="container"><LogicHeadline as="h2" id="cta-title" className="home-logic-section" problem="home.cta.problem" solution="home.cta.solution" /><p>{t('home.cta.text')}</p><div className="home-actions">{whatsapp && <a className="identity-cta-pill" href={whatsapp.url} target="_blank" rel="noopener noreferrer">{t('home.cta.whatsapp')} <ArrowIcon /></a>}<Link className="identity-cta-pill" to="/contact#contact-form">{t('home.cta.message')} <ArrowIcon /></Link></div></div></section>
  </div>;
}


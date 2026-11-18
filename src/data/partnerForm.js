export const PARTNER_DRAFT_KEY = 'ilogic-partner-draft-v1';
export const PARTNER_COOLDOWN_KEY = 'ilogic-partner-last-submission';
export const systemTypes = ['erp', 'crm', 'accounting', 'inventory', 'sector', 'other'];
export const systemStages = ['prototype', 'working', 'customers'];
export const collaborationTypes = ['ilogic', 'discuss'];
export const formSteps = [
  ['fullName', 'email', 'whatsapp', 'country', 'bio'],
  ['systemName', 'systemType', 'systemStage', 'technologies', 'demoUrl', 'problem', 'differentiator'],
  ['currentClients', 'files', 'collaboration', 'consent'],
];
export const emptyPartnerForm = {
  fullName: '', email: '', whatsapp: '', country: '', bio: '', systemName: '',
  systemType: '', systemStage: '', technologies: '', demoUrl: '', problem: '',
  differentiator: '', currentClients: '', collaboration: '', consent: false,
};
export const normalizeWhatsApp = value => value
  .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632))
  .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776))
  .replace(/[\s().-]/g, '').replace(/^00/, '+');
export const isWebUrl = value => {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !!url.hostname && !url.username && !url.password; }
  catch { return false; }
};

export function validatePartnerField(name, value) {
  const text = typeof value === 'string' ? value.trim() : '';
  const required = ['fullName', 'email', 'whatsapp', 'country', 'systemName', 'systemType', 'systemStage', 'demoUrl', 'problem', 'differentiator', 'collaboration'];
  if (required.includes(name) && !text || name === 'consent' && value !== true) return 'partner.form.error.required';
  if (['fullName', 'systemName'].includes(name)) {
    if (text.length < 2) return 'partner.form.error.short';
    if (text.length > 80) return 'partner.form.error.long';
  }
  if (name === 'email' && (text.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))) return 'partner.form.error.email';
  if (name === 'whatsapp' && !/^\+[1-9]\d{7,14}$/.test(normalizeWhatsApp(text))) return 'partner.form.error.phone';
  if (name === 'demoUrl' && !isWebUrl(text)) return 'partner.form.error.url';
  for (const [field, choices] of [['systemType', systemTypes], ['systemStage', systemStages], ['collaboration', collaborationTypes]]) {
    if (name === field && !choices.includes(value)) return 'partner.form.error.required';
  }
  if (['problem', 'differentiator'].includes(name)) {
    if (text.length < 30) return 'partner.form.error.short';
    if (text.length > 800) return 'partner.form.error.long';
  }
  if (name === 'bio' && text.length > 500 || name === 'currentClients' && text.length > 300) return 'partner.form.error.long';
  return '';
}

export function validatePartnerStep(values, step) {
  return Object.fromEntries(formSteps[step].filter(name => name !== 'files').flatMap(name => {
    const error = validatePartnerField(name, values[name]);
    return error ? [[name, error]] : [];
  }));
}

export function validatePartnerFiles(files) {
  if (files.length > 3) return 'partner.form.error.fileCount';
  const extensions = { 'application/pdf': /\.pdf$/i, 'image/png': /\.png$/i, 'image/jpeg': /\.jpe?g$/i };
  return files.some(file => !extensions[file.type]?.test(file.name) || file.size > 10 * 1024 * 1024 || file.size === 0) ? 'partner.form.error.file' : '';
}

export function restorePartnerDraft(storage) {
  const fallback = { values: { ...emptyPartnerForm }, step: 0, hadFiles: false };
  try {
    const saved = JSON.parse(storage?.getItem(PARTNER_DRAFT_KEY) || 'null');
    if (saved?.version !== 1 || !saved.values || typeof saved.values !== 'object') return fallback;
    const values = { ...emptyPartnerForm };
    for (const key of Object.keys(values)) {
      if (key === 'consent') values[key] = saved.values[key] === true;
      else if (typeof saved.values[key] === 'string' && saved.values[key].length <= 8192) values[key] = saved.values[key];
    }
    return { values, step: Number.isInteger(saved.step) ? Math.max(0, Math.min(2, saved.step)) : 0, hadFiles: saved.hadFiles === true };
  } catch { return fallback; }
}

export function persistPartnerDraft(storage, draft) {
  try { storage?.setItem(PARTNER_DRAFT_KEY, JSON.stringify({ version: 1, ...draft, values: Object.fromEntries(Object.keys(emptyPartnerForm).map(key => [key, draft.values[key]])) })); }
  catch { /* The form remains usable when browser storage is blocked or full. */ }
}

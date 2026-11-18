export const contactLocation = Object.freeze({
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.532368659878!2d30.9301785755495!3d29.93536207497871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145855cfd0bffde1%3A0xf8b422053377b0f8!2z2YPZhdio2YjZhtivINmF2LTYp9ix2YI!5e0!3m2!1sen!2seg!4v1794955359301!5m2!1sen!2seg',
  mapLink: `https://www.google.com/maps?cid=${BigInt('0xf8b422053377b0f8').toString()}`,
});

export function contactWhatsAppNumber(url) {
  try { const link=new URL(url);return link.hostname==='wa.me'&&/^\/\d+$/.test(link.pathname)?`+${link.pathname.slice(1)}`:''; }
  catch { return ''; }
}

export function validateContactField(name, value) {
  const text=value.trim();
  if (['name','message'].includes(name)&&!text) return 'contact.form.error.required';
  if (name==='name'&&text.length<2 || name==='message'&&text.length<10) return 'contact.form.error.short';
  if (name==='name'&&text.length>80 || name==='message'&&text.length>2000 || name==='email'&&text.length>254) return 'contact.form.error.long';
  if (name==='email'&&text&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'contact.form.error.email';
  return '';
}

export function composeContactMessage(values, t, context = '') {
  return [t('contact.form.greeting'),`${t('contact.form.name')}: ${values.name.trim()}`,
    ...(values.email.trim()?[`${t('contact.form.email')}: ${values.email.trim()}`]:[]),
    ...(context?[`${t('contact.form.subject')}: ${context}`]:[]),'',values.message.trim()].join('\n');
}

export function contactWhatsAppUrl(base, message) {
  try { const url=new URL(base);if(!['http:','https:'].includes(url.protocol))return '';url.searchParams.set('text',message);return url.href; }
  catch { return ''; }
}

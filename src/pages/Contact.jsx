import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
import { useSocialLinks } from '../components/useSocialLinks';
import SocialLinks from '../components/SocialLinks';
import { ArrowIcon } from '../components/home/BrandElements';
import { serviceCatalog } from '../data/servicesContent';
import { sectors } from '../data/homeSectors';
import { contactLocation, contactWhatsAppNumber, validateContactField, composeContactMessage, contactWhatsAppUrl } from '../data/contactDetails';

function ContactIcon({ pin = false }) {
  return <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{pin ? <><path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z" /><circle cx="16" cy="13" r="3.5" /></> : <><path d="M27 15a11 11 0 0 1-16 10L5 27l2-6A11 11 0 1 1 27 15Z" /><path d="M10 14h12m-12 5h7" /></>}</svg>;
}

export default function Contact() {
  const { t, language } = useLocale();
  const [search] = useSearchParams();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  const phone = contactWhatsAppNumber(whatsapp?.url);
  const service = serviceCatalog.find(item => item.key === search.get('service'));
  const sector = sectors.find(item => item.slug === search.get('sector'));
  const topic = service ? t(`services.${service.key}.title`) : sector ? t(`home.sectors.${sector.slug}.name`) : '';
  const form = useRef(null);
  const [values,setValues] = useState({name:'',email:'',message:''});
  const [errors,setErrors] = useState({});
  const change = event => {
    const {name,value}=event.target;
    setValues(current=>({...current,[name]:value}));
    if (errors[name]) setErrors(current=>({...current,[name]:validateContactField(name,value)}));
  };
  const submit = event => {
    event.preventDefault();
    const next=Object.fromEntries(Object.entries(values).map(([name,value])=>[name,validateContactField(name,value)]));
    setErrors(next);
    const first=Object.keys(next).find(name=>next[name]);
    if(first) { requestAnimationFrame(()=>form.current?.elements.namedItem(first)?.focus());return; }
    const url=contactWhatsAppUrl(whatsapp?.url,composeContactMessage(values,t,topic));
    // The visitor reviews and sends the message in WhatsApp. No form data is stored or submitted here.
    if(url) window.open(url,'_blank','noopener,noreferrer');
  };
  const inputProps = name => ({name,id:`contact-${name}`,value:values[name],onChange:change,onBlur:()=>setErrors(current=>({...current,[name]:validateContactField(name,values[name])})), 'aria-invalid':!!errors[name], 'aria-describedby':[name==='message'?'contact-message-hint':'',errors[name]?`contact-${name}-error`:''].filter(Boolean).join(' ')||undefined});
  const error = name => errors[name]&&<p className="contact-field-error" id={`contact-${name}-error`}>{t(errors[name])}</p>;
  return <div className="ilogic-home ilogic-contact">
    <section className="contact-hero" aria-labelledby="contact-title"><div className="container">
      <nav className="contact-breadcrumb" aria-label={t('contact.breadcrumb')}><ol><li><Link to="/">{t('contact.home')}</Link></li><li aria-hidden="true">{language==='ar'?'←':'→'}</li><li aria-current="page">{t('contact.title')}</li></ol></nav>
      <div className="contact-intro"><div><p className="ab-section-subtitle">{t('contact.hero.eyebrow')}</p><h1 id="contact-title">{t('contact.hero.title')}<span>{t('contact.hero.highlight')}</span></h1></div><p>{t('contact.hero.text')}</p></div>
    </div></section>
    <section className="contact-main" aria-labelledby="contact-details-title"><div className="container contact-layout">
      <div className="contact-details"><h2 className="visually-hidden" id="contact-details-title">{t('contact.details.title')}</h2>
        <article className="contact-whatsapp-card"><div className="contact-card-top"><span className="contact-icon"><ContactIcon /></span><h3>{t('contact.whatsapp.title')}</h3></div><p>{t('contact.whatsapp.text')}</p><p className="contact-number"><bdi dir="ltr">{phone||'\u00a0'}</bdi></p>{whatsapp?<a className="primary-btn-one" href={whatsapp.url} target="_blank" rel="noopener noreferrer">{t('contact.whatsapp.button')}<ArrowIcon /></a>:<span className="contact-link-pending">{t('contact.whatsapp.button')}</span>}</article>
        <article className="contact-address-card"><div className="contact-card-top"><span className="contact-icon"><ContactIcon pin /></span><h3>{t('contact.address.title')}</h3></div><address>{t('contact.address.street')}<br />{t('contact.address.city')}</address><a className="contact-text-link" href="#contact-map">{t('contact.address.show')}<ArrowIcon /></a></article>
        <div className="contact-social"><h3>{t('contact.social.title')}</h3><div className="contact-social-links"><SocialLinks /></div></div>
      </div>
      <div className="contact-compose" id="contact-form"><h2>{t('contact.form.title')}</h2><p>{t('contact.form.text')}</p>
        {topic&&<div className="contact-topic"><span>{t('contact.form.subject')}: <strong>{topic}</strong></span><Link to="/contact#contact-form">{t('contact.form.change')}</Link></div>}
        <form ref={form} onSubmit={submit} noValidate aria-describedby="contact-form-note">
          <div className="contact-fields"><div><label htmlFor="contact-name">{t('contact.form.name')}<span aria-hidden="true"> *</span></label><input {...inputProps('name')} type="text" autoComplete="name" minLength={2} maxLength={80} required />{error('name')}</div><div><label htmlFor="contact-email">{t('contact.form.email')} <span className="contact-optional">({t('contact.form.optional')})</span></label><input {...inputProps('email')} type="email" autoComplete="email" dir="ltr" maxLength={254} />{error('email')}</div></div>
          <div className="contact-message"><label htmlFor="contact-message">{t('contact.form.message')}<span aria-hidden="true"> *</span></label><p className="contact-field-hint" id="contact-message-hint">{t('contact.form.hint')}</p><textarea {...inputProps('message')} rows={5} minLength={10} maxLength={2000} required />{error('message')}</div>
          <button type="submit" className="primary-btn-one" disabled={!whatsapp}>{t('contact.form.submit')}<ArrowIcon /></button><p className="contact-form-note" id="contact-form-note">{whatsapp?t('contact.form.note'):t('contact.form.unavailable')}</p>
        </form>
      </div>
    </div></section>
    <section className="contact-map-section" id="contact-map" aria-labelledby="contact-map-title"><div className="container"><div className="contact-map-heading"><div><p className="ab-section-subtitle">{t('contact.map.eyebrow')}</p><h2 id="contact-map-title">{t('contact.map.title')}</h2></div><a className="contact-text-link" href={contactLocation.mapLink} target="_blank" rel="noopener noreferrer">{t('contact.map.open')}<ArrowIcon /></a></div><div className="contact-map-frame"><iframe src={contactLocation.mapEmbed} width="1200" height="450" title={t('contact.map.label')} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div><p className="contact-map-address">{t('contact.address.full')}</p></div></section>
  </div>;
}

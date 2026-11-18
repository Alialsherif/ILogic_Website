import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
import { useSocialLinks } from '../components/useSocialLinks';
import { ArrowIcon, LineIcon, SectionHeading } from '../components/home/BrandElements';
import SectorIcon from '../components/home/SectorIcon';
import { sectors } from '../data/homeSectors';
import { serviceCatalog, serviceProjects, securityPrinciples } from '../data/servicesContent';
import LogicScene from '../components/home/LogicScene';

function ServiceCard({ service }) {
  const { t } = useLocale();
  const prefix = `services.${service.key}`;
  return <article data-motion-card id={`service-${service.key}`} className={`services-catalog-card${service.key === 'security' ? ' services-catalog-card--security' : ''}`}>
    <div className="services-card-heading"><span className="services-card-dot" aria-hidden="true" /><h3>{t(`${prefix}.title`)}</h3></div>
    <div className="services-card-intro"><p className="services-card-question">{t(`${prefix}.question`)}</p><div className={`services-card-art services-card-art--${service.key}`} aria-hidden="true"><span /><LineIcon name={service.icon} /></div></div><p>{t(`${prefix}.text`)}</p>
    <ul className="services-tags">{[0,1,2].map(index => <li key={index}>{t(`${prefix}.tag${index}`)}</li>)}</ul>
    <Link className="home-text-link" to={`/contact?service=${service.key}#contact-form`} aria-label={`${t('services.catalog.contact')}: ${t(`${prefix}.title`)}`}>{t('services.catalog.contact')}<ArrowIcon /></Link>
  </article>;
}

export default function ServicePage() {
  const { t, language } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  return <div className="ilogic-home ilogic-services">
    <section className="services-hero" aria-labelledby="services-title"><div className="container">
      <nav className="services-breadcrumb" aria-label={t('services.breadcrumb.label')}><ol><li><Link to="/">{t('services.breadcrumb.home')}</Link></li><li aria-hidden="true">{language === 'ar' ? '←' : '→'}</li><li aria-current="page">{t('services.breadcrumb.current')}</li></ol></nav>
      <div className="services-hero-grid"><div><p className="ab-section-subtitle">{t('services.hero.eyebrow')}</p><h1 id="services-title">{t('services.hero.title')}<span>{t('services.hero.highlight')}</span></h1><p className="services-lead">{t('services.hero.text')}</p><div className="home-actions"><a className="primary-btn-one" href="#services-catalog">{t('services.hero.explore')}<ArrowIcon /></a><Link className="home-text-link" to="/contact#contact-form">{t('services.hero.contact')}<ArrowIcon /></Link></div></div>
        <LogicScene />
      </div>
    </div></section>

    <section id="services-catalog" aria-labelledby="services-catalog-title"><div className="container"><div className="services-heading-row"><SectionHeading eyebrow="services.catalog.eyebrow" title="services.catalog.title" id="services-catalog-title" /><p>{t('services.catalog.text')}</p></div><div className="services-catalog-grid">{serviceCatalog.map(service => <ServiceCard key={service.key} service={service} />)}</div></div></section>

    <section id="services-sectors" className="services-sectors" aria-labelledby="services-sectors-title"><div className="container"><SectionHeading eyebrow="services.sectors.eyebrow" title="services.sectors.title" id="services-sectors-title"><p className="services-lead">{t('services.sectors.text')}</p></SectionHeading>
      <div className="services-sector-grid">{sectors.map(({ slug }) => <details key={slug} name="services-sector" className="services-sector"><summary><span className="services-sector-icon"><SectorIcon slug={slug} size={28} /></span><h3>{t(`home.sectors.${slug}.name`)}</h3><svg className="services-sector-toggle" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg></summary><div className="services-sector-body"><p>{t(`home.sectors.${slug}.preparation`)}</p><ul className="services-tags">{[0,1,2].map(index => <li key={index}>{t(`home.sectors.${slug}.tag${index}`)}</li>)}</ul><Link className="home-text-link" to={`/contact?sector=${slug}#contact-form`}>{t('services.sectors.contact')}<ArrowIcon /></Link></div></details>)}</div>
      <p className="services-sectors-other"><Link to="/contact#contact-form">{t('services.sectors.other')}<ArrowIcon /></Link></p>
    </div></section>

    <section id="services-projects" aria-labelledby="services-projects-title"><div className="container"><div className="services-heading-row"><SectionHeading eyebrow="services.projects.eyebrow" title="services.projects.title" id="services-projects-title" /><p>{t('services.projects.text')}</p></div>
      <div className="services-projects-grid">{serviceProjects.map(project => <article key={project.key} className={`services-project services-project--${project.key}`}><div className="services-project-top"><span className={`services-project-status services-project-status--${project.status}`}><span aria-hidden="true" />{t(`services.projects.${project.status}`)}</span><LineIcon name={project.icon} /></div><h3>{t(`services.projects.${project.key}.title`)}</h3><p>{t(`services.projects.${project.key}.text`)}</p><p className="services-project-focus">{t(`services.projects.${project.key}.focus`)}</p></article>)}</div>
      <div className="services-project-note"><p>{t('services.projects.note')}</p><Link className="home-text-link" to="/contact#contact-form">{t('services.projects.contact')}<ArrowIcon /></Link></div>
    </div></section>

    <section id="services-security" className="services-security" aria-labelledby="services-security-title"><div className="container"><div className="services-security-panel"><div className="services-security-intro"><div><SectionHeading eyebrow="services.safety.eyebrow" title="services.safety.title" id="services-security-title" /><p className="services-lead">{t('services.safety.lead')}</p></div><figure><img src="/images/identity-v2/service-security.webp" width="1200" height="800" loading="lazy" decoding="async" alt={t('home.services.security.alt')} /></figure></div>
      <div className="services-security-grid">{securityPrinciples.map(item => <article key={item.key}><LineIcon name={item.icon} /><h3>{t(`services.safety.${item.key}.title`)}</h3><p>{t(`services.safety.${item.key}.text`)}</p></article>)}</div>
      <div className="services-security-bottom"><p>{t('services.safety.note')}</p><Link className="primary-btn-one" to="/contact?service=security#contact-form">{t('services.safety.contact')}<ArrowIcon /></Link></div>
    </div></div></section>

    <section className="services-closing" aria-labelledby="services-cta-title"><div className="container"><div className="services-closing-panel"><SectionHeading eyebrow="services.cta.eyebrow" title="services.cta.title" id="services-cta-title" /><p className="services-lead">{t('services.cta.text')}</p><div className="home-actions"><Link className="primary-btn-one" to="/contact#contact-form">{t('services.cta.contact')}<ArrowIcon /></Link>{whatsapp && <a className="primary-btn-one home-button-outline" href={whatsapp.url} target="_blank" rel="noopener noreferrer">{t('services.cta.whatsapp')}<ArrowIcon /></a>}</div></div></div></section>
  </div>;
}

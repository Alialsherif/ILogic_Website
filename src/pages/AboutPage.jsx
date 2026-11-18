import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
import { useSocialLinks } from '../components/useSocialLinks';
import BrandLogo from '../components/BrandLogo';
import { ArrowIcon, LineIcon, SectionHeading } from '../components/home/BrandElements';
import assets from '../data/homeAssets.json';
import HeadingWords from '../components/home/HeadingWords';

const services = [['web', 'web'], ['seo', 'seo'], ['systems', 'business'], ['automation', 'automation']];
const principles = [['understand', 'seo'], ['purpose', 'automation'], ['team', 'brand']];

function BrandJourney() {
  const { t } = useLocale();
  return <figure className="about-brand-scene">
    <div className="about-journey-place about-journey-origin">
      <CityDrawing />
      <small>{t('about.hero.originLabel')}</small><strong>{t('about.hero.origin')}</strong>
    </div>
    <div className="about-journey-connection">
      <span className="about-journey-thread" aria-hidden="true"><span className="about-journey-station-core" /></span>
      <div className="about-brand-core"><BrandLogo /></div>
      <p>{t('about.hero.bridge')}</p>
    </div>
    <div className="about-journey-place about-journey-destination">
      <CityDrawing egypt />
      <small>{t('about.hero.destinationLabel')}</small><strong>{t('about.hero.destination')}</strong>
    </div>
    <figcaption>{t('about.hero.caption')}</figcaption>
  </figure>;
}

function CityDrawing({ egypt = false }) {
  return <svg className="about-city" width="300" height="200" viewBox="0 0 300 200" fill="none" aria-hidden="true">
    <circle className="about-city-sun" cx={egypt ? 205 : 98} cy="88" r="65" />
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {egypt ? <><path d="M23 174 95 82l72 92H23Zm83 0 71-68 68 68H106Z" /><path d="m95 82 16 92m66-68 15 68M240 174V68h20v106m-23-106 13-40 13 40h-26Zm8-26h10m-12 51h14m-14 24h14m-14 24h14" /><path d="M16 183c34-6 47 6 78 0s46 6 76 0 49 6 76 0 27 0 38 0" /></> : <><path d="M42 174V99h30v75m-35-75 20-25 20 25H37Zm65 75V92h38v82m-43-82h48M121 28v13m-9 4c-14 13-18 28-10 38h38c8-10 4-25-10-38-3-4-7-7-9-12-2 5-6 8-9 12Z" /><path d="M165 174v-65h36v65m-39-65c-5-13 3-26 21-39 18 13 26 26 21 39h-42Zm21-49v10m-15 58h28m-26 18h24M229 174V86h25v88m-30-88 18-48 17 48h-35Zm18-59v11M49 120h16m-16 20h16m46-32h20m-20 23h20m104-25h13m-13 22h13" /></>}
      <path d="M18 174h264" />
    </g>
  </svg>;
}

function TimeScene() {
  const { t } = useLocale();
  return <aside className="about-product-focus" aria-label={t('about.product.focus')}>
    <p className="about-time-label">{t('about.product.sceneLabel')}</p>
    <div className="about-clock" aria-hidden="true"><svg width="260" height="260" viewBox="0 0 260 260" fill="none"><circle cx="130" cy="130" r="115" /><circle cx="130" cy="130" r="99" strokeDasharray="1 12" strokeLinecap="round" /><path className="about-clock-hand" d="M130 65v65l46 25" /><circle cx="130" cy="130" r="6" /></svg><span>{t('about.product.timeShort')}</span></div>
    <p className="about-time-statement">{t('about.product.time')}</p>
    <ul>{['organize', 'automate'].map(key => <li key={key}><span aria-hidden="true">↗</span>{t(`about.product.${key}`)}</li>)}</ul>
    <span className="about-time-caption">{t('about.product.sceneNote')}</span>
  </aside>;
}

export default function AboutPage() {
  const { t, language } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  return <div className="ilogic-home ilogic-about">
    <section className="about-hero ab-bg" aria-labelledby="about-title">
      <div className="container">
        <nav className="about-breadcrumb" aria-label={t('about.breadcrumb.label')}><ol><li><Link to="/">{t('about.breadcrumb.home')}</Link></li><li aria-hidden="true">{language === 'ar' ? '←' : '→'}</li><li aria-current="page">{t('about.breadcrumb.current')}</li></ol></nav>
        <div className="about-hero-grid">
          <div className="about-hero-message"><p className="ab-section-subtitle">{t('about.hero.eyebrow')}</p><h1 id="about-title">{t('about.hero.title')}<span>{t('about.hero.highlight')}</span></h1></div>
          <div className="about-hero-intro"><p className="about-lead">{t('about.hero.text')}</p><div className="home-actions"><a className="primary-btn-one" href="#about-story">{t('about.hero.story')}<ArrowIcon /></a><Link className="home-text-link" to="/contact#contact-form">{t('about.hero.contact')}<ArrowIcon /></Link></div></div>
        </div>
        <BrandJourney />
      </div>
    </section>

    <section id="about-story" className="about-section" aria-labelledby="about-story-title">
      <div className="container"><div className="about-story-layout"><div className="about-story-heading"><SectionHeading eyebrow="about.story.eyebrow" title="about.story.title" id="about-story-title" /><p>{t('about.story.aside')}</p><Link className="home-text-link" to="/projects">{t('about.story.projects')}<ArrowIcon /></Link></div>
        <div className="about-story-grid">{['russia', 'region'].map((key, index) => <article key={key}><span className="about-chapter" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><p className="about-location-label"><span aria-hidden="true" />{t(`about.story.${key}.label`)}</p><h3>{t(`about.story.${key}.title`)}</h3><p>{t(`about.story.${key}.text`)}</p>{key === 'russia' && <p className="about-story-note">{t('about.story.russia.note')}</p>}</div></article>)}</div>
        </div><div className="about-story-question"><span className="about-quote-mark" aria-hidden="true">“</span><blockquote>{t('about.story.quote')}</blockquote><p>{t('about.story.answer')}</p></div>
      </div>
    </section>

    <section className="about-section about-capabilities ab-bg" aria-labelledby="about-services-title">
      <div className="container"><div className="about-heading-row"><SectionHeading eyebrow="about.services.eyebrow" title="about.services.title" id="about-services-title" /><p>{t('about.services.text')}</p></div>
        <div className="about-services-grid">{services.map(([key, icon], index) => <article key={key}><span className="about-service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><LineIcon name={icon} /><h3>{t(`about.services.${key}.title`)}</h3><p>{t(`about.services.${key}.text`)}</p></article>)}</div>
        <Link className="home-text-link about-section-link" to="/services">{t('about.services.link')}<ArrowIcon /></Link>
      </div>
    </section>

    <section id="about-system" className="about-section" aria-labelledby="about-product-title">
      <div className="container about-product-grid"><div><p className="ab-section-subtitle">{t('about.product.eyebrow')}</p><span className="about-status"><span aria-hidden="true" />{t('about.product.status')}</span><h2 className="ab-section-title" id="about-product-title"><HeadingWords>{t('about.product.title')}</HeadingWords></h2><p className="about-lead">{t('about.product.text')}</p><p>{t('about.product.interest')}</p><Link className="home-text-link about-section-link" to="/contact#contact-form">{t('about.product.contact')}<ArrowIcon /></Link></div>
        <TimeScene />
      </div>
    </section>

    <section id="about-innovators" className="about-section ab-bg" aria-labelledby="about-innovators-title">
      <div className="container about-innovators-grid"><div className="about-innovators-copy"><SectionHeading eyebrow="about.innovators.eyebrow" title="about.innovators.title" id="about-innovators-title" /><p className="about-lead">{t('about.innovators.text')}</p><p>{t('about.innovators.program')}</p><Link className="primary-btn-one about-section-link" to="/partners">{t('about.innovators.link')}<ArrowIcon /></Link></div><figure className="about-innovators-art"><div className="about-innovators-image"><span className="about-innovators-label">{t('home.partners.eyebrow')}</span><img src={assets.partners.src} width={assets.partners.width} height={assets.partners.height} alt={t('home.partners.visual.alt')} loading="lazy" decoding="async" /></div><figcaption className="about-innovators-path"><span><span aria-hidden="true">{'{ }'}</span>{t('about.innovators.path.system')}</span><ArrowIcon /><strong lang="en" dir="ltr">ILogic</strong><ArrowIcon /><span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="9" cy="7" r="3" /><path d="M3 20v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m2 10v-3a6 6 0 0 0-2-4" /></svg>{t('about.innovators.path.users')}</span></figcaption></figure></div>
    </section>

    <section className="about-section about-principles ab-bg" aria-labelledby="about-principles-title">
      <div className="container"><SectionHeading eyebrow="about.principles.eyebrow" title="about.principles.title" id="about-principles-title" /><div className="about-principles-grid">{principles.map(([key, icon], index) => <article key={key}><div className="about-principle-top"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><LineIcon name={icon} /></div><h3>{t(`about.principles.${key}.title`)}</h3><p>{t(`about.principles.${key}.text`)}</p></article>)}</div><p className="about-signature-line">{t('about.principles.closing')}</p></div>
    </section>

    <section className="about-section about-closing ab-bg" aria-labelledby="about-cta-title"><div className="container"><p className="ab-section-subtitle">{t('about.cta.eyebrow')}</p><h2 id="about-cta-title"><HeadingWords>{t('about.cta.title')}</HeadingWords></h2><p className="about-lead">{t('about.cta.text')}</p><div className="home-actions"><Link className="primary-btn-one" to="/contact#contact-form">{t('about.cta.contact')}<ArrowIcon /></Link>{whatsapp && <a className="home-text-link" href={whatsapp.url} target="_blank" rel="noopener noreferrer">{t('about.cta.whatsapp')}<ArrowIcon /></a>}</div></div></section>
  </div>;
}

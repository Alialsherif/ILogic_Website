import { useLocale } from '../../i18n/useLocale';
import { LocalizedLink } from '../../i18n/LocalizedLink';
import { services } from '../../data/homeContent';
import { SectionHeading } from './BrandElements';
import { IdentityBackdrop } from './IdentityElements';

// Homepage variant of ServiceInnerPage's ab-service__item__two card:
// retain its shell, angled photo treatment and primary-btn-two details control.
function HomeServiceCard({ service, index }) {
  const { t, language } = useLocale();
  const prefix = `home.services.${service}`;
  const rtl = language === 'ar';
  return <article className={`ab-service__item ab-service__item__two home-question-card${service === 'security' ? ' home-question-card--security' : ''}`}>
    <div className="home-question-card__media">
      <div className="home-question-card__mask">
        <img src={`/images/identity-v2/service-${service}.webp`} alt={t(`${prefix}.alt`)} width="1200" height="800" loading="lazy" decoding="async" />
      </div>
      <svg className="home-question-card__trace" width="300" height="300" viewBox="0 0 300 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d={rtl ? 'M45 0 0 255 300 300' : 'M255 0 300 255 0 300'} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="home-question-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="ab-service__content ab-service__content__two home-question-card__body">
      <h3>{service === 'security' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></svg>}{t(`${prefix}.title`)}</h3>
      <p className="home-question-card__question">{t(`${prefix}.question`)}</p>
      <p className="home-question-card__answer">{t(`${prefix}.text`)}</p>
      <LocalizedLink className={`primary-btn ${service === 'security' ? '' : 'primary-btn-two '}home-question-card__link`} to={`/services#service-${service}`} aria-label={`${t('home.services.details')}: ${t(`${prefix}.title`)}`}>
        {t('home.services.details')}
        <span className="primary-btn-two-icon primary-btn-two-icon-three">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={rtl ? 'M18 18 6 6m0 10V6h10' : 'M6 18 18 6M8 6h10v10'} /></svg>
        </span>
      </LocalizedLink>
    </div>
  </article>;
}

export default function HomeServices() {
  return <section id="services" className="ab-service-are ab-bg pt-120 pb-120 identity-section" aria-labelledby="services-title">
    <IdentityBackdrop variant="services" />
    <div className="container">
      <SectionHeading eyebrow="home.services.eyebrow" title="home.services.title" highlight="home.services.highlight" id="services-title" />
      <div className="home-question-grid">{services.map((service, index) => <HomeServiceCard key={service} service={service} index={index} />)}</div>
    </div>
  </section>;
}

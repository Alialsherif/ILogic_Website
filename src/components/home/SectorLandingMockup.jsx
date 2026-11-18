import { useLocale } from '../../i18n/useLocale';
import SectorIcon from './SectorIcon';

const lines = <span className="sector-mock-lines"><i /><i /></span>;
const tile = (slug, index) => <span className="sector-mock-tile" key={index}><SectorIcon slug={slug} size={18} />{lines}</span>;

function LandingContent({ slug }) {
  switch (slug) {
    case 'clinics': return <div className="sector-mock-calendar"><div>{Array.from({ length: 7 }, (_, i) => <i key={i} className={i === 3 ? 'is-selected' : ''} />)}</div><div>{[0, 1, 2].map(i => <span key={i} />)}</div></div>;
    case 'beauty': return <div className="sector-mock-grid sector-mock-grid--three">{[0, 1, 2].map(i => tile('beauty', i))}</div>;
    case 'dental': return <div className="sector-mock-steps">{[1, 2, 3].map(i => <span key={i}><b>{i}</b><i /></span>)}</div>;
    case 'medical-centers': return <div className="sector-mock-grid sector-mock-grid--departments">{['clinics', 'dental', 'medical-centers', 'fitness'].map((icon, i) => tile(icon, i))}</div>;
    case 'restaurants': return <div className="sector-mock-rows">{[0, 1].map(i => <span key={i}><i className="sector-mock-round" />{lines}<i className="sector-mock-add" /></span>)}</div>;
    case 'real-estate': return <div className="sector-mock-property"><span className="sector-mock-picture" /><div>{[0, 1, 2].map(i => <i key={i} />)}</div></div>;
    case 'education': return <div className="sector-mock-programs">{[0, 1].map(i => <span key={i}><SectorIcon slug="education" size={18} />{lines}<i /></span>)}</div>;
    case 'industrial': return <div className="sector-mock-grid sector-mock-grid--three sector-mock-products">{[
      <svg key="mast" width="23" height="23" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 28V5m-5 23h10M16 8h9v6h-7M16 5H9v6h6" /></svg>,
      <svg key="beam" width="23" height="23" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 5h18v5h-6v12h6v5H7v-5h6V10H7z" /></svg>,
      <svg key="gear" width="23" height="23" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12 5 1-3h6l1 3 4 2 3-1 3 5-2 3v4l2 3-3 5-3-1-4 2-1 3h-6l-1-3-4-2-3 1-3-5 2-3v-4l-2-3 3-5 3 1z" /><circle cx="16" cy="16" r="5" /></svg>,
    ].map((icon, i) => <span key={i} className={i === 1 ? 'is-selected' : ''}>{icon}<i /></span>)}</div>;
    case 'retail': return <div className="sector-mock-retail"><span className="sector-mock-cart"><SectorIcon slug="retail" size={15} /></span><span className="sector-mock-picture" />{lines}</div>;
    case 'professional-services': return <div className="sector-mock-articles">{[0, 1, 2].map(i => <span key={i}><svg width="16" height="18" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2h9l5 5v15H3zM12 2v6h5M6 12h8m-8 4h6" /></svg>{lines}</span>)}</div>;
    case 'hospitality': return <div className="sector-mock-booking"><div><span /><span /></div><span /></div>;
    case 'fitness': return <div className="sector-mock-grid sector-mock-grid--three sector-mock-plans">{[0, 1, 2].map(i => <span key={i} className={i === 1 ? 'is-selected' : ''}>{lines}</span>)}</div>;
    default: return null;
  }
}

export default function SectorLandingMockup({ sector }) {
  const { t } = useLocale();
  return <div className="sector-landing" aria-hidden="true" data-landing-sector={sector.slug}>
    <div className="sector-landing__chrome"><span><i /><i /><i /></span><span className="sector-landing__site-name">{t('home.sectors.yourWebsite')}</span></div>
    <div className="sector-landing__body"><p className="sector-landing__title">{t(`home.sectors.${sector.slug}.mockupHeadline`)}</p><div className="sector-landing__content"><LandingContent slug={sector.slug} /></div><span className="sector-landing__cta">{t(`home.sectors.${sector.slug}.mockupCta`)}</span></div>
  </div>;
}

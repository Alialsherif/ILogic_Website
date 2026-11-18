import { useLocale } from '../../i18n/useLocale';
import SectorIcon from './SectorIcon';
import SectorLandingMockup from './SectorLandingMockup';

export function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6" /></svg>;
}

function SearchResult({ sector, organic, t }) {
  return <div className={`sector-result ${organic ? 'sector-result--organic' : 'sector-result--ad'}`} aria-hidden="true">
    <span className="sector-result__tag">{t(organic ? 'home.sectors.organicLabel' : 'home.sectors.adLabel')}</span>
    <div className="sector-result__heading"><span className="sector-result__icon"><SectorIcon slug={sector.slug} /></span><div className="sector-result__lines">{organic ? <span className="sector-result__site-title">{t('home.sectors.websiteResult')}</span> : <i className="sector-skeleton sector-skeleton--title" />}<i className="sector-skeleton sector-skeleton--url" /></div></div>
    <div className="sector-result__description"><i className="sector-skeleton" /><i className="sector-skeleton" /></div>
    {organic && <span className="sector-result__outline" />}
  </div>;
}

export default function SectorSearchScene({ sector, active, running }) {
  const { t } = useLocale();
  const phrase = t(`home.sectors.${sector.slug}.search`);
  return <div className={`home-sector-search${active ? ' is-active' : ''}${active && running ? ' is-running' : ''}`} aria-hidden={!active} style={{ '--typing-steps': [...phrase].length }}>
    <div className="sector-search-field"><SearchIcon /><span className="sector-search-phrase"><span>{phrase}</span><span className="sector-search-mask" aria-hidden="true" /><span className="sector-search-caret" aria-hidden="true" /></span></div>
    <div className="sector-search-results"><SearchResult sector={sector} t={t} /><SearchResult sector={sector} organic t={t} /><svg className="sector-search-cursor" width="20" height="24" viewBox="0 0 20 24" fill="currentColor" aria-hidden="true"><path d="M2 1v18l5-5 4 9 4-2-4-8h7L2 1Z" /></svg></div>
    <SectorLandingMockup sector={sector} />
  </div>;
}

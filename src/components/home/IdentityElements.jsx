import { useLocale } from '../../i18n/useLocale';
export function IdentityBackdrop({ variant }) {
  return <div className={`identity-backdrop identity-scene-${variant}`} aria-hidden="true"><span className="identity-paper-wash" /></div>;
}

export function ProcessSymbol({ index }) {
  const paths = [
    <><circle cx="29" cy="27" r="16"/><path d="m41 40 12 12M23 27l4 4 9-9"/></>,
    <><rect x="22" y="6" width="20" height="14" rx="2"/><path d="M32 20v12H13v12m19-12h19v12M9 40l4 4 4-4m30 0 4 4 4-4"/><rect x="3" y="44" width="20" height="14" rx="2"/><rect x="41" y="44" width="20" height="14" rx="2"/></>,
    <><path d="m22 17-15 15 15 15m20-30 15 15-15 15M37 10 27 54"/></>,
    <><path d="M9 54V35h9v19m9 0V24h9v30m9 0V12h9v42M7 58h51M10 22l15-9 10 4L53 5"/></>,
    <><rect x="14" y="6" width="36" height="52" rx="4"/><path d="M22 17h20M22 25h20M22 33h9m-9 12 6 6 14-15"/></>,
    <><path d="M25 14v-6h30v48H25V42M7 30h29m-9-9 9 9-9 9M43 19h5m-5 10h5m-5 10h5"/></>,
    <><path d="m27 37 10-10M25 43l-5 5a10 10 0 0 1-14-14l10-10a10 10 0 0 1 14 0m9-3 5-5a10 10 0 0 1 14 14L48 40a10 10 0 0 1-14 0"/></>,
    <><rect x="29" y="8" width="27" height="48" rx="3"/><path d="M29 24h27M29 40h27M42 8v48M5 32h29m-9-9 9 9-9 9"/></>,
  ];
  return <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index % paths.length]}</svg>;
}

export function ProcessOrbits({ steps, prefix, icons = [0,1,2,3] }) {
  const { t } = useLocale();
  return <ol className="identity-process">{steps.map((key, index) => <li key={key} className={index === 1 ? 'is-featured' : ''}><div className="identity-orbit" aria-hidden="true"><svg className="identity-orbit-path" width="240" height="300" viewBox="0 0 240 300" fill="none"><path d="M120 12a106 106 0 0 1 0 212v62"/><circle cx="120" cy="286" r="6" fill="currentColor" stroke="none"/><g className="identity-step-number" transform="translate(198 190)"><circle r="21"/><text x="0" y="1" textAnchor="middle" dominantBaseline="central">{String(index + 1).padStart(2,'0')}</text></g></svg><div className="identity-orbit-core"><ProcessSymbol index={icons[index]}/></div></div><h3>{t(`${prefix}.${key}.title`)}</h3><p>{t(`${prefix}.${key}.text`)}</p></li>)}</ol>;
}

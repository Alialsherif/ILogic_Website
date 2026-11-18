import BrandLogo from '../BrandLogo';
import { LineIcon } from './BrandElements';
import { useLocale } from '../../i18n/useLocale';

// Decorative paths connect real, server-rendered labels. No canvas or image text.
export default function LogicScene() {
  const { t } = useLocale();
  return <figure className="services-hero-art logic-scene">
    <div className="logic-scene-heading"><span className="logic-scene-dot" />{t('services.scene.eyebrow')}<span aria-hidden="true">↗</span></div>
    <div className="logic-scene-stage">
      <svg className="logic-scene-paths" width="520" height="400" viewBox="0 0 520 400" fill="none" aria-hidden="true"><g><path d="M88 90v30q0 30 30 30h102q40 0 40 40v35" /><path d="M260 65v160" /><path d="M432 90v30q0 30-30 30H300q-40 0-40 40v35" /><path className="logic-scene-output" d="M260 260v76" /></g><g className="logic-scene-current"><path d="M88 90v30q0 30 30 30h102q40 0 40 40v35" /><path d="M260 65v160" /><path d="M432 90v30q0 30-30 30H300q-40 0-40 40v35" /><path d="M260 260v76" /></g><circle className="logic-scene-traveller" cx="260" cy="104" r="4" fill="currentColor" /><circle cx="260" cy="336" r="5" fill="currentColor" /></svg>
      <div className="logic-scene-inputs">{[['clients','web'],['work','business'],['tasks','automation']].map(([key,icon]) => <div className={`logic-scene-input logic-scene-input--${key}`} key={key}><LineIcon name={icon} /><span>{t(`services.scene.${key}`)}</span></div>)}</div>
      <div className="logic-scene-core"><BrandLogo /><span>{t('services.scene.logic')}</span></div>
      <div className="logic-scene-result"><svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="16" cy="16" r="12" /><path d="M16 8v8l5 3" /></svg><strong>{t('services.scene.result')}</strong></div>
    </div>
    <figcaption>{t('services.hero.caption')}</figcaption>
  </figure>;
}

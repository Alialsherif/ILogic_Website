import { useLocale } from '../i18n/useLocale';
import { useSocialLinks } from '../components/useSocialLinks';
import BrandLogo from '../components/BrandLogo';
import { ArrowIcon, SectionHeading, LogicHeadline, LineIcon } from '../components/home/BrandElements';
import { IdentityBackdrop, ProcessOrbits } from '../components/home/IdentityElements';
import { partnerSteps, partnerCriteria, partnerOffers, partnerSystems, partnerFaq } from '../data/partnersContent';
import PartnerApplicationForm from '../components/partners/PartnerApplicationForm';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

function MarketDiagramGraphic({ vertical = false }) {
  const { t, language } = useLocale();
  const nodes = language === 'ar' && !vertical ? ['market', 'brand', 'developer'] : ['developer', 'brand', 'market'];
  const height = vertical ? 150 : 172;
  return <svg className={`partner-market-svg${vertical ? ' is-vertical' : ''}`} width={vertical ? 240 : 820} height={vertical ? 550 : 174} viewBox={vertical ? '0 0 240 550' : '0 0 820 174'} role="img" aria-label={t('partner.diagram.label')}>
    {[0,1].map(index => {
      const start = vertical ? index * 200 + 150 : index * 300 + 220;
      const end = start + (vertical ? 50 : 80);
      const line = vertical ? `M120 ${start}V${end}m-7-8 7 8 7-8` : language === 'ar' ? `M${end} 87H${start}m8-7-8 7 8 7` : `M${start} 87H${end}m-8-7 8 7-8 7`;
      return <path key={index} className="partner-market-line" d={line} pathLength="100" style={{ animationDelay: index ? '1s' : '.25s' }} />;
    })}
    {nodes.map((node,index) => {
      const x = vertical ? 10 : index * 300;
      const y = vertical ? index * 200 : 1;
      return <g key={node}>
        <rect className="partner-market-card" x={x + .5} y={y + .5} width="219" height={height - 1} rx="16" />
        <foreignObject x={x} y={y} width="220" height={height}>
          <div xmlns="http://www.w3.org/1999/xhtml" className={`partner-market-node${node === 'brand' ? ' partner-market-brand' : ''}`}>
            {node === 'brand' ? <BrandLogo /> : node === 'developer' ? <><span className="partner-code" aria-hidden="true">{'{ }'}</span><span>{t('partner.diagram.developer')}</span></> : <><svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M10 56V18h25v38m0-27h19v27M6 57h52M18 26h9m-9 9h9m-9 9h9m16-7h4m-4 9h4" /></svg><span>{t('partner.diagram.business')}</span><small>{t('partner.diagram.market')}</small></>}
          </div>
        </foreignObject>
      </g>;
    })}
  </svg>;
}

function MarketDiagram() {
  return <div className="partner-market-diagram"><MarketDiagramGraphic /><MarketDiagramGraphic vertical /></div>;
}

export default function PartnersPage() {
  const { t, language } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');
  return <div className="ilogic-home ilogic-partners">
    <section className="partner-hero identity-section ab-bg" aria-labelledby="partner-title"><IdentityBackdrop variant="hero" compact /><div className="container"><nav className="partner-breadcrumb" aria-label={t('partner.breadcrumb.label')}><ol><li><Link to="/">{t('partner.breadcrumb.home')}</Link></li><li aria-hidden="true">{language === 'ar' ? '←' : '→'}</li><li aria-current="page">{t('partner.breadcrumb.current')}</li></ol></nav><p className="ab-section-subtitle">{t('partner.hero.eyebrow')}</p><h1 id="partner-title">{t('partner.hero.title')}</h1><p className="partner-hero-intro">{t('partner.hero.text')}</p><div className="home-actions"><a href="#apply" className="primary-btn-one">{t('partner.apply.button')}<ArrowIcon /></a><a href="#how" className="primary-btn-one home-button-outline">{t('partner.hero.how')}<ArrowIcon /></a></div><MarketDiagram /></div></section>

    <section id="why" className="identity-section ab-bg-dark pt-120 pb-120" aria-labelledby="why-title"><IdentityBackdrop variant="story" compact /><div className="container"><SectionHeading eyebrow="partner.why.eyebrow" title="partner.why.title" id="why-title" /><div className="partner-why-columns">{['you','us'].map(key => <div key={key}><h3>{t(`partner.why.${key}.title`)}</h3><p>{t(`partner.why.${key}.text`)}</p></div>)}</div><p className="partner-belief">{t('partner.why.closing')}</p></div></section>

    <section id="how" className="identity-section ab-bg pt-120 pb-120" aria-labelledby="how-title"><IdentityBackdrop variant="process" compact /><div className="container"><SectionHeading eyebrow="partner.how.eyebrow" title="partner.how.title" id="how-title" /><ProcessOrbits steps={partnerSteps} prefix="partner.how" icons={[4,0,6,7]} /></div></section>

    <section id="criteria" className="identity-section ab-bg-dark pt-120 pb-120" aria-labelledby="criteria-title"><IdentityBackdrop variant="services" compact /><div className="container"><SectionHeading eyebrow="partner.criteria.eyebrow" title="partner.criteria.title" id="criteria-title" /><div className="partner-criteria-grid">{partnerCriteria.map((key,index) => <article key={key}><LineIcon name={['seo','automation','web','brand'][index]}/><LogicHeadline problem={`partner.criteria.${key}.condition`} solution={`partner.criteria.${key}.result`} /><p>{t(`partner.criteria.${key}.text`)}</p></article>)}</div></div></section>

    <section id="offer" className="ab-bg pt-120 pb-120" aria-labelledby="offer-title"><div className="container"><SectionHeading eyebrow="partner.offer.eyebrow" title="partner.offer.title" id="offer-title" /><div className="partner-offers">{partnerOffers.map((key,index) => <article key={key}><LineIcon name={['automation','seo','business','web'][index]} /><div><h3>{t(`partner.offer.${key}.title`)}</h3><p>{t(`partner.offer.${key}.text`)}</p></div></article>)}</div></div></section>

    <section className="partner-systems ab-bg-dark" aria-labelledby="systems-title"><div className="container"><h2 id="systems-title" className="visually-hidden">{t('partner.systems.title')}</h2><ul>{partnerSystems.map(key => <li key={key}>{t(`partner.systems.${key}`)}</li>)}</ul><p>{t('partner.systems.text')}</p></div></section>

    <section id="apply" className="identity-section ab-bg pt-120 pb-120" aria-labelledby="apply-title"><IdentityBackdrop variant="story" compact /><div className="container"><p className="ab-section-subtitle">{t('partner.apply.eyebrow')}</p><LogicHeadline as="h2" className="home-logic-section" id="apply-title" problem="partner.apply.condition" solution="partner.apply.result" /><p className="home-intro">{t('partner.apply.text')}</p><div id="partner-form-container"><PartnerApplicationForm /></div>{whatsapp && <p className="partner-direct">{t('partner.apply.direct')} <a className="home-text-link" href={whatsapp.url} target="_blank" rel="noopener noreferrer">{t('partner.apply.whatsapp')}<ArrowIcon /></a></p>}</div></section>

    <section id="faq" className="ab-bg-dark pt-120 pb-120" aria-labelledby="partner-faq-title"><div className="container"><div className="row gy-4"><div className="col-lg-4"><h2 className="ab-section-title" id="partner-faq-title">{t('partner.faq.title')}</h2></div><div className="col-lg-8"><div className="home-faq">{partnerFaq.map(key => <details key={key} name="partner-faq"><summary><h3>{t(`partner.faq.${key}.question`)}</h3><span className="home-faq-toggle" aria-hidden="true" /></summary><p>{t(`partner.faq.${key}.answer`)}</p></details>)}</div></div></div><div dangerouslySetInnerHTML={{ __html: '<!-- TODO(owner): ownership/IP, review duration, confidentiality terms -->' }} /></div></section>

    <section className="home-final-cta identity-section ab-bg pt-120 pb-120" aria-labelledby="partner-closing-title"><IdentityBackdrop variant="footer" compact /><div className="container"><LogicHeadline as="h2" id="partner-closing-title" className="home-logic-section" problem="partner.closing.condition" solution="partner.closing.result" /><div className="home-actions partner-closing-actions"><a href="#apply" className="primary-btn-one">{t('partner.apply.button')}<ArrowIcon /></a></div></div></section>
  </div>;
}

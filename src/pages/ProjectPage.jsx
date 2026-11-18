import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
import { ArrowIcon } from '../components/home/BrandElements';
import BrandText from '../components/home/BrandText';
import ProjectMedia from '../components/home/ProjectMedia';
import { projects } from '../data/homeContent';

const categoryOf = project => project.key === 'gostinec' ? 'stores' : project.href ? 'websites' : 'systems';

export default function ProjectPage() {
  const { t, language } = useLocale();
  return <div className="ilogic-home ilogic-projects">
    <section className="projects-hero" aria-labelledby="projects-title"><div className="container">
      <nav className="projects-breadcrumb" aria-label={t('projects.breadcrumb')}><ol><li><Link to="/">{t('projects.home')}</Link></li><li aria-hidden="true">{language === 'ar' ? '←' : '→'}</li><li aria-current="page">{t('projects.title')}</li></ol></nav>
      <p className="ab-section-subtitle">{t('projects.eyebrow')}</p><div className="projects-intro"><h1 id="projects-title">{t('projects.title')}</h1><p>{t('projects.intro')}</p></div>
    </div></section>
    <section className="projects-gallery" aria-labelledby="projects-gallery-title"><div className="container">
      <h2 id="projects-gallery-title" className="visually-hidden">{t('projects.gallery')}</h2>
      <div className="projects-grid" id="projects-grid">{projects.map((project,index) => <article key={project.key} data-project={project.key} className={`projects-card projects-card--${categoryOf(project)}`}>
        <figure className="projects-card-media"><ProjectMedia assetKey={project.asset} priority={index === 0} />{!project.href && <figcaption>{t('home.works.illustration')}</figcaption>}</figure>
        <div className="projects-card-body"><p className="projects-card-tag">{t(`home.works.${project.key}.tag`)}</p><h3><BrandText text={t(`home.works.${project.key}.title`)} /></h3><p className="projects-card-description">{t(`home.works.${project.key}.${project.key === 'behavior' ? 'text' : 'logic'}`)}</p>
          {/* Project detail routes are reserved for later. Only real client websites are linked. */}
          {project.href && <a className="projects-visit" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${t('home.works.visit')}: ${t(`home.works.${project.key}.title`)} — ${t('projects.external')}`}>{t('home.works.visit')}<ArrowIcon /></a>}
        </div>
      </article>)}</div>
    </div></section>
    <section className="projects-closing" aria-labelledby="projects-cta-title"><div className="container"><div className="projects-closing-panel"><div><h2 id="projects-cta-title">{t('projects.cta.title')}</h2><p>{t('projects.cta.text')}</p></div><Link className="primary-btn-one" to="/contact#contact-form">{t('projects.cta.button')}<ArrowIcon /></Link></div></div></section>
  </div>;
}

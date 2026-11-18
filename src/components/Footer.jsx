import SocialLinks from './SocialLinks';
import { useLocale } from '../i18n/useLocale';
import BrandLogo from './BrandLogo';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

const Footer = ({ showCallout = true, compact = false }) => {
  const { t } = useLocale();

  return (
    <footer 
      className={`ab-footer ${compact ? 'footer-compact' : ''} ${showCallout ? 'pt-120' : 'pt-0'} ab-bg`}
    >
      {showCallout && <div className="container">
        <div className="ab-footer-newsletter">
          <h2 className="ab-footer-newsletter-title split-text right">{t("LET’S DISCUSS YOUR")}</h2>
          <div>
            <div className="ab-footer-btn-wrapper position-relative d-flex justify-content-center align-items-center">
              <div>
                <Link to="/projects" className="ab-footer-btn">
                  <cite></cite>{t(" VIEW WORK")}</Link>
              </div>
              <h2 className="ab-footer-newsletter-title ab-footer-newsletter-title-2 split-text left">{t("NEXT PROJECT")}</h2>
              <div>
                <Link to="/contact" className="ab-footer-btn ab-footer-btn-2">
                  <cite></cite>{t(" HIRE NOW")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>}

      <div className={`ab-footer-midle ab-bg-dark ${showCallout ? 'mt-80' : 'mt-0'}`}>
        <div className="container">
          <div className="br-12">
            <div className="row align-items-center gy-4 gy-lg-0">
              <div className="col-xxl-2 col-lg-3">
                <Link to="/" className="ab-header-logo">
                  <BrandLogo />
                </Link>
                <p className="ab-footer-tagline">{t('home.footer.tagline')}</p>
              </div>
              <div className="col-xxl-7 d-none d-lg-block col-lg-6">
                <div className="d-flex d-none d-md-flex justify-content-xl-end ab-footer-midle-menu d-lg-flex align-items-center">
                  <div className="main-menu">
                    <nav>
                      <ul>
                        <li><Link to="/">{t("HOME")}</Link></li>
                        <li><Link to="about">{t("About")}</Link></li>
                        <li><Link to="/services">{t('services.breadcrumb.current')}</Link></li>
                        <li><Link to="/projects">{t('projects.title')}</Link></li>
                        <li><Link to="/partners">{t('home.nav.partners')}</Link></li>
                        <li><Link className="border-0" to="contact">{t("contact")}</Link></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-lg-3">
                <div className="ab-footer-social-area justify-content-lg-end">
                  <SocialLinks linkClassName="ab-footer-social" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="abfooter_copyright z-index-11 mt-50 mb-25 p-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-5">
              <p className="text-lg-start">
                © {new Date().getFullYear()} <span className="ab-white">{t("ILogic")}</span>{t(". All rights reserved.")}</p>
            </div>
            <div className="col-xl-6 col-md-7">
              <div className="information text-center text-lg-end">
                {/* TODO: Supply the real career and privacy destinations; preserve existing links until provided. */}
                <Link to="#!">{t("Career")}</Link>
                <Link to="/#faq">{t("our FAq")}</Link>
                <Link to="#!">{t("privacy & policy")}</Link>
                <Link to="/contact">{t("contact")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

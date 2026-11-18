import { useLocale } from '../i18n/useLocale';
 

// Import images

import rightArrow from "../assets/images/icon/right-arrow-2.png";
import ctaImage1 from "../assets/images/cta/home2-cta.png";
import ctaImage2 from "../assets/images/cta/home2-cta2.2.png";
import SectionTitle from "./SectionTitle";
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

const Discount = () => {
  const { t } = useLocale();

  return (
    <section>
      <div
        className="sb-cta-home2-area overflow-x-hidden bg-img position-relative"
        
      >
        <div className="container">
          <div className="sb-cta-home2">
            <div className="row g-4 gy-lg-0 align-items-center">
              <div className="col-lg-6">
                <div className="sb-section-title-wrapper sb-cta-home2-title-wrapper z-2 position-relative">
               
                  <SectionTitle title={t("  Natural Healthy leader\r\n                     \r\n                    Vegetables Market")}  titleClassWhite="sb-section-title-white " titleClass="mb-30" subtitleYellow="sb-section-subtitle-yellow mb-23" subtitle={t(" Discounts Added")} />
                  <p className="sb-body-color-2">{t("We are committed to promoting sustainable agriculture through")}{t(" ")}
                    <br className="d-none d-xl-block" />{t("organic farming practice. Our goal is to provide high-quality,")}{t(" ")}
                    <br className="d-none d-xl-block" />{t("environmentally-friendly product ...")}</p>

                  <div className="sb-btn-wrapper position-relative d-inline-block mt-45">
                    <Link to="contact" className="sb-btn sb-btn-two">
                      <div className="sb-btn-text sb-btn-two-text position-relative">
                        <span className="sb-btn-text-1">{t("Get a Quote")}</span>
                        <span className="sb-btn-text-2">{t("Get a Quote")}</span>
                      </div>
                      <div className="sb-btn-icon">
                        <img src={rightArrow} alt="" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="sb-cta-home2-thumb reveal top z-2 position-relative">
                  <img src={ctaImage1} alt="" />
                  <div className="sb-cta-home2-disc d-none d-md-flex">
                    <h3 className="fs-40 fs-40-white mb-16">30%</h3>
                    <span className="fs-16 fs-16-white">{t("Discounts")}</span>
                  </div>
                </div>

                <div className="sb-cta-home2-thumb-two d-none d-lg-block">
                  <img src={ctaImage2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;

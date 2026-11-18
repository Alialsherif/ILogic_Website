import { useLocale } from '../i18n/useLocale';

 
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Images
import shape1 from "../assets/img/shape/about-shape_1.png";
import shape2 from "../assets/img/shape/about-shape_1.2.png";
import aboutImg from "../assets/img/about/img-1.1.png";
import plusImg from "../assets/img/about/+.png";

const About = () => {
  const { t, language } = useLocale();

  return (
    <section className="ab-about-area pt-120 pb-120 ab-bg-dark position-relative overflow-hidden">
      
      {/* Shapes */}
      <div className="ab-about-shape">
        <div className="ab-about-shape-1 position-absolute">
          <img src={shape1} alt="" />
        </div>
        <div className="ab-about-shape-2 position-absolute">
          <img src={shape2} alt="" />
        </div>
      </div>

      <div className="container">
        <div className="ab-about">
          <div className="row justify-content-between">
            
            {/* Left Side */}
            <div className="col-xl-6">
              
              <div className="ab-about-title-wrapper title-anim">
                <h2 className="ab-section-title">{t("DRIVEN BY ")}<span className="ab-section-title-2">{t("CREATIVITY")}</span>{t(" POWERED")}</h2>

                <div className="d-flex align-items-center flex-wrap flex-md-nowrap mt-12">
                  <h2 className={`ab-section-title mr-30 ${language === 'ar' ? '' : 'd-none d-lg-flex'}`}>{t("BY PURPOSE")}</h2>

                  <h3 className="ab-section-subtitle pb-15">{t("ABOUT OUR AGENCY")}</h3>
                </div>
              </div>

              {/* Images */}
              <div className="ab-about-thumb mt-40 pl-40 mb-50 mb-xl-0">
                
                <div>
                  <img className="img-fluid" src={aboutImg} alt={t("about")} />
                </div>

                <div className="mt-30 mt-lg-0">
                  <img className="img-fluid" src={plusImg} alt="" />
                  <h3 className="ab-about-thumb-title pt-35">{t("YEARS OF EXPERIENCE")}</h3>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="col-xl-6">
              
              <p>{t("We blend imagination with intention to craft designs that not only look stunning but deliver results. Every idea we shape is rooted in strategy, ensuring your brand connects, communicates, and grows meaningfully.")}</p>

              {/* Fun Facts */}
              <div className="ab-about-funfact mt-50">
                
                <div className="ab-about-funfact-item">
                  <h4 className="ab-about-funfact-title">{t("PROJECT COMPLETED")}</h4>
                  <h3 className="ab-about-funfact-num">1.7k</h3>
                </div>

                <div className="ab-about-funfact-item">
                  <h4 className="ab-about-funfact-title">{t("HAPPY CUSTOMER")}</h4>
                  <h3 className="ab-about-funfact-num">24K+</h3>
                </div>

                <div className="ab-about-funfact-item">
                  <h4 className="ab-about-funfact-title">{t("EXPERIENCE MEMBERS")}</h4>
                  <h3 className="ab-about-funfact-num">99+</h3>
                </div>

              </div>

              {/* Button */}
              <div className="btn-wrapper d-inline-block mt-50">
                <Link className="primary-btn-one" to="about">{t("ABOUT US MORE")}</Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

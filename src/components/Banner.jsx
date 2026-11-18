import SocialLinks from './SocialLinks';
import { useLocale } from '../i18n/useLocale';


 
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Background & Shapes
import banner from "../assets/img/background/hero-bg1.1.png";
import shapeRight from "../assets/img/shape/hero-shape_Right.png";
import shapeLeft from "../assets/img/shape/hero-shape_Left.png";
import shapeMonogram from "../assets/img/shape/ilogic-monogram.svg";
import shapePlay from "../assets/img/ilogic-badge.svg";

// Hero Image
import heroImg from "../assets/img/hero/hero-1.1.jpg";

const Banner = () => {
  const { t } = useLocale();

  return (
    <section
      className="ab-hero p-relative bg-fit overflow-hidden"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Shapes */}
      <div className="ab-hero-shape">
        <div className="ab-hero-shape-1 position-absolute">
          <img src={shapeRight} alt="" />
        </div>

        <div className="ab-hero-shape-2 position-absolute">
          <img src={shapeLeft} alt="" />
        </div>

        <div className="ab-hero-shape-3 position-absolute" aria-hidden="true">
          <img src={shapeMonogram} alt="" width="96" height="112" />
        </div>

        <div className="ab-hero-shape-4 position-absolute">
          <div className="ripple rotate360 position-relative">
            <img src={shapePlay} alt="" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-12">
            <div className="ab-hero-content">

              {/* Title */}
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h1 className="hero-heading title-anim">
                    <span className="ab-hero-title">{t("CREATIVE")}</span>
                    <span className="ab-hero-title ab-hero-title-right">{t("AGENCY")}</span>
                  </h1>
                </div>
              </div>

              {/* Main Section */}
              <div className="row justify-content-between">
                
                {/* Left Image */}
                <div className="col-lg-5">
                  <div className="ab-hero-thumb mb-50 mb-lg-0 reveal top">
                    <img
                      className="img-fluid br-16"
                      src={heroImg}
                      alt={t("hero")}
                    />
                  </div>
                </div>

                {/* Right Content */}
                <div className="col-lg-7">
                  <div className="ab-hero-content-text">
                    
                    <h2 className="ab-section-subtitle pb-15">{t("DESIGNING EXPERIENCES")}</h2>

                    <p data-aos="fade-left" data-aos-delay="400">{t("We are a full-service creative agency turning ideas into bold brand experiences. From strategy to design, we craft visuals, stories, and solutions that connect, inspire, and drive meaningful growth for your business.")}</p>

                    {/* Button */}
                    <div className="btn-wrapper mt-50 mb-60 " data-aos="fade-up" data-aos-delay="500">
                      <Link className="primary-btn-one" to="contact">{t("EXPLORE MORE")}</Link>
                    </div>

                    {/* Review + Social */}
                    <div className="row align-items-end">
                      
                      {/* Review */}
                      <div className="col-12 col-xl-5">
                        <div className="ab-hero-review" data-aos="fade-up" data-aos-delay="200">
                          <h2 className="ab-section-subtitle-two">{t("DESIGNING EXPERIENCES")}</h2>

                          <div className="ab-hero-review-member">
                            <h3 className="ab-hero-review-rating">4.3</h3>
                            <p>{t("From 5.9k Members")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="col-12 col-xl-7">
                        <div className="ab-hero-social mt-30 mt-xl-0">
                  <SocialLinks text />
                </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

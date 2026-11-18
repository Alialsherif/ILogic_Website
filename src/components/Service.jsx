import { useLocale } from '../i18n/useLocale';

import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Shapes
import shapeGlow from "../assets/img/shape/Bacground-glow-service1.1.png";
import shapeRight from "../assets/img/shape/hero-shape_Right.png";
import shapeStar from "../assets/img/shape/hero-Star.png";

// Service Images
import service1 from "../assets/img/service/Image-1,2.png";
import service2 from "../assets/img/service/Image-1,1.png";
import service3 from "../assets/img/service/Image-1,3.png";
import SectionTitle from "./SectionTitle";

const About = () => {
  const { t } = useLocale();

  return (
    <section className="ab-service-are pt-120 pb-120 mb-md-0 ab-bg bg-fit overflow-hidden">

      <div className="ab-service-shape">
        <div className="ab-service-shape-1 position-absolute">
          <img src={shapeGlow} alt="" />
        </div>
        <div className="ab-service-shape-2 position-absolute">
          <img src={shapeRight} alt="" />
        </div>
        <div className="ab-service-shape-3 position-absolute">
          <img src={shapeStar} alt="" />
        </div>
      </div>

      <div className="container">

        <div className="ab-section-wrapper mb-60 text-center">
          
         

          <SectionTitle title={t("CREATIVE SOLUTIONS")} titleTextTwo={t("WE OFFER")}   subtitle={
    <span  className="ab-section-subtitle-three">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M18 5.641L16.6032 3.359L9.12492 8.80273L10.4025 0H7.59748L8.88076 8.80273L1.40252 3.359L0 5.641L8.76151 9L0 12.359L1.40252 14.641L8.88076 9.19728L7.59748 18H10.4025L9.12492 9.19728L16.6032 14.641L18 12.359L9.24416 9L18 5.641Z"
          fill="#CCFF00"
        />
      </svg>{t("WHAT WE DO")}<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M18 5.641L16.6032 3.359L9.12492 8.80273L10.4025 0H7.59748L8.88076 8.80273L1.40252 3.359L0 5.641L8.76151 9L0 12.359L1.40252 14.641L8.88076 9.19728L7.59748 18H10.4025L9.12492 9.19728L16.6032 14.641L18 12.359L9.24416 9L18 5.641Z"
          fill="#CCFF00"
        />
      </svg>
    </span>
  } />
        </div>

        <div className="ab-service">
          <div className="row gy-4 gy-lg-0">

            {/* Service 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="ab-service__item ab-service__item__itemtwo br-16 overflow-hidden  "  data-aos="fade-up" data-aos-delay="600">
                
                <div className="ab-service__item__itemtwo__shape">
                  <div className="ab-service__item__itemtwo__shape__one"></div>
                </div>

                <div className="ab-service_thumb ab-service_thumb_icon ml-40 mt-40">
                  <img src={service1} alt="" />
                </div>

                <div className="ab-service_thumb_hover">
                  <Link to="serviceDetails">
                    <img src={service2} alt="" />
                  </Link>
                </div>

                <div className="ab-service__content">
                  <h2>
                    <Link to="serviceDetails" className="fs-24 mb-10">{t("WEBFLOW DESIGN")}</Link>
                  </h2>

                  <p>{t("We design and develop responsive, high-performance websites in Webflow—bringing seamless user experience")}</p>

                  <Link to="serviceDetails" className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center mt-32">{t("MORE DETAILS")}<span className="primary-btn-two-icon ml-15">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill="#090808"/>
                        <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill="#090808"/>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="ab-service__item br-16 overflow-hidden" data-aos="fade-up" data-aos-delay="800">

                <div className="ab-service_thumb ab-service_thumb_midle">
                  <Link to="serviceDetails">
                    <img src={service2} alt="" />
                  </Link>
                </div>

                <div className="ab-service__content">
                  <h2>
                    <Link to="serviceDetails" className="fs-24 mb-10">{t("BRANDING DESIGN")}</Link>
                  </h2>

                  <p>{t("We design and develop responsive, high-performance websites in Webflow—bringing seamless user experience")}</p>

                  <div className="btn-wrapper d-flex justify-content-between mt-32">
                    <Link className="primary-btn primary-btn-two" to="serviceDetails">{t("MORE DETAILS")}</Link>

                    <div className="primary-btn-two-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill="#090808"/>
                        <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill="#090808"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="ab-service__item ab-service__item__itemtwo br-16 overflow-hidden  " data-aos="fade-up" data-aos-delay="1000">

                <div className="ab-service_thumb ab-service_thumb_icon ml-40 mt-40">
                  <img src={service3} alt="" />
                </div>

                <div className="ab-service_thumb_hover">
                  <Link to="serviceDetails">
                    <img src={service2} alt="" />
                  </Link>
                </div>

                <div className="ab-service__item__itemtwo__shape ab-service__item__itemtwo__shape__two">
                  <div className="ab-service__item__itemtwo__shape__one mb-10"></div>
                  <div className="ab-service__item__itemtwo__shape__one mb-10"></div>
                  <div className="ab-service__item__itemtwo__shape__one mb-10"></div>
                </div>

                <div className="ab-service__content">
                  <h2>
                    <Link to="serviceDetails" className="fs-24 mb-10">{t("WEB DESIGN")}</Link>
                  </h2>

                  <p>{t("We design and develop responsive, high-performance websites in Webflow—bringing seamless user experience")}</p>

                 
                  <div className="btn-wrapper d-flex justify-content-between mt-32">
                    <Link className="primary-btn primary-btn-two" to="serviceDetails">{t("MORE DETAILS")}</Link>

                    <div className="primary-btn-two-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill="#090808"/>
                        <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill="#090808"/>
                      </svg>
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

export default About;
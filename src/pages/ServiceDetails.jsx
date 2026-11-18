import { useLocale } from '../i18n/useLocale';


import React from 'react';

// Image Imports
import thumb1 from '../assets/img/service/service-details-thumb-1,1.png';
import thumb2 from '../assets/img/service/service-details-thumb-1_2.png';
import thumb3 from '../assets/img/service/service-details-thumb-1_3.png';
import thumb4 from '../assets/img/service/service-details-thumb-1_4.png';
import arrowIcon from '../assets/img/icon/double-arrow.png';
import Breadcrumb from '../components/Breadcrum';

const ServiceDetails = () => {
  const { t } = useLocale();

  return (
 <>

 <Breadcrumb title={t("service details")}/>
    <section className="service-details-wrapper ab-bg pt-120 pb-120">
      <div className="container">
        <div className="service-details">
          <div className="service-details-thumb">
            <h2 className="ab-section-title mb-8">{t("WEB DESIGN")}</h2>
            <p>{t("We create visually stunning, user-friendly, and responsive websites that elevate your brand presence. From concept to launch, every detail is crafted to engage users and drive meaningful results.")}</p>
         <div className="reveal">
             <img 
              className="img-fluid mt-24 br-24" 
              src={thumb1} 
              alt={t("Web Design Thumbnail")} 
            />
         </div>
          </div>

          <div className="service-details-content mt-32">
            <h3 className="fs-24 mb-24">{t("What’s Included:")}</h3>

            <div className="row gy-4 gy-lg-0">
              {/* Included Item 1 */}
              <div className="col-md-4">
                <div className="d-inline-flex align-items-lg-center mb-16">
                  <div>
                    <img src={arrowIcon} alt="" />
                  </div>
                  <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t("Custom UI/UX design tailored to your brand")}</p>
                </div>
                <div className="d-inline-flex align-items-lg-center">
                  <div>
                    <img src={arrowIcon} alt="" />
                  </div>
                  <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t("Fast loading speed & optimized performance")}</p>
                </div>
              </div>

              {/* Included Item 2 */}
              <div className="col-md-4">
                <div className="d-inline-flex align-items-lg-center mb-16">
                  <div>
                    <img src={arrowIcon} alt="" />
                  </div>
                  <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t("Fully responsive layouts for all devices")}</p>
                </div>
                <div className="d-inline-flex align-items-lg-center">
                  <div>
                    <img src={arrowIcon} alt="" />
                  </div>
                  <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t("Fully responsive layouts for all devices")}</p>
                </div>
              </div>

              {/* Included Item 3 */}
              <div className="col-md-4">
                <div className="d-inline-flex align-items-lg-center mb-16">
                  <div>
                    <img src={arrowIcon} alt="" />
                  </div>
                  <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t("SEO-friendly structure for better ranking")}</p>
                </div>
                <div className="d-inline-flex align-items-lg-center">
                  <div>
                    <img src={arrowIcon} alt="" />
                  </div>
                  <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t("Secure and scalable website architecture")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 service-details-review">
            <h3 className="ab-section-title mb-8">{t("Service Overview")}</h3>
            <p>{t("Our web design services focus on creating visually captivating, highly functional websites tailored to reflect your brand’s unique identity. We prioritize user experience, ensuring every site is intuitive, responsive, and fast-loading across all devices. By combining creative design with strategic thinking, we build websites that not only attract visitors but also engage and convert them into loyal customers.")}</p> 
            <br />
            <p>{t("Our designs incorporate SEO best practices, accessibility standards, and scalable frameworks to support your business growth. From the initial concept through to launch and ongoing optimization, we partner with you to deliver a seamless digital presence that drives measurable results and elevates your brand above the competition.")}</p>

            <div className="row gy-4 gy-lg-0 mt-32">
              <div className="col-md-5">
                <div className="service-details-thumb-two reveal top">
                  <img src={thumb2} className="img-fluid br-16" alt={t("Service Detail")} />
                </div>
              </div>

              <div className="col-md-7">
                <h4 className="fs-32 fs-32-white mb-24">{t(" Web Design – What We Deliver")}</h4>
                <ul className="list-unstyled">
                  {[
                    { title: "Creative UI/UX -", desc: "Custom UI/UX design tailored to your brand" },
                    { title: "Data-Driven Decisions –", desc: "Designs informed by analytics and user behavior." },
                    { title: "Interactive Elements –", desc: "Animations, hover effects, and micro-interactions for engagement." },
                    { title: "Scalable Design –", desc: "Built to grow with your business." },
                    { title: "Accessibility Ready -", desc: "Inclusive design for all users, following WCAG standards." },
                    { title: "E-Commerce Friendly -", desc: "Optimized for online stores and sales funnels." }
                  ].map((item, index) => (
                    <li key={index} className="d-inline-flex align-items-lg-center mb-15">
                      <div>
                        <img src={arrowIcon} alt="" />
                      </div>
                      <div className="ml-8">
                        <h5 className="fs-18 fs-18-white f-w-600 d-inline-block">{t(item.title)}</h5>
                        <p className="ml-6 d-inline-block">{t(item.desc)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="row gy-4 gy-lg-0 mt-32 align-items-center">
              <div className="col-md-6">
                <div className="service-details-userReview position-relative">
                  <div className="service-details-userReview-shape position-absolute">
                    <svg width="565" height="240" viewBox="0 0 565 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_f_248_2613)">
                        <circle cx="528" cy="361" r="204" fill="#CCFF00" />
                      </g>
                      <defs>
                        <filter id="filter0_f_248_2613" x="0" y="-167" width="1056" height="1056" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="162" result="effect1_foregroundBlur_248_2613" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p className="fs-18 fst-italic fs-18-white">{t("\"Professional, fast, and SEO-friendly content. Our website now ranks and converts better. Great experience from start to finish!\"")}</p>
                  <div className="sb-testi-item-box d-flex align-items-center justify-content-between">
                    <div>
                      <span className="sb-testi-item-text fs-20-black fs-20">{t("Howard Jeremy")}</span>
                      <p className="fs-18 fs-18-white2">{t(" Farmer")}</p>
                    </div>
                    <div className="ab-box-icon mr-20">
                      <svg width="43" height="32" viewBox="0 0 43 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1127 0C15.9844 0 20.223 4.84751 20.2229 12.0251C20.1853 22.4536 12.3456 29.8269 1.03573 31.2429C-0.0135503 31.3742 -0.418141 29.9207 0.548116 29.491C4.8878 27.5614 7.07957 25.1127 7.36267 22.689C7.57418 20.8783 6.58981 19.2921 5.35378 18.995C2.1494 18.225 0.00243541 14.2345 0.00243541 10.1103C0.00243541 4.52653 4.52897 0 10.1127 0Z" fill="#CCFF00" />
                        <path d="M32.1713 0C38.043 0 42.2816 4.84751 42.2815 12.0251C42.2439 22.4536 34.4042 29.8269 23.0943 31.2429C22.045 31.3742 21.6405 29.9207 22.6067 29.491C26.9464 27.5614 29.1382 25.1127 29.4213 22.689C29.6328 20.8783 28.6484 19.2921 27.4124 18.995C24.208 18.225 22.061 14.2345 22.061 10.1103C22.061 4.52653 26.5876 0 32.1713 0Z" fill="#CCFF00" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <h4 className="fs-32 fs-32-white mb-24">{t(" Why Choose Our Web Design Service?")}</h4>
                <ul className="list-unstyled">
                  <li className="d-inline-flex align-items-lg-center mb-15">
                    <div><img src={arrowIcon} alt="" /></div>
                    <div className="ml-8">
                      <h5 className="fs-18 fs-18-white f-w-600 d-inline-block">{t("Tailored to Your Goals –")}</h5>
                      <p className="ml-6 d-inline-block">{t("Every website serves your specific business objectives.")}</p>
                    </div>
                  </li>
                  <li className="d-inline-flex align-items-lg-center mb-15">
                    <div><img src={arrowIcon} alt="" /></div>
                    <div className="ml-8">
                      <h5 className="fs-18 fs-18-white f-w-600 d-inline-block">{t("Data-Driven Decisions –")}</h5>
                      <p className="ml-6 d-inline-block">{t("Designs informed by analytics and user behavior.")}</p>
                    </div>
                  </li>
                  <li className="d-inline-flex align-items-lg-center mb-15">
                    <div><img src={arrowIcon} alt="" /></div>
                    <div className="ml-8">
                      <h5 className="fs-18 fs-18-white f-w-600 d-inline-block">{t("Cutting-Edge Tools –")}</h5>
                      <p className="ml-6 d-inline-block">{t("Built with the latest web technologies.")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row gy-4 gy-lg-0 mt-30 mb-32">
              <div className="col-md-6">
                <div className=" reveal "  >
                  <img className="img-fluid br-16" src={thumb3} alt={t("Web Design Gallery 1")} />
                </div>
              </div>
              <div className="col-md-6">
                <div className=" reveal right">
                  <img className="img-fluid br-16" src={thumb4} alt={t("Web Design Gallery 2")} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="fs-32 fs-32-white mb-12">{t(" Why It Matters:")}</h4>
              <p>{t("A well-designed website is often the first impression your brand makes. It builds trust, enhances user experience, and drives conversions. Investing in professional web design ensures your message reaches the right audience effectively, helping your business grow and stand out in a crowded digital landscape.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
 </>
  );
};

export default ServiceDetails;
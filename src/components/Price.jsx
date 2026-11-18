import { useLocale } from '../i18n/useLocale';
import { useState } from "react"
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Image Imports
import overlayShape from '../assets/img/shape/Overlay-price-2.png';
import arrowIcon from '../assets/img/icon/double-arrow.png';

const Price = () => {
  const { t } = useLocale();

  const [isYearly, setIsYearly] = useState(false);

  const pricingData = {
    monthly: [
      { id: 1, title: 'STARTER PLAN', price: '599', period: '/month', features: ['Basic SEO Optimization', '1 Blog Post / Month', '2 Social Media Posts / Week'], inactiveFeatures: ['Monthly Performance Report', 'Email Support'], isMiddle: false },
      { id: 2, title: 'GROWTH PLAN', price: '899', period: '/month', features: ['Advanced SEO + Local SEO', '4 Blog Posts / Month', '3 Social Media Platforms', 'Bi-weekly Reports', 'Priority Email Support'], inactiveFeatures: [], isMiddle: true },
      { id: 3, title: 'ENTERPRISE PLAN', price: '1299', period: '/month', features: ['Full SEO Suite + Technical Fixes', 'Content Strategy & Copywriting', '5+ Social Media Channels', 'Dedicated Account Manager'], inactiveFeatures: ['Custom Strategy'], isMiddle: false },
    ],
    yearly: [
      { id: 4, title: 'STARTER PLAN', price: '1599', period: '/Yearly', features: ['Basic SEO Optimization', '1 Blog Post / Month', '2 Social Media Posts / Week', 'Monthly Performance Report', 'Email Support'], inactiveFeatures: [], isMiddle: false },
      { id: 5, title: 'GROWTH PLAN', price: '3599', period: '/Yearly', features: ['Advanced SEO + Local SEO', '4 Blog Posts / Month', '3 Social Media Platforms', 'Bi-weekly Reports', 'Priority Email Support'], inactiveFeatures: [], isMiddle: true },
      { id: 6, title: 'ENTERPRISE PLAN', price: '4599', period: '/Yearly', features: ['Full SEO Suite + Technical Fixes', 'Content Strategy & Copywriting', '5+ Social Media Channels', 'Dedicated Account Manager' ,'Custom Strategy'], inactiveFeatures: [], isMiddle: false },
    ]
  };

  const currentPlans = isYearly ? pricingData.yearly : pricingData.monthly;

  return (
    <section className="abprice__area pb-120 pt-120 ab-bg-dark p-relative content">
      <div className="container">
        {/* Section Title */}
        <div className="row align-items-start pb-48 justify-content-between">
          <div className="col-lg-8">
            <div className="ab-section-wrapper mb-60 text-center">
              <h2 className="ab-section-title text-start split-text up">{t("FLEXIBLE PLANS FOR ")}<br /> 
                <span className="ab-primary ab-section-title">{t("EVERY BUSINESS")}</span>
              </h2>
            </div>
          </div>
          <div className="col-lg-4">
            <p>{t("Scalable marketing solutions tailored to fit your goals, your budget, and your growth stage.")}</p>

            <div className="abprice__titleBtn mt-28 nav nav-pills" role="tablist">
              <button 
                className={`abprice__titleBtn-one ${!isYearly ? 'active' : ''}`} 
                onClick={() => setIsYearly(false)}
              >{t("MONTHLY")}</button>
              <button 
                className={`abprice__titleBtn-one ${isYearly ? 'active' : ''}`} 
                onClick={() => setIsYearly(true)}
              >{t("YEARLY ")}<span className="abprice__titleBtn-three ml-6">-20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="tab-content">
          <div className="tab-pane fade show active">
            <div className="row gy-4 gy-xxl-0">
              {currentPlans.map((plan , index) => (
                <div className="col-md-6 col-xl-4"   key={index}>
                  <div data-aos="fade-up" 
      data-aos-duration={600 + (index * 200)}>
                    <div className={`abprice ${plan.isMiddle ? 'abprice-midle' : ''} p-relative mb-lg-0`}>
                      
                      <div className="abprice__shape position-absolute top-0 left-0 z-2">
                        <img src={overlayShape} alt="" />
                      </div>

                      <div className="abprice__price">
                        <div className="d-flex align-items-center text-center justify-content-center">
                          <h3 className="abprice__title">${t(plan.price)}</h3> 
                          <span className="fs-16 fs-16-white f-w-400">{t(plan.period)}</span>
                        </div>
                        <h4 className="fs-18 fs-18-white ab-white text-center">{t(plan.title)}</h4>
                      </div>

                      <div className="abprice__futures">
                        <ul className="list-unstyled text-start">
                          {plan.features.map((feature, idx) => (
                            <li key={idx}>
                              <img src={arrowIcon} alt="" /> {t(feature)}
                            </li>
                          ))}
                          {plan.inactiveFeatures.map((feature, idx) => (
                            <li key={idx} className="opacity-25">
                              <img src={arrowIcon} alt="" /> {t(feature)}
                            </li>
                          ))}
                        </ul>

                        <div className="btn-wrapper mt-30 d-block">
                          <Link 
                            className={`${plan.isMiddle ? 'primary-btn-one' : 'abprice__btn'} d-flex align-items-center justify-content-center`} 
                            to="contact"
                          >{t("EXPLORE MORE")}<svg width="20" className="ml-6" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill={plan.isMiddle ? "black" : "white"} />
                              <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill={plan.isMiddle ? "black" : "white"} />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Price;
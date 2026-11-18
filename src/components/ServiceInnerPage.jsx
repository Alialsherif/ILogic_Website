import { useLocale } from '../i18n/useLocale';

import { LocalizedLink as Link } from '../i18n/LocalizedLink'; // Ensure react-router-dom is installed

// Image Imports
import overlayImg from '../assets/img/service/Overlay.png';
import serviceShape from '../assets/img/service/service-shape.png';
import { servicesData } from '../data/serviceData';
 

const ServiceInnerPage = ({Dclass=''}) => {
  const { t } = useLocale();



 
  return (
    <section 
      className="ab-service-are ab-service-are-two pt-120 pb-120 bg-fit mb-md-0 ab-bg bg-fit overflow-hidden content"
    
    >
      <div className="container">
        <div className={`ab-section-wrapper mb-60 text-center ${Dclass}`}>
          <h2 className="ab-section-title split-text up">{t("DIGITAL ")}<span className="ab-primary ab-section-title">{t("MARKETING")}</span>{t(" SOLUTIONS")}</h2>
        </div>

        <div className="ab-service">
       <div className="row gy-4 gy-xl-0">
  {servicesData.map((item) => (
    <div className="col-xl-4 col-md-6 fade-up" key={item.id}>
      <div 
        className="ab-service__item ab-service__item__two br-16 overflow-hidden position-relative" 
        data-aos="fade-up" 
        data-aos-duration={item.duration}
      >
        <div className="ab-service-shape-two">
          <div className="ab-service-shape-two-1 position-absolute">
            <img className="img-fluid w-100" src={overlayImg} alt="" />
          </div>
          <div className="ab-service-shape-two-1 position-absolute">
            <img src={serviceShape} alt="" />
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className={`ab-service-thumb-two ${item.isActive ? 'active' : ''}`}>
          <Link to="/serviceDetails">
            <img src={item.thumb} alt={t(item.title)} />
          </Link>
        </div>
        
        <div className={`ab-service-thumb-two ${item.isActive ? 'active' : ''}`}>
          <svg width="269" height="225" viewBox="0 0 269 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M268.797 -1.5V224.346L8.9917 153.856C2.86875 152.195 -0.751875 145.889 0.899902 139.764L38.9917 -1.5H268.797Z" stroke="#CCFF00" />
          </svg>
        </div>

        <div className="ab-service__content ab-service__content__two">
          <div className="ab-service-icon mb-35">
            {t(item.icon)}
          </div>
          <h3 className="fs-24 mb-10">
            <Link to="/serviceDetails" className="fs-24">{t(item.title)}</Link>
          </h3>
          <p>{t(item.description)}</p>
          <Link to="/serviceDetails" className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center mt-50">{t("MORE DETAILS")}<span className="primary-btn-two-icon ml-15">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill="#090808" />
                <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill="#090808" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceInnerPage;
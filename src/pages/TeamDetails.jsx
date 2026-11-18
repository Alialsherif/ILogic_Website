import SocialLinks from '../components/SocialLinks';
import { useLocale } from '../i18n/useLocale';

import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Image Imports
import teamMemberImg from '../assets/img/project/inner-page_img_01.png';
import doubleArrowIcon from '../assets/img/icon/double-arrow.png';
import Breadcrumb from '../components/Breadcrum';

const TeamDetails = () => {
  const { t } = useLocale();

  const skills = [
    "UX/UI Design Excellence",
    "Wireframing & Prototyping",
    "Brand Identity & Visual",
    "Mobile-First Design",
    "HTML, CSS, and JavaScript",
    "Conversion-Focused Layouts"
  ];

  const experience = [
    "8+ Years in Web Development",
    "Wireframing & Prototyping",
    "WordPress Development Expertise",
    "Certified in Adobe Creative Suite",
    "Google UX Design Professional",
    "Record of 150+ Successful Projects"
  ];

  return (
 <>
 <Breadcrumb title={t("Team Details")} />
    <section className="service-details-wrapper ab-bg pt-120 pb-120">
      <div className="container">
        <div className="service-details team-details">
          <div className="team-details-address">
            <div className="row">
              <div className="col-lg-4">
                <div className="sb-team-item sb-team-item-details">
                  <Link to="/portfolio-details" className="sb-team-item-thumb">
                    <img className="img-fluid w-img" src={teamMemberImg} alt={t("John Malik")} />
                  </Link>
                  <div className="sb-team-social d-inline-flex align-items-center">
                  <SocialLinks />
                </div>
                </div>
              </div>
              <div className="col-lg-8">
                <h2 className="ab-section-title mb-8 mt-50 mt-lg-0">{t("John Malik")}</h2>
                <h3 className="fs-24 fs-24-primary mb-16">{t("Web DESIGNER")}</h3>

                <p>{t("Our team of web design professionals combines creativity, technical expertise, and strategic thinking to craft websites that not only look stunning but also perform flawlessly. With years of experience in UX/UI design, responsive layouts, and user-centered development, we ensure every website is visually captivating, easy to navigate, and aligned with your brand identity.")}</p>
                <p>{t("From wireframing to final launch, our designers work collaboratively with developers and marketers to deliver results-driven solutions. Certified in leading design tools and platforms, we pride ourselves on turning ideas into powerful digital experiences that engage audiences and drive measurable growth for your business.")}</p>

                <div className="team-details-contactAddress mt-40">
                  <div className="row">
                    {/* Email Block */}
                    <div className="col-md-6">
                      <div className="d-flex pb-16 pt-16 team-details-contactAddress-item">
                        <div className="team-details-contactAddress-icon">
                          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.834 4.08337H8.16732C4.66732 4.08337 2.33398 5.83337 2.33398 9.91671V18.0834C2.33398 22.1667 4.66732 23.9167 8.16732 23.9167H19.834C23.334 23.9167 25.6673 22.1667 25.6673 18.0834V9.91671C25.6673 5.83337 23.334 4.08337 19.834 4.08337ZM20.3823 11.1884L16.7307 14.105C15.9607 14.7234 14.9807 15.0267 14.0007 15.0267C13.0207 15.0267 12.029 14.7234 11.2707 14.105L7.61898 11.1884C7.24565 10.885 7.18732 10.325 7.47898 9.95171C7.78232 9.57837 8.33065 9.50837 8.70398 9.81171L12.3557 12.7284C13.2423 13.44 14.7473 13.44 15.634 12.7284L19.2857 9.81171C19.659 9.50837 20.219 9.56671 20.5107 9.95171C20.814 10.325 20.7557 10.885 20.3823 11.1884Z" fill="#090808" />
                          </svg>
                        </div>
                        <div className="ml-16">
                          <h4 className="fs-16 fs-16-white kanit">{t("Email Address")}</h4>
                          <p>{t("needhelp@yourdomain.com")}</p>
                        </div>
                      </div>
                    </div>
                    {/* Phone Block */}
                    <div className="col-md-6">
                      <div className="d-flex pb-16 pt-16">
                        <div className="team-details-contactAddress-icon">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7327 19.9333L12.266 22.4C11.746 22.92 10.9193 22.92 10.386 22.4133C10.2393 22.2666 10.0927 22.1333 9.94602 21.9866C8.57268 20.6 7.33268 19.1466 6.22602 17.6266C5.13268 16.1066 4.25268 14.5866 3.61268 13.08C2.98602 11.56 2.66602 10.1066 2.66602 8.71996C2.66602 7.81329 2.82602 6.94663 3.14602 6.14663C3.46602 5.33329 3.97268 4.58663 4.67935 3.91996C5.53268 3.07996 6.46602 2.66663 7.45268 2.66663C7.82602 2.66663 8.19935 2.74663 8.53268 2.90663C8.87935 3.06663 9.18602 3.30663 9.42602 3.65329L12.5193 8.01329C12.7593 8.34663 12.9327 8.65329 13.0527 8.94663C13.1727 9.22663 13.2393 9.50663 13.2393 9.75996C13.2393 10.08 13.146 10.4 12.9593 10.7066C12.786 11.0133 12.5327 11.3333 12.2127 11.6533L11.1993 12.7066C11.0527 12.8533 10.986 13.0266 10.986 13.24C10.986 13.3466 10.9993 13.44 11.026 13.5466C11.066 13.6533 11.106 13.7333 11.1327 13.8133C11.3727 14.2533 11.786 14.8266 12.3727 15.52C12.9727 16.2133 13.6127 16.92 14.306 17.6266C14.4393 17.76 14.586 17.8933 14.7193 18.0266C15.2527 18.5466 15.266 19.4 14.7327 19.9333Z" fill="#090808" />
                            <path d="M29.2941 24.44C29.2941 24.8133 29.2274 25.2 29.0941 25.5733C29.0541 25.68 29.0141 25.7866 28.9608 25.8933C28.7341 26.3733 28.4408 26.8266 28.0541 27.2533C27.4008 27.9733 26.6808 28.4933 25.8674 28.8266C25.8541 28.8266 25.8408 28.84 25.8274 28.84C25.0408 29.16 24.1874 29.3333 23.2674 29.3333C21.9074 29.3333 20.4541 29.0133 18.9208 28.36C17.3874 27.7066 15.8541 26.8266 14.3341 25.72C13.8141 25.3333 13.2941 24.9466 12.8008 24.5333L17.1608 20.1733C17.5341 20.4533 17.8674 20.6666 18.1474 20.8133C18.2141 20.84 18.2941 20.88 18.3874 20.92C18.4941 20.96 18.6008 20.9733 18.7208 20.9733C18.9474 20.9733 19.1208 20.8933 19.2674 20.7466L20.2808 19.7466C20.6141 19.4133 20.9341 19.16 21.2408 19C21.5474 18.8133 21.8541 18.72 22.1874 18.72C22.4408 18.72 22.7074 18.7733 23.0008 18.8933C23.2941 19.0133 23.6008 19.1866 23.9341 19.4133L28.3474 22.5466C28.6941 22.7866 28.9341 23.0666 29.0808 23.4C29.2141 23.7333 29.2941 24.0666 29.2941 24.44Z" fill="#090808" />
                          </svg>
                        </div>
                        <div className="ml-16">
                          <h5 className="fs-16 fs-16-white kanit">{t("Phone Number")}</h5>
                          <p dir="ltr">+123 456 7890</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="service-details-content team-details-content mt-32">
            <div className="row">
              <div className="col-6">
                <h4 className="fs-24 mb-24">{t("Key Skills:")}</h4>
              </div>
              <div className="col-6">
                <h5 className="fs-24 mb-24">{t("Experience & Certifications:")}</h5>
              </div>
            </div>

            <div className="row gy-4 gy-lg-0">
              {/* Skills Column 1 */}
              <div className="col-md-3">
                {skills.slice(0, 3).map((skill, index) => (
                  <div key={index} className="d-inline-flex mb-16">
                    <img src={doubleArrowIcon} alt="" />
                    <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(skill)}</p>
                  </div>
                ))}
              </div>
              {/* Skills Column 2 */}
              <div className="col-md-3">
                {skills.slice(3, 6).map((skill, index) => (
                  <div key={index} className="d-inline-flex mb-16">
                    <div><img src={doubleArrowIcon} alt="" /></div>
                    <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(skill)}</p>
                  </div>
                ))}
              </div>
              {/* Experience Column 1 */}
              <div className="col-md-3">
                {experience.slice(0, 3).map((exp, index) => (
                  <div key={index} className="d-inline-flex mb-16">
                    <div><img src={doubleArrowIcon} alt="" /></div>
                    <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(exp)}</p>
                  </div>
                ))}
              </div>
              {/* Experience Column 2 */}
              <div className="col-md-3">
                {experience.slice(3, 6).map((exp, index) => (
                  <div key={index} className="d-inline-flex mb-16">
                    <div><img src={doubleArrowIcon} alt="" /></div>
                    <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(exp)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 </>
  );
};

export default TeamDetails;

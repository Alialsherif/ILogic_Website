import { useLocale } from '../i18n/useLocale';
import React from 'react';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Image Imports
import portfolioDetailsThumb from '../assets/img/project/portfolio-details-thumb.png';
import doubleArrow from '../assets/img/icon/double-arrow.png';
import portfolioDetails1 from '../assets/img/project/portfolio-details_1_1.png';
import portfolioDetails2 from '../assets/img/project/portfolio-details_1_2.png';
import Breadcrumb from '../components/Breadcrum';

const ProjectDetails = () => {
  const { t } = useLocale();

  return (
    <>
    <Breadcrumb title={t("Portfolio Details ")} />
    <section className="service-details-wrapper ab-bg pt-120 pb-120">
      <div className="container">
        <div className="service-details portfolio-details">
          {/* Main Thumbnail */}
          <div className="row mb-32">
            <div className="col-12">
            <div className="reveal">
                <img 
                className="img-fluid br-24" 
                src={portfolioDetailsThumb} 
                alt={t("portfolio")} 
              />
            </div>
            </div>
          </div>

          <div className="team-details-address">
            <div className="row">
              <div className="col-lg-8">
                <h3 className="fs-24 fs-24-primary mb-16">{t("Website design")}</h3>
                <h2 className="ab-section-title mb-24">{t("Personal Branding & Portfolio Website")}</h2>
                <h3 className="fs-32 fs-32-white mb-8">{t("Overview:")}</h3>
                <p>{t("Our agency partnered with a creative professional to design a modern, visually engaging personal portfolio website that reflects their unique brand identity and expertise. The goal was to create an online space that not only showcases their work but also communicates their personality, skills, and values.")}</p>

                {/* Goals Section */}
                <div className="portfolio-details-goals mt-32">
                  <h3 className="fs-32 fs-32-white mb-16">{t("Goals :")}</h3>
                  <div className="row">
                    {[
                      "Establish a distinctive personal brand look and feel.",
                      "Build a portfolio that is easy to navigate and mobile-friendly.",
                      "Encourage potential clients to connect through clear CTAs.",
                      "Ensure SEO optimization for better visibility."
                    ].map((goal, index) => (
                      <div key={index} className="d-inline-flex mb-16">
                        <div>
                          <img src={doubleArrow} alt="" />
                        </div>
                        <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(goal)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Section */}
                <div className="portfolio-details-process mt-32">
                  <h3 className="fs-32 fs-32-white mb-8">{t("Process :")}</h3>
                  <p>{t("Our agency partnered with a creative professional to design a modern, visually engaging personal portfolio website that reflects their unique brand identity and expertise. The goal was to create an online space that not only showcases their work but also communicates their personality, skills, and values.")}</p>
                </div>
              </div>

              {/* Sidebar / Project Info */}
              <div className="col-lg-4">
                <div className="portfolio-details-menu mb-32 mt-32 mt-lg-0">
                  <h2 className="fs-32 fs-32-white mb-12">{t("Project Info")}</h2>
                  
                  <Link to="#!" className="d-flex justify-content-between portfolio-details-menu-item">
                    <span className="fs-16 fs-16-white uppercase">{t("Clients:")}</span>
                    <span>{t("Tushar Raja")}</span>
                  </Link>
                  
                  <Link to="#!" className="d-flex justify-content-between portfolio-details-menu-item">
                    <span className="fs-16 fs-16-white uppercase">{t("Services:")}</span>
                    <span>{t("Website Design")}</span>
                  </Link>
                  
                  <Link to="#!" className="d-flex justify-content-between portfolio-details-menu-item">
                    <span className="fs-16 fs-16-white uppercase">{t("Date:")}</span>
                    <span>{t("August 12, 2025")}</span>
                  </Link>
                  
                  <Link to="#!" className="d-flex justify-content-between portfolio-details-menu-item">
                    <span className="fs-16 fs-16-white uppercase">{t("Category:")}</span>
                    <span>{t("Digital Agency")}</span>
                  </Link>
                  
                  <Link to="#!" className="d-flex justify-content-between portfolio-details-menu-item">
                    <span className="fs-16 fs-16-white uppercase">{t("Budget:")}</span>
                    <span>$900.99</span>
                  </Link>
                </div>

                {/* Help / Contact Section */}
                <div className="portfolio-details-menu">
                  <h2 className="fs-32 fs-32-white mb-12">{t("Need Your Help?")}</h2>
                  <div className="row">
                    <div className="col-4 col-md-6">
                      <span className="fs-16 fs-16-white uppercase mb-18 d-block">{t("Mobile")}</span>
                      <span className="fs-16 fs-16-white uppercase mb-18 d-block">{t("Email")}</span>
                      <span className="fs-16 fs-16-white uppercase mb-18 d-block">{t("Location")}</span>
                    </div>
                    <div className="col-8 col-md-6">
                      <span className="mb-18 d-block">: + (324) 790 - 4378</span>
                      <span className="mb-18 d-block">{t(": quuentex@gmail.com")}</span>
                      <span className="mb-18 d-block">{t(": Banff 325 Road, USA")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Gallery Images */}
          <div className="row gy-4 gy-lg-0 mt-32">
            <div className="col-md-6">
             <div className="reveal">
               <img className="img-fluid" src={portfolioDetails1} alt={t("Project detail 1")} />
             </div>
            </div>
            <div className="col-md-6">
              <div className="reveal right">
                <img className="img-fluid" src={portfolioDetails2} alt={t("Project detail 2")} />
              </div>
            </div>
          </div>

          {/* Deliverables and Results */}
          <div className="service-details-conten mt-32">
            <div className="row gy-4 gy-lg-0">
              <div className="col-md-6">
                <h3 className="fs-24 mb-24">{t(" Deliverables:")}</h3>
                {[
                  "Complete personal branding package (logo, colors, typography).",
                  "Fully responsive portfolio website with smooth animations.",
                  "SEO-optimized structure and fast-loading pages.",
                  "Integrated contact forms and social media links."
                ].map((item, i) => (
                  <div key={i} className="d-inline-flex mb-16">
                    <div>
                      <img src={doubleArrow} alt="" />
                    </div>
                    <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(item)}</p>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <h3 className="fs-24 mb-24">{t("Results:")}</h3>
                {[
                  "45% increase in client inquiries within the first month.",
                  "60% improvement in average session duration due to engaging UX.",
                  "Strengthened personal brand presence, leading to high-value collaborations.",
                  "Implementing responsive layouts and performing usability tests."
                ].map((item, i) => (
                  <div key={i} className="d-inline-flex mb-16">
                    <div>
                      <img src={doubleArrow} alt="" />
                    </div>
                    <p className="fs-16 ml-8 fs-16-white kanit f-w-400">{t(item)}</p>
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

export default ProjectDetails;
import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Import images at the top
import shape1 from "../assets/img/shape/showcase-1.1.png";
import shape2 from "../assets/img/shape/showcase-1.2.png";
import shape3 from "../assets/img/shape/showcase-1.3.png";
import showcaseImg1 from "../assets/img/showcase/Image1.1.png";
import SectionTitle from "./SectionTitle";

const Project = () => {
  const { t } = useLocale();

  return (
    <section className="ab-bg-dark pt-120 pb-120 position-relative overflow-hidden">
      <div className="ab-showcase-shape overflow-hidden">
        <div className="ab-showcase-shape-1 position-absolute">
          <img src={shape1} alt="" />
        </div>
        <div className="ab-showcase-shape-2 position-absolute">
          <img src={shape2} alt="" />
        </div>
        <div className="ab-showcase-shape-3 position-absolute">
          <img src={shape3} alt="" />
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center mb-60">
          <div className="col-lg-8 col-md-12">
            <div className="ab-section-wrapper">
            
               <SectionTitle title={t("    OUR CREATIVE")} titleTextTwo={t("SHOWCASE")}   subtitle={
                  <span  className="ab-section-subtitle-three">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M18 5.641L16.6032 3.359L9.12492 8.80273L10.4025 0H7.59748L8.88076 8.80273L1.40252 3.359L0 5.641L8.76151 9L0 12.359L1.40252 14.641L8.88076 9.19728L7.59748 18H10.4025L9.12492 9.19728L16.6032 14.641L18 12.359L9.24416 9L18 5.641Z"
                        fill="#CCFF00"
                      />
                    </svg>{t("FEATURED PROJECTS")}</span>
                } />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="btn-wrapper d-flex mt-15 mt-lg-0 justify-content-lg-end">
              <Link className="primary-btn-one" to="/projectPage">{t("VIEW ALL PROJECT")}<svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                    fill="#090808"
                  />
                  <path
                    d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                    fill="#090808"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="ab-showcase d-flex flex-wrap justify-content-between">
          <div className="ab-showcase-item position-relative align-items-center">
            <div className="ab-showcase-box d-flex align-items-center justify-content-between">
              <div>
                <h2 className="ab-showcase-subtitle">{t("FlowMate")}</h2>
                <h2>
                  <Link to="ProjectDetails" className="fs-24">{t("Mobile App Interface Design")}</Link>
                </h2>
              </div>
              <div className="ab-showcase-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                    fill="#090808"
                  />
                  <path
                    d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                    fill="#090808"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="ab-showcase-item active position-relative d-inline-block align-items-center">
            <div className="ab-showcase-card mb-30 mb-lg-0 mt-20 mt-lg-0">
              <div className="ab-showcase-thumb position-relative">
                <Link to="ProjectDetails" className="d-block w-100 img">
                  <img
                    src={showcaseImg1}
                    alt=""
                    className="img-fluid w-100"
                  />
                </Link>
              </div>
              <div className="ab-showcase-content flex-wrap flex-xl-nowrap mt-27 d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="ab-showcase-subtitle">{t("FlowMate")}</h2>
                  <h3 className="fs-24">{t("Mobile App Interface Design")}</h3>
                </div>
                <Link
                  to="ProjectDetails"
                  className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center mt-15 mt-lg-0"
                >{t("VIEW PROJECT")}<span className="primary-btn-two-icon-two ml-15">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                        fill="#090808"
                      />
                      <path
                        d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                        fill="#090808"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="ab-showcase-item position-relative align-items-center">
            <div className="ab-showcase-box ab-showcase-box-two d-flex align-items-center justify-content-between">
              <div>
                <span className="ab-showcase-subtitle">{t("FlowMate")}</span>
                <h2>
                  <Link to="ProjectDetails" className="fs-24">{t("Mobile App Interface Design")}</Link>
                </h2>
              </div>
              <div className="ab-showcase-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                    fill="#090808"
                  />
                  <path
                    d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                    fill="#090808"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;

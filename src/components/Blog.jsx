import { useLocale } from '../i18n/useLocale';

import blogImage1 from '../assets/img/blog/Images-1.1.png';
import blogImage2 from '../assets/img/blog/Images-1.2.png';
import blogImage3 from '../assets/img/blog/Images-1.3.png';
import calendarIcon from '../assets/img/shape/calendar-two.png';
import bgBlog from '../assets/img/shape/BG-blog-1.1.png';
import SectionTitle from './SectionTitle';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

const Blog = () => {
  const { t } = useLocale();

  return (
    <section 
      className="ab-bg-dark ab-blog-area pt-120 bg-fit pb-120" 
      style={{ backgroundImage: `url(${bgBlog})` }}
      data-bg-src="assets/img/shape/BG-blog-1.1.png"
    >
      <div className="container">
        <div className="row align-items-center mb-60">
          <div className="col-lg-8">
            <div className="ab-section-wrapper">
              <SectionTitle   title={t("  LATEST NEWS & ")} titleTextTwo={t("ARTICLES")}    subtitle={
                  <span  className="ab-section-subtitle-three">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M18 5.641L16.6032 3.359L9.12492 8.80273L10.4025 0H7.59748L8.88076 8.80273L1.40252 3.359L0 5.641L8.76151 9L0 12.359L1.40252 14.641L8.88076 9.19728L7.59748 18H10.4025L9.12492 9.19728L16.6032 14.641L18 12.359L9.24416 9L18 5.641Z"
                        fill="#CCFF00"
                      />
                    </svg>{t("OUR BLOG")}</span>
                } />
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="btn-wrapper d-flex mt-15 mt-lg-0 justify-content-lg-end">
              <Link className="primary-btn-one" to="blogPage">{t("VIEW ALL ARTICLES")}<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <div className="ab-blog">
          <div className="row gy-4 gy-xl-0">
            <div className="col-xl-7 col-lg-8">
              <div className="row gy-4 gy-lg-0">
                <div className="col-lg-6 col-md-6">
                  <div 
                    className="ab-blog-item position-relative br-16 overflow-hidden  "
                  data-aos="fade-up" data-aos-delay="400"
                  >
                    <div className="ab-blog-thumb position-relative">
                      <img className="img-fluid" src={blogImage1} alt={t("Blog post 1")} />
                      <div className="ab-blog-calender-one d-flex align-items-center justify-content-between gap-2">
                        <img className="img-fluid" src={calendarIcon} alt={t("Calendar")} />
                        <span className="mb-0">{t("08 August, 2025")}</span>
                      </div>
                    </div>

                    <div className="ab-blog-content-body">
                      <div className="date_blog d-flex justify-content-between align-items-center w-100 mb-15">
                        <div className="d-flex align-items-center gap-2">
                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.5 9C16.5 4.8675 13.1325 1.5 9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 11.175 2.4375 13.1325 3.9225 14.505C3.9225 14.5125 3.9225 14.5125 3.915 14.52C3.99 14.595 4.08 14.655 4.155 14.7225C4.2 14.76 4.2375 14.7975 4.2825 14.8275C4.4175 14.94 4.5675 15.045 4.71 15.15C4.7625 15.1875 4.8075 15.2175 4.86 15.255C5.0025 15.3525 5.1525 15.4425 5.31 15.525C5.3625 15.555 5.4225 15.5925 5.475 15.6225C5.625 15.705 5.7825 15.78 5.9475 15.8475C6.0075 15.8775 6.0675 15.9075 6.1275 15.93C6.2925 15.9975 6.4575 16.0575 6.6225 16.11C6.6825 16.1325 6.7425 16.155 6.8025 16.17C6.9825 16.2225 7.1625 16.2675 7.3425 16.3125C7.395 16.3275 7.4475 16.3425 7.5075 16.35C7.7175 16.395 7.9275 16.425 8.145 16.4475C8.175 16.4475 8.205 16.455 8.235 16.4625C8.49 16.485 8.745 16.5 9 16.5C9.255 16.5 9.51 16.485 9.7575 16.4625C9.7875 16.4625 9.8175 16.455 9.8475 16.4475C10.065 16.425 10.275 16.395 10.485 16.35C10.5375 16.3425 10.59 16.32 10.65 16.3125C10.83 16.2675 11.0175 16.23 11.19 16.17C11.25 16.1475 11.31 16.125 11.37 16.11C11.535 16.05 11.7075 15.9975 11.865 15.93C11.925 15.9075 11.985 15.8775 12.045 15.8475C12.2025 15.78 12.36 15.705 12.5175 15.6225C12.5775 15.5925 12.63 15.555 12.6825 15.525C12.8325 15.435 12.9825 15.3525 13.1325 15.255C13.185 15.225 13.23 15.1875 13.2825 15.15C13.4325 15.045 13.575 14.94 13.71 14.8275C13.755 14.79 13.7925 14.7525 13.8375 14.7225C13.92 14.655 14.0025 14.5875 14.0775 14.52C14.0775 14.5125 14.0775 14.5125 14.07 14.505C15.5625 13.1325 16.5 11.175 16.5 9ZM12.705 12.7275C10.6725 11.3625 7.3425 11.3625 5.295 12.7275C4.965 12.945 4.695 13.2 4.47 13.4775C3.33 12.3225 2.625 10.74 2.625 9C2.625 5.4825 5.4825 2.625 9 2.625C12.5175 2.625 15.375 5.4825 15.375 9C15.375 10.74 14.67 12.3225 13.53 13.4775C13.3125 13.2 13.035 12.945 12.705 12.7275Z"
                                                            fill="#BCBCBC" />
                                                        <path
                                                            d="M9 5.19727C7.4475 5.19727 6.1875 6.45727 6.1875 8.00977C6.1875 9.53227 7.38 10.7698 8.9625 10.8148C8.985 10.8148 9.015 10.8148 9.03 10.8148C9.045 10.8148 9.0675 10.8148 9.0825 10.8148C9.09 10.8148 9.0975 10.8148 9.0975 10.8148C10.6125 10.7623 11.805 9.53227 11.8125 8.00977C11.8125 6.45727 10.5525 5.19727 9 5.19727Z"
                                                            fill="#BCBCBC" />
                                                    </svg>
                          <span className="mb-0">{t("By TusHar")}</span>
                        </div>
                        <div><span className="fs-16">*</span></div>
                        <div className="d-flex align-items-center gap-2">
                           <svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11.25 0H3.75C1.5 0 0 1.125 0 3.75V9C0 11.625 1.5 12.75 3.75 12.75H11.25C13.5 12.75 15 11.625 15 9V3.75C15 1.125 13.5 0 11.25 0ZM11.6025 4.5675L9.255 6.4425C8.76 6.84 8.13 7.035 7.5 7.035C6.87 7.035 6.2325 6.84 5.745 6.4425L3.3975 4.5675C3.1575 4.3725 3.12 4.0125 3.3075 3.7725C3.5025 3.5325 3.855 3.4875 4.095 3.6825L6.4425 5.5575C7.0125 6.015 7.98 6.015 8.55 5.5575L10.8975 3.6825C11.1375 3.4875 11.4975 3.525 11.685 3.7725C11.88 4.0125 11.8425 4.3725 11.6025 4.5675Z"
                                                            fill="#BCBCBC" />
                                                    </svg>
                          <span>{t("Comments (04)")}</span>
                        </div>
                      </div>
                      <h2 className="mb-10">
                        <Link  to="blogDetails" className="fs-24">{t("HOW GREAT DESIGN DRIVES BUSINESS GROTH")}</Link>
                      </h2>
                      <Link
                        to="blogDetails"
                        className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center mt-15 mt-lg-0"
                      >{t("VIEW PROJECT")}<span className="primary-btn-two-icon-two ml-15">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                                                            fill="#090808" />
                                                        <path
                                                            d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                                                            fill="#090808" />
                                                    </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Second blog item - similar structure */}
                <div className="col-lg-6 col-md-6">
                  <div 
                    className="ab-blog-item position-relative br-16 overflow-hidden  "
                  data-aos="fade-up" data-aos-delay="700"
                  >
                    <div className="ab-blog-thumb position-relative">
                      <img className="img-fluid w-100" src={blogImage2} alt={t("Blog post 2")} />
                      <div className="ab-blog-calender-one d-flex align-items-center justify-content-between gap-2">
                        <img className="img-fluid" src={calendarIcon} alt={t("Calendar")} />
                        <span className="mb-0">{t("08 August, 2025")}</span>
                      </div>
                    </div>
                       <div className="ab-blog-content-body">
                      <div className="date_blog d-flex justify-content-between align-items-center w-100 mb-15">
                        <div className="d-flex align-items-center gap-2">
                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.5 9C16.5 4.8675 13.1325 1.5 9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 11.175 2.4375 13.1325 3.9225 14.505C3.9225 14.5125 3.9225 14.5125 3.915 14.52C3.99 14.595 4.08 14.655 4.155 14.7225C4.2 14.76 4.2375 14.7975 4.2825 14.8275C4.4175 14.94 4.5675 15.045 4.71 15.15C4.7625 15.1875 4.8075 15.2175 4.86 15.255C5.0025 15.3525 5.1525 15.4425 5.31 15.525C5.3625 15.555 5.4225 15.5925 5.475 15.6225C5.625 15.705 5.7825 15.78 5.9475 15.8475C6.0075 15.8775 6.0675 15.9075 6.1275 15.93C6.2925 15.9975 6.4575 16.0575 6.6225 16.11C6.6825 16.1325 6.7425 16.155 6.8025 16.17C6.9825 16.2225 7.1625 16.2675 7.3425 16.3125C7.395 16.3275 7.4475 16.3425 7.5075 16.35C7.7175 16.395 7.9275 16.425 8.145 16.4475C8.175 16.4475 8.205 16.455 8.235 16.4625C8.49 16.485 8.745 16.5 9 16.5C9.255 16.5 9.51 16.485 9.7575 16.4625C9.7875 16.4625 9.8175 16.455 9.8475 16.4475C10.065 16.425 10.275 16.395 10.485 16.35C10.5375 16.3425 10.59 16.32 10.65 16.3125C10.83 16.2675 11.0175 16.23 11.19 16.17C11.25 16.1475 11.31 16.125 11.37 16.11C11.535 16.05 11.7075 15.9975 11.865 15.93C11.925 15.9075 11.985 15.8775 12.045 15.8475C12.2025 15.78 12.36 15.705 12.5175 15.6225C12.5775 15.5925 12.63 15.555 12.6825 15.525C12.8325 15.435 12.9825 15.3525 13.1325 15.255C13.185 15.225 13.23 15.1875 13.2825 15.15C13.4325 15.045 13.575 14.94 13.71 14.8275C13.755 14.79 13.7925 14.7525 13.8375 14.7225C13.92 14.655 14.0025 14.5875 14.0775 14.52C14.0775 14.5125 14.0775 14.5125 14.07 14.505C15.5625 13.1325 16.5 11.175 16.5 9ZM12.705 12.7275C10.6725 11.3625 7.3425 11.3625 5.295 12.7275C4.965 12.945 4.695 13.2 4.47 13.4775C3.33 12.3225 2.625 10.74 2.625 9C2.625 5.4825 5.4825 2.625 9 2.625C12.5175 2.625 15.375 5.4825 15.375 9C15.375 10.74 14.67 12.3225 13.53 13.4775C13.3125 13.2 13.035 12.945 12.705 12.7275Z"
                                                            fill="#BCBCBC" />
                                                        <path
                                                            d="M9 5.19727C7.4475 5.19727 6.1875 6.45727 6.1875 8.00977C6.1875 9.53227 7.38 10.7698 8.9625 10.8148C8.985 10.8148 9.015 10.8148 9.03 10.8148C9.045 10.8148 9.0675 10.8148 9.0825 10.8148C9.09 10.8148 9.0975 10.8148 9.0975 10.8148C10.6125 10.7623 11.805 9.53227 11.8125 8.00977C11.8125 6.45727 10.5525 5.19727 9 5.19727Z"
                                                            fill="#BCBCBC" />
                                                    </svg>
                          <span className="mb-0">{t("By TusHar")}</span>
                        </div>
                        <div><span className="fs-16">*</span></div>
                        <div className="d-flex align-items-center gap-2">
                           <svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11.25 0H3.75C1.5 0 0 1.125 0 3.75V9C0 11.625 1.5 12.75 3.75 12.75H11.25C13.5 12.75 15 11.625 15 9V3.75C15 1.125 13.5 0 11.25 0ZM11.6025 4.5675L9.255 6.4425C8.76 6.84 8.13 7.035 7.5 7.035C6.87 7.035 6.2325 6.84 5.745 6.4425L3.3975 4.5675C3.1575 4.3725 3.12 4.0125 3.3075 3.7725C3.5025 3.5325 3.855 3.4875 4.095 3.6825L6.4425 5.5575C7.0125 6.015 7.98 6.015 8.55 5.5575L10.8975 3.6825C11.1375 3.4875 11.4975 3.525 11.685 3.7725C11.88 4.0125 11.8425 4.3725 11.6025 4.5675Z"
                                                            fill="#BCBCBC" />
                                                    </svg>
                          <span>{t("Comments (04)")}</span>
                        </div>
                      </div>
                      <h2 className="mb-10">
                        <Link  to="blogDetails" className="fs-24">{t("HOW GREAT DESIGN DRIVES BUSINESS GROTH")}</Link>
                      </h2>
                       <Link
                        to="blogDetails"
                        className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center mt-15 mt-lg-0"
                      >{t("VIEW PROJECT")}<span className="primary-btn-two-icon-two ml-15">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                                                            fill="#090808" />
                                                        <path
                                                            d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                                                            fill="#090808" />
                                                    </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-6">
              <div 
                className="ab-blog-item position-relative br-16 overflow-hidden"
                data-aos="fade-up" data-aos-delay="900"
              >
                <div className="ab-blog-thumb position-relative">
                  <img className="img-fluid" src={blogImage3} alt={t("Blog post 3")} />
                  <div className="ab-blog-calender-one d-flex align-items-center justify-content-between gap-2">
                    <img className="img-fluid" src={calendarIcon} alt={t("Calendar")} />
                    <span className="mb-0">{t("08 August, 2025")}</span>
                  </div>
                </div>
                     <div className="ab-blog-content-body">
                      <div className="date_blog d-flex justify-content-between align-items-center w-100 mb-15">
                        <div className="d-flex align-items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.5 9C16.5 4.8675 13.1325 1.5 9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 11.175 2.4375 13.1325 3.9225 14.505C3.9225 14.5125 3.9225 14.5125 3.915 14.52C3.99 14.595 4.08 14.655 4.155 14.7225C4.2 14.76 4.2375 14.7975 4.2825 14.8275C4.4175 14.94 4.5675 15.045 4.71 15.15C4.7625 15.1875 4.8075 15.2175 4.86 15.255C5.0025 15.3525 5.1525 15.4425 5.31 15.525C5.3625 15.555 5.4225 15.5925 5.475 15.6225C5.625 15.705 5.7825 15.78 5.9475 15.8475C6.0075 15.8775 6.0675 15.9075 6.1275 15.93C6.2925 15.9975 6.4575 16.0575 6.6225 16.11C6.6825 16.1325 6.7425 16.155 6.8025 16.17C6.9825 16.2225 7.1625 16.2675 7.3425 16.3125C7.395 16.3275 7.4475 16.3425 7.5075 16.35C7.7175 16.395 7.9275 16.425 8.145 16.4475C8.175 16.4475 8.205 16.455 8.235 16.4625C8.49 16.485 8.745 16.5 9 16.5C9.255 16.5 9.51 16.485 9.7575 16.4625C9.7875 16.4625 9.8175 16.455 9.8475 16.4475C10.065 16.425 10.275 16.395 10.485 16.35C10.5375 16.3425 10.59 16.32 10.65 16.3125C10.83 16.2675 11.0175 16.23 11.19 16.17C11.25 16.1475 11.31 16.125 11.37 16.11C11.535 16.05 11.7075 15.9975 11.865 15.93C11.925 15.9075 11.985 15.8775 12.045 15.8475C12.2025 15.78 12.36 15.705 12.5175 15.6225C12.5775 15.5925 12.63 15.555 12.6825 15.525C12.8325 15.435 12.9825 15.3525 13.1325 15.255C13.185 15.225 13.23 15.1875 13.2825 15.15C13.4325 15.045 13.575 14.94 13.71 14.8275C13.755 14.79 13.7925 14.7525 13.8375 14.7225C13.92 14.655 14.0025 14.5875 14.0775 14.52C14.0775 14.5125 14.0775 14.5125 14.07 14.505C15.5625 13.1325 16.5 11.175 16.5 9ZM12.705 12.7275C10.6725 11.3625 7.3425 11.3625 5.295 12.7275C4.965 12.945 4.695 13.2 4.47 13.4775C3.33 12.3225 2.625 10.74 2.625 9C2.625 5.4825 5.4825 2.625 9 2.625C12.5175 2.625 15.375 5.4825 15.375 9C15.375 10.74 14.67 12.3225 13.53 13.4775C13.3125 13.2 13.035 12.945 12.705 12.7275Z"
                                                            fill="#BCBCBC" />
                                                        <path
                                                            d="M9 5.19727C7.4475 5.19727 6.1875 6.45727 6.1875 8.00977C6.1875 9.53227 7.38 10.7698 8.9625 10.8148C8.985 10.8148 9.015 10.8148 9.03 10.8148C9.045 10.8148 9.0675 10.8148 9.0825 10.8148C9.09 10.8148 9.0975 10.8148 9.0975 10.8148C10.6125 10.7623 11.805 9.53227 11.8125 8.00977C11.8125 6.45727 10.5525 5.19727 9 5.19727Z"
                                                            fill="#BCBCBC" />
                                                    </svg>
                          <span className="mb-0">{t("By TusHar")}</span>
                        </div>
                        <div><span className="fs-16">*</span></div>
                        <div className="d-flex align-items-center gap-2">
                           <svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11.25 0H3.75C1.5 0 0 1.125 0 3.75V9C0 11.625 1.5 12.75 3.75 12.75H11.25C13.5 12.75 15 11.625 15 9V3.75C15 1.125 13.5 0 11.25 0ZM11.6025 4.5675L9.255 6.4425C8.76 6.84 8.13 7.035 7.5 7.035C6.87 7.035 6.2325 6.84 5.745 6.4425L3.3975 4.5675C3.1575 4.3725 3.12 4.0125 3.3075 3.7725C3.5025 3.5325 3.855 3.4875 4.095 3.6825L6.4425 5.5575C7.0125 6.015 7.98 6.015 8.55 5.5575L10.8975 3.6825C11.1375 3.4875 11.4975 3.525 11.685 3.7725C11.88 4.0125 11.8425 4.3725 11.6025 4.5675Z"
                                                            fill="#BCBCBC" />
                                                    </svg>
                          <span>{t("Comments (04)")}</span>
                        </div>
                      </div>
                      <h2 className="mb-10">
                        <Link to="blogDetails" className="fs-24">{t("FROM SKETCH TO SCREEN OUR CREATIVE PROCESS EXPLAINED")}</Link>
                      </h2>
                       <Link
                        to="blogDetails"
                        className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center mt-15 mt-lg-0"
                      >{t("VIEW PROJECT")}<span className="primary-btn-two-icon-two ml-15">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                                                            fill="#090808" />
                                                        <path
                                                            d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                                                            fill="#090808" />
                                                    </svg>
                        </span>
                      </Link>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
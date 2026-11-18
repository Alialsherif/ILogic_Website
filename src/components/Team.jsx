import { useLocale } from '../i18n/useLocale';
import  { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Shapes
import shape1 from "../assets/img/shape/team-1.1_Shape.png";
import shape2 from "../assets/img/shape/team-1.2_Shape.png";
import shape3 from "../assets/img/shape/team-1.3_Shape.png";

// Team images
import teamImg1 from "../assets/img/teammember/Image_01.png";
import teamImg2 from "../assets/img/teammember/Image_3.png";
import teamImg3 from "../assets/img/teammember/Image_03.png";
import SectionTitle from "./SectionTitle";
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
 

const teamMembers = [
  {
    mainName: "ALEX ANFANTINO",
    title: "President of Sales",
    subName: "MISHEL MARSH",
    subTitle: "Nursing Assistant",
    img: teamImg1,
  },
  {
    mainName: "ALEX ANFANTINO",
    title: "President of Sales",
    subName: "MD TUSHER",
    subTitle: "Graphic Assistant",
    img: teamImg2,
  },
  {
    mainName: "ALEX ANFANTINO",
    title: "President of Sales",
    subName: "ABDUS SOBUR",
    subTitle: "Web Designer",
    img: teamImg3,
  },
];

const Team = (mt="",mb="") => {
  const { t, language, dir } = useLocale();

  const [preview, setPreview] = useState({
    img: teamImg1,
    text: "ALEX ANFANTINO",
    title: "President of Sales",
  });

  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const idx = swiper.realIndex; // loop-safe index
    const member = teamMembers[idx];
    setPreview({
      img: member.img,
      text: member.subName,
      title: member.subTitle,
    });
  };

  return (
    <section className="ab-teammember-area overflow-hidden bg-fit ab-bg-dark position-relative pt-120 pb-120">
      {/* Shapes */}
      <div className="ab-teammember-shape">
        <div className="ab-teammember-shape-1 position-absolute">
          <img src={shape1} alt="" />
        </div>
        <div className="ab-teammember-shape-2 position-absolute">
          <img src={shape2} alt="" />
        </div>
        <div className="ab-teammember-shape-1 position-absolute">
          <img src={shape3} alt="" />
        </div>
      </div>

      <div className="container">
        <div className="ab-teammmeber">
          <div className="row gy-4 gy-lg-0">
            {/* Left Section */}
            <div className="col-lg-4">
              <div className="ab-section-wrapper">
              
                  <SectionTitle pt="mt-15" mb="mb-20" title={t("MEET OUR ")} titleTextTwo={t("LEADERSHIP")}  titleTextThree={t("TEAM")}  subtitle={
                  <span  className="ab-section-subtitle-three">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M18 5.641L16.6032 3.359L9.12492 8.80273L10.4025 0H7.59748L8.88076 8.80273L1.40252 3.359L0 5.641L8.76151 9L0 12.359L1.40252 14.641L8.88076 9.19728L7.59748 18H10.4025L9.12492 9.19728L16.6032 14.641L18 12.359L9.24416 9L18 5.641Z"
                        fill="#CCFF00"
                      />
                    </svg>{t("Our Expert Team")}</span>
                } />
                <p data-aos="fade-up" data-aos-delay="300">{t("Our team is a blend of designers, strategists, and storytellers—passionate professionals dedicated to ")}<br />{t(" turning bold ideas into powerful")}</p>

                <div className="btn-wrapper  mt-50 "
                    data-aos="fade-up" data-aos-delay="400"
                >
                  <Link className="primary-btn-one" to="teamPage">{t("VIEW ALL TEAM ")}<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill="#090808" />
                <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill="#090808" />
              </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Center Preview Image */}
            <div className="col-lg-4 team-preview-column">
              <div className="preview mt-50 mt-lg-0">
                <img
                  id="previewImage"
                  className="img-fluid br-24 show"
                  src={preview.img}
                  alt=""
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="col-lg-4">
              <div className="ab-teammember-card">
                <div className="team-preview-caption">
                  <h2 id="previewText" className="preview-text fs-32">
                    {t(preview.text)}
                  </h2>
                  <p id="previewTitle" className="preview-title">
                    {t(preview.title)}
                  </p>
                </div>

                <div className="ab-teammember-body pl-55 mt-50">
                  <div className="ab-teammember-item mt-25 d-flex align-items-end">
                    {/* Swiper */}
                    <Swiper key={language} dir={dir}
                      modules={[Navigation]}
                      onSwiper={(swiper) => (swiperRef.current = swiper)}
                      onSlideChange={handleSlideChange}
                      navigation={{
                        nextEl: ".team-next-btn",
                        prevEl: ".team-prev-btn",
                      }}
                      slidesPerView={1}
                      spaceBetween={20}
                      centeredSlides={true}
                      loop={true}
                      className="swiper ab-team1-swiper"
                    >
                      {teamMembers.map((member, idx) => (
                        <SwiperSlide key={idx} className="swiper-slide"
                          data-image={member.img}
                          data-text={member.subName}
                          data-title={member.subTitle}
                        >
                          <div className="ab-teammember-item team-member-heading">
                            <h2 className="fs-20">{t(member.mainName)}</h2>
                            <span>{t(member.title)}</span>
                          </div>
                          <div className="ab-teammember-item team-member-details mt-25">
                            <h3 className="fs-20">{t(member.subName)}</h3>
                            <span>{t(member.subTitle)}</span>
                          </div>
                          <div className="ab-teammember-img mt-45">
                            <img className="img-fluid" src={member.img} alt={t(member.subName)} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                       <div className="ab-teammember-btn-wrapper d-flex pl-45">
                                            <button type="button" className="ab-teammember-btn mr-30 team-next-btn" aria-label={t('Next slide')}>
                                                <span><svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.5833 16.5C15.8583 16.5 16.0417 16.4083 16.225 16.225C16.5917 15.8583 16.5917 15.3083 16.225 14.9417L7.05833 5.775C6.69167 5.40833 6.14167 5.40833 5.775 5.775C5.40833 6.14167 5.40833 6.69167 5.775 7.05833L14.9417 16.225C15.125 16.4083 15.3083 16.5 15.5833 16.5Z"
                                                            fill="#090808" />
                                                        <path
                                                            d="M6.41805 15.5833C6.96805 15.5833 7.33472 15.2167 7.33472 14.6667V7.33333H14.6681C15.2181 7.33333 15.5847 6.96667 15.5847 6.41667C15.5847 5.86667 15.2181 5.5 14.6681 5.5H6.41805C5.86805 5.5 5.50138 5.86667 5.50138 6.41667V14.6667C5.50138 15.2167 5.86805 15.5833 6.41805 15.5833Z"
                                                            fill="#090808" />
                                                    </svg></span>
                                            </button>
                                            <button type="button" className="ab-teammember-btn team-prev-btn" aria-label={t('Previous slide')}>
                                                <span><svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.5833 16.5C15.8583 16.5 16.0417 16.4083 16.225 16.225C16.5917 15.8583 16.5917 15.3083 16.225 14.9417L7.05833 5.775C6.69167 5.40833 6.14167 5.40833 5.775 5.775C5.40833 6.14167 5.40833 6.69167 5.775 7.05833L14.9417 16.225C15.125 16.4083 15.3083 16.5 15.5833 16.5Z"
                                                            fill="#090808" />
                                                        <path
                                                            d="M6.41805 15.5833C6.96805 15.5833 7.33472 15.2167 7.33472 14.6667V7.33333H14.6681C15.2181 7.33333 15.5847 6.96667 15.5847 6.41667C15.5847 5.86667 15.2181 5.5 14.6681 5.5H6.41805C5.86805 5.5 5.50138 5.86667 5.50138 6.41667V14.6667C5.50138 15.2167 5.86805 15.5833 6.41805 15.5833Z"
                                                            fill="#090808" />
                                                    </svg></span>
                                            </button>

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

export default Team;

import { useLocale } from '../i18n/useLocale';
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

// ✅ Images
import img1 from "../assets/img/testimonail/Image_1.1.png";
import img2 from "../assets/img/teammember/Image_01.png";
import icon from "../assets/img/icon/IconBasetestimonialpng.png";
import starShape from "../assets/img/shape/hero-Star.png";
import rightShape from "../assets/img/shape/hero-shape_Right.png";
import bgImg from "../assets/img/shape/testimonial-bg1.1.png";

const Testimonial = () => {
  const { t, language, dir } = useLocale();

    const imageSwiperRef = useRef(null);
    const textSwiperRef = useRef(null);

 


    const testimonials = [
        {
            desc: `The team delivered beyond expectations. From branding to web design, every detail reflected creativity and strategy. They truly understood our vision and made it better. Highly recommended for any business looking to grow.`,
            name: "LESLIE ALEXANDER",
            title: "Ui/Ux Designer",
        },
        {
            desc: `The team delivered beyond expectations. From branding to web design, every detail reflected creativity and strategy. They truly understood our vision and made it better. Highly recommended for any business looking to grow.`,
            name: "LESLIE ALEXANDER",
            title: "Web Designer",
        },
        {
            desc: `The team delivered beyond expectations. From branding to web design, every detail reflected creativity and strategy. They truly understood our vision and made it better. Highly recommended for any business looking to grow.`,
            name: "LESLIE ALEXANDER",
            title: "Web Designer",
        },
    ];

    useEffect(() => {
        const imageSwiper = imageSwiperRef.current;
        const textSwiper = textSwiperRef.current;
        if (!imageSwiper?.controller || !textSwiper?.controller) return;
        imageSwiper.controller.control = textSwiper;
        textSwiper.controller.control = imageSwiper;
        return () => {
            if (imageSwiper.controller) imageSwiper.controller.control = undefined;
            if (textSwiper.controller) textSwiper.controller.control = undefined;
        };
    }, [language]);


 
        const slidesmar = [
            <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M80 25.0711L73.7918 14.9289L40.5552 39.1232L46.2334 0H33.7666L39.47 39.1232L6.23344 14.9289L0 25.0711L38.9401 40L0 54.9289L6.23344 65.0711L39.47 40.8768L33.7666 80H46.2334L40.5552 40.8768L73.7918 65.0711L80 54.9289L41.0852 40L80 25.0711Z"
                    fill="#CCFF00"
                />
            </svg>,
            <h3 className="marquee-item-text">{t("CLIENT FEEDBACK")}</h3>,
            <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M80 25.0711L73.7918 14.9289L40.5552 39.1232L46.2334 0H33.7666L39.47 39.1232L6.23344 14.9289L0 25.0711L38.9401 40L0 54.9289L6.23344 65.0711L39.47 40.8768L33.7666 80H46.2334L40.5552 40.8768L73.7918 65.0711L80 54.9289L41.0852 40L80 25.0711Z"
                    fill="#CCFF00"
                />
            </svg>,
            <h3 className="marquee-item-text-two marquee-item-text">{t("CLIENT FEEDBACK")}</h3>,
        ];
 
          // Duplicate slides to create a continuous marquee effect
  const repeatedSlides = [...slidesmar, ...slidesmar, ...slidesmar];
        return (
            <section
                className="ab-bg testimonial-area position-relative pt-120 pb-120 bg-fit"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <div className="marquee pb-50">
                    <Swiper key={language} dir={dir}
            modules={[Autoplay]}
                  
                     loop={true}
                     speed={2000} // smooth sliding speed
                     autoplay={{
                       delay: 0, // continuous scroll
                       disableOnInteraction: false,
                     }}
           spaceBetween={24}
           
           
                     slidesPerView={6}
                     breakpoints={{
                       320: { slidesPerView: 2, spaceBetween: 12 },
                       480: { slidesPerView: 2, spaceBetween: 12 },
                       768: { slidesPerView: 3, spaceBetween: 24 },
                       1024: { slidesPerView: 5, spaceBetween: 24 },
                       1400: { slidesPerView: 6, spaceBetween: 24 },
                     }}
                   
                     className="brand-slider"
                        
                    >
                        {repeatedSlides.map((slide, index) => (
                            <SwiperSlide
                                key={index}
                                className="ab-slide-block"
                                style={{ width: "auto" }} // Ensure each slide width is auto for marquee effect
                            >
                                {t(slide)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                <div className="container position-relative">
                    <div className="ab-testimonial ab-teammember">

                        {/* SHAPES */}
                        <div className="ab-testimonial-shape">
                            <div className="ab-testimonial-shape-1 position-absolute">
                                <img src={starShape} alt="" />
                            </div>
                            <div className="ab-testimonial-shape-2 position-absolute">
                                <img src={rightShape} alt="" />
                            </div>
                        </div>

                        <div className="row">

                            {/* ✅ LEFT IMAGE SLIDER */}
                            <div className="col-xl-4">
                                <Swiper key={language} dir={dir}
                                    onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
                                    modules={[Navigation, Controller]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    grabCursor
                                    className="image-swiper"
                                    loop={true}
                                >

                                    <SwiperSlide>
                                        <div className="ab-testimonial-thumb">
                                            <img className="img-fluid" src={img1} alt="" />
                                            <div className="ab-testimonial-thumb-icon">
                                                <img src={icon} alt="" />
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="ab-testimonial-thumb">
                                            <img className="img-fluid" src={img2} alt="" />
                                            <div className="ab-testimonial-thumb-icon">
                                                <img src={icon} alt="" />
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="ab-testimonial-thumb">
                                            <img className="img-fluid" src={img1} alt="" />
                                            <div className="ab-testimonial-thumb-icon">
                                                <img src={icon} alt="" />
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                </Swiper>
                            </div>

                            {/* ✅ RIGHT TEXT SLIDER */}
                            <div className="col-xl-8">
                                <Swiper key={language} dir={dir}
                                    modules={[Navigation, Controller, Pagination]}
                                    onSwiper={(swiper) => (textSwiperRef.current = swiper)}

                                    spaceBetween={20}
                                    slidesPerView={1}
                                    loop={true}

                                    grabCursor
                                    className="text-swiper"// 🔥 drag continues sync
                                    navigation={{
                                        nextEl: ".next-btn",
                                        prevEl: ".prev-btn",
                                    }}
                                    pagination={{
                                        el: ".swiper-pagination-testi",
                                        type: "fraction", // ✅ fraction type
                                    }}

                                >

                                    {testimonials.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="ab-testimonial-body">

                                                <p className="ab-testimonial-desc">
                                                    {t(item.desc)}
                                                </p>

                                                <div className="ab-testimonial-namebox flex-wrap d-flex align-items-center justify-content-between mt-30">

                                                    <div>
                                                        <h4 className="fs-24 fs-24-primary">{t(item.name)}</h4>
                                                        <span>{t(item.title)}</span>
                                                    </div>

                                                    {/* ⭐ KEEP YOUR SVG STARS EXACTLY SAME */}
                                                    <div>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i}>
                                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                    <path
                                                                        d="M16.0001 22.6663L8.16295 27.4533L10.2937 18.5205L3.31934 12.5461L12.4734 11.8122L16.0001 3.33301L19.5269 11.8122L28.6809 12.5461L21.7065 18.5205L23.8373 27.4533L16.0001 22.6663Z"
                                                                        fill="#ECB014"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        ))}
                                                    </div>

                                                </div>

                                            </div>
                                        </SwiperSlide>
                                    ))}

                                </Swiper>

                                {/* OPTIONAL BUTTONS */}


                                <div className="ab-teammember-btn-wrapper ab-temmember d-flex align-items-center  ">
                                    <button className="ab-teammember-btn mr-30 prev-btn" aria-label={t('Previous slide')}>
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

                                    <div className="mr-30">
                                        <h4 className="d-inline-block ab-testimonial-num ">0<span
                                            className="swiper-pagination-testi"></span></h4>
                                    </div>
                                    <button className="ab-teammember-btn next-btn" aria-label={t('Next slide')}>
                                        <span><svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.41667 16.5C6.14167 16.5 5.95833 16.4083 5.775 16.225C5.40833 15.8583 5.40833 15.3083 5.775 14.9417L14.9417 5.775C15.3083 5.40833 15.8583 5.40833 16.225 5.775C16.5917 6.14167 16.5917 6.69167 16.225 7.05833L7.05833 16.225C6.875 16.4083 6.69167 16.5 6.41667 16.5Z"
                                                fill="white" />
                                            <path
                                                d="M15.5819 15.5833C15.0319 15.5833 14.6652 15.2167 14.6652 14.6667V7.33333H7.33189C6.78189 7.33333 6.41522 6.96667 6.41522 6.41667C6.41522 5.86667 6.78189 5.5 7.33189 5.5H15.5819C16.1319 5.5 16.4986 5.86667 16.4986 6.41667V14.6667C16.4986 15.2167 16.1319 15.5833 15.5819 15.5833Z"
                                                fill="white" />
                                        </svg></span>
                                    </button>

                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    };

    export default Testimonial;

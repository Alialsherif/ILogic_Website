import SocialLinks from '../components/SocialLinks';
import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Image Imports
import blogThumb1 from '../assets/img/blog/blog-details-thumb1.1.png';
import blogThumb2 from '../assets/img/blog/blog-details-thumb1.2.png';
import blogThumb3 from '../assets/img/blog/blog-details-thumb1.3.png';
import userReviewThumb from '../assets/img/blog/blog-details-user-review1.1.png';
import doubleArrowIcon from '../assets/img/icon/double-arrow.png';
import commentUser1 from '../assets/img/blog/blog-details-comment-1.2.png';
import commentUser2 from '../assets/img/blog/blog-details-comment-1.1.png';
import calendarIcon from '../assets/img/icon/calendar-primary.png';
import recentPost1 from '../assets/img/blog/blog-details-recent-post-1.1.png';
import recentPost2 from '../assets/img/blog/blog-details-recent-post-1.2.png';
import recentPost3 from '../assets/img/blog/blog-details-recent-post-1.3.png';
import Breadcrumb from '../components/Breadcrum';

const BlogDetails = () => {
  const { t } = useLocale();

    return (
   <>

   <Breadcrumb title={t("blog details")} />
        <section className="service-details-wrapper ab-bg pt-120 pb-120">
            <div className="container">
                <div className="blog-details">
                    <div className="blog-details-wrapper service-details">
                        <div className="row">
                            {/* Main Content Column */}
                            <div className="col-lg-8">
                                <div className="blog-details-thumb ">
                                   <div className="reveal top">
                                     <img className="img-fluid br-16" src={blogThumb1} alt={t("Main Service")} />
                                   </div>
                                </div>

                                <h2 className="fs-40 fs-40-white mt-24 mb-8">{t("From Sketch to Screen Our Creative Process Explained")}</h2>
                                <p>{t("Every successful project starts with a clear vision. In this blog, we take you behind the scenes of our creative process, showing how ideas evolve from rough sketches to polished digital experiences.")}</p>

                                <h3 className="fs-32 fs-32-white mt-24 mb-8">{t("Overview:")}</h3>
                                <p>{t("Every successful project starts with a clear vision. In this blog, we take you behind the scenes of our creative process, showing how ideas evolve from rough sketches to polished digital experiences.")}</p>

                                <div className="service-details-userReview mt-24">
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
                                    <p className="fs-18 fa-italic fs-18-white fst-italic">{t("\"Professional, fast, and SEO-friendly content. Our website now ranks and converts better. Great experience from start to finish!\"")}</p>
                                    <div className="sb-testi-item-box mt-32 mt-md-0 flex-wrap d-flex align-items-center justify-content-between">
                                        <div className="d-inline-flex">
                                            <div className="blog-details-userThumb mr-12">
                                                <img src={userReviewThumb} alt={t("User Review")} />
                                            </div>
                                            <div>
                                                <span className="sb-testi-item-text d-block mb-6 fs-20-black fs-20">{t("Howard Jeremy")}</span>
                                                <p>{t("Marketing Director, EcoBrand Solutions")}</p>
                                            </div>
                                        </div>
                                        <div className="ab-box-icon mr-20 mt-24 mt-md-0">
                                           <svg width="43" height="32" viewBox="0 0 43 32" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.1127 0C15.9844 0 20.223 4.84751 20.2229 12.0251C20.1853 22.4536 12.3456 29.8269 1.03573 31.2429C-0.0135503 31.3742 -0.418141 29.9207 0.548116 29.491C4.8878 27.5614 7.07957 25.1127 7.36267 22.689C7.57418 20.8783 6.58981 19.2921 5.35378 18.995C2.1494 18.225 0.00243541 14.2345 0.00243541 10.1103C0.00243541 4.52653 4.52897 0 10.1127 0Z"
                                                    fill="#CCFF00" />
                                                <path
                                                    d="M32.1713 0C38.043 0 42.2816 4.84751 42.2815 12.0251C42.2439 22.4536 34.4042 29.8269 23.0943 31.2429C22.045 31.3742 21.6405 29.9207 22.6067 29.491C26.9464 27.5614 29.1382 25.1127 29.4213 22.689C29.6328 20.8783 28.6484 19.2921 27.4124 18.995C24.208 18.225 22.061 14.2345 22.061 10.1103C22.061 4.52653 26.5876 0 32.1713 0Z"
                                                    fill="#CCFF00" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="blog-details-processbreak mt-32">
                                    <h3 className="fs-32 fs-32-white mb-16">{t("Process Breakdown:")}</h3>
                                    <ul>
                                        {[
                                            { title: "Ideation & Brainstorming:", desc: "Collaborating with clients to understand goals, audience, and brand identity." },
                                            { title: "Sketching & Wireframing:", desc: "Translating concepts into visual structures, focusing on usability and layout." },
                                            { title: "Design & Development:", desc: "Crafting high-fidelity designs and translating them into functional web or app interfaces." },
                                            { title: "Testing & Refinement:", desc: "Iterating designs based on feedback and usability testing to ensure perfection." },
                                            { title: "Launch & Optimization:", desc: "Deploying the final product and optimizing for performance and user engagement." }
                                        ].map((item, index) => (
                                            <li key={index} className="d-inline-flex align-items-center mb-20">
                                                <div><img src={doubleArrowIcon} alt="" /></div>
                                                <div className="ml-8">
                                                    <h4 className="fs-18 fs-18-white f-w-600 d-inline-block">{t(item.title)}</h4>
                                                    <p className="ml-6 d-inline-block">{t(item.desc)}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="row gy-4 gy-md-0 mt-32">
                                    <div className="col-md-6">
                                      <div className="reveal">
                                        <img className="img-fluid br-16" src={blogThumb2} alt={t("process")} />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="reveal right">
                                        <img className="img-fluid br-16" src={blogThumb3} alt={t("process")} />
                                      </div>
                                    </div>
                                </div>
 <div className="blog-details-processbreak mt-32">
                                    <h3 className="fs-32 fs-32-white mb-16">{t("Process Breakdown:")}</h3>
                                    <ul>
                                        {[
                                            { title: "Ideation & Brainstorming:", desc: "Collaborating with clients to understand goals, audience, and brand identity." },
                                            { title: "Sketching & Wireframing:", desc: "Translating concepts into visual structures, focusing on usability and layout." },
                                            { title: "Design & Development:", desc: "Crafting high-fidelity designs and translating them into functional web or app interfaces." },
                                            { title: "Testing & Refinement:", desc: "Iterating designs based on feedback and usability testing to ensure perfection." },
                                            { title: "Launch & Optimization:", desc: "Deploying the final product and optimizing for performance and user engagement." }
                                        ].map((item, index) => (
                                            <li key={index} className="d-inline-flex align-items-center mb-20">
                                                <div><img src={doubleArrowIcon} alt="" /></div>
                                                <div className="ml-8">
                                                    <h4 className="fs-18 fs-18-white f-w-600 d-inline-block">{t(item.title)}</h4>
                                                    <p className="ml-6 d-inline-block">{t(item.desc)}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <h4 className="fs-32 fs-32-white mt-24 mb-8 mt-12">{t("Conclusion:")}</h4>
                                <p>{t("Our process ensures creativity meets functionality, delivering digital solutions that are engaging, effective, and aligned with client objectives.")}</p>

                                {/* Tags & Social */}
                                <div className="blog-details-tag bg-transparent gap-12 mt-32 p-0 d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="d-inline-flex flex-wrap gap-12 align-items-center">
                                        <h4 className="fs-32 fs-32-white d-inline-block mr-12">{t("Tags:")}</h4>
                                        <Link to="/branding" className="blog-details-tag-item">{t("Branding")}</Link>
                                        <Link to="/web-design" className="blog-details-tag-item">{t("WebDesign")}</Link>
                                        <Link to="/seo" className="blog-details-tag-item">{t("SEO")}</Link>
                                    </div>
                                    <div className="sb-team-social position-static d-inline-flex flex-row align-items-center">
                  <SocialLinks linkClassName="mr-16" />
                </div>
                                </div>

                                {/* Comments Section */}
                                <div className="blog-details-comment mt-32">
                                    <h4 className="fs-32 fs-32-white mb-24">{t("02 Comments")}</h4>
                                    <div className="blog-details-comment-item pb-32 mb-32 d-inline-flex position-relative">
                                        <div className="blog-details-comment-thumb mr-21">
                                            <img src={commentUser1} alt={t("user")} />
                                        </div>
                                        <div className="blog-details-comment-text">
                                            <div className="d-flex justify-content-between align-items-end mb-16">
                                                <div>
                                                    <span className="fs-16">{t(" February 10, 2024 at 2:37 pm")}</span>
                                                    <h5 className="fs-20 ">{t("DIDAR RAJA ")}</h5>
                                                </div>
                                                <Link className="blog-details-comment-btn" to="/contact">{t("Reply")}</Link>
                                            </div>
                                            <p>{t("Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto var sed efficitur turpis gilla sed sit amet finibus eros.")}</p>
                                        </div>
                                    </div>
                                </div>

                              <div className="blog-details-comment-item blog-details-comment-item-reply d-inline-flex position-relative">
      <div className="blog-details-comment-thumb mr-21">
        <img src={commentUser2} alt={t("User comment avatar")} />
      </div>
      
      <div className="blog-details-comment-text">
        <div className="d-flex justify-content-between align-items-end mb-16">
          <div>
            <span className="fs-16">{t("February 10, 2024 at 2:37 pm")}</span>
            <h6 className="fs-20">{t("NUSAN ROY")}</h6>
          </div>
          
          <Link 
            to="/contact" 
            className="blog-details-comment-btn blog-details-comment-btn-reply"
          >{t("Reply")}</Link>
        </div>
        
        <p className="blog-details-comment-desc">{t("Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto var sed efficitur turpis gilla sed sit amet finibus eros.")}</p>
      </div>
    </div>
                                <div className="ab-contact mt-32">
                                    <h4 className="fs-32 fs-32-white ">{t("Leave a Reply")}</h4>
                                    <p className="blog-details-title blog-details-title-two d-block">{t("Share your thoughts! Email won’t be published. Fields required *")}</p>
                                    <form onSubmit={(e) => e.preventDefault()} className="mt-24">
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <label htmlFor="NAME">{t("YOUR NAME")}</label>
                                                <input type="text" placeholder={t("YOUR NAME")} name="YOURNAME" id="NAME" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">{t("YOUR EMAIL")}</label>
                                                <input type="email" placeholder={t("YOUR EMAIL Address")} name="email" id="email" />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="message">{t("Your Message:")}</label>
                                                <textarea id="message" name="message" rows="5" cols="30" placeholder={t('Initial text content goes here.')}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="primary-btn-one border-0 mt-40">{t("SEND MESSAGE ")}<svg
                                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                                                    fill="#090808" />
                                                <path
                                                    d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                                                    fill="#090808" />
                                            </svg> </button>
                                    </form>
                                </div>
                            </div>

                            {/* Sidebar Column */}
                            <div className="col-lg-4">
                                   <div className="blog-details-search mb-32 mt-50 mt-lg-0">
                                        <div className="position-relative blog-details-search-box">
                                            {/* The input must be self-closing */}
                                            <input
                                                type="text"
                                                className="blog-details-search-box w-100 border-0 text-white"
                                                placeholder={t("Search Blog")}
                                            />


                                            <button
                                                className="blog-details-search-icon position-absolute "


                                            >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M2.20776 2.20175C5.31479 -0.793302 9.93868 -0.673926 12.8144 2.20175C15.5642 4.95162 15.7323 9.30559 13.3187 12.2516L17.5873 16.5207L16.5267 17.5813L12.2576 13.3127C9.3116 15.7263 4.95763 15.5582 2.20776 12.8084C-0.667922 9.93268 -0.803139 5.10413 2.20776 2.20175ZM11.7537 3.26241C9.41055 0.919267 5.61156 0.919267 3.26842 3.26241C0.925271 5.60556 0.925271 9.40455 3.26842 11.7477C5.61156 14.0908 9.41055 14.0908 11.7537 11.7477C14.0968 9.40455 14.0968 5.60556 11.7537 3.26241Z"
                                                        fill="#090808"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                <div className="blog-details-menu mb-32">
                                    <h2 className="fs-32 fs-32-white blog-details-title mb-24">{t("Categories")}</h2>
                                    {[
                                        { name: "Branding & Identity", count: "08" },
                                        { name: "Digital Marketing", count: "02" },
                                        { name: "Design Inspiration", count: "07" },
                                        { name: "SEO & Conversion", count: "08" },
                                        { name: "Content Strategy", count: "08" },
                                        { name: "Visual Storytelling", count: "08" }
                                    ].map((cat, idx) => (
                                        <Link key={idx} to="#!" className="d-flex justify-content-between blog-details-menu-item mb-24">
                                            <span className="fs-16 fs-16-white uppercase">{t(cat.name)}</span>
                                            <span className="fs-16 fs-16-white uppercase">({t(cat.count)})</span>
                                        </Link>
                                    ))}
                                </div>

                                <div className="blog-details-recentPost mt-32 br-16">
                                    <h2 className="fs-32 fs-32-white blog-details-title mb-32">{t("Recent post")}</h2>
                                    {[
                                        { img: recentPost1, title: "How Photography Shapes Brand Personality" },
                                        { img: recentPost2, title: "Designing for Accessibility and Inclusivity" },
                                        { img: recentPost3, title: "How to Build a Brand with Limited Budget" }
                                    ].map((post, idx) => (
                                        <div key={idx} className="blog-details-recentPost-item mb-24">
                                            <div className="mb-30">
                                                <Link to="#!"><img className="w-100 img-fluid br-12" src={post.img} alt={t("post")} /></Link>
                                            </div>
                                            <div className="abblog_text mb-15 d-inline-flex align-items-center">
                                                <img src={calendarIcon} alt={t("calendar")} />
                                                <span className="fs-16 ml-2">{t("April 12, 2025")}</span>
                                            </div>
                                            <h3 className="fs-20 uppercase">{t(post.title)}</h3>
                                        </div>
                                    ))}
                                </div>

                                 <div className="blog-details-tag mt-32">
                                        <h4 className="fs-32 fs-32-white blog-details-title mb-32">{t("Tags")}</h4>
                                        <div className="blog-details-tag-wrapper">
                                            {["Branding", "WebDesign", "SEO", "CreativeProcess", "UIUX", "LogoDesign"].map((tag) => (
                                                <Link key={tag} to="#!" className="blog-details-tag-item">{t(tag)}</Link>
                                            ))}
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
   </>
    );
};

export default BlogDetails;

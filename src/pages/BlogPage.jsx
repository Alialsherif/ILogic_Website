import { useLocale } from '../i18n/useLocale';

import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Image Imports
import thumb31 from '../assets/img/blog/thumb3.1.png';
import thumb32 from '../assets/img/blog/thumb3.2.png';
import thumb33 from '../assets/img/blog/thumb3.3.png';
import inner11 from '../assets/img/blog/blog-innerpages_1.1.png';
import inner12 from '../assets/img/blog/blog-innerpages_1.2.png';
import inner13 from '../assets/img/blog/blog-innerpages_1.3.png';
import inner14 from '../assets/img/blog/blog-innerpages_1.4.png';
import inner15 from '../assets/img/blog/blog-innerpages_1.5.png';
import inner16 from '../assets/img/blog/blog-innerpages_1.6.png';
import adminImg from '../assets/img/blog/Images-3.1.png';
import Cleander from '../assets/img/shape/calendar-two.png'
import Breadcrumb from '../components/Breadcrum';

const BlogPage = () => {
  const { t } = useLocale();

    const blogPosts = [
        { id: 1, img: thumb31,  },
        { id: 2, img: thumb32,  },
        { id: 3, img: thumb33,  },
        { id: 4, img: inner11,  },
        { id: 5, img: inner12,  },
        { id: 6, img: inner13,  },
        { id: 7, img: inner14,  },
        { id: 8, img: inner15,  },
        { id: 9, img: inner16,  },
    ];

    return (
      <>
      <Breadcrumb title={t(" our blog")} />
        <section className="ab-blog-innerpage pt-120 pb-120 ab-bg-dark">
            <div className="container">
                <div className="row gy-4">
                    {blogPosts.map((post,id) => (
                        <div key={post.id} className="col-xl-4 col-md-6">
                            <div 
                                className="ab-blog-item position-relative br-16 overflow-hidden  "
                                 data-aos="fade-up" 
      data-aos-duration={600 + (id * 300)}
                            >
                                <div className="ab-blog-thumb-three position-relative">
                                    <Link to="/blogDetails">
                                        <img className="img-fluid w-100" src={post.img} alt={t("blog thumb")} />
                                    </Link>
                                    <div className="ab-blog-calender d-flex align-items-center justify-content-between gap-2">
                                        <span className="mb-0 d-inline-flex align-items-center">    <img className='mr-12' src={Cleander} alt={t("Cleander")} />{t(" 08 August, 2025")}</span>
                                    </div>
                                </div>

                                <div className="ab-blog-content-body">
                                    <div className="date_blog d-flex justify-content-between align-items-center w-100 mb-15">
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <img src={adminImg} className="img-fluid rounded" alt={t("admin")} />
                                            <span className="mb-0">{t("Post Admin")}</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <span>{t("Comments (04)")}</span>
                                        </div>
                                    </div>

                                    <h3 className="mb-10">
                                        <Link   to="/blogDetails"  className="fs-24">{t("How Good Design Builds Stronger Brands idea")}</Link>
                                    </h3>

                                    <div className="btn-wrapper d-inline-flex justify-content-between mt-24">
                                        <Link 
                                            to="/blogDetails" 
                                            className="text-decoration-none primary-btn primary-btn-two d-flex align-items-center icon"
                                        >{t("VIEW BLOG")}<span className="primary-btn-two-icon-three ml-15"> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z" fill="#090808" />
                <path d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z" fill="#090808" />
              </svg></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </>
    );
};

export default BlogPage;

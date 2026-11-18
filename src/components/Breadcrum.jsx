import { useLocale } from '../i18n/useLocale';
 
import { LocalizedLink as Link } from '../i18n/LocalizedLink'; // Use 'next/link' if using Next.js

// Import your assets
import breadcrumbBg from "../assets/img/background/Hero-breadcrum-bg.png";
import shape1 from "../assets/img/shape/breadcrum-shape-1_1.png";
import shape2 from "../assets/img/shape/breadcrum-shape-1_2.png";

const Breadcrumb = ({ title = ""}) => {
  const { t } = useLocale();

    return (
        <section 
            className="ab-breadcrum p-relative" 
            style={{ backgroundImage: `url(${breadcrumbBg})` }}
        >
            <div className="container">
                {/* Decorative Shapes */}
                <div className="ab-breadcrum-shape">
                    <div className="ab-breadcrum-shape-1 p-absolute">
                        <img className="img-fluid" src={shape1} alt="" />
                    </div>
                    <div className="ab-breadcrum-shape-2 p-absolute">
                        <img className="img-fluid" src={shape2} alt="" />
                    </div>
                </div>

                {/* Content */}
                <div className="ab-breadcrum__content text-center">
                    <h1 className="ab-breadcrum-title a mb-20">{t(title)}</h1>
                    <ul className="ab-breadcrum__content__menu">
                        <li>
                            <Link to="/">{t("Home")}</Link>
                        </li>
                        <li>
                            <i className="fas fa-chevron-right"></i>
                        </li>
                        <li>
                            {t(title)}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;
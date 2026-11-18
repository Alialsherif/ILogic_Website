import { useLocale } from '../i18n/useLocale';
 
import thumbMain from "../assets/images/products/category-home3.thumb2.1.png";
import arrowRight from "../assets/images/icon/arrow-right-15px.png";
import product1 from "../assets/images/products/category-home3.2.1.png";
import product2 from "../assets/images/products/category-home3.2.2.png";
import product3 from "../assets/images/products/category-home3.2.3.png";
import product4 from "../assets/images/products/category-home3.2.4.png";
import product5 from "../assets/images/products/category-home3.2.5.png";
import product6 from "../assets/images/products/category-home3.2.6.png";
import { LocalizedLink as Link } from '../i18n/LocalizedLink';

const Product = () => {
  const { t } = useLocale();

  const products = [
    { id: 1, title: "Lemon", image: product1 ,  delay:200,},
    { id: 2, title: "Lemon", image: product2 ,  delay:400,},
    { id: 3, title: "Lemon", image: product3 ,  delay:600,},
    { id: 4, title: "Cabbage", image: product4 ,  delay:800,},
    { id: 5, title: "Blueberry", image: product5 ,  delay:1000,},
    { id: 6, title: "Apple", image: product6 ,  delay:1200,},
  ];

  return (
    <section className="sb-products-area content pb-120">
      <div className="container">
        <div className="sb-products sb-products-home3">
          <div className="row">
            {/* Left Featured Product */}
            <div className="col-xl-6 col-xxl-5">
              <div className="sb-products-home3-left">
                <div className="sb-products-home3-left-thumb">
                  <div className="reveal up">
                    <img src={thumbMain} alt={t("Organic Deal")} />
                  </div>
                </div>

                <div className="sb-products-home3-left-content">
                  <span className="sb-section-subtitle">{t("Organic Deal")}</span>
                  <h2 className="sb-products-home3-left-title mb-20">{t("Pack of 3")}</h2>
                  <p className="sb-ter">{t("100% natural and pure organic ")}<br />{t(" products")}</p>

                  <div className="mt-20">
                    <span className="text-decoration-line-through d-inline-block sb-pri">
                      $15.00
                    </span>
                    <h3 className="sb-products-home3-left-price d-inline-block fs-24">
                      $13.00
                    </h3>
                  </div>

                  <div className="sb-btn-wrapper mt-25 position-relative d-inline-block">
                    <Link to="about" className="sb-btn sb-btn-four">
                      <div className="sb-btn-text sb-btn-four-text">
                        <div className="sb-btn-text-1">{t("Shop Now")}</div>
                        <div className="sb-btn-text-2">{t("Shop Now")}</div>
                      </div>
                      <div className="sb-btn-icon sb-btn-four-icon">
                        <img src={arrowRight} alt="" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Grid of Products */}
            <div className="col-xl-6 col-xxl-7">
              <div className="mt-50 mt-xl-0">
                <div className="row g-4">
                  {products.map((item) => (
                    <div className="col-lg-4 col-md-6" key={item.id}>
                      <div className="sb-products-item  " data-aos="fade-up"  data-aos-delay={item.delay}>
                        <div className="sb-products-content">
                          <div className="sb-products-thumb-wrap sb-products-home3-thumb-wrap">
                            <div className="sb-products-thumb sb-products-home3-thumb">
                              <img className="img-fluid" src={item.image} alt={t(item.title)} />
                            </div>
                          </div>
                          <div className="sb-products-body text-center">
                            <h4 className="sb-products-title">{t(item.title)}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;

import { useLocale } from '../i18n/useLocale';
import SectionTitle from "../pages";

 


const Faq = ({ptClass=''}) => {
  const { t } = useLocale();

  return (
//    START faq
                    
 

 
    <section className={`sb-faq-area content ${ptClass}`}>
      <div className="container">
        <div className="sb-section-title-wrapper text-center pt-120 pb-50">
          <SectionTitle title={t(" Common Questions & Answer")} subtitle={t(" Ant Question Please?")} />
        </div>

        <div className="sb-faq">
          <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
            <div className="row g-4">
              
              {/* Left Column */}
              <div className="col-xl-6 col-lg-12">
                <div className="sb-accordion-item   mb-30" data-aos="fade-up"  data-aos-delay="700">
                  <h2 className="accordion-header">
                    <button
                      className="sb-accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <span className="sb-accordion-icon">
                        <i className="fa-solid fa-chevron-down mr-18"></i>
                      </span>{t("What are the main types of agriculture?")}</button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                  >
                    <div className="sb-accordion-body pb-9">
                      <p>{t("Farming to produce food mainly for the farmer's family or local community. Practices designed to meet the needs of the present without compromising sustainability...")}</p>
                    </div>
                  </div>
                </div>

                <div className="sb-accordion-item fade-up " data-aos="fade-up"  data-aos-delay="800">
                  <h2 className="accordion-header">
                    <button
                      className="sb-accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      <span className="sb-accordion-icon">
                        <i className="fa-solid fa-chevron-down mr-18"></i>
                      </span>{t("What is the future of agriculture?")}</button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="sb-accordion-body">
                      <p>{t("Farming to produce food mainly for the farmer's family or local community. Practices designed to meet the needs of the present without compromising sustainability...")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-xl-6 col-lg-12">
                <div className="sb-accordion-item fade-up mb-30" data-aos="fade-up"  data-aos-delay="900">
                  <h2 className="accordion-header">
                    <button
                      className="sb-accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      <span className="sb-accordion-icon">
                        <i className="fa-solid fa-chevron-down mr-18"></i>
                      </span>{t("What are top 5 agriculture products?")}</button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                  >
                    <div className="sb-accordion-body">
                      <p>{t("Farming to produce food mainly for the farmer's family or local community. Practices designed to meet the needs of the present without compromising sustainability...")}</p>
                    </div>
                  </div>
                </div>

                <div className="sb-accordion-item fade-up mb-30" data-aos="fade-up"  data-aos-delay="1000">
                  <h2 className="accordion-header">
                    <button
                      className="sb-accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseFive"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFive"
                    >
                      <span className="sb-accordion-icon">
                        <i className="fa-solid fa-chevron-down mr-18"></i>
                      </span>{t("How does climate change affect agriculture?")}</button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseFive"
                    className="accordion-collapse collapse"
                  >
                    <div className="sb-accordion-body">
                      <p>{t("Farming to produce food mainly for the farmer's family or local community. Practices designed to meet the needs of the present without compromising sustainability...")}</p>
                    </div>
                  </div>
                </div>

                <div className="sb-accordion-item fade-up" data-aos="fade-up"  data-aos-delay="1100">
                  <h2 className="accordion-header">
                    <button
                      className="sb-accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseSix"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseSix"
                    >
                      <span className="sb-accordion-icon">
                        <i className="fa-solid fa-chevron-down mr-18"></i>
                      </span>{t("What are the benefits of agriculture?")}</button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseSix"
                    className="accordion-collapse collapse"
                  >
                    <div className="sb-accordion-body">
                      <p>{t("Farming to produce food mainly for the farmer's family or local community. Practices designed to meet the needs of the present without compromising sustainability...")}</p>
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

 


export default Faq
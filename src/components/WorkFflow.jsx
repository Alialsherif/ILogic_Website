import { useLocale } from '../i18n/useLocale';
 

// Import images
import workflowShape1 from "../assets/img/shape/workflow-1.1-Overlay_Left.png";
import workflowShape2 from "../assets/img/shape/workflow-1.2-Overlay_Left.png";
import workflowShape3 from "../assets/img/shape/workflow-1.3.png";
import workflowImg1 from "../assets/img/workflow/img1.1.png";
import workflowImg2 from "../assets/img/workflow/img1.2.png";
import workflowImg3 from "../assets/img/workflow/img1.3.png";
import SectionTitle from "./SectionTitle";

const WorkflowSection = () => {
  const { t } = useLocale();

  return (
    <section className="ab-workflow-are ab-bg pt-120 pb-120 position-relative overflow-hidden">
      <div className="ab-workflow-shape">
        <div className="ab-workflow-shape-1 position-absolute">
          <img src={workflowShape1} alt="" />
        </div>
        <div className="ab-workflow-shape-2 position-absolute">
          <img src={workflowShape2} alt="" />
        </div>
        <div className="ab-workflow-shape-3 position-absolute">
          <img src={workflowShape3} alt="" />
        </div>
      </div>

      <div className="container">
        <div className="ab-section-wrapper text-center mb-60">
        

            <SectionTitle title={t("FROM IDEA TO")} titleTextTwo={t("EXECUTION")}   subtitle={
                  <span  className="ab-section-subtitle-three">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M18 5.641L16.6032 3.359L9.12492 8.80273L10.4025 0H7.59748L8.88076 8.80273L1.40252 3.359L0 5.641L8.76151 9L0 12.359L1.40252 14.641L8.88076 9.19728L7.59748 18H10.4025L9.12492 9.19728L16.6032 14.641L18 12.359L9.24416 9L18 5.641Z"
                        fill="#CCFF00"
                      />
                    </svg>{t("OUR PROCESS")}</span>
                } />
        </div>

        <div className="ab-workflow">
          <div className="row gy-4 gy-xl-0">
            {/* Workflow Item 1 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="ab-workflow-item text-center " data-aos="fade-up" data-aos-delay="400"
                 
              >
                <div className="ab-workflow-thumb">
                  <img src={workflowImg1} alt="" />
                </div>
                <div className="ab-workflow-content text-center mt-30">
                  <h2 className="fs-24 mb-10">{t("BRANDING DESIGN")}</h2>
                  <p>{t("We bring designs to life—whether it’s a website, ")}<br />{t(" content, or campaign—through seamless")}</p>
                </div>
              </div>
            </div>

            {/* Workflow Item 2 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="ab-workflow-item text-center "
               data-aos="fade-up" data-aos-delay="600"
              >
                <div className="ab-workflow-thumb">
                  <img src={workflowImg2} alt="" />
                </div>
                <div className="ab-workflow-content text-center mt-30">
                  <h2 className="fs-24 mb-10">{t("BRANDING DESIGN")}</h2>
                  <p>{t("Our team creates visually compelling and design ")}<br />{t(" solutions that tell your brand’s story.")}</p>
                </div>
              </div>
            </div>

            {/* Workflow Item 3 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="ab-workflow-item text-center "
                data-aos="fade-up" data-aos-delay="800"
              >
                <div className="ab-workflow-thumb">
                  <img src={workflowImg3} alt="" />
                </div>
                <div className="ab-workflow-content text-center mt-30">
                  <h2 className="fs-24 mb-10">{t("BRANDING DESIGN")}</h2>
                  <p>{t("We begin by understanding your brand, goals, ")}<br />{t(" and audience through research")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;

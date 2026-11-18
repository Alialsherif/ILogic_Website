import { useLocale } from '../i18n/useLocale';


import factIcon from "../assets/images/icon/fact2.1.png";
import OdometerCounter from "./Odometer";

const Counter = () => {
  const { t } = useLocale();

  return (
    <section
      className="sb-primary sb-fact-area "

    >
      <div className="container">
        <div className="sb-fact pt-50  pb-50">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="sb-fact-item">
                <h4 className="sb-fact-title">
                
                    <OdometerCounter value={300} className="fact-num "/>
                  
                  <span className="sb-fact-title">k+</span>
                </h4>

                <div className="sb-fact-icon">
                  <img src={factIcon} alt={t("Winning Award")} />
                  <span className="sb-fact-desc">{t("Winning Award")}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="sb-fact-item">
                <h4 className="sb-fact-title">
                
                    <OdometerCounter value={900} className="fact-num "/>
                  
                  <span className="sb-fact-title">k+</span>
                </h4>

                <div className="sb-fact-icon">
                  <img src={factIcon} alt={t("Winning Award")} />
                  <span className="sb-fact-desc">{t(" Team member")}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="sb-fact-item">
                <h4 className="sb-fact-title">
                
                    <OdometerCounter value={200} className="fact-num "/>
                  
                  <span className="sb-fact-title">k+</span>
                </h4>

                <div className="sb-fact-icon">
                  <img src={factIcon} alt={t("Winning Award")} />
                  <span className="sb-fact-desc">{t(" Client Review")}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="sb-fact-item">
                <h4 className="sb-fact-title">
                
                    <OdometerCounter value={500} className="fact-num "/>
                  
                  <span className="sb-fact-title">k+</span>
                </h4>

                <div className="sb-fact-icon">
                  <img src={factIcon} alt={t("Winning Award")} />
                  <span className="sb-fact-desc">{t("  Complete Project")}</span>
                </div>
              </div>
            </div>

       
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;

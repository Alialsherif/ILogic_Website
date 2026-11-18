import { useLocale } from '../i18n/useLocale';
import phoneIcon from "../assets/images/icon/phone-contact.png";
import emailIcon from "../assets/images/icon/email-contact.png";
import locationIcon from "../assets/images/icon/location.png";
import rightArrow from "../assets/images/icon/right-arrow-2.png";
import SectionTitle from "./SectionTitle";

const HomeOneContact = () => {
  const { t } = useLocale();

  return (
 <section className="sb-contact-area pt-47 content">
      <div className="container">
        <div className="sb-contact">
          <div className="row">
            {/* Left Side: Contact Info */}
            <div className="col-lg-5">
              <div className="sb-section-title-wrapper">
                 
                 <SectionTitle title={t("  Get in Touch Now")} titleClass="pb-30"   subtitle={t("  Contact Us")} />
                <p>{t("Promoting sustainable agriculture through organic ")}<br />{t("farming practice. Our goal is to provide high-quality, ")}<br />{t("environmentally-friendly products.")}</p>

                <div className="sb-about-item d-flex flex-column mt-30">
                  {/* Phone */}
                  <div className="sb-about-item-box pb-30 d-inline-flex align-items-center "  data-aos="fade-up"  data-aos-delay="700">
                    <div className="sb-about-item-box-icon mr-20">
                      <img src={phoneIcon} alt={t("Phone Icon")} />
                    </div>
                    <a href="tel:+0085442331006">
                      <p>{t("Have Question?")}</p>
                      <span className="sb-about-item-text fs-20-black fs-20">{t("Free +00 (92110) 85413")}</span>
                    </a>
                  </div>

                  {/* Email */}
                  <div className="sb-about-item-box mb-30 d-inline-flex align-items-center"  data-aos="fade-up"  data-aos-delay="800">
                    <div className="sb-about-item-box-icon mr-20">
                      <img src={emailIcon} alt={t("Email Icon")} />
                    </div>
                    <a href="mailto:needhelp@gmail.com">
                      <p>{t("Write Email")}</p>
                      <span className="sb-about-item-text fs-20-black fs-20">{t("needhelp@gmail.com")}</span>
                    </a>
                  </div>

                  {/* Location */}
                  <div className="sb-about-item-box d-inline-flex align-items-center "  data-aos="fade-up"  data-aos-delay="900">
                    <div className="sb-about-item-box-icon mr-20">
                      <img src={locationIcon} alt={t("Location Icon")} />
                    </div>
                    <a href="#">
                      <p>{t("Our Location")}</p>
                      <span className="sb-about-item-text fs-20-black fs-20">{t("88 Broklyn Golden USA")}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="col-lg-7">
              <form className="sb-contact-group mt-50 mt-lg-0">
                <div className="row">
                  <div className="col-md-6">
                    <div className="sb-contact-input-group mb-24">
                      <input
                        type="text"
                        placeholder={t("Your Name")}
                        name="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="sb-contact-input-group mb-24">
                      <input
                        type="email"
                        placeholder={t("Email Address")}
                        name="email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="sb-contact-input-group mb-24">
                      <input
                        type="tel"
                        placeholder={t("Phone Number")}
                        name="phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="sb-contact-input-group mb-24">
                      <input
                        type="text"
                        placeholder={t("Subject")}
                        name="subject"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="sb-contact-input-group">
                      <textarea
                        name="message"
                        placeholder={t("Write Message")}
                        id="textarea"
                        cols="30"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="sb-btn-wrapper position-relative d-inline-block mt-30">
                  <button type="submit" className="sb-btn sb-btn-two">
                    <div className="sb-btn-text sb-btn-two-text position-relative">
                      <span className="sb-btn-text-1">{t("Send Message")}</span>
                      <span className="sb-btn-text-2">{t("Send Message")}</span>
                    </div>
                    <div className="sb-btn-icon">
                      <img src={rightArrow} alt="" />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeOneContact
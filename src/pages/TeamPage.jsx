import SocialLinks from '../components/SocialLinks';
import { useLocale } from '../i18n/useLocale';

import { LocalizedLink as Link } from '../i18n/LocalizedLink';

// Image Imports
import teamImg01 from '../assets/img/project/inner-page_img_01.png';
import teamImg02 from '../assets/img/project/inner-page_img_02.png';
import teamImg03 from '../assets/img/project/inner-page_img_03.png';
import teamImg04 from '../assets/img/project/inner-page_img_04.png';
import teamImg05 from '../assets/img/project/inner-page_img_05.png';
import Breadcrumb from '../components/Breadcrum';

const TeamPage = () => {
  const { t } = useLocale();

  // Team data array to avoid repetition
  const teamMembers = [
    { id: 1, img: teamImg01, title: "Modern Agriculture", role: "Web Designer" },
    { id: 2, img: teamImg02, title: "Modern Agriculture", role: "Web Designer" },
    { id: 3, img: teamImg03, title: "Modern Agriculture", role: "Web Designer" },
    { id: 4, img: teamImg04, title: "Modern Agriculture", role: "Web Designer" },
    { id: 5, img: teamImg05, title: "Modern Agriculture", role: "Web Designer" },
    { id: 6, img: teamImg01, title: "Modern Agriculture", role: "Web Designer" },
  ];

  return (
<>
<Breadcrumb title={t("our Team")} />
    <section className="sb-team ab-bg pb-120 pt-120">
      <div className="container">
        <div className="row grid g-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-md-6 col-lg-4 grid-item cta1 cta3">
              <div className="sb-team-item">
                <Link to="/teamDetails" className="sb-team-item-thumb">
                  <img 
                    className="img-fluid w-img" 
                    src={member.img} 
                    alt={t(member.title)} 
                  />
                </Link>
                
                <div className="sb-team-social d-inline-flex align-items-center">
                  <SocialLinks />
                </div>

                <div className="sb-team-item-content sb-team-item-content-innerpages">
                  <h3>
                    <Link className="fs-24 sb-team-title" to="/teamDetails">
                      {t(member.title)}
                    </Link>
                  </h3>
                  <span className="sb-team-subtitle">{t(member.role)}</span>
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

export default TeamPage;
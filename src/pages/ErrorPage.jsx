import { useLocale } from '../i18n/useLocale';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
import errorImage from '../assets/img/404.png'; // Adjusted path for import
import Breadcrumb from '../components/Breadcrum';

const ErrorPage = () => {
  const { t } = useLocale();

  return (
 <>
 <Breadcrumb title={t("Error Page ")} />
    <div className="eror text-center ab-bg pt-120 pb-120">
      <div className="container">
        {/* Error Thumbnail */}
        <div className="error-thumb">
          <img className="img-fluid" src={errorImage} alt={t("404 Error")} />
        </div>

        {/* Error Content */}
        <h2 className="error-title mt-48">{t("Sorry, Page Not Found")}</h2>
        <p className="error-desc">{t("The page you are looking for does not exist. Please try it.")}</p>

        {/* Button Wrapper */}
        <div className="btn-wrapper d-none d-xl-block mt-48">
          <Link className="primary-btn-one" to="/contact">{t("SEND MESSAGE")}{t(' ')}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83333 15C5.58333 15 5.41667 14.9167 5.25 14.75C4.91667 14.4167 4.91667 13.9167 5.25 13.5833L13.5833 5.25C13.9167 4.91667 14.4167 4.91667 14.75 5.25C15.0833 5.58333 15.0833 6.08333 14.75 6.41667L6.41667 14.75C6.25 14.9167 6.08333 15 5.83333 15Z"
                fill="#090808"
              />
              <path
                d="M14.1654 14.1667C13.6654 14.1667 13.332 13.8333 13.332 13.3333V6.66667H6.66536C6.16536 6.66667 5.83203 6.33333 5.83203 5.83333C5.83203 5.33333 6.16536 5 6.66536 5H14.1654C14.6654 5 14.9987 5.33333 14.9987 5.83333V13.3333C14.9987 13.8333 14.6654 14.1667 14.1654 14.1667Z"
                fill="#090808"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
 </>
  );
};

export default ErrorPage;
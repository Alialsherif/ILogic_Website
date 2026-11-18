import { useLocale } from '../i18n/useLocale';
import { useState } from "react"
import { useNavigate } from 'react-router';
import { localizedDestination } from '../i18n/locale';

const SearchBar = ({ IsSearchOpen,toggleSearch }) => {
  const { t, language } = useLocale();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

 const handleSearch = (e) => {
  e.preventDefault();
  // console.log statement removed from here
  if (searchQuery.trim()) {
    toggleSearch();
    navigate(localizedDestination(`/search?q=${encodeURIComponent(searchQuery)}`, language));
  }
};
  return (

    <>
      {IsSearchOpen && (
        <div
          className="mobile-offcanvas-overlay mobile-offcanvas-overlay-open"
          onClick={toggleSearch}
        ></div>
      )}
    <div aria-hidden={!IsSearchOpen} inert={!IsSearchOpen} className={`ab-search-bar d-flex align-items-center justify-content-center ${IsSearchOpen ? "ab-search-bar-open" : ""}`}>
      {/* Close Button */}
      <div className="ab-search-close" onClick={toggleSearch}>
        <button type="button" aria-label={t('Close search')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>
        </button>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="ab-search-box p-relative text-center">
              <h3 className="fs-32-white fs-32 mb-30">{t("What are you looking for?")}</h3>

              <form onSubmit={handleSearch}>
                <div className="ab-search-input p-relative d-flex align-items-center ">
                  <input
                    type="text"
                    className="w-100 fs-16"
                    placeholder={t("search here")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <button type="submit" className="ab-search-icon border-0 bg-transparent">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.7">
                        <path
                          d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                          fill="white"
                        />
                        <path
                          d="M21.9999 22.75C21.8099 22.75 21.6199 22.68 21.4699 22.53L19.4699 20.53C19.1799 20.24 19.1799 19.76 19.4699 19.47C19.7599 19.18 20.2399 19.18 20.5299 19.47L22.5299 21.47C22.8199 21.76 22.8199 22.24 22.5299 22.53C22.3799 22.68 22.1899 22.75 21.9999 22.75Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchBar;

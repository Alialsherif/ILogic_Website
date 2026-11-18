import SocialLinks from './SocialLinks';
import { useLocale } from '../i18n/useLocale';
import React, { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from './LanguageSwitcher';
import { localizedDestination } from '../i18n/locale';
import { useNavigate, useLocation } from 'react-router';
import { LocalizedLink as Link } from '../i18n/LocalizedLink'; // useNavigate
import { menuItems, navigationCurrent } from '../data/navigation';

const MobileMenu = ({ isOpen, toggleMenu }) => {
  const { t, language } = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const closeButton = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    // The offcanvas starts visibility:hidden; wait for its opening style to paint.
    let focusFrame;
    const openingFrame = requestAnimationFrame(() => {
      focusFrame = requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
    });
    return () => {
      cancelAnimationFrame(openingFrame);
      cancelAnimationFrame(focusFrame);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toggleMenu();
      navigate(localizedDestination(`/search?q=${encodeURIComponent(searchQuery)}`, language));
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="mobile-offcanvas-overlay mobile-offcanvas-overlay-open"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Main Offcanvas Container */}
      <div id="mobile-navigation" className={`ab-offcanvas ${isOpen ? "ab-offcanvas-open" : ""}`} role="dialog" aria-label={t('Open menu')} aria-modal={isOpen || undefined} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="ab-offcanvas-wrapper">
          {/* Header */}
          <div className="ab-offcanvas-header mb-40">
            <Link to="/" className="mobile-offcanvas-logo" onClick={toggleMenu}>
              <BrandLogo />
            </Link>
            <div className="ab-offcanvas-close">
              <button ref={closeButton} type="button" onClick={toggleMenu} aria-label={t('Close menu')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>
              </button>
            </div>
          </div>

          <div className="mb-30"><LanguageSwitcher /></div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="ab-search-input ab-offcanvas-search p-relative d-flex align-items-center mb-30">
              <input
                type="text"
                className="w-100 fs-16"
                placeholder={t("search here")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ab-search-icon border-0 bg-transparent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          {/* Navigation Menu */}
          <div className="ab-offcanvas-menu d-xl-none mb-30">
            <nav>
              <ul>
                {menuItems.map((item, index) => {
                  const isSubOpen = !!openSubmenus[index];
                  return (
                    <li key={index} className={isSubOpen ? "active" : ""}>
                      <Link
                        to={item.link}
                        aria-current={navigationCurrent(pathname, item)}
                        onClick={(e) => {
                          if (item.submenu) {
                            e.preventDefault();
                            toggleSubmenu(index);
                          } else {
                            toggleMenu();
                          }
                        }}
                      >
                        {t(item.title)}
                      </Link>

                      {item.submenu && (
                        <>
                          <button
                            className={`menu-close ${isSubOpen ? "open" : ""}`}
                            onClick={() => toggleSubmenu(index)}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={isSubOpen ? 'm6 9 6 6 6-6' : 'm9 6 6 6-6 6'}/></svg>
                          </button>

                          <ul className={`sub-menu-mobile ${isSubOpen ? "active" : ""}`}>
                            {item.submenu.map((sub, subIndex) => (
                              <li key={subIndex}>
                                <Link to={sub.link} onClick={toggleMenu}>
                                  {t(sub.title)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Information Section */}
          <div className="ab-offcanvas-info mb-30">
            <h4 className="fs-24 mb-20">{t("Information")}</h4>
            <div className="ab-offcanvas-info-item d-flex align-items-center gap-3 mb-20">
              <div className="mobile-offcanvas-info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m7 3-4 3c0 8 7 15 15 15l3-4-5-4-3 3-5-5 3-3z"/></svg>
              </div>
              <div>
                <span className="d-block fs-20">{t("Call Now")}</span>
                <a href="tel:(629)555-0129" className="info-text">(629) 555-0129</a>
              </div>
            </div>
          </div>

          <h4 className="fs-24 mb-20">{t("Follow Us")}</h4>
          <div className="ab-offcanvas-social d-inline-flex gap-2">
                  <SocialLinks />
                </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

import { useLocale } from '../i18n/useLocale';
// import  { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect, useRef } from "react";
import { LocalizedLink as Link } from '../i18n/LocalizedLink';



const Header = ({toggleMenu,toggleSearch,isMenuOpen}) => {
  const { t, language } = useLocale();

  const [isSticky, setIsSticky] = useState(false);
  const [mobileShape, setMobileShape] = useState('rest');
  const pill = useRef(null);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width:1199px)');
    let lastY = Math.max(0, window.scrollY), distance = 0, frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = Math.max(0, window.scrollY), delta = y - lastY;
        setIsSticky(y > 100);
        if (mobile.matches) {
          distance = Math.sign(delta) === Math.sign(distance) ? distance + delta : delta;
          if (Math.abs(distance) >= 10 || (y === 0 && delta < 0)) {
            setMobileShape(delta > 0 ? 'down' : 'up');
            distance = 0;
          }
        }
        lastY = y;
      });
    };
    const resetDirection = () => {
      lastY = Math.max(0, window.scrollY);
      distance = 0;
      setMobileShape('rest');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    mobile.addEventListener('change', resetDirection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mobile.removeEventListener('change', resetDirection);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const wrapper = pill.current;
    const logo = wrapper.querySelector('.ab-header-logo');
    const actions = wrapper.querySelector('.header-actions-column');
    const measure = () => {
      const width = wrapper.getBoundingClientRect().width;
      if (!width) return;
      const style = getComputedStyle(wrapper);
      const gap = parseFloat(getComputedStyle(wrapper.querySelector('.row')).columnGap) || 16;
      const needed = logo.getBoundingClientRect().width + actions.getBoundingClientRect().width + gap
        + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
        + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      // Keep enough room for both languages and 44px touch targets on narrow phones.
      const inset = Math.max(0, Math.min(16, (width - needed) / 2));
      wrapper.style.setProperty('--header-down-scale', (width - inset * 2) / width);
      wrapper.style.setProperty('--header-down-shift', `${inset}px`);
      wrapper.style.setProperty('--header-up-scale', (width + 16) / width);
      wrapper.style.setProperty('--header-up-shift', '-8px');
    };
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper); observer.observe(logo); observer.observe(actions);
    let active = true;
    document.fonts.ready.then(() => { if (active) measure(); });
    return () => { active = false; observer.disconnect(); };
  }, [language]);

  return (
    <>
 
 
    <header className="site-header">
      <div id="header-area" data-mobile-shape={mobileShape} className={`header-area ${isSticky ? "header-sticky" : ""}`}>
        <div className="custom-container-header container">
          <div ref={pill} className="header-wrapper ab-header br-12">
            <span className="header-glass" aria-hidden="true" />
            <div className="row align-items-center">
              
              {/* Logo */}
              <div className="col-xl-2 col-6 header-brand-column">
                <Link to="/" className="ab-header-logo">
                  <BrandLogo />
                </Link>
              </div>

              {/* Menu */}
              <div className="col-xl-6 d-none d-xl-block">
                <div className="d-flex justify-content-center header-menu-wrapper align-items-center">
                  <div className="main-menu ab-menu-active">
               <MenuItem/>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-xl-4 col-6 header-actions-column">
                <div className="header-actions d-flex align-items-center justify-content-end">

                  {/* Search */}
                  <div className="header-search ab-header-search d-none d-xl-block">
                    <button type="button" aria-label={t('Search')} onClick={toggleSearch}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.7">
                                                <path
                                                    d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                                                    fill="white" />
                                                <path
                                                    d="M21.9999 22.75C21.8099 22.75 21.6199 22.68 21.4699 22.53L19.4699 20.53C19.1799 20.24 19.1799 19.76 19.4699 19.47C19.7599 19.18 20.2399 19.18 20.5299 19.47L22.5299 21.47C22.8199 21.76 22.8199 22.24 22.5299 22.53C22.3799 22.68 22.1899 22.75 21.9999 22.75Z"
                                                    fill="white" />
                                            </g>
                                        </svg>
                    </button>
                  </div>

                  <LanguageSwitcher />

                  {/* Button */}
                  <div className="btn-wrapper d-none d-xl-block">
                    <Link className="primary-btn-one" to="contact">{t("LET’S TALK")}</Link>
                  </div>

                {/* Mobile Menu */}
                <div className="header-menu d-flex d-xl-none justify-content-end">
                  <button type="button" onClick={toggleMenu} aria-label={t('Open menu')} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
                    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 8h20M3 16h20"/></svg>
                  </button>
                </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
 
 </>
  );
};

export default Header;

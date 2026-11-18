import { useLocale } from '../i18n/useLocale';
import React, { useEffect } from 'react';
import { WOW } from 'wowjs';
import 'animate.css';

const ScrollRevealSection = () => {
  const { t } = useLocale();

 useEffect(() => {
    // Initialize WOW.js
    const wow = new WOW({
      live: false // Recommended for React to avoid conflict with Virtual DOM
    });
    wow.init();
  }, []);

  return (
    <div className="container py-5">
      {/* 1. Simple Fade In */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="wow animate__animated animate__fadeInDown">{t("Our Core Services")}</h2>
          <p className="wow ab-custom-anim-top" data-wow-delay="1.3s" data-wow-duration="1.5s">{t("Explore what we can do for your business.")}</p>
        </div>
      </div>

      <div className="row mt-5">
        {/* 2. Slide In from Left */}
        <div className="col-md-4 mb-4">
          <div 
            className="card p-4 wow animate__animated animate__slideInLeft" 
            data-wow-duration="1.5s" data-wow-delay="2.3s"
          >
            <h3>{t("Web Design")}</h3>
            <p>{t("Creating beautiful user interfaces with modern tools.")}</p>
          </div>
        </div>

        {/* 3. Zoom In with Delay */}
        <div className="col-md-4 mb-4">
          <div 
            className="card p-4 wow animate__animated animate__zoomIn" 
            data-wow-delay="3.5s"
          >
            <h3>{t("Development")}</h3>
            <p>{t("Scalable and high-performance backend solutions.")}</p>
          </div>
        </div>

        {/* 4. Slide In from Right */}
        <div className="col-md-4 mb-4">
          <div 
            className="card p-4 wow animate__animated animate__slideInRight" 
            data-wow-duration="1.5s"
          >
            <h3>{t("SEO")}</h3>
            <p>{t("Optimizing your presence for search engine results.")}</p>
          </div>
        </div>
      </div>

      {/* 5. Repeating Animation (Attention Seeker) */}
      <div className="text-center mt-5">
        <button 
          className="btn btn-primary wow animate__animated animate__pulse" 
          data-wow-iteration="infinite"
          data-wow-duration="2s"
        >{t("Contact Us Now")}</button>
      </div>
    </div>
  );
};

export default ScrollRevealSection;
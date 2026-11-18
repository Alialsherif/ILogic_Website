import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BrandLogo from "./BrandLogo";
import { useLocation } from 'react-router';

const Loader = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true); // Controls actual rendering

  useEffect(() => {
    const handleLoad = () => {
      // Add 100ms delay before removing loader
      setTimeout(() => {
        setShow(false);
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!show || ['/', '/partners', '/about', '/services', '/servicePage', '/projects', '/projectPage', '/contact'].includes(pathname.replace(/\/$/, '') || '/')) return null;

  return (
    <div className="sb-page-loader" role="status">
      <BrandLogo compact />
      <span className="loader"></span>
    </div>
  );
};

export default Loader;

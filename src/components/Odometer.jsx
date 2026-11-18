import { useEffect, useState } from "react";
import Odometer from "react-odometerjs";
import { useInView } from "react-intersection-observer";
import "odometer/themes/odometer-theme-default.css";

/**
 * OdometerCounter Component
 * 
 * Props:
 *  - value: number → target value to count up to
 *  - delay: number → ms before starting (default: 300)
 *  - format: string → Odometer number format (default: "(,ddd)")
 *  - className: string → extra CSS classes
 *  - once: boolean → whether animation should only trigger once (default: true)
 *  - threshold: number → intersection ratio to trigger animation (default: 0.3)
 */
const OdometerCounter = ({
  value,
  delay = 300,
  format = "(,ddd)",
  className = "fact-num",
  once = true,
  threshold = 0.3,
}) => {
  const [odometerValue, setOdometerValue] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setOdometerValue(value);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);

  return (
    <span ref={ref} className={className}>
      <Odometer value={odometerValue} format={format} />
    </span>
  );
};

export default OdometerCounter;

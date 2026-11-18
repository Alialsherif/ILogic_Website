import styles from './BrandLogo.module.css';

const BrandLogo = ({ compact = false }) => (
  <span lang="en" dir="ltr" className={`${styles.logo}${compact ? ` ${styles.compact}` : ''}`}>
    <span className={styles.initial}>I</span>Logic
  </span>
);

export default BrandLogo;

import { useEffect, useState } from 'react';
import { useLocale } from '../i18n/useLocale';
import { useSocialLinks } from './useSocialLinks';
import styles from './FloatingWhatsApp.module.css';
import SocialIcon from './SocialIcon';

export default function FloatingWhatsApp({ hidden = false }) {
  const { t } = useLocale();
  const [footerVisible, setFooterVisible] = useState(false);
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp');

  useEffect(() => {
    const footerContacts = document.querySelector('footer .ab-footer-midle');
    if (!footerContacts) return;
    // The footer already offers WhatsApp; leave its links and icons unobstructed.
    const observer = new IntersectionObserver(() => {
      setFooterVisible(footerContacts.getBoundingClientRect().top < window.innerHeight);
    });
    observer.observe(footerContacts);
    return () => observer.disconnect();
  }, []);

  if (hidden || footerVisible || !whatsapp) return null;

  return (
    <a
      className={styles.button}
      href={whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('Chat on WhatsApp')}
      title={t('Chat on WhatsApp')}
      data-whatsapp-contact
    >
      <span className={styles.icon} aria-hidden="true">
        <SocialIcon id="whatsapp" size="28" />
      </span>
      <span className={styles.label}>{t('Chat on WhatsApp')}</span>
    </a>
  );
}

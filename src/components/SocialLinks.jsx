import { useLocale } from '../i18n/useLocale';
import { useSocialLinks } from './useSocialLinks';
import styles from './SocialLinks.module.css';
import SocialIcon from './SocialIcon';

export default function SocialLinks({ text = false, linkClassName = '' }) {
  const { t } = useLocale();
  const links = useSocialLinks();

  return links.map(({ id, label, url }) => (
    <a
      key={id}
      href={url}
      className={`${styles.link} ${linkClassName}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(label)}
      data-social={id}
      data-social-variant={text ? 'text' : 'icon'}
    >
      {text ? t(label) : <SocialIcon id={id} />}
    </a>
  ));
}

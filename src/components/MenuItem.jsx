import { useLocale } from '../i18n/useLocale';
import { useLocation } from 'react-router';
import { LocalizedLink as Link } from '../i18n/LocalizedLink';
import { menuItems, navigationCurrent } from '../data/navigation';

const MenuItem = () => {
  const { t } = useLocale();
  const { pathname } = useLocation();

    return (
        <>
            <nav className="mobile-menu-active">
                <ul>
                    {menuItems.map(item => (
                        <li key={item.link}>
                            <Link to={item.link} aria-current={navigationCurrent(pathname, item)}>
                                {t(item.title)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default MenuItem;

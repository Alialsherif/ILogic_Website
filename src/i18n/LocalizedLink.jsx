import { Link } from 'react-router';
import { useLocale } from './useLocale';
import { localizedDestination } from './locale';

export function LocalizedLink({ to, ...props }) {
  const { language } = useLocale();
  return <Link to={localizedDestination(to, language)} {...props} />;
}

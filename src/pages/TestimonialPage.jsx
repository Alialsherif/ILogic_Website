import { useLocale } from '../i18n/useLocale';
 
import Breadcrumb from '../components/Breadcrum'
import Pricing from '../components/Price'
import Testimonial from '../components/Testimonial'

const TestimonialPage = () => {
  const { t } = useLocale();

  return (
    <>
    <Breadcrumb title={t("testimonial")} />
    <Testimonial/>
    <Pricing/>
    </>
  )
}

export default TestimonialPage
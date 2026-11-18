import { useLocale } from '../i18n/useLocale';
 

const SectionTitle = ({ title, subtitle,titleTextTwo,titleTextThree ,titleClass='',subtitleClassWhite='', titleClassWhite='' ,mt='',pt='',mb=""}) => {
  const { t } = useLocale();

    return (
        <>
            <span className={` ${subtitleClassWhite} `}>
               {t(subtitle)}

            </span>
            <h2 className={`ab-section-title title-anim overflow-hidden  ${titleClass} ${titleClassWhite} ${mt} ${pt} ${mb}` }>
              {t(title)}
              <span className={`ab-section-title-2`}> {t(titleTextTwo)} </span>
                {t(titleTextThree)}
            </h2>
 
        </>
    )
}

export default SectionTitle
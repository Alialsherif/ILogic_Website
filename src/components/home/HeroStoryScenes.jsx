import { useLocale } from '../../i18n/useLocale';
import { ArrowIcon } from './BrandElements';

export function StoryIcon({ name, size = 22 }) {
  const paths = {
    requests: <path d="M4 4h16v12h-4l-4 4-4-4H4zM8 8h8m-8 4h5" />,
    data: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6m-6 5h6m-6 5h4" /></>,
    followup: <path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4zm5 3h4M12 2v2" />,
    system: <><rect x="8" y="8" width="8" height="8" rx="2" /><path d="M12 3v5m0 8v5M3 12h5m8 0h5M6 6l3 3m6 6 3 3M6 18l3-3m6-6 3-3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    time: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    growth: <path d="m4 17 6-6 4 3 6-9m-6 0h6v6M4 21h16" />,
    search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></>,
    web: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.1m3 0h.1M7 13h10m-10 3h6"/></>,
    store: <><path d="m4 8 2-5h12l2 5M4 8v3a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0V8ZM5 13v8h14v-8M9 21v-6h6v6"/></>,
    product: <><path d="m3 7 9-4 9 4-9 4zm0 0v10l9 4 9-4V7M12 11v10M7 5l10 4"/></>,
    cart: <><path d="M3 4h3l2 12h11l2-9H7"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Header({ title, icon = 'system' }) {
  return <div className="hero-system__toolbar"><span><StoryIcon name={icon} size={18}/>{title}</span><i/><i/><i/></div>;
}

function BenefitRail({ prefix, icons }) {
  const { t } = useLocale();
  return <div className="hero-system__status">{icons.map((icon,index)=><span className="hero-system__benefit" data-benefit={index} key={icon}><StoryIcon name={icon} size={14}/><span>{t(`${prefix}.benefit.${icon}`)}</span>{index<2&&<span className="hero-system__benefit-arrow"><ArrowIcon/></span>}</span>)}</div>;
}

export function AutomationScene() {
  const { t } = useLocale();
  return <div className="hero-system__workspace">
    <Header title={t('home.heroVisual.workspace')}/>
    <div className="hero-system__tasks">{['requests','data','followup'].map((task,index)=><div key={task} className={`hero-system__task hero-system__task--${task}`} style={{'--task-index':index}}>
      <span className="hero-system__task-icon"><StoryIcon name={task}/></span>
      <div className="hero-system__task-copy"><span className="hero-system__task-title">{t(`home.heroVisual.task.${task}`)}</span><div className="hero-system__task-detail"><span className="hero-system__manual">{t(`home.heroVisual.manual.${task}`)}</span><span className="hero-system__automated">{t(`home.heroVisual.automated.${task}`)}</span></div></div>
      <span className="hero-system__task-state"><StoryIcon name="check" size={16}/></span>
    </div>)}</div>
    <div className="hero-system__routing"><span/><StoryIcon name="system" size={22}/><span/></div>
    <BenefitRail prefix="home.heroVisual" icons={['system','time','growth']}/>
  </div>;
}

export function SearchScene() {
  const { t } = useLocale();
  return <div className="hero-system__workspace hero-search">
    <div className="hero-search__field"><StoryIcon name="search" size={16}/><span>{t('home.heroSearch.query')}</span></div>
    <div className="hero-search__results">
      <div className="hero-search__result hero-search__other"><StoryIcon name="web" size={23}/><div><span>{t('home.heroSearch.other')}</span><small>{t('home.heroSearch.otherText')}</small></div><StoryIcon name="requests" size={16}/></div>
      <div className="hero-search__missing"><span>{t('home.heroSearch.missing')}</span></div>
      <div className="hero-search__result hero-search__yours"><StoryIcon name="web" size={23}/><div><span>{t('home.heroSearch.yours')}</span><small>{t('home.heroSearch.yourText')}</small></div><span className="hero-search__contact"><StoryIcon name="requests" size={16}/></span></div>
    </div>
    <BenefitRail prefix="home.heroSearch" icons={['search','web','requests']}/>
  </div>;
}

export function StoreScene() {
  const { t } = useLocale();
  return <div className="hero-system__workspace hero-store">
    <Header title={t('home.heroStore.workspace')} icon="store"/>
    <div className="hero-store__catalog">{['first','second','third'].map((key,index)=><div className={`hero-store__product${index===1?' is-selected':''}`} key={key}><StoryIcon name="product" size={30}/><span>{t('home.heroStore.product')}</span><i/><span className="hero-store__selected"><StoryIcon name="check" size={13}/></span></div>)}</div>
    <div className="hero-store__order"><StoryIcon name="cart" size={20}/><div><span>{t('home.heroStore.order')}</span><small>{t('home.heroStore.orderText')}</small></div><StoryIcon name="check" size={16}/></div>
    <BenefitRail prefix="home.heroStore" icons={['product','cart','followup']}/>
  </div>;
}

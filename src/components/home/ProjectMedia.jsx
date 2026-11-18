import { useLocale } from '../../i18n/useLocale';
import PortfolioVideo from './PortfolioVideo';
import assets from '../../data/homeAssets.json';
import { projects } from '../../data/homeContent';

export default function ProjectMedia({ assetKey, priority = false }) {
  const { t } = useLocale();
  const asset = assets[assetKey], project = projects.find(item => item.asset === assetKey);
  const alt = t(`home.asset.${assetKey}.alt`);
  if (project?.video) return <PortfolioVideo video={project.video} label={alt} />;
  const laptop = assets.laptopFrame;
  if (asset.available && laptop?.available && project?.href) return <div className={`home-asset-frame home-laptop-mockup home-asset-${assetKey}`} style={{ aspectRatio: `${laptop.width} / ${laptop.height}` }}>
    <img className="home-laptop-screen" src={asset.src} alt={alt} width={asset.width} height={asset.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    <img className="home-laptop-frame" src={laptop.src} alt="" aria-hidden="true" width={laptop.width} height={laptop.height} loading={priority ? 'eager' : 'lazy'} decoding="async" />
  </div>;
  return <div className={`home-asset-frame home-asset-${assetKey}`} style={{ aspectRatio: `${asset.width} / ${asset.height}` }}>
    {asset.available ? <img src={asset.src} alt={alt} width={asset.width} height={asset.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" /> : <div className="home-asset-placeholder" role="img" aria-label={alt}><svg width="220" height="120" viewBox="0 0 220 120" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="24" y="12" width="150" height="90" rx="7" /><path d="M24 30h150M12 108h174M82 102v6m32-6v6" /><rect x="159" y="49" width="45" height="66" rx="7" /><path d="M173 57h16M171 106h21M44 47h68m-68 13h47M44 83h44" /></svg></div>}
  </div>;
}

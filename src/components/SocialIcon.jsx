// Native SVG versions of the existing Font Awesome brand marks (bundled license retained).
const source = import.meta.glob('../assets/fonts/fontawesome-free-6.7.1-web/svgs/brands/{facebook,instagram,linkedin,whatsapp,youtube,x-twitter,tiktok}.svg', { eager:true, query:'?raw', import:'default' });
const names = { facebook:'facebook', instagram:'instagram', linkedin:'linkedin', whatsapp:'whatsapp', youtube:'youtube', x:'x-twitter', tiktok:'tiktok' };

export default function SocialIcon({ id, size = '1em' }) {
  const svg = source[`../assets/fonts/fontawesome-free-6.7.1-web/svgs/brands/${names[id]}.svg`];
  if (!svg) return null;
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] || '0 0 512 512';
  const body = svg.replace(/^[\s\S]*?<svg\b[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  return <svg width={size} height={size} viewBox={viewBox} fill="currentColor" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html:body }} />;
}

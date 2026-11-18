const platforms = [
  { id: 'facebook', label: 'Facebook', icon: 'fa-facebook' },
  { id: 'instagram', label: 'Instagram', icon: 'fa-instagram' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'fa-linkedin' },
  { id: 'youtube', label: 'YouTube', icon: 'fa-youtube' },
  { id: 'x', label: 'X (Twitter)', icon: 'fa-x-twitter' },
  { id: 'tiktok', label: 'TikTok', icon: 'fa-tiktok' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'fa-whatsapp' },
];

export function resolveSocialLinks(config) {
  return platforms.flatMap(platform => {
    const value = config?.[platform.id];
    if (typeof value !== 'string' || !value.trim()) return [];
    try {
      const url = new URL(value.trim());
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return [];
      return [{ ...platform, url: url.href }];
    } catch {
      return [];
    }
  });
}

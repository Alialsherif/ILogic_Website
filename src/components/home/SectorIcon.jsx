export default function SectorIcon({ slug, size = 32 }) {
  const icons = {
    clinics: <><rect x="8" y="8" width="48" height="48" rx="12" /><path d="M27 19h10v8h8v10h-8v8H27v-8h-8V27h8z" /></>,
    beauty: <><circle cx="29" cy="23" r="15" /><circle cx="29" cy="23" r="10" /><path d="M25 38v16h8V38M23 54h12M25 17l8 8" /></>,
    dental: <path d="M32 12c-8-6-19-3-20 7-1 9 4 14 6 23 1 7 2 13 6 13 5 0 3-16 8-16s3 16 8 16c4 0 5-6 6-13 2-9 7-14 6-23-1-10-12-13-20-7Zm-7 4 7 3 7-3" />,
    'medical-centers': <><path d="M10 56V23h15V9h27v47M5 56h54M25 23v33M33 38h5m6 0h3m-14 8h5m6 0h3M16 31h3m-3 8h3m-3 8h3" /><path d="M36 16h6v5h5v6h-5v5h-6v-5h-5v-6h5z" /></>,
    restaurants: <><path d="M12 19h34v18a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14V19Zm34 4h5a7 7 0 0 1 0 14h-5M7 56h45M23 5v8m9-8v8m9-8v8" /></>,
    'real-estate': <><path d="m6 29 26-22 26 22M13 25v31h38V25M25 56V38h14v18M24 27h16M43 15V7h8v15" /></>,
    education: <><path d="M32 15c-9-6-17-7-25-5v40c8-2 16-1 25 5 9-6 17-7 25-5V10c-8-2-16-1-25 5Zm0 0v40M14 21l10 3m-10 8 10 3m-10 8 10 3m16-22 10-3m-10 14 10-3m-10 14 10-3" /></>,
    industrial: <><path d="M7 56V26l15-9v14l15-9v34M37 56V8h13l7 48M3 56h58M14 40h6m7 0h5m-18 8h6m7 0h5M40 18h11" /></>,
    retail: <><path d="M12 21h40l4 35H8l4-35Zm10 0v-7a10 10 0 0 1 20 0v7M22 29v3m20-3v3" /></>,
    'professional-services': <><path d="M32 8v46M17 56h30M10 19h44M32 9l-4 10m4-10 4 10M15 19 5 40h20L15 19Zm34 0L39 40h20L49 19ZM5 40a10 8 0 0 0 20 0m14 0a10 8 0 0 0 20 0" /></>,
    hospitality: <><path d="M7 16v40m50-28v28M7 43h50M7 28h42a8 8 0 0 1 8 8v7M12 21h13v7H12v-7Zm20 7v15M7 50h50" /></>,
    fitness: <><path d="M22 27h20v10H22zM14 16h8v32h-8zM6 22h8v20H6zM42 16h8v32h-8zM50 22h8v20h-8z" /></>,
  };
  return <svg className="home-sector-icon" width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[slug]}</svg>;
}

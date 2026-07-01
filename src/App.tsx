import { lazy, Suspense, useEffect } from 'react';
import { PROSPECTS, resolveProspectSlug } from './data/prospects';
import './App.css';

const RazanLanding = lazy(() => import('./pages/RazanLanding'));
const SalahLanding = lazy(() => import('./pages/SalahLanding'));
const MainSite = lazy(() => import('./pages/MainSite'));
const ThankYou = lazy(() => import('./sections/ThankYou'));

function App() {
  const pathname = window.location.pathname;
  const slug = resolveProspectSlug();

  // Per-prospect metadata (each prospect deploys to its own Worker subdomain).
  useEffect(() => {
    const meta = PROSPECTS[slug];
    if (!meta) return;
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', meta.description);
  }, [slug]);

  // Routing (lightweight, matches existing pathname-based approach)
  if (pathname.includes('/thank-you')) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
        <ThankYou />
      </Suspense>
    );
  }

  // Original marketing homepage, preserved at /main
  if (pathname.includes('/main')) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
        <MainSite />
      </Suspense>
    );
  }

  // Personalized Dream100 prospect page, selected by hostname/slug.
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      {slug === 'salah-el-deen' ? <SalahLanding /> : <RazanLanding />}
    </Suspense>
  );
}

export default App;

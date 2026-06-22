import { lazy, Suspense } from 'react';
import './App.css';

const RazanLanding = lazy(() => import('./pages/RazanLanding'));
const MainSite = lazy(() => import('./pages/MainSite'));
const ThankYou = lazy(() => import('./sections/ThankYou'));

function App() {
  const pathname = window.location.pathname;

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

  // Default: the personalized Dream100 prospect page (root of this deployment)
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <RazanLanding />
    </Suspense>
  );
}

export default App;

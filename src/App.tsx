import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RazanLanding from './pages/RazanLanding';
import MainSite from './pages/MainSite';
import ThankYou from './sections/ThankYou';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  const pathname = window.location.pathname;

  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Routing (lightweight, matches existing pathname-based approach)
  if (pathname.includes('/thank-you')) {
    return <ThankYou />;
  }

  // Original marketing homepage, preserved at /main
  if (pathname.includes('/main')) {
    return (
      <div ref={mainRef}>
        <MainSite />
      </div>
    );
  }

  // Default: the personalized Dream100 prospect page (root of this deployment)
  return (
    <div ref={mainRef}>
      <RazanLanding />
    </div>
  );
}

export default App;

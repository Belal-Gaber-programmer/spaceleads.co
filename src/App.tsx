import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import WhyYouTube from './sections/WhyYouTube';
import Testimonial from './sections/Testimonial';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Results from './sections/Results';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import BookCall from './sections/BookCall';
import Footer from './sections/Footer';
import ThankYou from './sections/ThankYou';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Check for thank-you page (accounting for base path /spaceleads/)
  const pathname = window.location.pathname;
  if (pathname.includes('/spaceleads/thank-you') || pathname.endsWith('/thank-you')) {
    return <ThankYou />;
  }

  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all content loads
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#FAFAFA] text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <WhyYouTube />
        <Testimonial />
        <Portfolio />
        <Process />
        <Results />
        <FAQ />
        <BookCall />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;

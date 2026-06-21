import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import WhyYouTube from '../sections/WhyYouTube';
import Testimonial from '../sections/Testimonial';
import Portfolio from '../sections/Portfolio';
import Process from '../sections/Process';
import Results from '../sections/Results';
import FAQ from '../sections/FAQ';
import FinalCTA from '../sections/FinalCTA';
import BookCall from '../sections/BookCall';
import Footer from '../sections/Footer';
import ScrollToTop from '../components/ScrollToTop';

/**
 * The original spaceleads.co marketing homepage, preserved intact.
 * Reachable at `/main` so the personalized prospect page can own the root.
 */
const MainSite = () => (
  <div className="min-h-screen bg-[#FAFAFA] text-black overflow-x-hidden">
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

export default MainSite;

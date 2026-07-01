import Navbar from '../sections/Navbar';
import SalahHero from '../sections/personalized/SalahHero';
import SalahStrategyContent from '../sections/personalized/SalahStrategyContent';
import BookCall from '../sections/BookCall';
import Testimonial from '../sections/Testimonial';
import Portfolio from '../sections/Portfolio';
import FAQ from '../sections/FAQ';
import Footer from '../sections/Footer';
import ScrollToTop from '../components/ScrollToTop';

// Personalized navbar links (per Dream100 spec) — identical to the standard template
const navLinks = [
  { label: 'Strategy', href: '#strategy' },
  { label: 'Book a Call', href: '#book-call' },
  { label: 'Case Studies', href: '#testimonials' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
];

// "Some of Our Work" grid — identical to the standard template.
const portfolioVideos = [
  { id: 'hkdgu3Dv5NM', title: 'Featured Client Work' },
  { id: '4UQ9LLOU6PM', title: 'Client Work 2' },
  { id: 'qc26rDe1uio', title: 'Client Work 3' },
  { id: 'F5nI1yppWcc', title: 'Client Work 4' },
  { id: 'Yev5ouUo6PU', title: 'Client Work 5' },
  { id: 'qpNsKYcsP5c', title: 'Client Work 6' },
];

const SalahLanding = () => (
  <div className="min-h-screen bg-[#FAFAFA] text-black overflow-x-hidden">
    <Navbar links={navLinks} />
    <main>
      <SalahHero />
      <SalahStrategyContent />
      <BookCall
        badge="Free Strategy Call"
        title={
          <>
            Ready to Implement This <span className="text-red-500">Strategy?</span>
          </>
        }
        subtitle="Book your free strategy call below to discuss how we can build this for you."
      />
      <Testimonial showResults />
      <Portfolio videos={portfolioVideos} />
      <FAQ />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default SalahLanding;

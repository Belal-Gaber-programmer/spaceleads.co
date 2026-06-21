import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { label: 'Why YouTube', href: '#why-youtube' },
  { label: 'Case Studies', href: '#testimonials' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = ({ links }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = links ?? defaultLinks;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div 
      id="main-nav-container" 
      className={`fixed top-0 left-0 w-full z-[100] px-4 md:px-8 pointer-events-none transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <nav 
        className={`max-w-7xl mx-auto flex justify-between items-center pointer-events-auto transition-all duration-700 rounded-[2rem] px-8 py-4 ${
          isScrolled ? 'bg-white/80 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-black/[0.03]' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-black text-2xl tracking-tighter uppercase text-black">
            Space
          </span>
          <span className="font-black text-2xl tracking-tighter uppercase text-red-500">
            Leads
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-red-500 transition-all relative group/nav"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-red-500 transition-all duration-500 group-hover/nav:w-full group-hover/nav:left-0" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex">
          <button
            onClick={() => scrollToSection('#book-call')}
            className="bg-black text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 transition-colors duration-300 shadow-xl"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-black p-2 bg-black/[0.03] rounded-xl hover:bg-red-500/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-700 ease-in-out overflow-hidden pointer-events-auto ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-black/[0.03] p-10 space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left text-black/40 hover:text-red-500 text-lg font-black uppercase tracking-widest transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#book-call')}
            className="w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 transition-colors shadow-2xl shadow-black/20"
          >
            Book a Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

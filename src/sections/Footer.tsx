import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/belalgaberrr' },
  { icon: Twitter, label: 'X', href: 'https://x.com/belalgaberrr' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/belalgaberrr' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@belalgaberbiz' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations reserved
    }, footerRef);
    return () => ctx.revert();
  }, []);



  return (
    <footer ref={footerRef} className="relative bg-white pt-24 pb-12 border-t border-black/[0.03] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-red-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">

          {/* Brand Column */}
          <div className="space-y-8">
            <a href="#" className="flex items-center gap-1 group">
              <span className="font-black text-3xl tracking-tighter uppercase text-black">Space</span>
              <span className="font-black text-3xl tracking-tighter uppercase text-red-500">Leads</span>
            </a>
            <p className="text-black/40 font-medium leading-relaxed max-w-xs">
              The #1 YouTube Client Acquisition System for high-ticket business owners and coaches. We help you dominate your market through engineered long form youtube content
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-11 h-11 rounded-full bg-[#FAFAFA] border border-black/[0.03] flex items-center justify-center text-black/40 hover:text-white hover:bg-red-500 transition-all duration-500 group/social"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 transition-transform duration-500 group-hover/social:scale-110" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-black">Navigation</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Why YouTube', href: '#why-youtube' },
                { label: 'Case Studies', href: '#testimonials' },
                { label: 'Our Work', href: '#portfolio' },
                { label: 'Process', href: '#process' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-black/40 font-bold hover:text-red-500 flex items-center gap-2 group/link transition-all"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-black">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:belal@spaceleads.co"
                className="text-black/40 font-bold hover:text-red-500 transition-colors flex items-center gap-2 group/email"
              >
                belal@spaceleads.co
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/email:opacity-100 transition-all" />
              </a>
            </div>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.03] flex items-center justify-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">
            &copy; {new Date().getFullYear()} SpaceLeads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

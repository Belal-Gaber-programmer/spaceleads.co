import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';

const BookOnline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bo-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'expo.out',
          delay: 0.1,
        }
      );
    }, containerRef);

    // Load GHL's iframe-resize script for the booking widget
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      ctx.revert();
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] flex flex-col items-center px-4 py-16">
      {/* Logo */}
      <a href="/" className="bo-item flex items-center gap-1 mb-12">
        <span className="font-black text-2xl tracking-tighter uppercase text-black">Space</span>
        <span className="font-black text-2xl tracking-tighter uppercase text-red-500">Leads</span>
      </a>

      {/* Heading */}
      <div className="bo-item w-full max-w-3xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-4">
          Book Your <span className="text-red-500">Discovery Call</span>
        </h1>
        <p className="text-base md:text-lg text-black/40 font-medium max-w-xl mx-auto">
          Pick a time that works for you and we'll take it from there.
        </p>
      </div>

      {/* Booking Embed */}
      <div className="bo-item w-full max-w-3xl rounded-3xl overflow-hidden bg-white shadow-2xl border border-black/[0.04]">
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/LpGGCB0PmWHRumhoB2sk"
          style={{ width: '100%', border: 'none', overflow: 'hidden' }}
          scrolling="no"
          id="LpGGCB0PmWHRumhoB2sk_1787517513434"
          title="Book a discovery call"
        />
      </div>

      {/* Back link */}
      <a
        href="/"
        className="bo-item mt-12 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 hover:text-red-500 transition-colors duration-300"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to home
      </a>
    </div>
  );
};

export default BookOnline;

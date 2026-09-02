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

    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Add event listener for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        window.location.href = 'https://spaceleads.co/thank-you';
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      ctx.revert();
      document.body.removeChild(script);
      window.removeEventListener('message', handleCalendlyEvent);
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
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/spaceleads/freeconsultation?hide_gdpr_banner=1"
          style={{ minWidth: '320px', height: '700px' }}
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

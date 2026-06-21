import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BookCallProps {
  badge?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
}

const BookCall = ({ badge, title, subtitle }: BookCallProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations temporarily disabled
    }, sectionRef);

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
    <section
      id="book-call"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef}>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <Calendar className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-red-500 uppercase tracking-wider">{badge ?? 'Free Discovery Call'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
              {title ?? (
                <>
                  Book a <span className="text-red-500">Call</span>
                </>
              )}
            </h2>
            <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium">
              {subtitle ?? "Schedule a Free Discovery Call. We'll analyze your current content and show you exactly how to turn YouTube into your #1 client acquisition channel."}
            </p>
          </div>

          {/* Calendly Embed Container */}
          <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-black/5">
            <div 
              className="calendly-inline-widget"
              data-url="https://calendly.com/spaceleads/freeconsultation?hide_gdpr_banner=1"
              style={{minWidth: '320px', height: '700px'}}
            />
          </div>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default BookCall;

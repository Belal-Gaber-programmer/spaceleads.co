import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Calendar } from 'lucide-react';

const CALENDLY_SCRIPT_ID = 'calendly-widget-script';
const CALENDLY_URL = 'https://calendly.com/spaceleads/freeconsultation?hide_gdpr_banner=1';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

interface BookCallProps {
  badge?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
}

const BookCall = ({ badge, title, subtitle }: BookCallProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [shouldLoadCalendly, setShouldLoadCalendly] = useState(false);
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !('IntersectionObserver' in window)) {
      const timer = window.setTimeout(() => setShouldLoadCalendly(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCalendly(true);
          observer.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadCalendly) {
      return;
    }

    const initCalendly = () => {
      if (!widgetRef.current || !window.Calendly || widgetRef.current.childElementCount > 0) {
        return;
      }

      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      });
      setIsCalendlyReady(true);
    };

    let script = document.getElementById(CALENDLY_SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = CALENDLY_SCRIPT_ID;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    if (window.Calendly) {
      initCalendly();
    } else {
      script.addEventListener('load', initCalendly, { once: true });
    }

    // Add event listener for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        window.location.href = 'https://spaceleads.co/thank-you';
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      script?.removeEventListener('load', initCalendly);
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [shouldLoadCalendly]);

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
            <div className="relative h-[620px] md:h-[700px] min-w-[320px]">
              <div ref={widgetRef} className="absolute inset-0 h-full w-full" />
              {!isCalendlyReady && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white"
                  aria-hidden="true"
                >
                  <div className="h-12 w-12 rounded-full border-4 border-black/10 border-t-red-500 animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 hidden md:block w-96 h-96 bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 hidden md:block w-96 h-96 bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default BookCall;

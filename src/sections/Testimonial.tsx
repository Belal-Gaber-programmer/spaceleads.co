import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';
import LiteYouTube from '../components/LiteYouTube';
import DepthDeckCarousel from '../components/DepthDeckCarousel';

gsap.registerPlugin(ScrollTrigger);

const videoTestimonials = [
  {
    id: 'XK1ShDotStw',
    title: 'Client Success Story 1',
  },
  {
    id: 'VoGaznOPlXU',
    title: 'Client Success Story 2',
  },
];

interface TestimonialProps {
  /** When true, renders the results-screenshots carousel directly beneath the
   *  testimonials within this same section (no "Our Results" heading). */
  showResults?: boolean;
}

const Testimonial = ({ showResults = false }: TestimonialProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Card animation
      gsap.fromTo(
        '.testimonial-card',
        { y: 100, opacity: 0, scale: 0.9, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video cards stagger animation
      const videoCards = containerRef.current?.querySelectorAll('.video-testimonial-card');
      if (videoCards) {
        gsap.fromTo(
          videoCards,
          { y: 150, opacity: 0, scale: 0.8, rotateY: 20 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-white overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
            Why Clients <span className="text-red-500">Love Us</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-3xl mx-auto font-medium text-balance">
            Don't just take our word for it. Hear directly from the founders we've helped scale.
          </p>
        </div>

        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Text Testimonial - Idriis Abu Haythami (Combined - Tall Card) */}
            <div className="testimonial-card relative bg-[#FAFAFA] rounded-[2.5rem] p-8 md:p-10 xl:p-12 shadow-2xl border border-black/[0.03] overflow-hidden lg:w-1/2">
              <div className="absolute top-0 right-0 p-8 select-none pointer-events-none opacity-[0.02]">
                <Quote className="w-48 h-48 rotate-180" />
              </div>

              <div className="relative z-10 text-center max-w-3xl mx-auto h-full flex flex-col">
                <div className="flex items-center justify-center gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={`idriis-${s}`} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>

                <div className="space-y-1 mb-8">
                  <p className="font-black text-lg text-black">Idriis Abu Haythami</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">CEO & Founder @ Zaad Institute</p>
                </div>

                {/* First Testimonial */}
                <div className="mb-8">
                  <blockquote className="mb-6">
                    <p className="text-lg sm:text-xl xl:text-2xl font-black text-black leading-tight tracking-tight max-w-[28ch] mx-auto">
                      "How This Coach Booked <span className="text-red-500 underline decoration-black/10 underline-offset-8">20 Calls</span> From YouTube in <span className="text-red-500 underline decoration-black/10 underline-offset-8">14 Days</span> (Case Study)"
                    </p>
                  </blockquote>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/[0.05]">
                    <LiteYouTube videoId="F1OCIakR9y0" title="Idriis Abu Haythami - Client Success" />
                  </div>
                </div>

                {/* Second Testimonial */}
                <div className="mt-auto">
                  <blockquote className="mb-6">
                    <p className="text-lg sm:text-xl xl:text-2xl font-black text-black leading-tight tracking-tight max-w-[28ch] mx-auto">
                      "In 30 days, one video brought us <span className="text-red-500 underline decoration-black/10 underline-offset-8">16,000 views</span> and <span className="text-red-500 underline decoration-black/10 underline-offset-8">20 warm calls</span> ready to buy."
                    </p>
                  </blockquote>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/[0.05]">
                    <LiteYouTube videoId="TSrTVrUZw0U" title="Idriis Abu Haythami - Case Study" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Text Testimonial 2 - Zahra */}
            <div className="testimonial-card relative bg-[#FAFAFA] rounded-[2.5rem] p-8 md:p-10 xl:p-12 shadow-2xl border border-black/[0.03] overflow-hidden lg:w-1/2 lg:self-start">
              {/* Subtle Background Text */}
              <div className="absolute top-0 right-0 p-8 select-none pointer-events-none opacity-[0.02]">
                <Quote className="w-48 h-48 rotate-180" />
              </div>

              <div className="relative z-10 text-center max-w-3xl mx-auto h-full flex flex-col">
                <div className="flex items-center justify-center gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={`zahra-${s}`} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>

                <div className="space-y-1 mb-8">
                  <p className="font-black text-lg text-black">Zahra</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Founder & Network Marketer</p>
                </div>

                <blockquote className="mb-10 flex-grow">
                  <p className="text-xl sm:text-2xl xl:text-3xl font-black text-black leading-tight tracking-tight">
                    "Zahra went from <span className="text-red-500 underline decoration-black/10 underline-offset-8">2,000 subscribers to 6,000</span> in 90 days, and had her <span className="text-red-500 underline decoration-black/10 underline-offset-8">biggest business month</span>, signing 8 clients."
                  </p>
                </blockquote>

                <div className="mt-auto">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/[0.05]">
                    <LiteYouTube videoId="rwT_YDTrbpo" title="Zahra - Client Success" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Video Testimonials Grid */}
          <div ref={containerRef} className="grid sm:grid-cols-2 gap-8 md:gap-12 mt-20 md:mt-32 max-w-3xl mx-auto">
            {videoTestimonials.map((video) => (
              <div 
                key={video.id}
                className="video-testimonial-card relative aspect-[9/16] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border border-black/[0.05]"
              >
                {/* Video container with proper scaling for 9:16 YouTube Shorts */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <LiteYouTube 
                    videoId={video.id} 
                    title={video.title} 
                    aspectRatio="portrait"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Subtle corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent pointer-events-none" />

              </div>
            ))}
          </div>

          {/* Results screenshots carousel — flows directly under the testimonials
              (no "Our Results" heading) when enabled on the personalized page. */}
          {showResults && (
            <div className="mt-20 md:mt-28">
              <DepthDeckCarousel />
            </div>
          )}
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-500/[0.03] blur-[120px] rounded-full -ml-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/[0.03] blur-[120px] rounded-full -mr-48" />
    </section>
  );
};

export default Testimonial;

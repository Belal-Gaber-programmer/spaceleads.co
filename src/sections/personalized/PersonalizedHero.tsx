import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, ScrollText, Youtube, Sparkles } from 'lucide-react';
import LiteYouTube from '../../components/LiteYouTube';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════
   HERO VIDEO — SWAP IN RAZAN'S WALKTHROUGH HERE
   ───────────────────────────────────────────────────────────────────────
   Set exactly ONE of the two constants below, then redeploy:
     • HERO_YOUTUBE_ID  → a YouTube/Loom-on-YT id, e.g. 'X0DJ9p6q2Gk'
     • HERO_LOOM_URL    → a Loom *embed* url,        e.g. 'https://www.loom.com/embed/<id>'
   Leave both null to show the branded placeholder.
   ═══════════════════════════════════════════════════════════════════════ */
const HERO_YOUTUBE_ID: string | null = null;
const HERO_LOOM_URL: string | null = null;

const PROSPECT_NAME = 'Razan Cheaito';
const PROSPECT_FIRST_NAME = 'Razan';

const HeroVideo = () => {
  if (HERO_YOUTUBE_ID) {
    return <LiteYouTube videoId={HERO_YOUTUBE_ID} title={`Personalized walkthrough for ${PROSPECT_NAME}`} />;
  }

  if (HERO_LOOM_URL) {
    return (
      <iframe
        src={HERO_LOOM_URL}
        title={`Personalized walkthrough for ${PROSPECT_NAME}`}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
      />
    );
  }

  // Branded placeholder — looks intentional until the real video is dropped in.
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#0c0c0c] to-[#1a0505] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] hero-dot-bg" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-500/20 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/20 blur-[100px] rounded-full" />

      <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-red-600/90 text-white rounded-full shadow-[0_0_50px_rgba(239,68,68,0.5)]">
        <Play className="w-8 h-8 fill-current ml-1" />
      </div>
      <div className="absolute z-0 w-20 h-20 bg-red-500/30 rounded-full animate-ping opacity-75" />

      <p className="relative z-10 mt-8 text-white font-black text-base md:text-lg tracking-tight">
        Personalized walkthrough for {PROSPECT_FIRST_NAME}
      </p>
      <p className="relative z-10 mt-2 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
        Video loading shortly
      </p>
    </div>
  );
};

const PersonalizedHero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set('.hero-content', { y: -60 * self.progress });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-[160px] pb-16"
    >
      <style>{`
        @keyframes floatY      { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-12px) rotate(-8deg); } }
        @keyframes floatYRight { 0%,100% { transform: translateY(0) rotate(6deg); }  50% { transform: translateY(-14px) rotate(6deg); } }
      `}</style>

      {/* Floating Script icon — left */}
      <div className="pointer-events-none select-none absolute left-[4%] top-[28%] hidden lg:block -rotate-[8deg]">
        <div className="animate-bounce hero-float-left bg-black/[0.06] rounded-2xl p-4 backdrop-blur-sm border border-black/[0.05]">
          <ScrollText className="w-10 h-10 text-black" strokeWidth={1.5} />
        </div>
      </div>

      {/* Floating YouTube icon — right */}
      <div className="pointer-events-none select-none absolute right-[4%] top-[32%] hidden lg:block rotate-[6deg]">
        <div className="animate-bounce hero-float-right bg-red-500/10 rounded-2xl p-4 backdrop-blur-sm border border-red-500/10">
          <Youtube className="w-10 h-10 text-red-500" strokeWidth={1.5} />
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 hero-dot-bg" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="hero-reveal mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-red-500">
              Custom YouTube Strategy for {PROSPECT_NAME}
            </span>
          </div>
        </div>

        {/* Headline — fluid size + nowrap keeps each phrase on a single line (3 lines total) */}
        <div className="space-y-2 md:space-y-3 mb-8">
          <h1
            className="hero-reveal font-black text-black leading-[1.1] tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(0.85rem, 4vw, 3rem)' }}
          >
            Turn Your Influence Into an
          </h1>
          <h1
            className="hero-reveal font-black text-red-500 leading-[1.1] tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(0.85rem, 4vw, 3rem)' }}
          >
            Evergreen High-Ticket Sales Machine
          </h1>
          <h1
            className="hero-reveal font-black text-black leading-[1.1] tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(0.85rem, 4vw, 3rem)' }}
          >
            That Sells While You Sleep
          </h1>
        </div>

        {/* Subheadline */}
        <p className="hero-reveal text-lg md:text-xl text-black/60 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
          {PROSPECT_FIRST_NAME}, you've already built the authority and the audience. Here's the exact
          YouTube system that turns that attention into qualified, pre-sold calls for{' '}
          <span className="text-black font-bold">Elite Sales Mastery</span> — and fills the room for{' '}
          <span className="text-black font-bold">مؤتمر الرؤية</span>.
        </p>

        {/* Arabic personal line */}
        <p className="hero-reveal arabic-prose !text-center text-base md:text-lg text-black/50 max-w-2xl mx-auto mb-12 font-arabic">
          خطة مبنية خصيصاً لعلامتك التجارية وجمهورك العربي — لتحويل تأثيرك إلى نظام مبيعات دائم يعمل لصالحك على مدار الساعة.
        </p>

        {/* Video */}
        <div className="hero-reveal mb-12 max-w-4xl mx-auto px-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-gray-100">
            <HeroVideo />
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo('#book-call')}
            className="cool-button group relative inline-flex justify-center items-center gap-4 bg-black text-white px-12 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(239,68,68,0.5)] hover:scale-[1.02] transition-all duration-500"
          >
            <span className="relative z-10">Book Your Free Strategy Call</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo('#strategy')}
            className="inline-flex justify-center items-center gap-2 px-8 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] text-black/50 hover:text-red-500 border border-black/[0.08] hover:border-red-500/30 transition-all duration-300"
          >
            See the Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedHero;

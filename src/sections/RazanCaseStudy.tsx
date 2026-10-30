import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BadgeCheck, ChevronLeft, ChevronRight, Instagram, Star, X, Youtube, ZoomIn } from 'lucide-react';

const socials = [
  { icon: Instagram, label: 'Razan on Instagram', href: 'https://www.instagram.com/razan.thecheaito' },
  { icon: Youtube, label: 'Razan on YouTube', href: 'https://www.youtube.com/@RazanCheaito' },
];

const stats = [
  { value: '8', label: 'high-ticket deals closed in the first month' },
  { value: '~$18K', label: 'in closed deals, first month' },
  { value: '100', label: 'warm booked calls from YouTube alone' },
  { value: '0 → 2K+', label: 'subscribers in the first month' },
];

const highlights = [
  '40K+ total views',
  '19K+ views on the second video posted',
  'Second video ranked #1 for “high ticket sales” on YouTube search',
  'Everything handled from A to Z — Razan only filmed the scripts',
];

const proofs = [
  { src: '/case-studies/razan/proof-01.webp', caption: 'YouTube search for "high ticket sales" with Razan\'s video ranked first' },
  { src: '/case-studies/razan/proof-02.webp', caption: 'Second video analytics: 19,127 views and +548 subscribers' },
  { src: '/case-studies/razan/proof-03.webp', caption: 'Channel analytics: 42.7K views and +2.6K subscribers' },
  { src: '/case-studies/razan/proof-04.webp', caption: 'Client message: 100 total calls, 8 closed deals' },
  { src: '/case-studies/razan/proof-05.webp', caption: 'Client message: 92 YouTube leads booked a free call, 6 purchased' },
  { src: '/case-studies/razan/proof-06.webp', caption: 'Chat after the first video: around $15K generated' },
  { src: '/case-studies/razan/proof-07.webp', caption: 'Video analytics: 4.5K views in 2 days from new cold traffic' },
  { src: '/case-studies/razan/proof-08.webp', caption: 'Performance chart: 27 landing page clicks in a day from YouTube' },
  { src: '/case-studies/razan/proof-09.webp', caption: 'Client reply: "It\'s not perfect, it\'s beyond perfect"' },
];

const ProofLightbox = ({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) => {
  const prev = () => onChange((index - 1 + proofs.length) % proofs.length);
  const next = () => onChange((index + 1) % proofs.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  });

  const proof = proofs[index];

  // Portal to body: the section's perspective style would otherwise trap position: fixed
  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Razan case study proof"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
      <img
        src={proof.src}
        alt={proof.caption}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[78vh] rounded-xl shadow-2xl object-contain"
      />
      <p className="mt-4 text-white/70 text-sm text-center max-w-md px-2">{proof.caption}</p>
      <div className="mt-4 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <span className="text-white/60 text-xs font-bold tabular-nums">
          {index + 1} / {proofs.length}
        </span>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body
  );
};

const RazanCaseStudy = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <article className="testimonial-card relative bg-[#FAFAFA] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-black/[0.03] overflow-hidden">
        <div className="grid lg:grid-cols-[5fr_7fr]">
          {/* Photo */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-full overflow-hidden bg-[#ececec]">
            <img
              src="/case-studies/razan/razan-headshot.webp"
              alt="Razan Cheaito, High Ticket Sales Coach"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[50%_18%] lg:object-[50%_30%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent lg:hidden" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-red-500 text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
              Featured case study
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 md:p-10 xl:p-12">
            <div className="flex items-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={`razan-${s}`} className="w-4 h-4 fill-red-500 text-red-500" aria-hidden="true" />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-black text-2xl md:text-3xl text-black inline-flex items-center gap-2">
                  Razan Cheaito
                  <BadgeCheck className="w-5 h-5 text-red-500" strokeWidth={2.5} aria-label="Client" />
                </p>
                <p className="mt-1 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                  High Ticket Sales Coach
                </p>
              </div>
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-black/70 hover:text-red-500 hover:border-red-500/30 transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <blockquote className="mt-6">
              <p className="text-xl sm:text-2xl xl:text-[28px] font-black text-black leading-tight tracking-tight">
                <span className="text-red-500 underline decoration-black/10 underline-offset-8">8 high-ticket deals</span>{' '}
                closed in her first month on YouTube, from just{' '}
                <span className="text-red-500 underline decoration-black/10 underline-offset-8">4 videos</span>.
              </p>
            </blockquote>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white border border-black/[0.06] p-4">
                  <p className="font-black text-red-500 text-2xl md:text-3xl tracking-tight tabular-nums">{stat.value}</p>
                  <p className="mt-1 text-[12.5px] md:text-[13px] leading-snug font-semibold text-black/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-black uppercase tracking-[0.2em] text-black/35">All from 4 videos</p>

            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] md:text-base leading-relaxed text-black/75">
                  <BadgeCheck className="w-5 h-5 mt-0.5 shrink-0 text-red-500" strokeWidth={2.25} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Receipts */}
        <div className="border-t border-black/[0.06] px-6 sm:px-8 md:px-10 xl:px-12 py-6 md:py-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-black/45">The receipts</p>
            <p className="text-[11px] font-bold text-black/35">Tap to view</p>
          </div>
          <div className="-mx-6 sm:mx-0 px-6 sm:px-0 flex gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-5 lg:grid-cols-9 sm:overflow-visible">
            {proofs.map((proof, i) => (
              <button
                key={proof.src}
                type="button"
                aria-label={`View proof: ${proof.caption}`}
                onClick={() => setOpenIndex(i)}
                className="group relative shrink-0 w-32 sm:w-auto aspect-[4/3] rounded-xl overflow-hidden border border-black/[0.08] bg-white snap-start"
              >
                <img src={proof.src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </article>

      {openIndex !== null && (
        <ProofLightbox index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
      )}
    </>
  );
};

export default RazanCaseStudy;

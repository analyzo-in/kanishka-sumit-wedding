import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/scroll';
import { asset } from '../lib/assets';

interface HeroProps {
  config: { date: string; weekday: string };
}

export default function Hero({ config }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);
  const date = new Date(`${config.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.to(artRef.current, {
        scale: 1.08,
        y: -32,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, section);
    const onScroll = () => { setShowHint(false); window.removeEventListener('scroll', onScroll); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="scene" style={{ height: '100dvh', minHeight: 620, position: 'relative', overflow: 'hidden', background: '#d89b8b' }}>
      <img ref={artRef} src={asset('assets/mandap-garden-v2.png')} alt="Watercolour wedding mandap in a palace garden" style={{ position: 'absolute', inset: '-4%', width: '108%', height: '108%', objectFit: 'cover', objectPosition: 'center', willChange: 'transform' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,245,235,.15) 0%, rgba(92,22,38,.06) 47%, rgba(58,10,22,.58) 100%)' }} />
      <div ref={titleRef} style={{ position: 'absolute', zIndex: 2, top: '9%', left: 20, right: 20, textAlign: 'center', color: '#642039', textShadow: '0 1px 18px rgba(255,250,240,.76)' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.1rem, 4.8vw, 1.45rem)', lineHeight: 1.25, fontStyle: 'italic', margin: 0 }}>With the blessings of our families</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(.92rem, 3.8vw, 1.08rem)', lineHeight: 1.45, margin: '.55rem auto 0', maxWidth: '18rem' }}>We invite you to celebrate our new beginning</p>
        <div aria-hidden="true" style={{ width: '44px', height: '1px', background: 'rgba(200,150,62,.82)', margin: '.85rem auto .65rem' }} />
        <p style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive", fontSize: 'clamp(2.05rem, 9vw, 2.9rem)', lineHeight: 1, fontWeight: 400, margin: 0, color: '#6b1a2a', textShadow: '0 1px 13px rgba(255,250,240,.8)' }}>Kanishka <span style={{ fontSize: '.62em', fontStyle: 'italic' }}>&amp;</span> Sumit</p>
      </div>
      <div style={{ position: 'absolute', zIndex: 2, bottom: '8%', left: '50%', transform: 'translateX(-50%)', width: 'min(79%, 340px)', textAlign: 'center', padding: '14px 18px', color: '#fffaf0', borderTop: '1px solid rgba(232,196,122,.9)', borderBottom: '1px solid rgba(232,196,122,.9)', textShadow: '0 2px 5px rgba(50,0,12,.45)' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.32rem', letterSpacing: '.08em', margin: 0 }}>{date}</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '.62rem', letterSpacing: '.24em', textTransform: 'uppercase', margin: '.35rem 0 0' }}>{config.weekday}</p>
      </div>
      {showHint && <div aria-hidden="true" style={{ position: 'absolute', zIndex: 2, bottom: '2.1%', left: 0, right: 0, textAlign: 'center', color: '#fffaf0', fontFamily: "'Jost', sans-serif", fontSize: '.6rem', letterSpacing: '.24em', animation: 'heroHint 1.8s ease-in-out infinite' }}>SCROLL ↓</div>}
      <style>{`@keyframes heroHint { 50% { transform: translateY(6px); opacity: .5; } }`}</style>
    </section>
  );
}

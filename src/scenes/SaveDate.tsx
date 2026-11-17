import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../lib/scroll';
import { asset } from '../lib/assets';

/* ── Tokens ── */
const T = {
  deepMaroon: '#6b1a2a',
  deepMaroonDark: '#4a0f1c',
  richMaroon: '#7a1f33',
  gold: '#c8963e',
  goldHi: '#e8c47a',
  goldSh: '#9a6a1e',
  ivory: '#f7f1e6',
  cream: '#fffaf0',
  blush: '#e58aa0',
};

/* ── Types ── */
interface SaveDateConfig {
  date: string; // e.g. '2026-11-26'
  weekday: string;
}

interface SaveDateProps {
  config: SaveDateConfig;
}

/* ── Large lotus + floral crown ornament ── */
function LotusCrown() {
  return (
    <svg viewBox="0 0 200 120" width="205" height="90" aria-hidden="true" style={{ display: 'block', margin: '0 auto .25rem' }}>
      <defs>
        <linearGradient id="lcGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={T.goldHi} />
          <stop offset="100%" stopColor={T.gold} />
        </linearGradient>
        <linearGradient id="lcMaroon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.richMaroon} />
          <stop offset="100%" stopColor={T.deepMaroon} />
        </linearGradient>
      </defs>
      {/* Crown/arch */}
      <path d="M40 85 Q50 30 100 15 Q150 30 160 85" fill="none" stroke="url(#lcGold)" strokeWidth="2" />
      <path d="M50 85 Q60 40 100 25 Q140 40 150 85" fill="none" stroke="url(#lcGold)" strokeWidth="1.5" opacity="0.5" />
      {/* Crown tip ornaments */}
      <circle cx="100" cy="13" r="5" fill="url(#lcGold)" />
      <path d="M95 13 L100 5 L105 13" fill={T.goldHi} />
      {/* Side flourishes */}
      <path d="M35 85 Q25 70 30 55" fill="none" stroke="url(#lcGold)" strokeWidth="1.5" />
      <path d="M165 85 Q175 70 170 55" fill="none" stroke="url(#lcGold)" strokeWidth="1.5" />
      <circle cx="30" cy="53" r="3" fill={T.goldHi} opacity="0.6" />
      <circle cx="170" cy="53" r="3" fill={T.goldHi} opacity="0.6" />
      {/* Main lotus */}
      <ellipse cx="100" cy="90" rx="12" ry="20" fill="url(#lcMaroon)" opacity="0.9" />
      <ellipse cx="100" cy="90" rx="12" ry="20" fill="url(#lcMaroon)" opacity="0.7" transform="rotate(25 100 90)" />
      <ellipse cx="100" cy="90" rx="12" ry="20" fill="url(#lcMaroon)" opacity="0.7" transform="rotate(-25 100 90)" />
      <ellipse cx="100" cy="90" rx="12" ry="20" fill="url(#lcMaroon)" opacity="0.5" transform="rotate(50 100 90)" />
      <ellipse cx="100" cy="90" rx="12" ry="20" fill="url(#lcMaroon)" opacity="0.5" transform="rotate(-50 100 90)" />
      <circle cx="100" cy="88" r="6" fill={T.goldHi} />
      {/* Small hanging buds */}
      <circle cx="65" cy="70" r="3" fill={T.blush} opacity="0.5" />
      <circle cx="135" cy="70" r="3" fill={T.blush} opacity="0.5" />
      {/* Base line */}
      <line x1="30" y1="110" x2="170" y2="110" stroke="url(#lcGold)" strokeWidth="1" opacity="0.4" />
      <image href={asset('assets/date-lotus-crown-v2.png')} x="0" y="13" width="200" height="88" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

/* ── Plaque component ── */
function Plaque({
  label,
  value,
  revealed,
  index,
}: {
  label: string;
  value: string;
  revealed: boolean;
  index: number;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (revealed && innerRef.current) {
      gsap.fromTo(
        innerRef.current,
        { rotateX: -90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.12,
          ease: 'back.out(1.4)',
        },
      );
    }
  }, [revealed, index]);

  return (
    <div style={{ textAlign: 'center', flex: 1, minWidth: 0, maxWidth: '78px' }}>
      {/* Label */}
      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: '0.48rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: T.deepMaroon,
        background: 'transparent',
        borderRadius: 0,
        display: 'inline-block',
        padding: '.14rem .38rem',
        marginBottom: '.12rem',
      }}>
        {label}
      </p>
      {/* Plaque body */}
      <div style={{
        background: `linear-gradient(135deg, ${T.richMaroon}, ${T.deepMaroon})`,
        WebkitMaskImage: `url('${asset('assets/plaque.svg')}')`,
        maskImage: `url('${asset('assets/plaque.svg')}')`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        padding: '.54rem .2rem',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '400px',
        filter: `drop-shadow(0 3px 3px rgba(74,15,28,0.22))`,
        position: 'relative',
        overflow: 'visible',
      }}>
        <img src={asset('assets/plaque-outline.svg')} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
        <div
          ref={innerRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            // Month and year need a smaller mobile scale to remain inside the plaque.
            fontSize: value.length >= 4 ? '1.12rem' : value.length === 3 ? '1.18rem' : '1.36rem',
            fontWeight: 700,
            color: T.goldHi,
            opacity: revealed ? undefined : 0,
            transform: revealed ? undefined : 'rotateX(-90deg)',
            transformOrigin: 'center center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ── Caparisoned elephant (mirrored) ── */
function CeremonyElephant({ facing }: { facing: 'left' | 'right' }) {
  const flip = facing === 'right';
  return (
    <svg
      viewBox="0 0 120 110"
      width="94"
      height="86"
      aria-hidden="true"
      style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <defs>
        <linearGradient id={`ceBody-${facing}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={T.gold} />
          <stop offset="100%" stopColor={T.goldSh} />
        </linearGradient>
      </defs>
      <g opacity="0">
      {/* Body */}
      <ellipse cx="60" cy="62" rx="35" ry="25" fill={`url(#ceBody-${facing})`} />
      {/* Head */}
      <ellipse cx="30" cy="45" rx="18" ry="17" fill={`url(#ceBody-${facing})`} />
      {/* Trunk */}
      <path d="M16 55 Q8 70 14 82" fill="none" stroke={T.goldSh} strokeWidth="3" strokeLinecap="round" />
      {/* Ear */}
      <ellipse cx="22" cy="40" rx="9" ry="11" fill={T.richMaroon} opacity="0.4" />
      {/* Eye */}
      <circle cx="27" cy="42" r="2" fill={T.ivory} />
      {/* Blanket */}
      <rect x="40" y="42" width="38" height="28" rx="3" fill={T.richMaroon} opacity="0.7" />
      <rect x="43" y="45" width="32" height="22" rx="2" fill={T.deepMaroon} opacity="0.5" />
      {/* Blanket gold trim */}
      <line x1="43" y1="56" x2="75" y2="56" stroke={T.goldHi} strokeWidth="1.5" opacity="0.6" />
      {/* Legs */}
      <rect x="40" y="82" width="9" height="22" rx="3" fill={`url(#ceBody-${facing})`} />
      <rect x="55" y="83" width="9" height="21" rx="3" fill={`url(#ceBody-${facing})`} />
      <rect x="70" y="82" width="9" height="22" rx="3" fill={`url(#ceBody-${facing})`} />
      <rect x="82" y="83" width="9" height="21" rx="3" fill={`url(#ceBody-${facing})`} />
      {/* Tail */}
      <path d="M95 55 Q105 50 102 62" fill="none" stroke={T.goldSh} strokeWidth="2" strokeLinecap="round" />
      {/* Headpiece */}
      <path d="M20 30 Q30 22 40 30" fill="none" stroke={T.goldHi} strokeWidth="1.5" />
      <circle cx="30" cy="28" r="3" fill={T.richMaroon} stroke={T.goldHi} strokeWidth="1" />
      </g>
      <image href={asset('assets/date-elephant-v2.png')} x="0" y="10" width="120" height="95" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

/* ── Floral watermark background ── */
const floralWatermark = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
    <circle cx='40' cy='40' r='15' fill='none' stroke='rgba(200,150,62,0.04)' stroke-width='0.5'/>
    <ellipse cx='40' cy='25' rx='5' ry='10' fill='rgba(200,150,62,0.03)'/>
    <ellipse cx='40' cy='55' rx='5' ry='10' fill='rgba(200,150,62,0.03)'/>
    <ellipse cx='25' cy='40' rx='10' ry='5' fill='rgba(200,150,62,0.03)'/>
    <ellipse cx='55' cy='40' rx='10' ry='5' fill='rgba(200,150,62,0.03)'/>
  </svg>`
)}")`;

/* ── Canvas sparkle burst ── */
function useSparkles(triggerEl: React.RefObject<HTMLCanvasElement | null>, fire: boolean) {
  useEffect(() => {
    if (!fire || !triggerEl.current) return;
    const canvas = triggerEl.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const colors = [T.goldHi, T.gold, T.blush, '#fff', T.goldSh];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: W / 2,
        y: H / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 60 + Math.random() * 30,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      particles.forEach((p) => {
        p.life++;
        if (p.life > p.maxLife) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        const alpha = 1 - p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Diamond shape sparkle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
      if (alive) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const timer = setTimeout(() => cancelAnimationFrame(frame), 2000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [fire, triggerEl]);
}

/* ── Component ── */
export default function SaveDate({ config }: SaveDateProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftElRef = useRef<HTMLDivElement>(null);
  const rightElRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const weekdayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);

  // Parse date
  const dateObj = new Date(config.date + 'T00:00:00');
  const day = String(dateObj.getDate());
  const month = dateObj.toLocaleString('en', { month: 'short' }).toUpperCase();
  const year = String(dateObj.getFullYear());

  useSparkles(canvasRef, revealed);

  const handleReveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
  }, [revealed]);

  // ScrollTrigger — elephants walk in, auto-reveal at threshold
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Elephants walk in
      if (leftElRef.current) {
        gsap.fromTo(leftElRef.current,
          { x: -120, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1,
            },
          },
        );
      }
      if (rightElRef.current) {
        gsap.fromTo(rightElRef.current,
          { x: 120, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1,
            },
          },
        );
      }

      // Auto reveal at scroll threshold
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        once: true,
        onEnter: () => setRevealed(true),
      });

      // Caption & weekday fade in
      if (captionRef.current) {
        gsap.fromTo(captionRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 25%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
      if (weekdayRef.current) {
        gsap.fromTo(weekdayRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.6, delay: 0.3,
            scrollTrigger: {
              trigger: section,
              start: 'top 25%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene"
      style={{
        minHeight: 'auto',
        background: T.ivory,
        backgroundImage: floralWatermark,
        backgroundSize: '80px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2.6rem 1rem 2.35rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Lotus crown ornament */}
      <LotusCrown />

      {/* Plaques + elephants row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.2rem',
        width: '100%',
        maxWidth: '400px',
        margin: '.15rem 0 .55rem',
        position: 'relative',
      }}>
        {/* Left elephant */}
        <div ref={leftElRef} style={{ width: '80px', flexShrink: 0, opacity: 0, marginRight: '-2px', alignSelf: 'flex-end', marginBottom: '-10px' }}>
          <CeremonyElephant facing="left" />
        </div>

        {/* Plaques */}
        <div style={{ display: 'flex', gap: '0.28rem', flex: 1, minWidth: 0, justifyContent: 'center' }}>
          <Plaque label="DATE" value={day} revealed={revealed} index={0} />
          <Plaque label="MONTH" value={month} revealed={revealed} index={1} />
          <Plaque label="YEAR" value={year} revealed={revealed} index={2} />
        </div>

        {/* Right elephant */}
        <div ref={rightElRef} style={{ width: '80px', flexShrink: 0, opacity: 0, marginLeft: '-10px', alignSelf: 'flex-end', marginBottom: '-10px' }}>
          {/* The generated artwork has extra transparent space on this mirrored side. */}
          <div style={{ transform: 'translateX(-6px)' }}>
            <CeremonyElephant facing="right" />
          </div>
        </div>
      </div>

      {/* Sparkle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Reveal button */}
      {!revealed && (
        <button
          onClick={handleReveal}
          style={{
            marginTop: '.6rem',
            padding: '0.75rem 2rem',
            background: `linear-gradient(135deg, ${T.deepMaroon}, ${T.richMaroon})`,
            color: T.goldHi,
            border: `1.5px solid ${T.gold}55`,
            borderRadius: '50px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            boxShadow: `0 0 20px ${T.gold}33`,
            animation: 'glowPulse 2s ease-in-out infinite',
          }}
        >
          Reveal the Date
          <style>{`
            @keyframes glowPulse {
              0%, 100% { box-shadow: 0 0 20px rgba(200,150,62,0.2); }
              50% { box-shadow: 0 0 35px rgba(200,150,62,0.45); }
            }
          `}</style>
        </button>
      )}

      {/* Save the Date caption */}
      <div
        ref={captionRef}
        style={{
          marginTop: '.55rem',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1rem, 3.5vw, 1.18rem)',
          fontWeight: 600,
          fontStyle: 'italic',
          letterSpacing: '0.08em',
          color: T.deepMaroon,
        }}>
          Save the Date
        </p>
      </div>

      <div
        ref={weekdayRef}
        style={{
          marginTop: '.25rem',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: T.gold,
        }}>
          {config.weekday}
        </p>
      </div>
    </section>
  );
}

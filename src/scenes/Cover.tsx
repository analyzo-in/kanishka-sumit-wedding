import { useState, useCallback } from 'react';
import { startMusic, toggleMute, getMuted } from '../lib/audio';
import { asset } from '../lib/assets';

/* ── Design tokens (inline) ── */
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

/* ── Jaali SVG pattern ── */
const jaaliPattern = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
    <path d='M20 0 L40 20 L20 40 L0 20Z' fill='none' stroke='rgba(232,196,122,0.12)' stroke-width='0.5'/>
    <circle cx='20' cy='20' r='3' fill='none' stroke='rgba(232,196,122,0.08)' stroke-width='0.4'/>
    <circle cx='0' cy='0' r='2' fill='none' stroke='rgba(232,196,122,0.06)' stroke-width='0.3'/>
    <circle cx='40' cy='0' r='2' fill='none' stroke='rgba(232,196,122,0.06)' stroke-width='0.3'/>
    <circle cx='0' cy='40' r='2' fill='none' stroke='rgba(232,196,122,0.06)' stroke-width='0.3'/>
    <circle cx='40' cy='40' r='2' fill='none' stroke='rgba(232,196,122,0.06)' stroke-width='0.3'/>
  </svg>`
)}")`;

/* ── Elephant SVG (inline, gold/maroon with howdah) ── */
function ElephantSVG() {
  return (
    <svg viewBox="0 0 200 180" width="140" height="130" aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="elephantBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={T.gold} />
          <stop offset="50%" stopColor={T.goldSh} />
          <stop offset="100%" stopColor={T.deepMaroon} />
        </linearGradient>
        <linearGradient id="howdahGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.goldHi} />
          <stop offset="100%" stopColor={T.gold} />
        </linearGradient>
      </defs>
      {/* Body */}
      <ellipse cx="100" cy="115" rx="55" ry="40" fill="url(#elephantBody)" />
      {/* Head */}
      <ellipse cx="55" cy="85" rx="30" ry="28" fill="url(#elephantBody)" />
      {/* Trunk */}
      <path d="M30 95 Q15 120 25 145 Q28 148 32 145 Q35 125 45 105" fill="url(#elephantBody)" stroke={T.goldSh} strokeWidth="1" />
      {/* Ear */}
      <ellipse cx="42" cy="78" rx="14" ry="18" fill={T.deepMaroon} opacity="0.6" />
      {/* Eye */}
      <circle cx="48" cy="80" r="2.5" fill={T.ivory} />
      <circle cx="48" cy="80" r="1.2" fill={T.deepMaroonDark} />
      {/* Tusk */}
      <path d="M42 100 Q38 112 44 118" fill="none" stroke={T.ivory} strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <rect x="65" y="140" width="14" height="32" rx="5" fill="url(#elephantBody)" />
      <rect x="90" y="142" width="14" height="30" rx="5" fill="url(#elephantBody)" />
      <rect x="115" y="140" width="14" height="32" rx="5" fill="url(#elephantBody)" />
      <rect x="135" y="142" width="14" height="30" rx="5" fill="url(#elephantBody)" />
      {/* Tail */}
      <path d="M155 105 Q168 100 165 115" fill="none" stroke={T.goldSh} strokeWidth="2" strokeLinecap="round" />
      {/* Howdah base */}
      <rect x="75" y="68" width="55" height="38" rx="4" fill="url(#howdahGrad)" stroke={T.goldSh} strokeWidth="1.5" />
      {/* Howdah dome */}
      <path d="M80 68 Q102 42 130 68" fill={T.richMaroon} stroke={T.goldHi} strokeWidth="1" />
      {/* Howdah pinnacle */}
      <circle cx="102" cy="48" r="4" fill={T.goldHi} />
      {/* Blanket fringe */}
      <path d="M75 106 Q80 112 85 106 Q90 112 95 106 Q100 112 105 106 Q110 112 115 106 Q120 112 125 106 Q130 112 130 106"
        fill="none" stroke={T.goldHi} strokeWidth="1.2" />
      {/* Forehead jewel */}
      <circle cx="55" cy="68" r="4" fill={T.richMaroon} stroke={T.goldHi} strokeWidth="1" />
      {/* Headpiece chain */}
      <path d="M40 68 Q45 62 55 63 Q65 62 70 68" fill="none" stroke={T.goldHi} strokeWidth="1" />
    </svg>
  );
}

/* ── Floral Sprig (CSS-drawn via SVG) ── */
function FloralSprig() {
  return (
    <svg viewBox="0 0 80 120" width="70" height="105" aria-hidden="true" style={{ display: 'block' }}>
      {/* Stem */}
      <path d="M40 110 Q38 80 42 50 Q44 30 40 10" fill="none" stroke={T.gold} strokeWidth="1.5" />
      {/* Leaves */}
      <ellipse cx="32" cy="45" rx="10" ry="5" fill={T.goldHi} opacity="0.5" transform="rotate(-30 32 45)" />
      <ellipse cx="50" cy="60" rx="10" ry="5" fill={T.goldHi} opacity="0.5" transform="rotate(25 50 60)" />
      <ellipse cx="35" cy="75" rx="8" ry="4" fill={T.goldHi} opacity="0.4" transform="rotate(-20 35 75)" />
      {/* Flower bud at top */}
      <circle cx="40" cy="12" r="6" fill={T.blush} opacity="0.7" />
      <circle cx="40" cy="12" r="3" fill={T.goldHi} opacity="0.5" />
      {/* Small buds */}
      <circle cx="30" cy="40" r="3" fill={T.blush} opacity="0.5" />
      <circle cx="52" cy="55" r="3" fill={T.blush} opacity="0.4" />
    </svg>
  );
}

/* ── Ganesh symbol (OM-style) ── */
function GaneshSymbol() {
  return (
    <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <linearGradient id="ganeshGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={T.goldHi} />
          <stop offset="100%" stopColor={T.gold} />
        </linearGradient>
      </defs>
      {/* Simplified Ganesh icon */}
      {/* Head */}
      <circle cx="30" cy="20" r="12" fill="none" stroke="url(#ganeshGold)" strokeWidth="2" />
      {/* Trunk */}
      <path d="M24 28 Q20 38 26 42" fill="none" stroke="url(#ganeshGold)" strokeWidth="2" strokeLinecap="round" />
      {/* Ears */}
      <ellipse cx="17" cy="18" rx="5" ry="7" fill="none" stroke="url(#ganeshGold)" strokeWidth="1.5" />
      <ellipse cx="43" cy="18" rx="5" ry="7" fill="none" stroke="url(#ganeshGold)" strokeWidth="1.5" />
      {/* Body */}
      <ellipse cx="30" cy="42" rx="10" ry="8" fill="none" stroke="url(#ganeshGold)" strokeWidth="2" />
      {/* Crown */}
      <path d="M24 10 L27 5 L30 9 L33 5 L36 10" fill="none" stroke="url(#ganeshGold)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Tusk */}
      <path d="M34 26 L36 32" stroke={T.ivory} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Styles ── */
const styles = {
  wrapper: {
    position: 'fixed' as const,
    inset: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(180deg, rgba(64, 14, 25, 0.2) 0%, rgba(57, 10, 20, 0.76) 100%), url('${asset('assets/mandap-garden-v2.png')}') center / cover`,
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  },
  jaali: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: jaaliPattern,
    backgroundSize: '40px 40px',
    opacity: 0.1,
    pointerEvents: 'none' as const,
  },
  floralSprig: {
    position: 'absolute' as const,
    top: '5.8rem',
    left: '1.25rem',
    opacity: 0.75,
  },
  mantra: {
    position: 'absolute' as const,
    top: 'calc(env(safe-area-inset-top, 0px) + 1.35rem)',
    left: '1.25rem',
    color: T.ivory,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.78rem',
    letterSpacing: '0.08em',
    textShadow: '0 1px 8px rgba(63,8,20,.6)',
    zIndex: 3,
  },
  auspiciousMark: {
    position: 'absolute' as const,
    top: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
    right: '1.2rem',
    color: T.goldHi,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.6rem',
    lineHeight: 1,
    textShadow: '0 1px 8px rgba(63,8,20,.6)',
    zIndex: 3,
  },
  elephantWrap: {
    position: 'absolute' as const,
    bottom: '1rem',
    left: '1rem',
    opacity: 0.65,
  },
  card: {
    position: 'relative' as const,
    zIndex: 2,
    background: 'rgba(255, 250, 240, 0.93)',
    borderRadius: '2px',
    padding: '2.75rem 2rem',
    maxWidth: '340px',
    width: '85%',
    textAlign: 'center' as const,
    boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${T.goldHi}33`,
    border: `1px solid ${T.goldHi}`,
    backdropFilter: 'blur(8px)',
  },
  sacredText: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: '1.35rem',
    color: T.deepMaroon,
    marginBottom: '0.5rem',
    letterSpacing: '0.02em',
  },
  inviteText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '0.95rem',
    color: T.richMaroon,
    lineHeight: 1.6,
    margin: '1rem 0 1.5rem',
    fontStyle: 'italic' as const,
  },
  primaryBtn: {
    display: 'block',
    width: '100%',
    padding: '0.85rem 1.5rem',
    background: `linear-gradient(135deg, ${T.deepMaroon}, ${T.richMaroon})`,
    color: T.goldHi,
    border: `1px solid ${T.gold}66`,
    borderRadius: '50px',
    fontSize: '1rem',
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s, transform 0.2s',
    boxShadow: `0 4px 20px ${T.deepMaroon}80`,
  },
  secondaryLink: {
    display: 'block',
    marginTop: '0.75rem',
    background: 'none',
    border: 'none',
    color: T.gold,
    fontSize: '0.8rem',
    fontFamily: "'Cormorant Garamond', serif",
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    opacity: 0.8,
  },
  soundToggle: {
    position: 'fixed' as const,
    top: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
    right: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
    zIndex: 200,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: `${T.deepMaroon}dd`,
    border: `1.5px solid ${T.goldHi}66`,
    color: T.goldHi,
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)',
    transition: 'opacity 0.3s',
    boxShadow: `0 2px 10px rgba(0,0,0,0.3)`,
  },
  divider: {
    width: '50px',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
    margin: '0.75rem auto',
  },
} as const;

/* ── Component ── */
interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(getMuted());

  const handleOpenWithMusic = useCallback(() => {
    startMusic();
    setOpened(true);
    onOpen();
  }, [onOpen]);

  const handleOpenSilent = useCallback(() => {
    setOpened(true);
    onOpen();
  }, [onOpen]);

  const handleToggleMute = useCallback(() => {
    const nowMuted = toggleMute();
    setMuted(nowMuted);
  }, []);

  return (
    <>
      {/* Cover panel — slides up & fades when opened */}
      <div
        style={{
          ...styles.wrapper,
          opacity: opened ? 0 : 1,
          transform: opened ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: opened ? 'none' : 'auto',
        }}
        role="dialog"
        aria-label="Wedding invitation cover"
      >
        {/* Jaali pattern overlay */}
        <div style={styles.jaali} />

        <p style={styles.mantra}>ॐ श्री गणेशाय नमः</p>
        <div style={styles.auspiciousMark} aria-label="Auspicious wedding ornament">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d="M15 26V4M15 11C9 4 3 8 7 14c2 3 5 2 8-3M15 11c6-7 12-3 8 3-2 3-5 2-8-3M15 18c-5 0-8 4-5 7 2 2 4 0 5-3M15 18c5 0 8 4 5 7-2 2-4 0-5-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="15" cy="15" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Floral sprig top-left */}
        <div style={styles.floralSprig}>
          <FloralSprig />
        </div>

        {/* Elephant bottom-left */}
        <div style={styles.elephantWrap}>
          <ElephantSVG />
        </div>

        {/* Invitation card */}
        <div style={styles.card}>
          <p style={styles.sacredText}>
            शुभ विवाह
          </p>

          <div style={{ margin: '0.5rem auto' }}>
            <GaneshSymbol />
          </div>

          <div style={styles.divider} />

          <p style={styles.inviteText}>
            With the blessings of our families, we request the honour of your presence as two hearts begin their sacred journey together.
          </p>

          <button
            style={styles.primaryBtn}
            onClick={handleOpenWithMusic}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 30px ${T.deepMaroon}99`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${T.deepMaroon}80`;
            }}
          >
            Open Invitation
          </button>

          <button
            style={styles.secondaryLink}
            onClick={handleOpenSilent}
          >
            Open without sound
          </button>
        </div>
      </div>

      {/* Sound toggle — always visible after cover opens */}
      {opened && (
        <button
          style={styles.soundToggle}
          onClick={handleToggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
        >
          {muted ? '🔇' : '♪'}
        </button>
      )}
    </>
  );
}

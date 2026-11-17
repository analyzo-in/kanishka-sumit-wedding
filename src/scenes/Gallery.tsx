import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/scroll';

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
interface GalleryConfig {
  photos: string[];
  quotes: string[];
  groom: string;
  bride: string;
}

interface GalleryProps {
  config: GalleryConfig;
}

/* ── Lotus divider between dome and gallery ── */
export function LotusDivider() {
  return (
    <svg viewBox="0 0 200 30" width="160" height="24" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <linearGradient id="ldGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor={T.gold} />
          <stop offset="70%" stopColor={T.gold} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <line x1="0" y1="15" x2="75" y2="15" stroke="url(#ldGold)" strokeWidth="0.8" />
      <line x1="125" y1="15" x2="200" y2="15" stroke="url(#ldGold)" strokeWidth="0.8" />
      {/* Lotus */}
      <ellipse cx="100" cy="15" rx="6" ry="11" fill={T.goldHi} opacity="0.6" />
      <ellipse cx="100" cy="15" rx="6" ry="11" fill={T.goldHi} opacity="0.4" transform="rotate(30 100 15)" />
      <ellipse cx="100" cy="15" rx="6" ry="11" fill={T.goldHi} opacity="0.4" transform="rotate(-30 100 15)" />
      <circle cx="100" cy="15" r="3" fill={T.gold} />
    </svg>
  );
}

/* ── Dome/fountain vignette ── */
export function DomeVignette() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 0 0.6rem',
        position: 'relative',
      }}
      aria-hidden="true"
    >
      {/* A real mandap and reflection, seen through a royal curved jharokha. */}
      <div style={{
        width: 'min(88vw, 330px)',
        height: '148px',
        borderRadius: '0 0 170px 170px',
        overflow: 'visible',
        border: `2px solid ${T.goldHi}99`,
        borderTop: '0',
        boxShadow: '0 9px 22px rgba(74,15,28,0.15)',
        position: 'relative',
      }}>
        <img
          src="/assets/mandap-garden-v2.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 76%',
            display: 'block',
            transform: 'scale(1.08)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(180deg, rgba(74,15,28,0.06), transparent 44%, rgba(74,15,28,0.12))',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}

function HangingString({ width }: { width: number }) {
  const midpoint = width / 2;
  return (
    <svg width={width} height="28" viewBox={`0 0 ${width} 28`} aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <circle cx={midpoint} cy="2" r="2.5" fill={T.goldHi} stroke={T.richMaroon} strokeWidth="1" />
      <path d={`M${midpoint} 4 L10 27 M${midpoint} 4 L${width - 10} 27`} fill="none" stroke={T.deepMaroon} strokeWidth="1" opacity="0.58" />
    </svg>
  );
}

/* ── Photo frame ── */
function PhotoFrame({
  src,
  groom,
  bride,
  index,
}: {
  src?: string;
  groom: string;
  bride: string;
  index: number;
}) {
  const hasPhoto = !!src;
  // Alternate portrait and landscape frames, matching the gallery-wall reference.
  const landscape = index === 2 || index === 6;
  const frameWidth = landscape ? 184 : 148;
  const frameHeight = landscape ? 154 : 198;

  return (
    <div
      className="gallery-frame"
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <HangingString width={frameWidth} />

      {/* Frame */}
      <div style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        background: T.cream,
        border: `7px solid ${T.deepMaroon}`,
        borderRadius: '1px',
        boxShadow: `
          inset 0 0 0 1px ${T.goldHi}88,
          0 7px 15px rgba(74,15,28,0.22),
          0 2px 4px rgba(0,0,0,0.12)
        `,
        padding: '9px',
        position: 'relative',
        transformOrigin: 'top center',
        animation: `swing-${index % 2 === 0 ? 'a' : 'b'} 4s ease-in-out infinite`,
      }}>
        {/* Gold inner line */}
        <div style={{
          position: 'absolute',
          inset: '5px',
          border: `1px solid ${T.goldHi}88`,
          borderRadius: 0,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '2px',
          position: 'relative',
        }}>
          {hasPhoto ? (
            <img
              src={src}
              alt={`${groom} & ${bride}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          ) : (
            /* Watercolour wash placeholder */
            <div style={{
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(ellipse at 30% 40%, rgba(229,138,160,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 60%, rgba(188,211,238,0.15) 0%, transparent 50%),
                linear-gradient(135deg, ${T.cream} 0%, ${T.ivory} 100%)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '2.2rem',
                color: `${T.gold}77`,
              }}>
                {groom.charAt(0)} & {bride.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Quote frame ── */
function QuoteFrame({ text, index }: { text: string; index: number }) {
  return (
    <div
      className="gallery-frame"
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <HangingString width={148} />

      {/* Frame */}
      <div style={{
        width: '148px',
        height: '198px',
        background: T.cream,
        border: `7px solid ${T.deepMaroon}`,
        borderRadius: '1px',
        boxShadow: `
          inset 0 0 0 1px ${T.goldHi}88,
          0 7px 15px rgba(74,15,28,0.22),
          0 2px 4px rgba(0,0,0,0.12)
        `,
        padding: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transformOrigin: 'top center',
        animation: `swing-${index % 2 === 0 ? 'b' : 'a'} 4.5s ease-in-out infinite`,
        position: 'relative',
      }}>
        {/* Gold inner line */}
        <div style={{
          position: 'absolute',
          inset: '5px',
          border: `1px solid ${T.goldHi}88`,
          borderRadius: 0,
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.88rem',
          fontWeight: 500,
          fontStyle: 'italic',
          color: '#3a1a20',
          lineHeight: 1.55,
          position: 'relative',
          zIndex: 1,
        }}>
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Gallery({ config }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { photos, quotes, groom, bride } = config;

  // Build alternating items
  const items: { type: 'photo' | 'quote'; content: string }[] = [];
  const maxLen = Math.max(photos.length || 3, quotes.length); // at least 3 placeholders if no photos
  for (let i = 0; i < maxLen; i++) {
    if (i < (photos.length || 3)) {
      items.push({ type: 'photo', content: photos[i] || '' });
    }
    if (i < quotes.length) {
      items.push({ type: 'quote', content: quotes[i] });
    }
  }

  // Vertical scroll controls the horizontal story rail. The gallery remains visible
  // until the final frame has moved through, then the next section begins.
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !rail || !track) return;

    const ctx = gsap.context(() => {
      gsap.set(track, { x: 0 });
      const travel = () => Math.max(0, track.scrollWidth - rail.clientWidth + 16);
      gsap.to(track, {
        x: () => -travel(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(620, travel() + 420)}`,
          pin: viewport,
          pinType: 'fixed',
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          fastScrollEnd: true,
          refreshPriority: 2,
          invalidateOnRefresh: true,
        },
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="scene"
      style={{
        minHeight: '100dvh',
        background: '#f4f1e7',
        overflow: 'hidden',
        position: 'relative',
        padding: 0,
      }}
    >
      {/* Swing keyframes */}
      <style>{`
        @keyframes swing-a {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes swing-b {
          0%, 100% { transform: rotate(1deg); }
          50% { transform: rotate(-1deg); }
        }
      `}</style>

      <div
        ref={viewportRef}
        style={{
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '2.5rem',
          background: '#f4f1e7',
          backgroundImage: "url('/assets/gallery-floral-wall.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '1.4rem',
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.15rem',
            fontWeight: 600,
            fontStyle: 'italic',
            color: T.deepMaroon,
            letterSpacing: '0.05em',
          }}>
            Our Moments
          </p>
          <div style={{
            width: '82px', height: '1px', margin: '.35rem auto 0',
            background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
          }} />
        </div>

        {/* The first two frames are visible immediately; vertical scroll moves the rail. */}
        <div
          ref={railRef}
          style={{
            position: 'relative',
          width: '100%',
            overflow: 'hidden',
          }}
      >
        {/* Horizontal rail line */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${T.richMaroon}, ${T.richMaroon}, transparent)`,
          zIndex: 2,
        }} />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0 1rem .55rem',
            alignItems: 'flex-start',
            width: 'max-content',
          }}
        >
          {items.map((item, i) => (
            <div key={`${item.type}-${i}`}>
              {item.type === 'photo' ? (
                <PhotoFrame
                  src={item.content || undefined}
                  groom={groom}
                  bride={bride}
                  index={i}
                />
              ) : (
                <QuoteFrame text={item.content} index={i} />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

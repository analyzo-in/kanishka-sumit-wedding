import { useEffect, useRef } from 'react';
import { gsap } from '../lib/scroll';
import { getMapsUrl } from '../lib/maps';
import { downloadICS } from '../lib/calendar';
import { shareInvite } from '../lib/share';

interface FinaleProps {
  config: {
    events: Array<{
      name: string;
      date: string;
      time?: string;
      venueName: string;
      address: string;
      mapsQuery: string;
    }>;
    titleLine: string;
    groom: string;
    bride: string;
    whatsappRsvp?: string;
  };
}

/* ── Icon Button ── */
function IconButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        width: '46px', height: '46px', borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 28%, #8d3147 0%, #65152a 58%, #3c0815 100%)',
        border: '2px solid #e8c47a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 11px rgba(40,4,13,.45), inset 0 0 0 2px rgba(255,232,170,.26), inset 0 1px 2px rgba(255,245,205,.28)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      {icon}
    </button>
  );
}

/* ── Cypress Tree SVG ── */
function CypressTree({ x, height, flip }: { x: string; height: number; flip?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '18%',
      left: x,
      transform: flip ? 'scaleX(-1)' : undefined,
      zIndex: 1,
    }}>
      <svg width="24" height={height} viewBox={`0 0 24 ${height}`} fill="none">
        <path d={`M12 0 C6 ${height*0.2} 4 ${height*0.6} 10 ${height} L14 ${height} C20 ${height*0.6} 18 ${height*0.2} 12 0Z`}
          fill="rgba(74,15,28,0.4)" />
        <rect x="11" y={height - 8} width="2" height="8" fill="rgba(74,15,28,0.3)" />
      </svg>
    </div>
  );
}

export default function Finale({ config }: FinaleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const signboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !signboardRef.current) return;

    // Scale-in animation for signboard
    gsap.set(signboardRef.current, { scale: 0.7, opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top 15%',
        scrub: false,
        once: true,
      },
    });

    tl.to(signboardRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.5)',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // The final card should point guests to the main wedding venue, not the earlier functions.
  const firstEvent = config.events[config.events.length - 1];

  const handleDirections = () => {
    if (firstEvent) {
      window.open(getMapsUrl(firstEvent.mapsQuery), '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    shareInvite(config.titleLine);
  };

  const handleCalendar = () => {
    if (firstEvent) {
      downloadICS({
        title: config.titleLine,
        date: firstEvent.date,
        time: firstEvent.time,
        venueName: firstEvent.venueName,
        address: firstEvent.address,
      });
    }
  };

  const handleWhatsApp = () => {
    if (config.whatsappRsvp) {
      const url = config.whatsappRsvp.startsWith('http')
        ? config.whatsappRsvp
        : `https://wa.me/${config.whatsappRsvp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("I'll be there! 🎉")}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="scene"
      style={{
        background: '#7b3144',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img src="/assets/mandap-garden-v2.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', opacity: 0.9 }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(54,8,20,.12), rgba(54,8,20,.64))', zIndex: 0 }} />
      {/* Palace silhouettes */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: 0,
        right: 0,
        height: '120px',
        zIndex: 0,
      }}>
        {/* Central dome */}
        <svg viewBox="0 0 480 120" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          {/* Left minaret */}
          <rect x="60" y="40" width="14" height="80" fill="rgba(74,15,28,0.25)" />
          <path d="M54 45 L67 25 L80 45 Z" fill="rgba(74,15,28,0.2)" />
          <circle cx="67" cy="22" r="4" fill="rgba(200,150,62,0.3)" />

          {/* Central palace */}
          <rect x="160" y="50" width="160" height="70" fill="rgba(74,15,28,0.2)" />
          <path d="M200 50 Q240 0 280 50" fill="rgba(74,15,28,0.25)" />
          <circle cx="240" cy="12" r="5" fill="rgba(200,150,62,0.3)" />

          {/* Right minaret */}
          <rect x="406" y="40" width="14" height="80" fill="rgba(74,15,28,0.25)" />
          <path d="M400 45 L413 25 L426 45 Z" fill="rgba(74,15,28,0.2)" />
          <circle cx="413" cy="22" r="4" fill="rgba(200,150,62,0.3)" />

          {/* Ground line */}
          <rect x="0" y="110" width="480" height="10" fill="rgba(74,15,28,0.15)" />
        </svg>
      </div>

      {/* Cypress trees */}
      <CypressTree x="8%" height={70} />
      <CypressTree x="18%" height={55} />
      <CypressTree x="78%" height={60} flip />
      <CypressTree x="88%" height={72} flip />

      {/* Flower border at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(58,21,48,0.3) 100%)',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          position: 'absolute',
          bottom: '12px',
          left: 0,
          right: 0,
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'rgba(229,138,160,0.5)'
                : 'rgba(200,150,62,0.4)',
            }} />
          ))}
        </div>
      </div>

      {/* Icon buttons above signboard */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: 0,
        position: 'absolute',
        bottom: '4.4rem',
        left: 0,
        right: 0,
        justifyContent: 'center',
        zIndex: 5,
      }}>
        <IconButton
          label="Get Directions"
          onClick={handleDirections}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7dfa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          }
        />
        <IconButton
          label="Share Invite"
          onClick={handleShare}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7dfa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          }
        />
        <IconButton
          label="Add to Calendar"
          onClick={handleCalendar}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7dfa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>
            </svg>
          }
        />
        {config.whatsappRsvp && (
          <IconButton
            label="RSVP on WhatsApp"
            onClick={handleWhatsApp}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f7dfa0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            }
          />
        )}
      </div>

      {/* Signboard on easel */}
      <div
        ref={signboardRef}
        style={{
          position: 'relative',
          zIndex: 4,
        }}
      >
        {/* Easel legs */}
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '40px',
          zIndex: -1,
        }}>
          <div style={{
            position: 'absolute',
            left: '10px',
            bottom: 0,
            width: '3px',
            height: '40px',
            background: '#9a6a1e',
            transform: 'rotate(-8deg)',
            transformOrigin: 'top center',
          }} />
          <div style={{
            position: 'absolute',
            right: '10px',
            bottom: 0,
            width: '3px',
            height: '40px',
            background: '#9a6a1e',
            transform: 'rotate(8deg)',
            transformOrigin: 'top center',
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 0,
            width: '3px',
            height: '35px',
            background: '#9a6a1e',
          }} />
        </div>

        {/* Gold frame */}
        <div style={{
          background: 'linear-gradient(135deg, #c8963e 0%, #e8c47a 30%, #c8963e 50%, #9a6a1e 80%, #c8963e 100%)',
          padding: '7px',
          borderRadius: '15px',
          border: '1px solid rgba(255,231,159,.9)',
          boxShadow: '0 10px 34px rgba(0,0,0,0.34), inset 0 0 0 2px rgba(116,66,20,.6), inset 0 1px 0 rgba(255,242,190,.7)',
        }}>
          {/* Inner gold border */}
          <div style={{
            border: '1px solid #e8c47a',
            borderRadius: '10px',
            padding: '3px',
          }}>
            <div style={{
              background: 'linear-gradient(180deg, #fffaf0 0%, #f7f1e6 100%)',
              borderRadius: '7px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              minWidth: '260px',
              maxWidth: '320px',
              position: 'relative',
            }}>
              {/* Ornate corner decorations */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
                const [v, h] = corner.split('-');
                return (
                  <div key={corner} style={{
                    position: 'absolute',
                    [v]: '6px',
                    [h]: '6px',
                    width: '20px',
                    height: '20px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                      style={{
                        transform: `${v === 'bottom' ? 'scaleY(-1)' : ''} ${h === 'right' ? 'scaleX(-1)' : ''}`,
                      }}
                    >
                      <path d="M2 2 Q2 10 10 10 Q10 2 18 2" stroke="#c8963e" strokeWidth="1.5" fill="none" />
                      <circle cx="2" cy="2" r="2" fill="#c8963e" />
                    </svg>
                  </div>
                );
              })}

              {/* Small lotus at top */}
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
                <path d="M16 2 C13 6 8 10 6 16 C10 14 13 13 16 14 C19 13 22 14 26 16 C24 10 19 6 16 2Z" fill="#c8963e" opacity="0.6"/>
              </svg>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#6b1a2a',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
                letterSpacing: '0.02em',
              }}>
                Your Presence Means<br />the World to Us
              </p>

              {/* Divider */}
              <div style={{
                width: '50px',
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, #c8963e, transparent)',
                margin: '0 auto 0.75rem',
              }} />

              {/* Couple names */}
              <div style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '1.55rem',
                color: '#c8963e',
                textShadow: '0 1px 3px rgba(154,106,30,0.2)',
                lineHeight: 1.03,
                width: '100%',
              }}>
                <div style={{ textAlign: 'left', paddingLeft: '.4rem' }}>{config.bride}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.12rem', color: '#9a6a1e', fontStyle: 'italic', textAlign: 'center', margin: '.1rem 0' }}>&amp;</div>
                <div style={{ textAlign: 'center' }}>{config.groom}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        position: 'relative',
        zIndex: 5,
        fontFamily: "'Jost', sans-serif",
        fontSize: '0.7rem',
        color: 'rgba(255,250,240,0.6)',
        marginTop: '3rem',
        letterSpacing: '0.1em',
        textAlign: 'center',
      }}>
        Made with ❤️
      </p>
    </section>
  );
}

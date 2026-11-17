import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/scroll';

interface FollowProps {
  config: {
    instagram: string;
  };
}

export default function Follow({ config }: FollowProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (!config.instagram) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (!dismissed) setVisible(true);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [config.instagram, dismissed]);

  // Hidden if no instagram
  if (!config.instagram) return null;

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  const handleOpen = () => {
    const url = config.instagram.startsWith('http')
      ? config.instagram
      : `https://www.instagram.com/${config.instagram.replace(/^@/, '')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    handleDismiss();
  };

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        height: '1px', // minimal trigger area
        position: 'relative',
      }}
    >
      {/* Backdrop */}
      {visible && (
        <div
          onClick={handleDismiss}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(74, 15, 28, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            animation: 'fadeInBackdrop 0.3s ease-out forwards',
          }}
        >
          {/* Bottom sheet */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #fffaf0 0%, #f7f1e6 100%)',
              borderRadius: '24px 24px 0 0',
              padding: '2rem 1.5rem 2.5rem',
              width: '100%',
              maxWidth: '480px',
              textAlign: 'center',
              animation: 'slideUpSheet 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Handle */}
            <div style={{
              width: '40px',
              height: '4px',
              background: '#d4c4a8',
              borderRadius: '2px',
              margin: '0 auto 1.5rem',
            }} />

            {/* Instagram icon */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 4px 16px rgba(220,39,67,0.3)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>

            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#6b1a2a',
              marginBottom: '0.5rem',
            }}>
              Follow the Couple
            </h3>

            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.9rem',
              color: '#6b6b6b',
              marginBottom: '1.5rem',
              lineHeight: 1.5,
            }}>
              Would you like to open the couple's Instagram page?
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '280px',
              margin: '0 auto',
            }}>
              <button
                onClick={handleOpen}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #7a1f33 0%, #6b1a2a 100%)',
                  color: '#e8c47a',
                  border: 'none',
                  borderRadius: '50px',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 16px rgba(107,26,42,0.3)',
                  transition: 'transform 0.2s',
                }}
              >
                Open Instagram
              </button>

              <button
                onClick={handleDismiss}
                style={{
                  padding: '0.65rem 1.5rem',
                  background: 'transparent',
                  color: '#999',
                  border: '1.5px solid #d4d4d4',
                  borderRadius: '50px',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'background 0.2s',
                }}
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

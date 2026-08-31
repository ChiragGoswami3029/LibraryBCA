import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, ShieldCheck, UploadCloud } from 'lucide-react';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(circle at top, rgba(96, 165, 250, 0.18), transparent 30%), var(--bg-primary)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-glass-subtle)',
          borderRadius: '24px',
          boxShadow: '0 28px 80px rgba(15, 23, 42, 0.22)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '3rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.22)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              AcademicShare
            </div>

            <h1
              style={{
                margin: '1.25rem 0 1rem',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
              }}
            >
              Share. Learn. Grow.
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 0 2rem',
              }}
            >
              Discover, share, and learn from academic notes, assignments, and study resources
              with your classmates and peers.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link
                to="/signup"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.3rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  boxShadow: '0 14px 32px rgba(37, 99, 235, 0.25)',
                }}
              >
                Create Account <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.9rem 1.3rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-glass-subtle)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                Login
              </Link>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '1rem',
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '1.1rem',
                borderRadius: '18px',
                border: '1px solid var(--border-glass-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '12px',
                    background: 'rgba(14, 165, 233, 0.12)',
                    color: '#7dd3fc',
                  }}
                >
                  <BookOpenText size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Shared Notes</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Study material for every semester</div>
                </div>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.1rem',
                borderRadius: '18px',
                border: '1px solid var(--border-glass-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '12px',
                    background: 'rgba(34, 197, 94, 0.12)',
                    color: '#86efac',
                  }}
                >
                  <UploadCloud size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Upload & Learn</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Contribute your best resources</div>
                </div>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.1rem',
                borderRadius: '18px',
                border: '1px solid var(--border-glass-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '12px',
                    background: 'rgba(244, 114, 182, 0.12)',
                    color: '#f9a8d4',
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Trusted Access</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Secure login and profile management</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

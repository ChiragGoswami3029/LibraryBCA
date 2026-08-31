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
        background: 'var(--bg-gradient)',
      }}
    >
      <div className="glass-panel-strong" style={{ width: '100%', maxWidth: '1100px', overflow: 'hidden' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2rem',
            alignItems: 'center',
            padding: '3rem 2rem',
          }}
        >
          <div>
            <div
              className="badge badge-accent"
              style={{
                marginBottom: '1.25rem',
                padding: '0.45rem 0.9rem',
                fontSize: '0.74rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              AcademicShare
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
              Share. Learn. Grow.
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '620px', marginBottom: '2rem' }}>
              Discover, share and learn from academic resources with your BCA classmates and peers.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link className="btn btn-primary btn-lg" to="/signup">
                Create Account <ArrowRight size={18} />
              </Link>
              <Link className="btn btn-glass btn-lg" to="/login">
                Login
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.15rem 1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-subtle)',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <BookOpenText size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Shared Notes</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Semester-wise study material</div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.15rem 1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-subtle)',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <UploadCloud size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Upload & Learn</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Share practicals and notes</div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.15rem 1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-subtle)',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Secure Access</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Built for the student community</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

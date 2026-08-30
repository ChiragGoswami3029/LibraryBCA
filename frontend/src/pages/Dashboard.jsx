import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, Compass, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMeta } from '../services/metaApi';
import CategoryCard from '../components/dashboard/CategoryCard';
import RecentUploads from '../components/dashboard/RecentUploads';
import QuickUpload from '../components/dashboard/QuickUpload';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import FollowedSubjects from '../components/dashboard/FollowedSubjects';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    'Notes',
    'Assignments',
    'Important Questions',
    'Previous Year Papers',
  ]);
  const [quickQuery, setQuickQuery] = useState('');

  useEffect(() => {
    getMeta()
      .then((data) => {
        if (data?.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(() => {
        // Fallback to standard 4 categories
      });
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/app/browse?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      navigate('/app/browse');
    }
  };

  return (
    <div className="desktop-grid-3col">
      {/* Left / Center Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Welcome Banner */}
        <section
          className="glass-panel"
          style={{
            padding: '1.75rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, var(--surface-glass) 0%, rgba(10, 47, 74, 0.4) 100%)',
          }}
        >
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-subtle)',
                color: 'var(--accent-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                border: '1px solid var(--border-glass)',
              }}
            >
              <Sparkles size={14} />
              <span>BCA Academic Material Sharing Platform</span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Welcome{isAuthenticated && user?.name ? `, ${user.name}` : ' to AcademicShare'}
            </h1>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Find class notes, lab assignments, semester exam papers, and question banks shared directly by your BCA coursemates.
            </p>

            {/* Quick Search inside Welcome Banner */}
            <form onSubmit={handleQuickSearch} style={{ display: 'flex', gap: '8px', maxWidth: '480px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="search"
                  placeholder="Search by topic, subject, or filename..."
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: '36px', height: '42px', fontSize: '0.875rem' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0 18px', height: '42px' }}>
                Search
              </button>
            </form>
          </div>
        </section>

        {/* 4 Category Cards */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <BookOpen size={18} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Browse by Category</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {categories.map((cat) => (
              <CategoryCard key={cat} category={cat} />
            ))}
          </div>
        </section>

        {/* Live Recent Uploads Feed */}
        <RecentUploads />
      </div>

      {/* Right Rail (Desktop) */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <QuickUpload />
        <NotificationPanel />
        <FollowedSubjects />
      </aside>
    </div>
  );
}

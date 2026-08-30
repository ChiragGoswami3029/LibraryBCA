import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookmarkCheck, BookOpen, ArrowRight, Plus } from 'lucide-react';
import { getMyFollows } from '../../services/followApi';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../common/Skeleton';

export default function FollowedSubjects() {
  const [follows, setFollows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;

    let isMounted = true;
    setIsLoading(true);
    getMyFollows()
      .then((data) => {
        if (isMounted) {
          setFollows(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (isMounted) setFollows([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookmarkCheck size={18} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Followed Subjects</h3>
        </div>
        {isAuthenticated && (
          <Link
            to="/app/followed-subjects"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
            title="Manage all followed subjects"
          >
            Manage
          </Link>
        )}
      </div>

      {!isAuthenticated ? (
        <div style={{ padding: '0.5rem 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Follow subjects to receive notifications on new uploads.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="btn btn-glass btn-sm"
            style={{ width: '100%', fontSize: '0.8rem' }}
          >
            Log in to Follow
          </button>
        </div>
      ) : isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton height="32px" />
          <Skeleton height="32px" />
        </div>
      ) : follows.length === 0 ? (
        <div style={{ padding: '0.5rem 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            You haven't followed any subjects yet.
          </p>
          <button
            type="button"
            onClick={() => navigate('/app/followed-subjects')}
            className="btn btn-glass btn-sm"
            style={{ width: '100%', fontSize: '0.8rem' }}
          >
            <Plus size={14} />
            <span>Follow Subjects</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {follows.slice(0, 5).map((subject) => (
            <Link
              key={subject}
              to={`/app/browse?subject=${encodeURIComponent(subject)}`}
              className="glass-card-interactive"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-glass-subtle)',
                border: '1px solid var(--border-glass-subtle)',
                fontSize: '0.825rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={14} style={{ color: 'var(--accent-primary)' }} />
                <span>{subject}</span>
              </div>
              <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

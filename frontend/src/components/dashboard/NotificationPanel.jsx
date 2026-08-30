import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../../services/followApi';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../common/Skeleton';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loadNotifications = () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    getNotifications()
      .then((data) => {
        setNotifications(Array.isArray(data) ? data.slice(0, 4) : []);
      })
      .catch(() => {
        setNotifications([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadNotifications();
  }, [isAuthenticated]);

  const handleMarkRead = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // Silently handle
    }
  };

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
          <Bell size={18} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Notifications</h3>
        </div>
        {isAuthenticated && (
          <Link
            to="/app/notifications"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
            title="View all notifications"
          >
            View all
          </Link>
        )}
      </div>

      {!isAuthenticated ? (
        <div style={{ padding: '0.5rem 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Log in to see updates for your followed subjects.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="btn btn-glass btn-sm"
            style={{ width: '100%', fontSize: '0.8rem' }}
          >
            Log in
          </button>
        </div>
      ) : isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton height="42px" />
          <Skeleton height="42px" />
        </div>
      ) : notifications.length === 0 ? (
        <div style={{ padding: '0.5rem 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            No notifications yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {notifications.map((note) => (
            <div
              key={note.id}
              onClick={() => note.file_id && navigate(`/app/files/${note.file_id}`)}
              className="glass-card-interactive"
              style={{
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                background: note.is_read ? 'var(--surface-glass-subtle)' : 'var(--accent-subtle)',
                border: note.is_read ? '1px solid var(--border-glass-subtle)' : '1px solid var(--accent-primary)',
                fontSize: '0.8rem',
                cursor: note.file_id ? 'pointer' : 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                <p
                  style={{
                    fontSize: '0.775rem',
                    color: note.is_read ? 'var(--text-secondary)' : 'var(--text-primary)',
                    fontWeight: note.is_read ? 400 : 600,
                    lineHeight: 1.35,
                  }}
                >
                  {note.message}
                </p>
                {!note.is_read && (
                  <button
                    type="button"
                    onClick={(e) => handleMarkRead(e, note.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-primary)',
                      cursor: 'pointer',
                      padding: '2px',
                    }}
                    title="Mark as read"
                    aria-label="Mark notification as read"
                  >
                    <CheckCircle2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Bell, Menu, User, LogIn } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import IconButton from '../common/IconButton';
import { getNotifications } from '../../services/followApi';

export default function Topbar({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  // Sync search input if currently on browse page with query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Fetch unread notifications count if logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }
    let isMounted = true;
    getNotifications()
      .then((items) => {
        if (isMounted && Array.isArray(items)) {
          const unread = items.filter((n) => !n.is_read).length;
          setUnreadCount(unread);
        }
      })
      .catch(() => {
        // Silently catch in topbar
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/app/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/app/browse');
    }
  };

  return (
    <header
      className="topbar glass-panel"
      style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: '1px solid var(--border-glass)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--surface-glass)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Left Area: Mobile Menu Toggle & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="btn btn-ghost mobile-menu-btn"
          aria-label="Toggle navigation menu"
          style={{ padding: '8px' }}
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
          }}
          role="search"
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="search"
            placeholder="Search notes, subjects, uploaders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input"
            style={{
              paddingLeft: '36px',
              paddingRight: '12px',
              height: '38px',
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-full)',
            }}
            aria-label="Search resources across BCA"
          />
        </form>
      </div>

      {/* Right Area: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        {/* Theme Toggle */}
        <IconButton
          icon={theme === 'dark' ? Sun : Moon}
          label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          variant="glass"
          size="md"
          onClick={toggleTheme}
        />

        {/* Notifications Icon Button */}
        {isAuthenticated && (
          <IconButton
            icon={Bell}
            label="Notifications"
            variant="glass"
            size="md"
            badge={unreadCount}
            onClick={() => navigate('/app/notifications')}
          />
        )}

        {/* Profile Pill or Login Button */}
        {isAuthenticated ? (
          <button
            type="button"
            onClick={() => navigate('/app/profile')}
            className="btn btn-glass"
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-subtle)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || <User size={14} />}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.name}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="btn btn-primary btn-sm"
          >
            <LogIn size={14} />
            <span>Log in</span>
          </button>
        )}
      </div>
    </header>
  );
}

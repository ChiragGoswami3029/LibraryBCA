import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  UploadCloud,
  FolderHeart,
  Bell,
  BookmarkCheck,
  User,
  Settings,
  GraduationCap,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Browse', path: '/app/browse', icon: Compass },
    { label: 'Upload', path: '/app/upload', icon: UploadCloud, requiresAuth: true },
    { label: 'My Uploads', path: '/app/my-uploads', icon: FolderHeart, requiresAuth: true },
    { label: 'Notifications', path: '/app/notifications', icon: Bell, requiresAuth: true },
    { label: 'Followed Subjects', path: '/app/followed-subjects', icon: BookmarkCheck, requiresAuth: true },
    { label: 'Profile', path: '/app/profile', icon: User, requiresAuth: true },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(1, 20, 32, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
          onClick={onClose}
          className="mobile-backdrop"
        />
      )}

      <aside
        className={`sidebar glass-panel-strong ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          borderRadius: 0,
          borderLeft: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          borderRight: '1px solid var(--border-glass)',
          background: 'var(--surface-modal)',
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid var(--border-glass-subtle)',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #669BBC 0%, #0a4066 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(102, 155, 188, 0.35)',
            }}
          >
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Academic<span style={{ color: 'var(--accent-primary)' }}>Share</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BCA Knowledge Hub</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            padding: '1.25rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-subtle)' : 'transparent',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  transition: 'all var(--transition-fast)',
                  textDecoration: 'none',
                })}
              >
                <Icon size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User / Auth Footer */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--border-glass-subtle)',
            background: 'var(--surface-glass-subtle)',
          }}
        >
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <p className="truncate" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {user?.name || 'Logged in'}
                  </p>
                  <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Student</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: 'var(--radius-sm)' }}
                title="Log out"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              <LogIn size={16} />
              <span>Log in / Sign up</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

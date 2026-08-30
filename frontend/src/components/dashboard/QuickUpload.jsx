import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function QuickUpload() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        background: 'linear-gradient(145deg, var(--surface-glass) 0%, rgba(102, 155, 188, 0.12) 100%)',
        border: '1px solid var(--border-glass-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-subtle)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UploadCloud size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Share Resource</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Help your BCA coursemates</p>
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
        Upload lecture notes, solved assignments, question banks, or past exam papers.
      </p>

      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        onClick={() => navigate(isAuthenticated ? '/app/upload' : '/login')}
      >
        {isAuthenticated ? 'Upload Now' : 'Log in to Upload'}
      </Button>
    </div>
  );
}

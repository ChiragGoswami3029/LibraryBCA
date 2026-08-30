import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { getFiles } from '../../services/filesApi';
import FileList from '../files/FileList';
import { useAuth } from '../../context/AuthContext';

export default function RecentUploads() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const loadRecentFiles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFiles({ sort: 'newest' });
      // Take first 5 recent files
      setFiles(Array.isArray(data) ? data.slice(0, 6) : []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecentFiles();
  }, []);

  return (
    <section style={{ marginTop: '1.75rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Recent Uploads</h2>
        </div>
        <Link
          to="/app/browse"
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>View all resources</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <FileList
        files={files}
        isLoading={isLoading}
        error={error}
        onRetry={loadRecentFiles}
        emptyTitle="No recent uploads"
        emptyDescription="Be the first to share notes or assignments for your class!"
        currentUserId={user?.id}
      />
    </section>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FileCode,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Download,
  Eye,
  MessageSquare,
  User,
  Calendar,
  Pencil,
  Trash2,
} from 'lucide-react';
import { getDownloadUrl } from '../../services/filesApi';
import IconButton from '../common/IconButton';

export default function FileRow({
  file,
  isOwner = false,
  onEdit = null,
  onDelete = null,
}) {
  const navigate = useNavigate();

  // Helper to format ISO upload date
  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  // Determine icon based on filename extension
  const getFileIcon = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase() || '';
    if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) return FileImage;
    if (['zip', 'rar', '7z', 'tar'].includes(ext)) return FileArchive;
    if (['py', 'php', 'js', 'html', 'css', 'json', 'cpp', 'java'].includes(ext)) return FileCode;
    if (['xls', 'xlsx', 'csv'].includes(ext)) return FileSpreadsheet;
    return FileText;
  };

  const FileIconComponent = getFileIcon(file.original_name);

  return (
    <div
      className="glass-card"
      style={{
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '0.75rem',
        flexWrap: 'wrap',
      }}
    >
      {/* File Icon + Title + Meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          minWidth: '240px',
          flex: '1 1 300px',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/app/files/${file.id}`)}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-subtle)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            flexShrink: 0,
          }}
        >
          <FileIconComponent size={22} />
        </div>

        <div style={{ minWidth: 0 }}>
          <h4
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            {file.title}
          </h4>

          {/* Badges & Meta info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              fontSize: '0.75rem',
            }}
          >
            <span className="badge badge-accent">{file.category}</span>
            <span className="badge">{file.subject}</span>
            <span className="badge">Sem {file.semester}</span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--text-muted)',
                marginLeft: '4px',
              }}
            >
              <User size={12} />
              {file.uploader}
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--text-muted)',
              }}
            >
              <Calendar size={12} />
              {formatDate(file.upload_date)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexShrink: 0,
        }}
      >
        {/* Comments count indicator */}
        <button
          type="button"
          onClick={() => navigate(`/app/files/${file.id}`)}
          className="btn btn-ghost btn-sm"
          style={{ gap: '5px', fontSize: '0.8rem' }}
          title={`${file.comment_count} comments`}
        >
          <MessageSquare size={15} />
          <span>{file.comment_count}</span>
        </button>

        {/* View / Preview */}
        <button
          type="button"
          onClick={() => navigate(`/app/files/${file.id}`)}
          className="btn btn-glass btn-sm"
          title="View resource & preview"
        >
          <Eye size={15} />
          <span>View</span>
        </button>

        {/* Direct Download */}
        <a
          href={getDownloadUrl(file.id)}
          download={file.original_name}
          className="btn btn-primary btn-sm"
          title="Download file directly"
        >
          <Download size={15} />
          <span>Download</span>
        </a>

        {/* Owner Edit & Delete actions */}
        {isOwner && onEdit && (
          <IconButton
            icon={Pencil}
            label="Edit file metadata"
            variant="glass"
            size="sm"
            onClick={() => onEdit(file)}
          />
        )}

        {isOwner && onDelete && (
          <IconButton
            icon={Trash2}
            label="Delete file"
            variant="danger"
            size="sm"
            onClick={() => onDelete(file)}
          />
        )}
      </div>
    </div>
  );
}

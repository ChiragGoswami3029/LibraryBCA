import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckSquare, HelpCircle, Archive, ArrowRight } from 'lucide-react';

const categoryIcons = {
  'Notes': BookOpen,
  'Assignments': CheckSquare,
  'Important Questions': HelpCircle,
  'Previous Year Papers': Archive,
};

const categoryDescriptions = {
  'Notes': 'Lecture notes, handwritten summaries, and module guides.',
  'Assignments': 'Lab exercises, homework problems, and project files.',
  'Important Questions': 'Exam question banks, viva questions, and high-yield topics.',
  'Previous Year Papers': 'University semester exam papers and past solutions.',
};

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const IconComponent = categoryIcons[category] || BookOpen;
  const description = categoryDescriptions[category] || 'Browse resources in this category.';

  return (
    <div
      className="glass-card glass-card-interactive"
      onClick={() => navigate(`/app/browse?category=${encodeURIComponent(category)}`)}
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-subtle)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
          }}
        >
          <IconComponent size={22} />
        </div>
        <div
          style={{
            color: 'var(--accent-primary)',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowRight size={16} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
          {category}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

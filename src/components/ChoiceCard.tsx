import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ChoiceCardProps {
  id: string;
  label: string;
  emoji?: string;
  image?: string;
  selected: boolean;
  onToggle: (id: string) => void;
  delay?: number;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ id, label, emoji, image, selected, onToggle, delay = 0 }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.button
      className={`choice-card ${selected ? 'selected' : ''}`}
      onClick={() => onToggle(id)}
      aria-pressed={selected}
      type="button"
      id={`choice-${id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
    >
      {image && !imgError ? (
        <img
          className="card-img"
          src={image}
          alt={label}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="card-img-fallback">
          <span>{emoji ?? '🍽️'}</span>
        </div>
      )}

      <span className="card-label">{label}</span>

      <span className="check-mark" aria-hidden="true">
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1.5,5.5 4,8 8.5,2" />
        </svg>
      </span>
    </motion.button>
  );
};

export default ChoiceCard;

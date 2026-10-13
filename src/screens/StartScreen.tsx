import React from 'react';
import { motion } from 'motion/react';
import { SCREEN_START } from '../config/gameConfig';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      {/* Background decorations */}
      <div className="start-bg-circle-1" />
      <div className="start-bg-circle-2" />
      <div className="start-bg-circle-3" />

      <div className="start-content">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="start-tag">
            <span>✦</span>
            {SCREEN_START.badge}
            <span>✦</span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="start-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {SCREEN_START.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="start-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {SCREEN_START.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < SCREEN_START.subtitle.split('\n').length - 1 && <br />}
            </span>
          ))}
        </motion.p>

        {/* Intro */}
        <motion.p
          className="start-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {SCREEN_START.intro}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="start-cta" onClick={onStart} id="start-game-btn" type="button">
            <span>{SCREEN_START.cta}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </button>
          <p className="start-footnote">{SCREEN_START.footnote}</p>
        </motion.div>

        {/* From tag */}
        <motion.p
          className="start-from-tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {SCREEN_START.decorTag}
        </motion.p>
      </div>
    </div>
  );
};

export default StartScreen;

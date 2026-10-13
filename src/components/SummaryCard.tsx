import React from 'react';
import type { GameState } from '../types/game';
import {
  SCREEN_LOCATION,
  SCREEN_ACTIVITY,
  SCREEN_BONUS,
  SCREEN_FINAL,
  LABEL_MAPS,
} from '../config/gameConfig';

interface SummaryCardProps {
  state: GameState;
  onEdit: () => void;
}

const getLocationLabel = (id: string): string =>
  SCREEN_LOCATION.options.find((o) => o.id === id)?.label ?? id;

const getActivityLabel = (id: string): string =>
  SCREEN_ACTIVITY.options.find((o) => o.id === id)?.label ?? id;

const SummaryCard: React.FC<SummaryCardProps> = ({ state, onEdit }) => {
  const locations = [
    ...state.locations.map(getLocationLabel),
    ...(state.customLocation ? [state.customLocation] : []),
  ];

  const activities = [
    ...state.activities.map(getActivityLabel),
    ...(state.customActivity ? [state.customActivity] : []),
  ];

  const bonusNotes = [
    state.specialRequest,
    ...state.funFactors.map((id) => {
      const match = SCREEN_BONUS.q2Options.find((o) => o.id === id);
      return match?.label ?? id;
    }),
    state.restrictions,
    state.plannerRequests,
  ].filter(Boolean);

  const initialAnswerLabel =
    LABEL_MAPS.initialAnswer[state.initialAnswer as keyof typeof LABEL_MAPS.initialAnswer] ?? '-';
  const timeLabel =
    LABEL_MAPS.timeSlot[state.timeSlot as keyof typeof LABEL_MAPS.timeSlot] ?? 'Not decided yet';

  return (
    <div className="summary-card">
      <div className="summary-header">
        <h2 className="summary-title">{SCREEN_FINAL.summaryTitle}</h2>
        <span className="summary-plan-tag">Draft v1</span>
      </div>

      <button className="edit-plan-btn" onClick={onEdit} type="button">
        ✎ {SCREEN_FINAL.editButton}
      </button>

      <div className="summary-section">
        <div className="summary-section-label">First answer</div>
        <div className="summary-section-value">{initialAnswerLabel}</div>
      </div>

      <div className="summary-section">
        <div className="summary-section-label">Place</div>
        {locations.length > 0 ? (
          <div className="summary-tags">
            {locations.map((l, i) => (
              <span key={i} className="summary-tag">{l}</span>
            ))}
          </div>
        ) : (
          <div className="summary-section-value empty">Nothing chosen yet</div>
        )}
      </div>

      {activities.length > 0 && (
        <div className="summary-section">
          <div className="summary-section-label">Add-on</div>
          <div className="summary-tags">
            {activities.map((a, i) => (
              <span key={i} className="summary-tag">{a}</span>
            ))}
          </div>
        </div>
      )}

      <div className="summary-section">
        <div className="summary-section-label">Time</div>
        <div className="summary-section-value">{timeLabel}</div>
      </div>

      {bonusNotes.length > 0 && (
        <div className="summary-section">
          <div className="summary-section-label">Notes</div>
          <div className="summary-tags">
            {bonusNotes.map((note, i) => (
              <span key={i} className="summary-tag">{note}</span>
            ))}
          </div>
        </div>
      )}

      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '10px',
          color: 'rgba(247, 242, 232, 0.3)',
          letterSpacing: '0.08em',
          marginTop: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        #{state.sessionId}
      </p>
    </div>
  );
};

export default SummaryCard;

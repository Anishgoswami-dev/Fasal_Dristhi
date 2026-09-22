import React from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

/**
 * 📊 ConfidenceCard Component (Section 3)
 * Receives raw confidence (e.g. 0.3638), confidenceStatus, and modelVersion.
 * Automatically converts float into human-readable percentage (36.4%).
 * Adheres strictly to certainty policy:
 * - >= 85%: HIGH_CONFIDENCE
 * - 60% - 84.9%: REVIEW_RECOMMENDED
 * - < 60%: LOW_UNCERTAIN
 */
export default function ConfidenceCard({
  confidence = 0.952,
  confidenceStatus = 'HIGH_CONFIDENCE',
  modelVersion = 'MobileNetV2 (candidate-step-2)'
}) {
  // Convert raw float to human-readable percentage without manipulation
  const percentage = typeof confidence === 'number'
    ? (confidence <= 1 ? confidence * 100 : confidence).toFixed(1)
    : '0.0';

  const numericVal = parseFloat(percentage);

  // Status badge styling adhering strictly to policy
  const isHigh = numericVal >= 85;
  const isMedium = numericVal >= 60 && numericVal < 85;

  const statusLabel = confidenceStatus || (isHigh ? 'HIGH_CONFIDENCE' : isMedium ? 'REVIEW_RECOMMENDED' : 'LOW_UNCERTAIN');
  const isUncertain = statusLabel === 'LOW_UNCERTAIN' || (!isHigh && !isMedium);

  return (
    <div className="diagnosis-card">
      <div className="confidence-card-header">
        <div>
          <span
            className="confidence-status-badge"
            style={
              isUncertain
                ? { background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }
                : isMedium
                ? { background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }
                : { background: '#f0fdf4', color: '#16a34a', borderColor: '#86efac' }
            }
          >
            {isUncertain ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
            {statusLabel}
          </span>
        </div>

        {modelVersion && (
          <span style={{ fontSize: '10px', color: 'var(--ink-muted)', fontWeight: 600 }}>
            {modelVersion}
          </span>
        )}
      </div>

      <div className="confidence-metric-wrap">
        <span className="confidence-number-big" style={{ color: isUncertain ? '#dc2626' : (isMedium ? '#b45309' : '#16a34a') }}>
          {percentage}%
        </span>
        <span className="confidence-label-text">
          Confidence Level {isUncertain && <span style={{ color: '#dc2626', fontSize: '11px', fontWeight: 600 }}>(Uncertain Diagnosis)</span>}
        </span>
      </div>

      {/* Visual meter bar */}
      <div className="confidence-progress-bar">
        <div
          className="confidence-progress-fill"
          style={{
            width: `${Math.min(100, Math.max(5, numericVal))}%`,
            background: isUncertain ? '#ef4444' : (isMedium ? '#f59e0b' : '#16a34a')
          }}
        />
      </div>

      <div className="confidence-footer-note">
        <span>Computed from foliar vision feature extraction</span>
        <span>{isUncertain ? 'Uncertain - verification advised' : (isMedium ? 'Review recommended' : 'Verified match')}</span>
      </div>
    </div>
  );
}

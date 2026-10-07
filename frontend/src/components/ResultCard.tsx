import { AlertCircle, CheckCircle2, HeartPulse, TrendingUp } from 'lucide-react'
import { FIELD_CONFIG, formatValueWithUnit } from '../constants/fields.ts'
import type { PatientInputs, PredictionResult } from '../types'

interface RiskMeterProps {
  score: number
}

function RiskMeter({ score }: RiskMeterProps) {
  const pct = Math.min(100, Math.max(0, score))
  const colorClass = pct >= 50 ? 'fill-high' : pct >= 25 ? 'fill-medium' : 'fill-low'

  return (
    <div className="risk-meter" aria-hidden="true">
      <div className="risk-meter-track">
        <div className={`risk-meter-fill ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="risk-meter-labels">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  )
}

interface ResultCardProps {
  result: PredictionResult | null
  error: string | null
  inputs: PatientInputs | null
}

function ResultCard({ result, error, inputs }: ResultCardProps) {
  if (error) {
    return (
      <div className="result-card result-error animate-result" role="alert">
        <div className="result-icon-wrap error">
          <AlertCircle size={32} aria-hidden="true" />
        </div>
        <h3>Prediction Failed</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="result-card result-empty">
        <div className="result-placeholder-icon">
          <HeartPulse size={40} aria-hidden="true" />
          <div className="pulse-ring" />
        </div>
        <h3>Awaiting Prediction</h3>
        <p>Complete all eight health fields and submit to receive a risk assessment.</p>
      </div>
    )
  }

  const isDiabetic = result.prediction === 1
  const score      = result.score ?? (isDiabetic ? 65 : 20)
  const riskLevel  = result.risk_level ?? (isDiabetic ? 'High' : 'Low')
  const confidence = result.confidence ?? 'Moderate'

  return (
    <div
      className={`result-card animate-result ${isDiabetic ? 'result-positive' : 'result-negative'}`}
    >
      <div className="result-badge-row">
        <span className={`risk-badge ${isDiabetic ? 'risk-high' : 'risk-low'}`}>
          {riskLevel} Risk
        </span>
        <span className="confidence-badge">
          <TrendingUp size={12} aria-hidden="true" />
          {confidence} Confidence
        </span>
      </div>

      <div className="result-header">
        <div className={`result-icon-wrap ${isDiabetic ? 'warning' : 'success'}`}>
          {isDiabetic ? (
            <AlertCircle size={32} aria-hidden="true" />
          ) : (
            <CheckCircle2 size={32} aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="result-eyebrow">Risk Assessment</p>
          <p className="result-label">{result.result}</p>
        </div>
      </div>

      <div className="score-display">
        <span className="score-value">{score}</span>
        <span className="score-label">/ 100 Risk Score</span>
      </div>

      <RiskMeter score={score} />

      <p className="result-message">
        {isDiabetic
          ? 'The risk assessment indicates an elevated likelihood of diabetes based on the provided health indicators.'
          : 'The risk assessment indicates a lower likelihood of diabetes based on the provided health indicators.'}
      </p>

      {inputs && (
        <div className="input-summary">
          <h4>Input Summary</h4>
          <dl>
            {FIELD_CONFIG.map((field) => (
              <div key={field.name} className="summary-row">
                <dt>
                  {field.label}
                  <span className="summary-unit">{field.unit}</span>
                </dt>
                <dd>{formatValueWithUnit(field.name, inputs[field.name])}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <p className="disclaimer-inline">
        This result is an automated risk estimate and not a medical diagnosis.
        Please consult a qualified medical professional for health guidance.
      </p>
    </div>
  )
}

export default ResultCard

import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import type { PageId } from '../types'

interface HeroProps {
  onNavigate: (page: PageId) => void
}

function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container hero-grid">
        <div className="hero-content animate-rise">
          <p className="eyebrow">
            <Zap size={14} aria-hidden="true" />
            Health Screening & Risk Assessment
          </p>
          <h1>
            Understand Your
            <span className="text-gradient"> Diabetes Risk</span>
          </h1>
          <p className="hero-subtitle">
            An interactive tool that analyzes key clinical health indicators to deliver real-time risk evaluations and maintain your assessment history.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary btn-glow" onClick={() => onNavigate('predict')}>
              Check Your Risk
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('how-it-works')}
            >
              How It Works
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <strong>8</strong>
              <span>Clinical inputs</span>
            </div>
            <div className="stat-item">
              <strong>0–100</strong>
              <span>Risk score scale</span>
            </div>
            <div className="stat-item">
              <strong>Instant</strong>
              <span>Results & history</span>
            </div>
          </div>
        </div>

        <div className="hero-card animate-rise delay-1">
          <div className="hero-card-icon">
            <ShieldCheck size={28} aria-hidden="true" />
          </div>
          <h2>Clinical Risk Scoring</h2>
          <p>
            Evaluate your key health metrics against standardized risk thresholds to assess diabetes likelihood and view a breakdown of contributing factors.
          </p>
          <ul className="hero-checklist">
            <li>Weighted clinical metric analysis</li>
            <li>Complete history log</li>
            <li>Confidential & instant</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero

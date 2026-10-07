import Hero from '../components/Hero.tsx'
import FeatureInfo from '../components/FeatureInfo.tsx'
import type { PageId } from '../types'

interface HomeProps {
  onNavigate: (page: PageId) => void
}

function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <Hero onNavigate={onNavigate} />

      <section className="how-preview">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">1</span>
              <h3>Enter Metrics</h3>
              <p>Provide routine health indicators like glucose, blood pressure, BMI, and age.</p>
            </article>
            <article className="step-card">
              <span className="step-number">2</span>
              <h3>Validate Inputs</h3>
              <p>The form verifies your data formats and checks values against valid physiological ranges.</p>
            </article>
            <article className="step-card">
              <span className="step-number">3</span>
              <h3>Calculate Risk</h3>
              <p>The scoring algorithm evaluates your profile against clinical reference thresholds.</p>
            </article>
            <article className="step-card">
              <span className="step-number">4</span>
              <h3>Track Records</h3>
              <p>Review the calculated risk score and view your logged results in the history panel.</p>
            </article>
          </div>
        </div>
      </section>

      <FeatureInfo />

      <section className="disclaimer-section">
        <div className="container narrow">
          <h2>Medical Disclaimer</h2>
          <p>
            This application is designed as an informational health screening tool and is not intended to
            provide medical diagnoses or replace clinical examinations. If you have concerns about your health,
            please consult a licensed physician or specialist.
          </p>
        </div>
      </section>
    </>
  )
}

export default Home

import { FIELD_CONFIG } from '../constants/fields.ts'

function FeatureInfo() {
  return (
    <section className="feature-info">
      <div className="container">
        <div className="section-header">
          <h2>Clinical Input Parameters</h2>
          <p className="section-subtitle">
            The assessment evaluates eight physiological indicators, each measured in standard medical units.
          </p>
        </div>
        <div className="feature-grid">
          {FIELD_CONFIG.map((field, index) => (
            <article
              key={field.name}
              className="feature-card"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="feature-card-top">
                <h3>{field.label}</h3>
                <span className="feature-unit">{field.unit}</span>
              </div>
              <p>{field.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureInfo

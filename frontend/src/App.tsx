import { useState } from 'react'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import Prediction from './pages/Prediction.tsx'
import History from './pages/History.tsx'
import Footer from './components/Footer.tsx'
import type { PageId } from './types'

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')

  const navigate = (page: PageId) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main>
        {currentPage === 'home' && <Home onNavigate={navigate} />}
        {currentPage === 'predict' && <Prediction />}
        {currentPage === 'history' && <History />}
        {currentPage === 'how-it-works' && (
          <section className="page-section">
            <div className="container">
              <h1>How It Works</h1>
              <div className="steps-grid">
                <article className="step-card">
                  <span className="step-number">1</span>
                  <h3>Enter Health Data</h3>
                  <p>Input patient health indicators such as glucose level, blood pressure, BMI, and age.</p>
                </article>
                <article className="step-card">
                  <span className="step-number">2</span>
                  <h3>Validate Information</h3>
                  <p>The system checks each value for valid medical measurement ranges.</p>
                </article>
                <article className="step-card">
                  <span className="step-number">3</span>
                  <h3>Risk Assessment</h3>
                  <p>A scoring model calculates a weighted 0-100 risk score based on recognized clinical benchmarks.</p>
                </article>
                <article className="step-card">
                  <span className="step-number">4</span>
                  <h3>Review & Track</h3>
                  <p>Review the comprehensive assessment results and track previous records in the history log.</p>
                </article>
              </div>
            </div>
          </section>
        )}
        {currentPage === 'about' && (
          <section className="page-section">
            <div className="container narrow">
              <h1>About This Project</h1>
              <p>
                Diabetes Risk Assessment is a full-stack health screening application.
                It allows users and practitioners to enter basic health indicators and receive an estimated risk score along with category classifications.
              </p>
              <p>
                Past evaluations are automatically saved for later review, allowing users to track changes across multiple entries.
              </p>
              <div className="tech-stack">
                <span>React</span>
                <span>TypeScript</span>
                <span>Vite</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>MongoDB</span>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App

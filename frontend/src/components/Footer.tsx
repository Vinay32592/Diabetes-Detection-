function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Diabetes Risk Assessment. All rights reserved.</p>
        <p className="footer-disclaimer">
          This application is for educational and screening purposes only. Always consult a licensed medical professional for formal diagnoses.
        </p>
      </div>
    </footer>
  )
}

export default Footer

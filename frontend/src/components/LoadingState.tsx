function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-rings" aria-hidden="true">
        <div className="loading-ring ring-1" />
        <div className="loading-ring ring-2" />
        <div className="loading-ring ring-3" />
      </div>
      <p className="loading-text">Analyzing health indicators</p>
      <p className="loading-subtext">Calculating risk score and factor breakdown...</p>
    </div>
  )
}

export default LoadingState

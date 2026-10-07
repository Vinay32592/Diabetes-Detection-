import { useEffect, useState, useCallback } from 'react'
import { AlertCircle, CheckCircle2, Clock, RefreshCw, Trash2 } from 'lucide-react'
import { fetchHistory, deleteHistoryRecord } from '../services/api.ts'
import type { HistoryResponse, PredictionRecord } from '../types'

function RiskBadge({ riskLevel }: { riskLevel: string }) {
  const cls =
    riskLevel === 'High'
      ? 'risk-badge risk-high'
      : riskLevel === 'Moderate'
        ? 'risk-badge risk-moderate'
        : 'risk-badge risk-low'
  return <span className={cls}>{riskLevel}</span>
}

function HistoryRow({
  record,
  onDelete,
}: {
  record: PredictionRecord
  onDelete: (id: string) => void
}) {
  const isDiabetic = record.prediction === 1
  const date = new Date(record.createdAt).toLocaleString()

  return (
    <tr className={`history-row ${isDiabetic ? 'row-diabetic' : 'row-healthy'}`}>
      <td className="history-result-cell">
        <div className="history-result-icon">
          {isDiabetic ? (
            <AlertCircle size={16} className="icon-warn" aria-hidden="true" />
          ) : (
            <CheckCircle2 size={16} className="icon-ok" aria-hidden="true" />
          )}
          <span>{record.result}</span>
        </div>
      </td>
      <td><RiskBadge riskLevel={record.risk_level} /></td>
      <td>
        <span className="score-pill">{record.score}</span>
      </td>
      <td>{record.confidence}</td>
      <td className="history-inputs-cell">
        <span title={`Glucose: ${record.inputs.glucose} | BMI: ${record.inputs.bmi} | Age: ${record.inputs.age}`}>
          G:{record.inputs.glucose} / BMI:{record.inputs.bmi} / Age:{record.inputs.age}
        </span>
      </td>
      <td className="history-date-cell">
        <Clock size={12} aria-hidden="true" />
        {date}
      </td>
      <td>
        <button
          type="button"
          className="btn-icon btn-delete"
          aria-label="Delete record"
          onClick={() => onDelete(record._id)}
        >
          <Trash2 size={15} />
        </button>
      </td>
    </tr>
  )
}

function History() {
  const [data, setData]         = useState<HistoryResponse | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [page, setPage]         = useState(1)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchHistory(p, 10)
      setData(res)
      setPage(p)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load(1) }, [load])

  async function handleDelete(id: string) {
    setDeleting(id)
    try {
      await deleteHistoryRecord(id)
      void load(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete record')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-header history-header">
          <div>
            <h1>Assessment History</h1>
            <p>Review past assessments and logged patient records.</p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => void load(page)}
            disabled={loading}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="history-error" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            {error}
          </div>
        )}

        {loading && (
          <div className="history-loading">
            <div className="spinner" aria-label="Loading history" />
            <p>Loading history records...</p>
          </div>
        )}

        {!loading && data && data.data.length === 0 && (
          <div className="history-empty">
            <Clock size={48} aria-hidden="true" />
            <h3>No Predictions Yet</h3>
            <p>Run your first risk assessment on the Predict page.</p>
          </div>
        )}

        {!loading && data && data.data.length > 0 && (
          <>
            <div className="history-meta">
              Showing {data.data.length} of {data.total} records &nbsp;·&nbsp; Page {data.page} of {data.pages}
            </div>
            <div className="table-wrapper">
              <table className="history-table" aria-label="Prediction history">
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Risk</th>
                    <th>Score</th>
                    <th>Confidence</th>
                    <th>Key Inputs</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((record) => (
                    <HistoryRow
                      key={record._id}
                      record={record}
                      onDelete={deleting ? () => {} : handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {data.pages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => void load(page - 1)}
                  disabled={page <= 1 || loading}
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  {page} / {data.pages}
                </span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => void load(page + 1)}
                  disabled={page >= data.pages || loading}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default History

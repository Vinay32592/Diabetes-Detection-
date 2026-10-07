import type { PatientInputs, PredictionResult, HistoryResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const errData = await res.json();
      if (errData.detail) {
        message = Array.isArray(errData.detail)
          ? errData.detail.map((item: { msg: string }) => item.msg).join(', ')
          : String(errData.detail);
      }
    } catch {
      /* keep default */
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export async function predictDiabetes(patientData: PatientInputs): Promise<PredictionResult> {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData),
  });
  return handleResponse<PredictionResult>(res);
}

export async function fetchHistory(page = 1, limit = 10): Promise<HistoryResponse> {
  const res = await fetch(`${API_URL}/predict/history?page=${page}&limit=${limit}`);
  return handleResponse<HistoryResponse>(res);
}

export async function deleteHistoryRecord(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/predict/history/${id}`, { method: 'DELETE' });
  await handleResponse<unknown>(res);
}

export async function checkHealth(): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/`);
  return handleResponse<{ message: string }>(res);
}

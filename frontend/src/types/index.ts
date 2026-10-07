export interface PatientInputs {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree_function: number;
  age: number;
}

export interface PredictionBreakdown {
  glucose: number;
  bmi: number;
  age: number;
  diabetes_pedigree_function: number;
  blood_pressure: number;
  insulin: number;
  skin_thickness: number;
  pregnancies: number;
}

export type RiskLevel  = 'Low' | 'Moderate' | 'High';
export type Confidence = 'Low' | 'Moderate' | 'High';

export interface PredictionResult {
  _id?: string;
  prediction: 0 | 1;
  result: string;
  risk_level: RiskLevel;
  confidence: Confidence;
  score: number;
  breakdown: PredictionBreakdown;
  thresholds: { low: number; high: number };
  createdAt?: string;
}

export interface PredictionRecord extends PredictionResult {
  _id: string;
  inputs: PatientInputs;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: PredictionRecord[];
}

export interface FieldConfig {
  name: keyof PatientInputs;
  label: string;
  unit: string;
  unitShort: string;
  placeholder: string;
  min: number;
  step: string;
  description: string;
}

export type PageId = 'home' | 'predict' | 'history' | 'how-it-works' | 'about';

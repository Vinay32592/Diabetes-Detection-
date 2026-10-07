import type { FieldConfig, PatientInputs } from '../types';

export const FIELD_CONFIG: FieldConfig[] = [
  {
    name: 'pregnancies',
    label: 'Pregnancies',
    unit: 'count',
    unitShort: '×',
    placeholder: '2',
    min: 0,
    step: '1',
    description: 'Number of times pregnant',
  },
  {
    name: 'glucose',
    label: 'Glucose',
    unit: 'mg/dL',
    unitShort: 'mg/dL',
    placeholder: '120',
    min: 0,
    step: '0.1',
    description: 'Plasma glucose concentration',
  },
  {
    name: 'blood_pressure',
    label: 'Blood Pressure',
    unit: 'mm Hg',
    unitShort: 'mm Hg',
    placeholder: '70',
    min: 0,
    step: '0.1',
    description: 'Diastolic blood pressure',
  },
  {
    name: 'skin_thickness',
    label: 'Skin Thickness',
    unit: 'mm',
    unitShort: 'mm',
    placeholder: '20',
    min: 0,
    step: '0.1',
    description: 'Triceps skin fold thickness',
  },
  {
    name: 'insulin',
    label: 'Insulin',
    unit: 'µU/mL',
    unitShort: 'µU/mL',
    placeholder: '80',
    min: 0,
    step: '0.1',
    description: '2-hour serum insulin',
  },
  {
    name: 'bmi',
    label: 'BMI',
    unit: 'kg/m²',
    unitShort: 'kg/m²',
    placeholder: '25.4',
    min: 0,
    step: '0.1',
    description: 'Body mass index',
  },
  {
    name: 'diabetes_pedigree_function',
    label: 'Diabetes Pedigree Function',
    unit: 'score',
    unitShort: 'score',
    placeholder: '0.351',
    min: 0,
    step: '0.001',
    description: 'Genetic predisposition score',
  },
  {
    name: 'age',
    label: 'Age',
    unit: 'years',
    unitShort: 'yrs',
    placeholder: '33',
    min: 0.01,
    step: '1',
    description: 'Patient age',
  },
];

export const SAMPLE_DATA: PatientInputs = {
  pregnancies: 5,
  glucose: 166,
  blood_pressure: 72,
  skin_thickness: 19,
  insulin: 175,
  bmi: 25.8,
  diabetes_pedigree_function: 0.587,
  age: 51,
};

export function getFieldUnit(name: keyof PatientInputs): string {
  return FIELD_CONFIG.find((f) => f.name === name)?.unit ?? '';
}

export function formatValueWithUnit(name: keyof PatientInputs, value: number): string {
  const field = FIELD_CONFIG.find((f) => f.name === name);
  if (!field) return String(value);
  if (field.unit === 'count') return `${value} times`;
  if (field.unit === 'score') return String(value);
  return `${value} ${field.unit}`;
}

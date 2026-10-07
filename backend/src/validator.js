const FIELDS = [
  { name: 'pregnancies', label: 'Pregnancies', min: 0, gtZero: false },
  { name: 'glucose', label: 'Glucose', min: 0, gtZero: false },
  { name: 'blood_pressure', label: 'Blood Pressure', min: 0, gtZero: false },
  { name: 'skin_thickness', label: 'Skin Thickness', min: 0, gtZero: false },
  { name: 'insulin', label: 'Insulin', min: 0, gtZero: false },
  { name: 'bmi', label: 'BMI', min: 0, gtZero: false },
  { name: 'diabetes_pedigree_function', label: 'Diabetes Pedigree Function', min: 0, gtZero: false },
  { name: 'age', label: 'Age', min: 0.01, gtZero: true },
];

export function validatePredictionInput(body) {
  const errors = [];
  const data = {};

  for (const field of FIELDS) {
    const raw = body[field.name];

    if (raw === undefined || raw === null || raw === '') {
      errors.push(`${field.label} is required.`);
      continue;
    }

    const value = Number(raw);
    if (Number.isNaN(value)) {
      errors.push(`${field.label} must be a number.`);
      continue;
    }

    if (field.gtZero && value <= 0) {
      errors.push(`${field.label} must be greater than 0.`);
      continue;
    }

    if (!field.gtZero && value < field.min) {
      errors.push(`${field.label} cannot be negative.`);
      continue;
    }

    data[field.name] = value;
  }

  return errors.length > 0 ? { data: null, errors } : { data, errors: [] };
}

function scoreGlucose(val) {
  if (val < 100) return 0;
  if (val < 126) return 40;
  if (val < 160) return 75;
  return 100;
}

function scoreBMI(val) {
  if (val < 25) return 0;
  if (val < 30) return 25;
  if (val < 35) return 60;
  return 90;
}

function scoreAge(val) {
  if (val < 30) return 0;
  if (val < 45) return 20;
  if (val < 60) return 55;
  return 80;
}

function scoreBloodPressure(val) {
  if (val === 0 || val < 80) return 0;
  if (val < 90) return 35;
  return 65;
}

function scoreInsulin(val) {
  if (val === 0 || val <= 166) return 0;
  if (val <= 250) return 40;
  return 70;
}

function scoreSkinThickness(val) {
  if (val === 0 || val < 20) return 0;
  if (val < 35) return 20;
  return 50;
}

function scorePregnancies(val) {
  if (val === 0) return 0;
  if (val < 3) return 10;
  if (val < 6) return 30;
  return 55;
}

function scoreDiabetesPedigree(val) {
  if (val < 0.3) return 0;
  if (val < 0.5) return 25;
  if (val < 0.8) return 55;
  return 85;
}

const WEIGHTS = {
  glucose: 0.30,
  bmi: 0.20,
  age: 0.15,
  diabetes_pedigree_function: 0.12,
  blood_pressure: 0.09,
  insulin: 0.07,
  skin_thickness: 0.04,
  pregnancies: 0.03,
};

const LOW_THRESHOLD = 25;
const HIGH_THRESHOLD = 50;

function calculateScore(data) {
  const scores = {
    glucose: scoreGlucose(data.glucose),
    bmi: scoreBMI(data.bmi),
    age: scoreAge(data.age),
    diabetes_pedigree_function: scoreDiabetesPedigree(data.diabetes_pedigree_function),
    blood_pressure: scoreBloodPressure(data.blood_pressure),
    insulin: scoreInsulin(data.insulin),
    skin_thickness: scoreSkinThickness(data.skin_thickness),
    pregnancies: scorePregnancies(data.pregnancies),
  };

  let total = 0;
  for (const key of Object.keys(WEIGHTS)) {
    total += scores[key] * WEIGHTS[key];
  }

  return {
    score: Math.round(total * 10) / 10,
    breakdown: scores,
  };
}

function classifyRisk(score) {
  if (score >= HIGH_THRESHOLD) {
    return {
      prediction: 1,
      result: 'Diabetic',
      risk_level: 'High',
      confidence: score >= 70 ? 'High' : 'Moderate',
    };
  }

  if (score >= LOW_THRESHOLD) {
    return {
      prediction: 0,
      result: 'Not Diabetic',
      risk_level: 'Moderate',
      confidence: 'Low',
    };
  }

  return {
    prediction: 0,
    result: 'Not Diabetic',
    risk_level: 'Low',
    confidence: score < 10 ? 'High' : 'Moderate',
  };
}

export function predict(data) {
  const { score, breakdown } = calculateScore(data);
  const risk = classifyRisk(score);

  return {
    ...risk,
    score,
    breakdown,
    thresholds: {
      low: LOW_THRESHOLD,
      high: HIGH_THRESHOLD,
    },
  };
}

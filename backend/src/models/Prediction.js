import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema(
  {
    inputs: {
      pregnancies: { type: Number, required: true },
      glucose: { type: Number, required: true },
      blood_pressure: { type: Number, required: true },
      skin_thickness: { type: Number, required: true },
      insulin: { type: Number, required: true },
      bmi: { type: Number, required: true },
      diabetes_pedigree_function: { type: Number, required: true },
      age: { type: Number, required: true },
    },
    prediction: { type: Number, required: true, enum: [0, 1] },
    result: { type: String, required: true },
    risk_level: { type: String, required: true, enum: ['Low', 'Moderate', 'High'] },
    confidence: { type: String, required: true, enum: ['Low', 'Moderate', 'High'] },
    score: { type: Number, required: true, min: 0, max: 100 },
    breakdown: { type: Map, of: Number },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;

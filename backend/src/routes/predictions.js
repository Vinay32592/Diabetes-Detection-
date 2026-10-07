import { Router } from 'express';
import mongoose from 'mongoose';
import Prediction from '../models/Prediction.js';
import { predict } from '../predictor.js';
import { validatePredictionInput } from '../validator.js';

const router = Router();

router.post('/', async (req, res) => {
  const { data, errors } = validatePredictionInput(req.body);

  if (errors.length > 0) {
    return res.status(422).json({ detail: errors.map((msg) => ({ msg })) });
  }

  try {
    const result = predict(data);

    let record = null;
    if (mongoose.connection.readyState === 1) {
      try {
        record = await Prediction.create({
          inputs: data,
          prediction: result.prediction,
          result: result.result,
          risk_level: result.risk_level,
          confidence: result.confidence,
          score: result.score,
          breakdown: result.breakdown,
        });
      } catch (err) {
        console.warn('Failed to save to database:', err.message);
      }
    }

    return res.status(201).json({
      ...result,
      _id: record ? record._id : `record-${Date.now()}`,
      createdAt: record ? record.createdAt : new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: `Assessment failed: ${err.message}` });
  }
});

router.get('/history', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
        data: [],
      });
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Prediction.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Prediction.countDocuments(),
    ]);

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: records,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: `Could not fetch history: ${err.message}` });
  }
});

router.delete('/history/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ detail: 'Database unavailable' });
    }

    const deleted = await Prediction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ detail: 'Record not found' });
    }
    return res.json({ message: 'Record deleted', _id: req.params.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: `Could not delete record: ${err.message}` });
  }
});

export default router;

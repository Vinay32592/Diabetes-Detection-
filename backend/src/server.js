import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import predictionRouter from './routes/predictions.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Diabetes Detection API',
  });
});

app.use('/predict', predictionRouter);

app.use((_req, res) => {
  res.status(404).json({ detail: 'Route not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ detail: err.message || 'Internal server error' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

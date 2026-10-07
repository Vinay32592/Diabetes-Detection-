import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diabetes_detection';

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`Database connection error: ${err.message}`);
  }
}

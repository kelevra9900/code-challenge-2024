import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? 'http://localhost:27017');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error(error);
  }
};

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "*", // Allows any frontend to connect during the hackathon
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Basic Route
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Traviora API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

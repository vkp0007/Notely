import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './util/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

dotenv.config({ path: '.env' });

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: "https://notely-aa6t.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
databaseConnection();

app.get('/', (req, res) => {
  res.send('API is running and DB is connected!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
export default app;

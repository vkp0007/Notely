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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);

// DB
databaseConnection();

app.get('/', (req, res) => {
  res.send('API is running and DB is connected!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;

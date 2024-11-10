import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';


dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
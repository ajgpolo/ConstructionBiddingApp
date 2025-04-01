import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects';
import compRoutes from './routes/comps';
import generateBidRoutes from './routes/generate-bid';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected' });
});

// Project routes
app.use('/api/projects', projectRoutes);

// Comparable projects routes
app.use('/api/comps', compRoutes);

// Generate bid routes
app.use('/api/generate-bid', generateBidRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
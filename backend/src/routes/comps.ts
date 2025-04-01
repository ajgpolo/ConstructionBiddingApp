import express from 'express';
import { mockProjects } from '../mockData';

const router = express.Router();

// Get all comparable projects
router.get('/', (req, res) => {
  try {
    res.json(mockProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comparable projects' });
  }
});

export default router; 
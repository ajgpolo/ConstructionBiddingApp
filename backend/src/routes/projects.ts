import express from 'express';
import { mockProjects } from '../mockData';

const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
  try {
    res.json(mockProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get a single project by ID
router.get('/:id', (req, res) => {
  try {
    const project = mockProjects.find(p => p.id === Number(req.params.id));
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

export default router; 
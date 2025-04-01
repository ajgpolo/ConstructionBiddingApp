import express from 'express';
import { mockProjects } from '../mockData';

const router = express.Router();

type ProjectType = 'Residential' | 'Commercial' | 'Industrial';

// Generate a bid based on project details
router.post('/', (req, res) => {
  const { projectType, location, size, timeline, materialSpecs, laborType } = req.body;

  // Find similar projects with weighted scoring
  const similarProjects = mockProjects.map(project => {
    let score = 0;
    
    // Project type match (highest weight)
    if (project.project_type === projectType) score += 4;
    
    // Location match (high weight)
    if (project.location.toLowerCase().includes(location.toLowerCase())) score += 3;
    
    // Size similarity (medium weight)
    const sizeDiff = Math.abs(project.project_size - size);
    const sizePercentage = sizeDiff / size;
    if (sizePercentage <= 0.2) score += 2;
    
    // Timeline similarity (medium weight)
    const timelineDiff = Math.abs(project.timeline - parseInt(timeline));
    const timelinePercentage = timelineDiff / parseInt(timeline);
    if (timelinePercentage <= 0.2) score += 2;
    
    // Material specs match (lower weight)
    if (project.material_specs === materialSpecs) score += 1;
    
    // Labor type match (lower weight)
    if (project.labor_type === laborType) score += 1;

    return { ...project, score };
  }).filter(project => project.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Take top 3 most similar projects

  if (similarProjects.length === 0) {
    // If no similar projects found, use industry standard rates
    const baseRates: Record<ProjectType, number> = {
      'Residential': 150,
      'Commercial': 200,
      'Industrial': 250
    };
    const baseRatePerSqFt = baseRates[projectType as ProjectType] || 200;

    const baseCost = baseRatePerSqFt * size;
    const timelineMultiplier = parseInt(timeline) / 180;
    const laborMultiplier = laborType === 'Union' ? 1.2 : 1;
    const materialMultiplier = materialSpecs === 'High-end finishes' ? 1.3 : 
                              materialSpecs === 'Heavy-duty industrial' ? 1.4 : 1;

    const finalCost = baseCost * timelineMultiplier * laborMultiplier * materialMultiplier;
    const finalTime = parseInt(timeline);

    return res.json({
      cost: Math.round(finalCost),
      timeDays: Math.round(finalTime),
      equipment: Math.round(finalCost * 0.2),
      materials: Math.round(finalCost * 0.4),
      laborHours: Math.round(finalTime * 8 * 5),
      contingencyCost: Math.round(finalCost * 0.1),
      contingencyTime: Math.round(finalTime * 0.1),
      similarProjects: []
    });
  }

  // Calculate weighted average cost per square foot from similar projects
  const weightedCostPerSqFt = similarProjects.reduce((acc, project) => {
    const weight = project.score;
    const costPerSqFt = project.cost / project.project_size;
    return acc + (costPerSqFt * weight);
  }, 0) / similarProjects.reduce((acc, project) => acc + project.score, 0);

  // Calculate base cost using weighted average
  const baseCost = weightedCostPerSqFt * size;
  
  // Apply adjustments based on project parameters
  const timelineMultiplier = parseInt(timeline) / 180;
  const laborMultiplier = laborType === 'Union' ? 1.2 : 1;
  const materialMultiplier = materialSpecs === 'High-end finishes' ? 1.3 : 
                            materialSpecs === 'Heavy-duty industrial' ? 1.4 : 1;

  // Calculate final bid with all factors
  const finalCost = baseCost * timelineMultiplier * laborMultiplier * materialMultiplier;
  const finalTime = parseInt(timeline) * timelineMultiplier;

  res.json({
    cost: Math.round(finalCost),
    timeDays: Math.round(finalTime),
    equipment: Math.round(finalCost * 0.2),
    materials: Math.round(finalCost * 0.4),
    laborHours: Math.round(finalTime * 8 * 5),
    contingencyCost: Math.round(finalCost * 0.1),
    contingencyTime: Math.round(finalTime * 0.1),
    similarProjects
  });
});

export default router; 
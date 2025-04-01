import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import type { GridProps } from '@mui/material';
import BidResult from './BidResult';

// Available locations from mock data
const AVAILABLE_LOCATIONS = [
  'San Francisco, CA',
  'Los Angeles, CA',
  'San Diego, CA',
  'New York, NY',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Seattle, WA',
];

interface BidData {
  cost: number;
  timeDays: number;
  equipment: number;
  materials: number;
  laborHours: number;
  contingencyCost: number;
  contingencyTime: number;
  similarProjects: Array<{
    id: number;
    location: string;
    project_type: string;
    project_size: number;
    timeline: number;
    material_specs: string;
    labor_type: string;
    cost: number;
    created_at: string;
  }>;
}

const NewBidForm: React.FC = () => {
  const [formData, setFormData] = useState({
    location: '',
    projectType: '',
    size: '',
    timeline: '',
    materialSpecs: '',
    laborType: '',
  });

  const [bidResult, setBidResult] = useState<BidData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/generate-bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          size: Number(formData.size),
          timeline: formData.timeline,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate bid');
      }

      const data = await response.json();
      setBidResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Generate New Bid
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} component="div">
              <FormControl fullWidth required>
                <InputLabel>Location</InputLabel>
                <Select
                  name="location"
                  value={formData.location}
                  onChange={handleSelectChange}
                  label="Location"
                >
                  {AVAILABLE_LOCATIONS.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <FormControl fullWidth required>
                <InputLabel>Project Type</InputLabel>
                <Select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleSelectChange}
                  label="Project Type"
                >
                  <MenuItem value="Residential">Residential</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                  <MenuItem value="Industrial">Industrial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                label="Project Size (sq ft)"
                name="size"
                type="number"
                value={formData.size}
                onChange={handleTextChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                label="Timeline (days)"
                name="timeline"
                type="number"
                value={formData.timeline}
                onChange={handleTextChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <FormControl fullWidth required>
                <InputLabel>Material Specifications</InputLabel>
                <Select
                  name="materialSpecs"
                  value={formData.materialSpecs}
                  onChange={handleSelectChange}
                  label="Material Specifications"
                >
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="High-end finishes">High-end finishes</MenuItem>
                  <MenuItem value="Standard commercial grade">Standard commercial grade</MenuItem>
                  <MenuItem value="Heavy-duty industrial">Heavy-duty industrial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <FormControl fullWidth required>
                <InputLabel>Labor Type</InputLabel>
                <Select
                  name="laborType"
                  value={formData.laborType}
                  onChange={handleSelectChange}
                  label="Labor Type"
                >
                  <MenuItem value="Union">Union</MenuItem>
                  <MenuItem value="Non-Union">Non-Union</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Bid'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {bidResult && <BidResult bid={bidResult} />}
      </Paper>
    </Container>
  );
};

export default NewBidForm; 
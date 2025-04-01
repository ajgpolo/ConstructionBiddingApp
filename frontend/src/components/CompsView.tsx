import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';

interface CompProject {
  id: number;
  location: string;
  project_type: string;
  project_size: number;
  timeline: number;
  material_specs: string;
  labor_type: string;
  cost: number;
  created_at: string;
}

const CompsView: React.FC = () => {
  const [comps, setComps] = useState<CompProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComps = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/comps');
        if (!response.ok) {
          throw new Error('Failed to fetch comparable projects');
        }
        const data = await response.json();
        setComps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComps();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        sx={{ color: 'primary.main' }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography color="error" variant="h6" gutterBottom>
            Error
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Comparable Projects
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            View and analyze similar construction projects
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Project Type</TableCell>
                <TableCell>Size (sq ft)</TableCell>
                <TableCell>Timeline (days)</TableCell>
                <TableCell>Material Specs</TableCell>
                <TableCell>Labor Type</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell>Date Added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comps.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell>{comp.location}</TableCell>
                  <TableCell>{comp.project_type}</TableCell>
                  <TableCell>{comp.project_size.toLocaleString()}</TableCell>
                  <TableCell>{comp.timeline}</TableCell>
                  <TableCell>{comp.material_specs}</TableCell>
                  <TableCell>{comp.labor_type}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {formatCurrency(comp.cost)}
                  </TableCell>
                  <TableCell>{new Date(comp.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CompsView; 
import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';

interface BidResultProps {
  bid: {
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
  };
}

const BidResult: React.FC<BidResultProps> = ({ bid }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Generated Bid Details
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total Cost
              </TableCell>
              <TableCell align="right">{formatCurrency(bid.cost)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Timeline
              </TableCell>
              <TableCell align="right">{bid.timeDays} days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Required Equipment
              </TableCell>
              <TableCell align="right">{formatCurrency(bid.equipment)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Materials
              </TableCell>
              <TableCell align="right">{formatCurrency(bid.materials)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Labor Hours
              </TableCell>
              <TableCell align="right">{bid.laborHours.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contingency Cost
              </TableCell>
              <TableCell align="right">{formatCurrency(bid.contingencyCost)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contingency Time
              </TableCell>
              <TableCell align="right">{bid.contingencyTime} days</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {bid.similarProjects.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Similar Projects
          </Typography>
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Size (sq ft)</TableCell>
                  <TableCell align="right">Timeline (days)</TableCell>
                  <TableCell align="right">Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bid.similarProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.project_type}</TableCell>
                    <TableCell align="right">{project.project_size.toLocaleString()}</TableCell>
                    <TableCell align="right">{project.timeline}</TableCell>
                    <TableCell align="right">{formatCurrency(project.cost)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default BidResult; 
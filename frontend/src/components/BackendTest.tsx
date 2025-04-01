import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

interface BackendResponse {
  message: string;
}

const BackendTest: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/test');
        const data: BackendResponse = await response.json();
        setStatus(data.message);
      } catch (err) {
        setError('Failed to connect to backend');
        console.error('Error fetching backend status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendStatus();
  }, []);

  return (
    <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Backend Connection Status
        </Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Typography color="success.main">{status}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BackendTest; 
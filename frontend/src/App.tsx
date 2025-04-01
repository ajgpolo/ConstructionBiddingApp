import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import NewBidForm from './components/NewBidForm';
import CompsView from './components/CompsView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle Brown
      light: '#A0522D', // Sienna
      dark: '#654321', // Dark Brown
    },
    secondary: {
      main: '#696969', // Dim Gray
      light: '#808080', // Gray
      dark: '#4A4A4A', // Dark Gray
    },
    background: {
      default: '#F5F5F5', // Light Gray
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#8B4513',
    },
    h6: {
      fontWeight: 600,
      color: '#696969',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: '#A0522D',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F5F5F5',
          fontWeight: 600,
          color: '#8B4513',
        },
        root: {
          padding: '16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#8B4513',
            },
          },
          '& .MuiFocused fieldset': {
            borderColor: '#8B4513',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8B4513',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8B4513',
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: '#8B4513' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                Construction Bidding App
              </Typography>
              <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
                New Bid
              </Button>
              <Button color="inherit" component={Link} to="/comps">
                Comparable Projects
              </Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/" element={<NewBidForm />} />
              <Route path="/comps" element={<CompsView />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { Box, Typography, Button, Container, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModTheme from '../ThemeComponent/ModTheme';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBrowseShop = () => {
    navigate('/shop');
  };

  return (
    <ThemeProvider theme={ModTheme}>
            <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh" 
        textAlign="center"
      >
        <CheckCircleIcon sx={{ fontSize: 100, color: 'primary.main' }} />
        <Typography variant="h4" color="primary" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for your purchase. Your payment has been successfully processed.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBrowseShop}
          sx={{ mt: 4 }}
        >
          Browse Shop
        </Button>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default PaymentSuccess;

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBrowseShop = () => {
    navigate('/shop');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh" 
        textAlign="center"
      >
        <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
        <Typography variant="h4" gutterBottom>
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
  );
};

export default PaymentSuccess;

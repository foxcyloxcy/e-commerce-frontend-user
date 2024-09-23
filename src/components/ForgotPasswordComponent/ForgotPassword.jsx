import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModTheme from '../ThemeComponent/ModTheme';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError(true);
      return;
    }
    // If email is valid, redirect to verify page
    navigate('/verify');
  };

  return (
    <ThemeProvider theme={ModTheme}>
    <Container maxWidth="sm" sx={{
        minHeight:'60vh',
        mt: 10,
        mb: 1
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            required
            error={error}
            helperText={error ? 'Please enter a valid email' : ''}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;

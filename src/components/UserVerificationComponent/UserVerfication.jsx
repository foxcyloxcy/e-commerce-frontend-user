import React, { useState, useEffect } from 'react';
import { TextField, Box, Grid, Typography, Link, CircularProgress } from '@mui/material';
import './UserVerification.css'; 

const UserVerification = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const email = ""

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    // Move to the next input field
    if (e.target.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`verification-code-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    // Simulate an API call to resend the code
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCountdown(30);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', justifyContent:'center' }}>
      <Typography variant="h6" gutterBottom>
        Please enter the verification code sent to your email: {email}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {code.map((digit, index) => (
          <Grid item key={index}>
            <TextField
              type='verify-field'
              id={`verification-code-${index}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              inputProps={{ maxLength: 1 }}
              sx={{
                width: { xs: '40px', sm: '50px', md: '60px', lg: '70px' },
                height: { xs: '40px', sm: '50px', md: '60px', lg: '70px' },
                textAlign: 'center',
                fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' }
              }}
            />
          </Grid>
        ))}
      </Grid>
      {countdown > 0 ? (
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          You can resend the code in {countdown} seconds.
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Didn't receive a code? Try sending another by clicking{' '}
          <Link href="#" onClick={handleResendCode}>
            here
          </Link>
          .
        </Typography>
      )}
      {isLoading && <CircularProgress sx={{ marginTop: 2 }} />}
    </Box>
  );
};

export default UserVerification;

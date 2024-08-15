import React, { useState, useEffect } from 'react';
import { TextField, Box, Grid, Typography, Link, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../../assets/baseURL/api';
import './UserVerification.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ModTheme from '../ThemeComponent/ModTheme';

const UserVerification = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

    // If the user has filled all 6 inputs, trigger verification
    if (index === 5 && e.target.value.length === 1) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Simulate an API call to resend the code
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCountdown(30);
    } catch (error) {
      setError('Failed to resend the code. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSubmit = async (verificationCode) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('api/verify', {
        email,
        code: verificationCode,
      });
      console.log(response)
      // If verification is successful, show SweetAlert and redirect
      Swal.fire({
        icon: 'success',
        title: response.data.data? response.data.data.message : 'Something went wrong.',
        text: 'Redirecting you to the login page.',
        timer: 2000,
        confirmButtonText: 'Ok',
        confirmButtonColor: ModTheme.palette.primary.main,
      }).then((result) => {
        // Redirect to the login page after the alert
        if (result.isConfirmed) {
          navigate('/login'); // Replace with your login page route
        }
      });
    } catch (error) {
      setError('Verification failed. Please try again.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const EmailFromRoute = location.state?.email;
    // Load products with the Email from the route state if it exists
    if (EmailFromRoute) {
        setEmail(EmailFromRoute);
    } else {
        setEmail("");
    }

    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, email]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', justifyContent: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Please enter the verification code sent to your email: {email}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {code.map((digit, index) => (
          <Grid item key={index}>
            <TextField
              type="text"
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
      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
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

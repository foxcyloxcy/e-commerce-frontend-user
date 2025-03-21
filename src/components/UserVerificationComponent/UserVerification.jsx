import React, { useState, useEffect } from 'react';
import { TextField, Box, Grid, Typography, Link, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../../assets/baseURL/api';
import './UserVerification.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ModTheme from '../ThemeComponent/ModTheme';
import secureLocalStorage from "react-secure-storage";
import secure from '../../assets/baseURL/secure';

const UserVerification = ({refreshParent}) => {

  const [code, setCode] = useState(Array(6).fill(''));
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;
  const history = useNavigate();

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
      const response = await api.post('/api/resend-verification', {
        email: email
      }, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.status === 200) {
        setCountdown(60); // Start the countdown again if resend is successful
        Swal.fire({
          icon: 'success',
          title: 'Verification code resent!',
          text: 'Please check your email for the new verification code.',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        });
      }
    } catch (error) {
      setError('Failed to resend the code. Please try again.');
    }
    setIsLoading(false);
  };
  

  const handleLogin = async () => {
    try {
      const res = await api.post("api/login", {
        username: email,
        password: password,
      });
      if (res.status === 200) {
        const data = res.data.data;

        secureLocalStorage.setItem(`${storagePrefix}_userData`, JSON.stringify(data.user), {
          hash: storageKey,
        });
        secureLocalStorage.setItem(`${storagePrefix}_userToken`, data.access_token, {
          hash: storageKey,
        });
        secureLocalStorage.setItem(`${storagePrefix}_isLoggedIn`, true, {
          hash: storageKey,
        });

        refreshParent();
        history("/");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (verificationCode) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('api/verify', {
        email,
        code: verificationCode,
        type: mode === 'forgot-password' ? 'forgot password' : null
      });
      // If verification is successful, show SweetAlert and redirect

      if (response.status === 200) {
        const userUuid = response.data.data.user.uuid
        const userToken = response.data.data.access_token
        Swal.fire({
          icon: 'success',
          title: response.data? response.data.message : 'Something went wrong.',
          text: mode === 'forgot-password' ? '' : 'Redirecting you to home page.',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        }).then((result) => {
          // Redirect to the login page after the alert
          if (result.isConfirmed) {
            if(mode === 'forgot-password'){
              navigate('/create-password', { state: { userUuid, userToken  } }); 
            }else{
              handleLogin()
            }
          }
        });
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const EmailFromRoute = location.state?.email;
    const PasswordFromRoute = location.state?.password;
    const ModeFromRoute = location.state?.mode;
    // Load products with the Email from the route state if it exists
    if (EmailFromRoute) {
        setEmail(EmailFromRoute);
        setPassword(PasswordFromRoute);
        setMode(ModeFromRoute);
    }

    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, email]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', justifyContent: 'center', pl: 1, pr: 1 }}>
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

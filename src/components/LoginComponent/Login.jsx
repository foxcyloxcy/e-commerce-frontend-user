import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import secureLocalStorage from "react-secure-storage";
import secure from '../../assets/baseURL/secure';
import Swal from 'sweetalert2';

export default function Login({ refreshParent }) {
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;
  const history = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateEmailOrPhone = (input) => {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // UAE phone number regex (+971 123456789)
    const phoneRegex = /^\+971\d{9}$/;

    return emailRegex.test(String(input).toLowerCase()) || phoneRegex.test(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = {};

    if (!formValues.email) {
      errors.email = 'Email or Phone no. field is required.';
    } else if (!validateEmailOrPhone(formValues.email)) {
      errors.email = 'Please enter a valid email or UAE phone number.';
    }

    if (!formValues.password) {
      errors.password = 'Password field is required.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const res = await api.post("api/login", {
          username: formValues.email,
          password: formValues.password,
        });
        if (res.status === 200) {
          const data = res.data.data;

          if(data.redirect === 'dashboard'){

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

          }else{
            Swal.fire({
              title: 'Oops!',
              text: res.data.message,
              icon: 'warning',
              confirmButtonText: 'Verify my account',
              confirmButtonColor: ModTheme.palette.primary.main,
          }).then((result) => {
              if (result.isConfirmed) {
                history("/verify", { state: { email: formValues.email, password: formValues.password, mode: 'register' } });
              }
          });
          }
        }
      } catch (error) {
        console.log(error)
        await handleErrorMessage(error.response)
      } finally {
        setLoading(false);
      }
    }
  };

  const handleErrorMessage = useCallback((props) => {
    let errors = {};

    if (props.data.message) {
      setLoginError("Login failed! " + props.data.message[0].password);
    }

    setFormErrors(errors);
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    setLoginError('');
  }, [formValues, formErrors]);

  return (
    <ThemeProvider theme={ModTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 10,
            minHeight: '60vh'
          }}
        >
          <Typography component="h3" variant="h3">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} autoComplete="off">
            <TextField
              error={!!formErrors.email}
              helperText={formErrors.email}
              size='small'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email or Phone No."
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <TextField
              error={!!formErrors.password}
              helperText={formErrors.password}
              size='small'
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            {loginError && (
              <Typography color="error" variant="body2">
                {loginError}
              </Typography>
            )}
            <Box sx={{ position: 'relative', mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </Box>
            <Grid container display='flex' flexDirection='column'>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Register here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

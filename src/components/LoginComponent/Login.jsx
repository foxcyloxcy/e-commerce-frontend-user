import React, { useState, useEffect } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api'
import  secureLocalStorage  from  "react-secure-storage";
import secure from '../../assets/baseURL/secure';


export default function Login() {
  console.log(secure)
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [userData, setUserData] = useState([]);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    secureLocalStorage.setItem('userData', JSON.stringify(userData));
    secureLocalStorage.setItem('userToken', JSON.stringify(userToken));
  }, [userData]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = {};

    if (!formValues.email) {
      errors.email = 'Email field is required.';
    } else if (!validateEmail(formValues.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formValues.password) {
      errors.password = 'Password field is required.';
    }

    setFormErrors(errors);

    // Check if there are no errors before proceeding with form submission logic
    if (Object.keys(errors).length === 0) {
      // Perform form submission logic here
      console.log('Form submitted', formValues);
      const res = await api.post("api/login", {
        username: formValues.email,
        password: formValues.password,
      });
      if (res.status === 200) {
        // Log response and update the unread status locally
        const data = res.data.data
        setUserData(data.user)
        setUserToken(data.access_token)
        let fromLocalStorage = secureLocalStorage.getItem('userData');
        console.log(JSON.parse(fromLocalStorage))

      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    // Clear the error message for the current input field
    setFormErrors({ ...formErrors, [name]: '' });
  };

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
            marginBottom: 10
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h1">
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
              autoFocus
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

            <ButtonComponent
              type="submit"
              label="Submit"
              buttonVariant="contained"
              textColor='primary.contrastText'
              hoverTextColor='secondary.main'
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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
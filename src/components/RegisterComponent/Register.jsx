import React, { useState, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import secure from '../../assets/baseURL/secure';

export default function Register() {
    const history = useNavigate();
    const [formValues, setFormValues] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phoneNo: '+971' });
    const [formErrors, setFormErrors] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phoneNo: '' });
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNo = (phoneNo) => {
        const uaePrefix = '+971';
        return phoneNo !== uaePrefix;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let errors = {};

        if (!formValues.firstName) {
            errors.firstName = 'First Name is required.';
        }

        if (!formValues.lastName) {
            errors.lastName = 'Last Name is required.';
        }

        if (!formValues.email) {
            errors.email = 'Email field is required.';
        } else if (!validateEmail(formValues.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (!formValues.password) {
            errors.password = 'Password field is required.';
        }

        if (!formValues.phoneNo) {
            errors.phoneNo = 'Phone Number field is required.';
        } else if (!validatePhoneNo(formValues.phoneNo)) {
            errors.phoneNo = 'Sorry, this is not a valid number. Please use a phone number with the UAE country code.';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                const res = await api.post("api/sign-up", {
                    email: formValues.email,
                    password: formValues.password,
                    password_confirmation: formValues.confirmPassword,
                    mobile_number: formValues.phoneNo,
                    first_name: formValues.firstName,
                    last_name: formValues.lastName,
                });
                if (res.status === 200) {
                    history("/login");
                }
            } catch (error) {
                console.log(error.response)
                await handleErrorMessage(error.response)
            } finally {
                setLoading(false);
            }
        }
    };

    const handleErrorMessage = useCallback((props)=>{
        let errors = {};

        if(props.data.message.email[0]){
            errors.email = props.data.message.email[0]
         }

         if(props.data.message.password[0]){
            errors.confirmPassword = props.data.message.password[0]
         }

         setFormErrors(errors);
    })

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
        setRegisterError('');
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
                        marginBottom: 10
                    }}
                >
                    <Typography component="h1" variant="h1">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    error={!!formErrors.firstName}
                                    helperText={formErrors.firstName}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formValues.firstName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    error={!!formErrors.lastName}
                                    helperText={formErrors.lastName}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formValues.lastName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    error={!!formErrors.phoneNo}
                                    helperText={formErrors.phoneNo}
                                    required
                                    fullWidth
                                    id="phoneNo"
                                    label="Phone Number"
                                    name="phoneNo"
                                    autoComplete="phoneNo"
                                    value={formValues.phoneNo}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    error={!!formErrors.password}
                                    helperText={formErrors.password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    error={!!formErrors.confirmPassword}
                                    helperText={formErrors.confirmPassword}
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={formValues.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        {registerError && (
                            <Typography color="error" variant="body2">
                                {registerError}
                            </Typography>
                        )}
                        <FormControlLabel
                            sx={{
                                mt: 1,
                                mb: 0
                            }}
                            control={<Checkbox value="remember" color="primary" />}
                            label={<Typography sx={{ fontSize: { xs: '0.4rem', sm: '0.5rem', md: '0.7rem', lg: '0.8rem', xl: '1rem' } }}>I accept the Terms & Conditions and have read the Privacy Policy.</Typography>}
                        />
                        <Box sx={{ position: 'relative' }}>
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
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Login here
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProfileForm = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ModTheme.palette.secondary.background,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const AddVendorProfileDetails = (props) => {
    const { userToken } = props;
    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await api.post("/api/auth/me/profile/vendor", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: `You successfully saved your vendor details, you can now post an item.`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: ModTheme.palette.primary.main,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/my-profile'); // Redirect to the VendorProfileDetails component
                    }
                });
            }
        } catch (error) {
            console.log("Error adding vendor profile:", error);
        }
    };

    return (
        <ThemeProvider theme={ModTheme}>
            <ProfileForm>
                <Grid container spacing={2} marginTop={10}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h5">Add Vendor Profile Details</Typography>
                        <Box mt={2}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                size='small'
                                required
                            />
                            <TextField
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                size='small'
                                required
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ mt: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </ProfileForm>
        </ThemeProvider>
    );
};

export default AddVendorProfileDetails;

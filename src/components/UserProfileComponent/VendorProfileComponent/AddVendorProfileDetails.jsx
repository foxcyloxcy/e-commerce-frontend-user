import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';
import { useNavigate } from 'react-router-dom';

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
        bank_id: '',
        account_fullname: '',
        account_number: '',
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
            const res = await api.post("/api/auth/me/vendor-profile", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                navigate('/vendor-profile'); // Redirect to the VendorProfileDetails component
            }
        } catch (error) {
            console.log("Error adding vendor profile:", error);
        }
    };

    return (
        <ProfileForm>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Add Vendor Profile Details</Typography>
                    <Box mt={2}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bank ID"
                            name="bank_id"
                            value={formData.bank_id}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bank Account Name"
                            name="account_fullname"
                            value={formData.account_fullname}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bank Account Number"
                            name="account_number"
                            value={formData.account_number}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
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
    );
};

export default AddVendorProfileDetails;

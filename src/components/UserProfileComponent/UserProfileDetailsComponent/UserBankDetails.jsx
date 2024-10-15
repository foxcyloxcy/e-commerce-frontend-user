import React, { useEffect, useCallback, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';
import Swal from 'sweetalert2';

const BankDetailsContainer = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

const BankDetailsLabel = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    top: '-12px',
    left: '16px',
    backgroundColor: theme.palette.secondary.background,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    color: theme.palette.primary.main,
    fontWeight: 'bold',
}));

const UserBankDetails = ({ userToken }) => {
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({
        iban: '',
        account_number: '',
        bank_name: '',
        bank_address: '',
        bic_code: '',
        account_fullname: '',
    });
    const [editBankDetails, setEditBankDetails] = useState(false);

    const loadProfile = useCallback(async () => {
        try {
            const res = await api.get("/api/auth/me/profile", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                console.log(res.data);
                setUserData(res.data.data);
                setFormData({
                    iban: res.data.data.vendor_bank?.iban || '',
                    account_number: res.data.data.vendor_bank?.account_number || '',
                    bank_name: res.data.data.vendor_bank?.bank_name || '',
                    bank_address: res.data.data.vendor_bank?.bank_address || '',
                    bic_code: res.data.data.vendor_bank?.bic_code || '',
                    account_fullname: res.data.data.vendor_bank?.account_fullname || '',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBankEdit = () => {
        setEditBankDetails(true);
    };

    const handleBankSave = async () => {
        const { iban, account_number, bank_name, bank_address, bic_code, account_fullname } = formData;
    
        // Validation for required fields
        if (!iban || !account_number || !bank_name || !bank_address || !bic_code || !account_fullname) {
            Swal.fire({
                title: 'Error',
                text: 'All fields are required. Please fill out all the fields.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: ModTheme.palette.primary.main,
            });
            return; // Stop the function if validation fails
        }
    
        try {
            const res = await api.post("/api/auth/payment/mamopay/account", {
                iban,
                account_number,
                bank_name,
                bank_address,
                bic_code,
                account_fullname
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Bank details successfully added/updated.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: ModTheme.palette.primary.main,
                });
                setEditBankDetails(false);
                loadProfile();
            }
        } catch (error) {
            console.log("Error updating bank details:", error);
        }
    };
    

    const handleBankCancel = () => {
        setEditBankDetails(false);
        setFormData({
            iban: userData.vendor_bank?.iban || '',
            account_number: userData.vendor_bank?.account_number || '',
            bank_name: userData.vendor_bank?.bank_name || '',
            bank_address: userData.vendor_bank?.bank_address || '',
            bic_code: userData.vendor_bank?.bic_code || '',
            account_fullname: userData.vendor_bank?.account_fullname || '',
        });
        loadProfile()
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    if (!userData || !userData.vendor) {
        return (
            <Grid container spacing={2} marginLeft={5}>
                Loading...
            </Grid>
        );
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <BankDetailsContainer>
                        <BankDetailsLabel variant="caption">Bank details</BankDetailsLabel>

                        <TextField
                            size='small'
                            label="IBAN"
                            name="iban"
                            value={formData.iban}
                            onChange={handleChange}
                            disabled={!(editBankDetails || userData.has_bank_details === "No")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            size='small'
                            label="Account Number"
                            name="account_number"
                            value={formData.account_number}
                            onChange={handleChange}
                            disabled={!(editBankDetails || userData.has_bank_details === "No")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            size='small'
                            label="Bank Name"
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleChange}
                            disabled={!(editBankDetails || userData.has_bank_details === "No")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            size='small'
                            label="Bank Address"
                            name="bank_address"
                            value={formData.bank_address}
                            onChange={handleChange}
                            disabled={!(editBankDetails || userData.has_bank_details === "No")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            size='small'
                            label="BIC Code"
                            name="bic_code"
                            value={formData.bic_code}
                            onChange={handleChange}
                            disabled={!(editBankDetails || userData.has_bank_details === "No")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            size='small'
                            label="Account Full Name"
                            name="account_fullname"
                            value={formData.account_fullname}
                            onChange={handleChange}
                            disabled={!(editBankDetails || userData.has_bank_details === "No")}
                            fullWidth
                            margin="normal"
                        />
                    </BankDetailsContainer>

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        {userData.has_bank_details === "Yes" ? (
                            <>
                                {editBankDetails ? (
                                    <Button variant="contained" onClick={handleBankSave} color="primary" sx={{ mr: 2 }}>
                                        Save Changes
                                    </Button>
                                ) : (
                                    <Button variant="contained" onClick={handleBankEdit} color="primary" sx={{ mr: 2 }}>
                                        Edit
                                    </Button>
                                )}
                                <Button variant="contained" onClick={handleBankCancel} color="secondary">
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" onClick={handleBankSave} color="primary">
                                Save
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default UserBankDetails;

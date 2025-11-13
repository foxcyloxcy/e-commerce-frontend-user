import React, { useEffect, useCallback, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  ThemeProvider,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';
import Swal from 'sweetalert2';
import secureLocalStorage from 'react-secure-storage';
import secure from '../../../assets/baseURL/secure';

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

export default function UserBankDetails({ userToken }) {
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    iban: '',
    account_number: '',
    bank_name: '',
    bank_address: '',
    bic_code: '',
    account_fullname: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user profile
  const loadProfile = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/me/profile', {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        const data = res.data.data;
        setUserData(data);
        setFormData({
          iban: data.vendor_bank?.iban || '',
          account_number: data.vendor_bank?.account_number || '',
          bank_name: data.vendor_bank?.bank_name || '',
          bank_address: data.vendor_bank?.bank_address || '',
          bic_code: data.vendor_bank?.bic_code || '',
          account_fullname: data.vendor_bank?.account_fullname || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }, [userToken]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ✅ Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate form
  const validateFields = () => {
    const requiredFields = Object.entries(formData);
    for (const [key, value] of requiredFields) {
      if (!value.trim()) return false;
    }
    return true;
  };

  // ✅ Save or update bank details
  const handleBankSave = async () => {
    if (!validateFields()) {
      Swal.fire({
        title: 'Error',
        text: 'All fields are required. Please fill out all the fields.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: ModTheme.palette.primary.main,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        '/api/auth/payment/mamopay/account',
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Bank details successfully added/updated.',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        });

        setEditMode(false);
        await loadProfile();

        // ✅ Update localStorage _userData
        const updatedUserData = {
          ...userData,
          has_bank_details: 'Yes',
          vendor_bank: { ...formData },
        };

        secureLocalStorage.setItem(
          `${storagePrefix}_userData`,
          JSON.stringify(updatedUserData),
          { hash: storageKey }
        );
        setUserData(updatedUserData);
      }
    } catch (error) {
      console.error('Error updating bank details:', error);
      try {
        const rawMessage = error.response?.data?.message || '{}';
        const jsonStart = rawMessage.indexOf('{');
        const parsedError =
          jsonStart !== -1 ? JSON.parse(rawMessage.substring(jsonStart)) : {};
        Swal.fire({
          title: parsedError.error_code || 'Error',
          text: parsedError.errors?.[0] || 'Something went wrong.',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        });
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'Unable to update bank details. Please try again later.',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: ModTheme.palette.primary.main,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel edits and revert
  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      iban: userData.vendor_bank?.iban || '',
      account_number: userData.vendor_bank?.account_number || '',
      bank_name: userData.vendor_bank?.bank_name || '',
      bank_address: userData.vendor_bank?.bank_address || '',
      bic_code: userData.vendor_bank?.bic_code || '',
      account_fullname: userData.vendor_bank?.account_fullname || '',
    });
  };

  if (!userData || !userData.vendor) {
    return (
      <Grid container justifyContent="center" mt={5}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={ModTheme}>
      <Grid container>
        <Grid item xs={12}>
          <BankDetailsContainer>
            <BankDetailsLabel variant="caption">Bank details</BankDetailsLabel>

            {[
              { name: 'iban', label: 'IBAN' },
              { name: 'account_number', label: 'Account Number' },
              { name: 'bank_name', label: 'Bank Name' },
              { name: 'bank_address', label: 'Bank Address' },
              { name: 'bic_code', label: 'Swift No.' },
              { name: 'account_fullname', label: 'Account Full Name' },
            ].map(({ name, label }) => (
              <TextField
                key={name}
                size="small"
                margin="normal"
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                disabled={!editMode && userData.has_bank_details === 'Yes'}
                fullWidth
              />
            ))}
          </BankDetailsContainer>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            {userData.has_bank_details === 'Yes' ? (
              <>
                {editMode ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBankSave}
                    sx={{ mr: 2 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={22} /> : 'Save Changes'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditMode(true)}
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBankSave}
                disabled={loading}
              >
                {loading ? <CircularProgress size={22} /> : 'Save'}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

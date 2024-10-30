import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Container, ThemeProvider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';

const PaymentSuccess = (props) => {
    const { userToken } = props
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleBrowseShop = () => {
        navigate('/my-profile');

        //https://www.mamopay.com/?{createdAt=2023-08-09-16-42-35&paymentLinkId=MB-LINK-3216D27C9D&status=captured&transactionId=MPB-CHRG-BEE56990A9}
    };

    const loadTransaction = async (transId, paymentId) =>{

      const formData = new FormData();
      formData.append('payment_ref', transId);
      formData.append('transaction_number', paymentId);


        try {

          const res = await api.post("/api/auth/payment/mamopay/transaction/success", formData, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
            
            console.log(res)
            if (res.status === 200) {
              const successMessage = res.data.message;
      
              Swal.fire({
                title: successMessage,
                text: 'You will receive an email after your item gets approved. This can take up to 72hrs max.',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Add Another',
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Go to Shop'
              }).then((result) => {
                if (result.isConfirmed) {
                  resetForm();
                } else {
                  history("/shop");
                }
              });
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please try again later.',
              icon: 'error',
            });
          } finally {
            console.log("final")
          }
    }

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const transId = queryParams.get('transactionId');
        const paymentId = queryParams.get('paymentLinkId');
        // paymentLinkId
        loadTransaction(transId, paymentId);
    },[location, navigate, userToken])
    return (
        <ThemeProvider theme={ModTheme}>
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    textAlign="center"
                >
                    <CheckCircleIcon sx={{ fontSize: 100, color: 'primary.main' }} />
                    <Typography variant="h4" color="primary" gutterBottom>
                        Payment Successful!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    Thank you for your payment, your sellers contact details will now be available when you select your profile – my purchases.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBrowseShop}
                        sx={{ mt: 4 }}
                    >
                        Go to My Profile
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PaymentSuccess;

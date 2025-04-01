import React, { useEffect, } from 'react';
import { Box, Typography, Button, Container, ThemeProvider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import Swal from 'sweetalert2';

const FeatureItemSuccess = (props) => {
    const { userToken } = props
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleBrowseShop = () => {
        navigate('/');

        //https://www.mamopay.com/?{createdAt=2023-08-09-16-42-35&paymentLinkId=MB-LINK-3216D27C9D&status=captured&transactionId=MPB-CHRG-BEE56990A9}
    };

    const loadTransaction = async (transId, paymentId) =>{

      const formData = new FormData();
      formData.append('payment_ref', transId);
      formData.append('transaction_number', paymentId);


        try {

          const res = await api.post("/api/auth/payment/mamopay/transaction/featured-product/success", formData, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
            

          if (res.status === 200) {
            const successMessage = res.data.message;
    
            Swal.fire({
              title: successMessage,
              // text: 'You will receive an email after your item gets approved. This can take up to 72hrs max.',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: ModTheme.palette.primary.main,
            })
          }
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please try again later.',
              icon: 'error',
              confirmButtonColor: ModTheme.palette.primary.main,
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
                        Featuring Item Successful!
                    </Typography>
                    <Typography variant="h6" color="secondary" gutterBottom>
                        Check your item in Home page - Featured Products section.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBrowseShop}
                        sx={{ mt: 4 }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default FeatureItemSuccess;

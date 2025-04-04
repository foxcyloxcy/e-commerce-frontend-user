import React, { useEffect, useState} from 'react';
import { Box, Typography, Button, Container, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import Swal from 'sweetalert2';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const PaymentSuccess = (props) => {
    const { userToken } = props
    const location = useLocation();
    const [mobileNo, setMobileNo] = useState("")
    
    const toRegisterComponent = () => {
        window.open('/register','_blank')
    };

    const handleChatSeller = () => {
        const filteredMobileNo = mobileNo.replace(/[+ ]/g, '');
        const userWhatsApp = `https://wa.me/${filteredMobileNo}`;
        window.open(userWhatsApp, '_blank');
    };

    const loadTransaction = async (transId, paymentId) =>{

      const formData = new FormData();
      formData.append('payment_ref', transId);
      formData.append('transaction_number', paymentId);


        try {

          const res = await api.post("/api/global/payment/mamopay/transaction/success", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
            

            if (res.status === 200) {
              const successMessage = res.data.message;

              setMobileNo(res.data.data.seller.mobile_number)
              
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
    },[location, userToken])
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
                        Thank you for your purchase, use the link below to contact the seller to arrange delivery. 
                      </Typography>
                      <Typography>
                      Alternatively, you can reach out to a member of the team at reloved and we can help 
                        <strong>
                             &nbsp; coordinate collection with our delivery team.
                        </strong>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toRegisterComponent}
                        sx={{ mt: 4 }}
                    >
                        Create a reloved account
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<WhatsAppIcon />}
                        onClick={handleChatSeller}
                        sx={{ mt: 4 }}
                    >
                        Contact seller
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PaymentSuccess;

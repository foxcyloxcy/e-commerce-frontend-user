import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../assets/baseURL/api';
import Swal from 'sweetalert2';

const TruncatedText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const ViewOffers = () => {
    const { state } = useLocation();
    const { productUuid, userToken } = state;
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();

    const loadOffersToMe = useCallback(async () => {
        try {
            const res = await api.get(`/api/auth/me/offers-to-me/${productUuid}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                console.log(res.data.offers)
                setProductsData(res.data.offers);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken, productUuid]);

    useEffect(() => {
        loadOffersToMe();
    }, [loadOffersToMe]);

    const handleAcceptOffer = async (productId) => {
        try {
            const result = await Swal.fire({
                title: 'Wait!',
                text: 'Are you sure you want to accept this offer?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Cancel',
            });
    
            if (result.isConfirmed) {
                const res = await api.put(`/api/auth/me/offers-to-me/accept/${productId}`, '', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (res.status === 200) {
                    const successMessage = res.data.message;
                    await Swal.fire({
                        title: 'Great!',
                        text: successMessage,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: ModTheme.palette.primary.main,
                    });
    
                    navigate('/my-profile');
                }
            }
        } catch (error) {
            console.log(error);
            await Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonColor: ModTheme.palette.primary.main,
            });
        }
    };

    const handleRejectOffer = async (productId) => {
        try {
            const result = await Swal.fire({
                title: 'Wait!',
                text: 'Are you sure you want to reject this offer?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Cancel',
            });
    
            if (result.isConfirmed) {
                const res = await api.put(`/api/auth/me/offers-to-me/reject/${productId}`, '', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (res.status === 200) {
                    const successMessage = res.data.message;
                    await Swal.fire({
                        title: 'Offer rejected',
                        text: successMessage,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: ModTheme.palette.primary.main,
                    });
    
                    navigate('/my-profile');
                }
            }
        } catch (error) {
            console.log(error);
            await Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonColor: ModTheme.palette.primary.main,
            });
        }
    };

    if (!productsData || productsData.length <= 0) {
        return (
            <Grid container spacing={2} marginLeft={5}>
                You have no bids available.
            </Grid>
        );
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <Grid container spacing={2} sx={{ padding: '20px', mt: 10, minHeight: '70vh', width: '100%' }}>
                {productsData.map((product) => (
                    <Grid item xs={12} md={12} lg={12} key={product.id}>
                        <Card sx={{ position: 'relative', background: '#fff', width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={10}>
                                    <Box sx={{ position: 'relative', height: '100%', padding: 1 }}>
                                    <Typography variant="h6">Email: {product.buyer.email}</Typography>
                                    <Typography variant="h6">Full Name: {product.buyer.first_name+' '+product.buyer.last_name }</Typography>
                                    <Typography variant="h6">Item original price: AED {product.item.price}</Typography>
                                    <Typography variant="h6">Offer: AED {product.asking_price}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '10px' }}>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: ModTheme.palette.primary.main }}
                                                onClick={() => handleAcceptOffer(product.id)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: ModTheme.palette.secondary.main, marginTop: 1 }}
                                                onClick={() => handleRejectOffer(product.id)}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>
    );
};

export default ViewOffers;

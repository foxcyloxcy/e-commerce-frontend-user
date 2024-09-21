import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, CardMedia, ThemeProvider } from '@mui/material';
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

const StatusBadge = styled(Box)(({ theme, status }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    backgroundColor: status === 0 ? '#ff9800' : status === 1 ? '#4caf50' : '#f44336', // Orange for pending, green for approved, red for rejected
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: 'bold',
}));

const ViewOffers = () => {
    const { state } = useLocation();
    const { productUuid, userToken } = state;
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(false);
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
                console.log(res.data)
                setProductsData(res.data.offers);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken]);

    useEffect(() => {
        loadOffersToMe();
    }, [loadOffersToMe]);

    const handleAcceptOffer = async (productId) => {

        try {
            Swal.fire({
                title: 'Wait!',
                text: 'Are you sure you want to accept this offer?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Cancel'
              }).then((result) => {
                if (result.isConfirmed) {
                    const res = api.put(`/api/auth/me/offers-to-me/accept/${productId}`, '', {
                        headers: {
                          Authorization: `Bearer ${userToken}`,
                          'Content-Type': 'multipart/form-data',
                        },
                      });
                
                      if (res.status === 200) {
                        console.log(res.data)
                        const successMessage = res.data.message;
                        Swal.fire({
                            title: 'Great!',
                            text: successMessage,
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonText: 'Ok',
                            confirmButtonColor: ModTheme.palette.primary.main,
                            cancelButtonText: 'Cancel'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/my-profile');
                            }
                          })
                      }
                }
              });

          } catch (error) {
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: error,
              icon: 'error',
            });
          } finally {
            setLoading(false);
          }
    };

    const handleRejectOffer = (product) => {
        //put
        navigate('/view-offers', { state: { product } });
    };

    if (!productUuid || !userToken) {
        return (
            <Grid container spacing={2} sx={{
                minHeight: "70vh",
                mt: 5,
            }}>
                <Grid item>
                    <Typography>
                        Loading...
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <Grid container spacing={2} sx={{ mt: 10, mb: 10, pl: 2, pr: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6">Available offers for</Typography>
                </Grid>
                {productsData.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#fff', position: 'relative', height: '450px' }}>

                            {/* Product Image */}
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.default_image ? product.default_image.image_url : 'no image available.'}
                                alt={product.item_name}
                                sx={{ objectFit: 'cover' }}
                            />

                            {/* Card Content */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <TruncatedText variant="h6">{product.item_name}</TruncatedText>
                                <TruncatedText variant="body2">{product.item_description}</TruncatedText>
                                <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                    AED {product.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: ModTheme.palette.primary.light }}>
                                    {product.is_bid ? 'You are accepting offers' : ''}
                                </Typography>
                            </CardContent>

                            {/* Details Button */}
                            <CardContent sx={{ position: 'absolute', width: '100%', top: '84%', display: 'flex' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginTop: 1, marginBottom: 1, marginRight: 1,
                                        backgroundColor: ModTheme.palette.primary.main
                                    }}
                                    fullWidth
                                    onClick={() => handleAcceptOffer(product.id)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginTop: 1, marginBottom: 1, marginLeft: 1,
                                        backgroundColor: ModTheme.palette.secondary.main
                                    }}
                                    fullWidth
                                    onClick={() => handleRejectOffer(product.id)}
                                >
                                    Reject
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>
    );
};

export default ViewOffers;

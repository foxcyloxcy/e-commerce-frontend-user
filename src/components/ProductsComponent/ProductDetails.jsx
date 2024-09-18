import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, Paper, Divider, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';  // Make sure you have SweetAlert2 installed
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ReusableComponents/ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import api from '../../assets/baseURL/api';

const ProductDetails = () => {
    const { state } = useLocation();
    const { productUuid, userToken } = state;
    const history = useHistory();  // Required for redirection
    const [productsData, setProductsData] = useState(null);
    const [offerPrice, setOfferPrice] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state for offers

    const loadProducts = useCallback(async () => {
        try {
            let query = `api/global/items/${productUuid}`;
            const res = await api.get(query);
            console.log(res.data)
            if (res.status === 200) {
                setProductsData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [productUuid]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleStripeCheckout = async (uuid) => {
        try {
            const res = await api.post(`/api/auth/payment/stripe/checkout/session/${uuid}`, "sample", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const stripeUrl = res.data.stripe_url
                window.location.href = stripeUrl
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleOffers = async (productId) => {
        setLoading(true);  // Set loading to true while processing
        const formData = new FormData();
        formData.append('item_id', productId);
        formData.append('seller_id', productsData.item_details.seller_id);  // Assuming seller_id is available in item_details
        formData.append('buyer_id', productsData.buyer_id);  // Assuming buyer_id is fetched or passed in product details
        formData.append('remarks', 'Your offer remarks');  // You can modify this to get input from a user field
        formData.append('asking_price', offerPrice);  // Use state value for the asking price

        try {
            const res = await api.post("/api/auth/item-bid", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                const successMessage = res.data.message;

                Swal.fire({
                    title: successMessage,
                    text: 'Your offer has been sent.',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Continue shopping',
                    confirmButtonColor: ModTheme.palette.primary.main,
                }).then((result) => {
                    if (result.isConfirmed) {
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
            setLoading(false);  // Stop loading after processing
        }
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Handle rendering after data is loaded
    if (!productsData || !productsData.item_details) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <Container
                sx={{
                    backgroundColor: 'secondary.background',
                    padding: 2,
                    mt: 15,
                    mb: 10,
                    boxShadow: 10,
                    maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Carousel showArrows={false} infiniteLoop={true} autoPlay>
                            {productsData.item_details.images.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '400px',
                                    }}
                                >
                                    <img
                                        src={image.image_url}
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            {productsData.item_details.item_name}
                        </Typography>
                        <Typography component="div" color="primary">
                            AED {formatPrice(productsData.item_details.price)}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            {productsData.item_details.item_description}
                        </Typography>
                        <Grid container alignItems="center" spacing={2} width="100%">
                            {productsData.item_details.is_bid === 1 && (
                                <>
                                    <Grid item width="60%">
                                        <TextField
                                            size="small"
                                            label="ENTER OFFER"
                                            variant="outlined"
                                            value={offerPrice}
                                            onChange={(e) => setOfferPrice(e.target.value)}
                                            sx={{ marginRight: 2 }}
                                        />
                                    </Grid>
                                    <Grid item width="40%">
                                        <ButtonComponent
                                            label="Offer"
                                            size="small"
                                            buttonVariant="contained"
                                            textColor="primary.contrastText"
                                            hoverTextColor="secondary.main"
                                            onClick={() => handleOffers(productsData.item_details.id)}
                                            disabled={loading || !offerPrice}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item width="100%">
                                <ButtonComponent
                                    label="Buy Item"
                                    size="small"
                                    buttonVariant="contained"
                                    textColor="primary.contrastText"
                                    hoverTextColor="secondary.main"
                                    startIcon={<AddShoppingCartIcon />}
                                    onClick={() => handleStripeCheckout(productUuid)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Additional Information
                    </Typography>
                    <Divider />
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {productsData.item_property_details.map((info, index) => (
                                        <TableCell key={index}>
                                            <Typography variant="body1" fontWeight="bold">
                                                {info.properties}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {productsData.item_property_details.map((info, index) => (
                                        <TableCell key={index}>
                                            {info.values.length > 0
                                                ? info.values.map((value) => (
                                                    <Typography key={value.id}>{value.name}</Typography>
                                                ))
                                                : 'Not Available'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default ProductDetails;

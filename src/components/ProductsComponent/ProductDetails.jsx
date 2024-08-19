import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, Paper, Divider, Box, TextField } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation } from 'react-router-dom';
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductDetails = () => {
    const { state } = useLocation();
    const { product } = state;

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                backgroundColor: 'secondary.background',
                padding: 2,
                mt: 15,
                mb: 10,
                boxShadow: 10,
                maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Carousel showArrows={false} infiniteLoop={true} autoPlay>
                            {product.item_image.map((image, index) => (
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
                                        alt={product.item_name}
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
                        <Typography variant="h6" gutterBottom>{product.item_name}</Typography>
                        <Typography component="div" color="primary">AED {formatPrice(product.price)}</Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            {product.item_description}
                        </Typography>
                        <Grid container alignItems="center" spacing={2} width="100%">
                            {product.is_bid === 1 && (
                                <>
                                    <Grid item width="60%">
                                        <TextField
                                            size='small'
                                            label="ENTER OFFER"
                                            variant="outlined"
                                            sx={{ marginRight: 2 }}
                                        />
                                    </Grid>
                                    <Grid item width="40%">
                                        <ButtonComponent
                                            label="Offer"
                                            size="small"
                                            buttonVariant="contained"
                                            textColor='primary.contrastText'
                                            hoverTextColor='secondary.main'
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item width="100%">
                                <ButtonComponent
                                    label="Buy Item"
                                    size="small"
                                    buttonVariant="contained"
                                    textColor='primary.contrastText'
                                    hoverTextColor='secondary.main'
                                    startIcon={<AddShoppingCartIcon />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>Additional Information</Typography>
                    <Divider />
                    <Typography variant="body1" paragraph>
                        {/* Add additional product information here if available */}
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default ProductDetails;

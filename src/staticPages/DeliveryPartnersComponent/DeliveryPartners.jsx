import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Divider,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DeliveryPartners = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ px: 2, py: 10, maxWidth: '1200px', mx: 'auto' }}>
            <Typography
                variant={isMobile ? 'h5' : 'h4'}
                fontWeight="bold"
                textAlign="center"
                sx={{ color: '#1a2d5a', mb: 1 }}
            >
                Our Delivery Partners
            </Typography>
            <Typography
                variant="body1"
                textAlign="center"
                sx={{ mb: 4, color: 'text.secondary' }}
            >
                Learn about the shipping options available for your Reloved purchases.
            </Typography>

            <Grid container spacing={4} alignItems="center" mb={4}>
                <Grid item xs={12} sm={2} md={2}>
                    <Box
                        sx={{
                            width: 70,
                            height: 70,
                            border: '2px solid #1a2d5a',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                        }}
                    >
                        <LocalShippingIcon sx={{ fontSize: 30, color: '#1a2d5a', alignSelf: 'center' }} />
                    </Box>

                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Typography variant="h6" fontWeight="bold" color="#1a2d5a">
                        Delivery Service
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        We partner with trusted couriers to offer door-to-door delivery.
                        Items are typically delivered within 2 to 5 business days.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 0
                        }}
                    >
                        <Button variant="contained" sx={{ backgroundColor: '#5e97c3' }}>
                            Learn More
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={2}>
                    <Box
                        sx={{
                            width: 140,
                            height: 140,
                            border: '2px solid #1a2d5a',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            overflow: 'hidden', // Ensures circular crop
                        }}
                    >
                        <img
                            src="/reloved_delivery.png" // Replace with your actual image path
                            alt="icon"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Typography variant="h6" fontWeight="bold" color="#1a2d5a" gutterBottom>
                        How It Works
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        When you purchase an item, you can select our delivery service at checkout.
                        Once your order is placed, we’ll handle the rest, ensuring your item is
                        delivered to your chosen address.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DeliveryPartners;

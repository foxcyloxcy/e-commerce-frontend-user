import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';
import api from '../../../assets/baseURL/api';

const TruncatedText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});


const ViewOffers = (props) => {
    const { userToken } = props;
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();

    const loadMyOffers = useCallback(async () => {
        try {
            const res = await api.get(`/api/auth/me/my-offers`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                console.log(res.data)
                setProductsData(res.data.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken]);

    useEffect(() => {
        loadMyOffers();
    }, [loadMyOffers]);

    const handleDetailsClick = (product) => {
        console.log(product)
    };

    if (!productsData) {
        return (
            <Grid container spacing={2} sx={{
                minHeight: "70vh",
                mt: 5,
            }}>
                <Grid item>
                <Typography>
                    No offers
                </Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={2} sx={{
            minHeight: "70vh"
        }}>
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
                        <CardContent sx={{ position: 'absolute', width: '100%', top: '84%' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleDetailsClick(product)}
                            >
                                View offers
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ViewOffers;

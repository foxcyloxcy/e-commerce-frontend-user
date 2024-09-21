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

const MyOffers = (props) => {
    const { userToken, fromParentUserData } = props;
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();
    const userData = fromParentUserData

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
                setProductsData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken]);

    useEffect(() => {
        loadMyOffers();
    }, [loadMyOffers]);

    const handleDetailsClick = (productUuid) => {
        navigate('/product-details', { state: { productUuid, userToken, userData } });
    };

    return (
        <Grid container spacing={2}>
            {productsData.map((product) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#fff', position: 'relative', height: '450px' }}>
                        {/* Status Badge */}
                        <StatusBadge status={product.my_offer.status}>
                            {product.my_offer.bid_status_name}
                        </StatusBadge>

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
                        </CardContent>

                        {/* Details Button */}
                        <CardContent sx={{ position: 'absolute', width: '100%', top: '84%' }}>
                            {
                                product.my_offer.is_accepted === 1 && (
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ marginTop: '10px' }}
                                    onClick={() => handleDetailsClick(product.uuid)}
                                >
                                    Buy item
                                </Button>
                                )
                            }
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default MyOffers;

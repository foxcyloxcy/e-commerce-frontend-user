import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import api from '../../../assets/baseURL/api';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const TruncatedText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const MyItemPurchase = (props) => {
    const { userToken, fromParentUserData } = props;
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();
    const userData = fromParentUserData;

    const loadMyItemPurchase = useCallback(async () => {
        try {
            const res = await api.get(`/api/auth/me/my-purchased`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                console.log(res.data)
                setProductsData(res.data.offers.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken]);

    useEffect(() => {
        loadMyItemPurchase();
    }, [loadMyItemPurchase]);

    const handleDetailsClick = (productUuid) => {
        navigate('/my-item-purchase-details', { state: { productUuid, userToken, userData } });
    };


    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleChatSeller = (userMobileNo) => {
        
        // Remove '+' and spaces from the mobile number
        const filteredMobileNo = userMobileNo.replace(/[+ ]/g, '');
    
        const userWhatsApp = `https://wa.me/${filteredMobileNo}`;
    
        window.open(userWhatsApp, '_blank');
    };

    if (!productsData || productsData.length <= 0) {
        return (
            <Grid container spacing={2} marginLeft={5}>
                You have no item purchased.
            </Grid>
        );
    }

    return (
        <Grid container spacing={2}>
            {productsData.map((product) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
                    <Card sx={{ padding: '16px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '8px', height: '500px', position: 'relative', }}>
                        {/* Transaction Header */}
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Transaction #{product.transaction_number}
                        </Typography>

                        <Divider />

                        {/* Item Details */}
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Item: {product.item_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Sold by: {product.seller.first_name} {product.seller.last_name}
                            </Typography>
                        </CardContent>

                        <Divider />

                        {/* Price Breakdown */}
                        <CardContent>
                            <Typography variant="body2">Subtotal: AED {formatPrice(product.subtotal_amount)}</Typography>
                            <Typography variant="body2">Service Fee: AED {formatPrice(product.service_fee_amount)}</Typography>
                            <Typography variant="body2">Discount: AED {formatPrice(product.discount_amount)}</Typography>
                            <Typography variant="h6" fontWeight="bold">
                                Total: AED {formatPrice(product.total_amount)}
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardContent sx={{ position: 'absolute', width: '100%', top: '70%' }}>
                        <Grid item>
                        <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                            startIcon={<WhatsAppIcon />}
                            onClick={() => handleChatSeller(product.seller.mobile_number)}
                        >
                            Chat seller
                        </Button>
                        </Grid>
                        {/* View Details Button */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{marginTop: 1}}
                                onClick={() => handleDetailsClick(product.uuid)}
                            >
                                View Item Details
                            </Button>
                        </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default MyItemPurchase;

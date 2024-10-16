import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';
import api from '../../../assets/baseURL/api';
import PriceBreakdownModal from '../../ReusableComponents/ModalComponent/PriceBreakDownModal';
import MapViewModal from '../../ReusableComponents/ModalComponent/MapViewModal';

const TruncatedText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});


const MyItemPurchase = (props) => {
    const { userToken, fromParentUserData } = props;
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();
    const userData = fromParentUserData
    const [openPriceBreakdownModal, setOpenPriceBreakdownModal] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const loadMyItemPurchase = useCallback(async () => {
        try {
            const res = await api.get(`/api/auth/me/my-offers`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                setProductsData(res.data.data);
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

    const handleOpenPriceBreakdown = (product) => {
        setSelectedProduct(product);
        setOpenPriceBreakdownModal(true);
    };

    const handleClosePriceBreakdown = () => {
        setOpenPriceBreakdownModal(false);
        setSelectedProduct(null);
    }

    const handleOpenMap = (address) => {
        setSelectedAddress(address);
        setOpenMap(true);
    };

    const handleCloseMap = () => {
        setOpenMap(false);
        setSelectedAddress(null);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const parseAddress = (address) => {
        const objectAddress = JSON.parse(address)
        // console.log(objectAddress)
        let addressName = ""

        if (objectAddress[1]) {
            addressName = objectAddress[1].name
        }
        return addressName.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <Grid container spacing={2}>
            {productsData.map((product) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
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
                            {
                                    product.address && (
                                        <Typography 
                                            variant="body1" 
                                            sx={{ marginTop: '10px', cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => handleOpenMap(product.address)}>
                                                Collection {parseAddress(product.address)}
                                        </Typography>
                                    )
                                }
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    onClick={() => handleOpenPriceBreakdown(product.my_offer)}
                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    AED {formatPrice(product.my_offer.asking_price)}
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
                                        View Details
                                    </Button>
                                )
                            }
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            {/* Reuse PriceBreakdownModal */}
            {selectedProduct && (
                <PriceBreakdownModal
                    open={openPriceBreakdownModal}
                    onClose={handleClosePriceBreakdown}
                    product={selectedProduct}
                />
            )}

            {selectedAddress && (
                <MapViewModal
                    open={openMap}
                    onClose={handleCloseMap}
                    address={selectedAddress}
                />
            )}
        </Grid>
    );
};

export default MyItemPurchase;

import React, { useState } from 'react';
import {
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
    Button,
    CardMedia,
    Avatar,
    Box,
    Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import PriceBreakdownModal from '../../ReusableComponents/ModalComponent/PriceBreakDownModal';
import MapViewModal from '../../ReusableComponents/ModalComponent/MapViewModal';

const ProductListGridView = ({ productsData, userToken, userData }) => {
    // console.log(productsData)
    const navigate = useNavigate();


    // State for managing the modal
    const [openPriceBreakdownModal, setOpenPriceBreakdownModal] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Handle pagination change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleDetailsClick = (productUuid) => {
        navigate('/product-details', { state: { productUuid } });
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

    const TruncatedText = styled(Typography)({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

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
        <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={2}>
                {productsData.map((product) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                            <Avatar src={product.user.vendor ? product.user.vendor.logo : "No image available"} alt={product.user.vendor ? product.user.vendor.name : "No vendor name"} />
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                {product.user.vendor ? product.user.vendor.name : "No vendor name"}
                            </Typography>
                        </Box>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                background: '#fff',
                                position: 'relative',
                                height: '480px',
                            }}
                        >
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
                                    onClick={() => handleOpenPriceBreakdown(product)}
                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    AED {formatPrice(product.total_fee)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'primary.light' }}>
                                    {product.is_bid ? 'Accepting offers' : ''}
                                </Typography>
                            </CardContent>

                            {/* Details Button */}
                            <CardContent sx={{ position: 'absolute', width: '100%', top: '83%' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ marginTop: '10px' }}
                                    onClick={() => handleDetailsClick(product.uuid)}
                                >
                                    Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


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

export default ProductListGridView;

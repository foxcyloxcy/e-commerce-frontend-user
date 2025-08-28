import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    Avatar,
    Box,
    IconButton,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import PriceBreakdownModal from '../../ReusableComponents/ModalComponent/PriceBreakDownModal';
import MapViewModal from '../../ReusableComponents/ModalComponent/MapViewModal';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ModTheme from '../../ThemeComponent/ModTheme';

const ProductListGridView = ({ productsData, setSearchParams, searchParams }) => {
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
        // navigate('/product-details/:id', { state: { productUuid } });
        const updatedParams = new URLSearchParams(searchParams);
        const currentScroll = window.scrollY;

        updatedParams.set("page_scroll", currentScroll);


        setSearchParams(updatedParams); // ✅ Correct way to update search params

        navigate('/product-details/' + productUuid);
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
        let addressName = "";

        try {
            // Attempt to parse the address
            const objectAddress = JSON.parse(address);

            // If objectAddress[1] exists, extract the name
            if (objectAddress[1]) {
                addressName = objectAddress[1].name || ""; // Ensure name exists
            }
        } catch (error) {
            console.error("Invalid JSON address:", error);
        }

        // Return formatted addressName with commas or an empty string
        return addressName.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };


    return (
        <Grid container spacing={1}
            sx={{
                minHeight: '30vh',
                alignContent: 'flex-start'
            }}>
            {productsData.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    {/* Vendor Info */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 2 }}>
                        <Avatar
                            src={product.user.vendor ? product.user.vendor.logo : "No image available"}
                            alt={product.user.vendor ? product.user.vendor.name : "No vendor name"}
                        />
                        <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                            {product.user?.vendor?.name || "No vendor name"}
                        </Typography>
                    </Box>

                    {/* Product Card */}
                    <Card
                        sx={{
                            position: "relative",
                            boxShadow: "none",
                            overflow: "hidden",
                            height: {xs:"460px", sm:"500px", md: "600", },
                            display: "flex",
                            flexDirection: "column",
                            padding: 0
                        }}
                    >
                        {/* Badge */}
                        {product.is_bid ? (
                            <Chip
                                label="ACCEPTING OFFERS"
                                sx={{
                                    position: "absolute",
                                    top: 12,
                                    left: 12,
                                    backgroundColor: "#255773",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "0.7rem",
                                    zIndex: 1,
                                }}
                            />
                        ) : ("")
                        }
                        <Box
                            sx={{
                                width: "100%",
                                aspectRatio: { xs: "1/1", sm: "3/4" }, // square on mobile, 3:4 on larger
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <LazyLoadImage
                                src={product.default_image ? product.default_image.image_url : "no image available"}
                                alt={product.item_name}
                                effect="blur"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        {/* Product Info */}
                        <CardContent sx={{ flexGrow: 1, p: 1 }}>
                            <TruncatedText variant="body2" sx={{fontWeight: 'bold', color: ModTheme.palette.primary.main}}>{product.item_name}</TruncatedText>

                            {/* Price */}
                            <Typography
                                variant="body1"
                                color="primary"
                                onClick={() => handleOpenPriceBreakdown(product)}
                                sx={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    fontWeight: "bold",
                                }}
                            >
                                AED {formatPrice(product.total_fee)}
                            </Typography>

                            {/* Collection Address */}
                            {product.address && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 1,
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }}
                                    onClick={() => handleOpenMap(product.address)}
                                >
                                    <TruncatedText variant="body2">Collection {parseAddress(product.address)}</TruncatedText>
                                </Typography>
                            )}

                            <TruncatedText variant="body2">
                                {product.item_description}
                            </TruncatedText>
                        </CardContent>

                        {/* Details Button */}
                        <Box sx={{ px: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleDetailsClick(product.uuid)}
                            >
                                Details
                            </Button>
                        </Box>
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

export default ProductListGridView;

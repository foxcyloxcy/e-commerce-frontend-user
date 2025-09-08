import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Modal,
    Backdrop,
    Fade,
    Divider,
    Avatar
} from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../FeaturedProductsComponent/FeaturedProducts.css'
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import ButtonComponent from '../ReusableComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import PriceBreakdownModal from '../ReusableComponents/ModalComponent/PriceBreakDownModal';
import MapViewModal from '../ReusableComponents/ModalComponent/MapViewModal';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Custom styled components
const TruncatedText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const QuickViewButton = styled(Button)(({ theme }) => ({
    background: ModTheme.palette.primary.light,
    color: '#fff',
    padding: theme.spacing(0.1, 1),
    '&:hover': {
        background: ModTheme.palette.primary.dark,
        color: ModTheme.palette.secondary.main,
    },
}));

const ViewInDetailsButton = styled(Button)(({ theme }) => ({
    background: ModTheme.palette.primary.light,
    color: '#fff',
    padding: theme.spacing(0.1, 1),
    '&:hover': {
        background: ModTheme.palette.primary.dark,
        color: ModTheme.palette.secondary.main,
    },
}));




const FeaturedProducts = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openPriceBreakdown, setOpenPriceBreakdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [openMap, setOpenMap] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleOpenPriceBreakdown = (product) => {
        setSelectedProduct(product);
        setOpenPriceBreakdown(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
    };

    const handleClosePriceBreakdown = () => {
        setOpenPriceBreakdown(false);
    };

    const loadProducts = useCallback(async () => {
        try {
            const res = await api.get(`api/global/featured?size=100`);
            if (res.status === 200) {

                const data = res.data.data;
                setProducts(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Function to format price with commas
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleDetailsClick = (productUuid) => {
        navigate('/product-details/' + productUuid);
    };

    const handleOpenMap = (address) => {
        setSelectedAddress(address);
        setOpenMap(true);
    };

    const handleCloseMap = () => {
        setOpenMap(false);
        setSelectedAddress(null);
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

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1290,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    autoplaySpeed: 2000
                },
            },
            {
                breakpoint: 1080,
                settings: {
                    dots: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    autoplaySpeed: 2000
                },
            },
            {
                breakpoint: 780,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000
                },
            },
            {
                breakpoint: 550,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000
                },
            },
        ],
    };

    if (!products || products.length <= 0) {
        return (
            <Box
                sx={{
                    padding: ModTheme.spacing(3),
                    marginTop: 2,
                    marginBottom: 10,
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <Typography variant="h4" align="center" gutterBottom marginBottom={1}>
                    Featured Products
                </Typography>

                No featured products available.
            </Box>
        );
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <Box
                sx={{
                    px: { xs: 3, md: 4 },
                    mt: 2,
                    mb: 2,
                    maxHeight: { xs: "500px", sm: "550px", md: "650", lg: "700" },
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >
                    Featured Products
                </Typography>

                {/* Carousel */}
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <Box key={index} px={1}>
                            {/* Vendor Info */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <Avatar
                                    src={product.user.vendor.logo}
                                    alt={product.user.vendor.name}
                                    sx={{ width: 32, height: 32 }}
                                />
                                    <TruncatedText variant="body2" sx={{ ml: 1, }}>
                                        {product.user.vendor.name}
                                    </TruncatedText>
                            </Box>

                            {/* Product Card */}
                            <Card
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    height: { xs: "400px", sm: "450px", md: "550", lg: "600" },
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: 0,
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        aspectRatio: { xs: "1/1", sm: "3/4" },
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <LazyLoadImage
                                        src={
                                            product.default_image
                                                ? product.default_image.image_url
                                                : "no image available"
                                        }
                                        alt={product.item_name}
                                        effect="blur"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>

                                <Divider />

                                <CardContent>
                                    <TruncatedText
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {product.sub_category.name}
                                    </TruncatedText>

                                    <TruncatedText variant="body2"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: ModTheme.palette.primary.main
                                            }}>
                                        {product.item_name}
                                    </TruncatedText>

                                    <Box>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            onClick={() => handleOpenPriceBreakdown(product)}
                                            sx={{
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                                fontWeight: 600,
                                            }}
                                        >
                                            AED {formatPrice(product.total_fee)}
                                        </Typography>

                                        {product.address && (

                                            <TruncatedText variant="body2"
                                                sx={{ cursor: "pointer", textDecoration: "underline" }}
                                                onClick={() => handleOpenMap(product.address)}>

                                                Collection {parseAddress(product.address)}

                                            </TruncatedText>

                                        )}
                                    </Box>
                                </CardContent>

                                {/* Actions */}

                                <Box sx={{
                                    px: 1,
                                    pb: 1,
                                    display: 'flex',
                                    // alignItems:"center",
                                    justifyContent: "space-evenly"
                                    // flexDirection: "column",

                                }}>

                                    <QuickViewButton onClick={() => handleOpenModal(product)}>
                                        Quick View
                                    </QuickViewButton>
                                    <ViewInDetailsButton
                                        onClick={() => handleDetailsClick(product.uuid)}
                                    >
                                        Detailed View
                                    </ViewInDetailsButton>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Slider>

                {/* Quick View Modal */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                >
                    <Fade in={openModal}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                borderRadius: 2,
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            {selectedProduct && (
                                <>
                                    <Typography variant="h6" component="h2">
                                        {selectedProduct.item_name}
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={
                                            selectedProduct.default_image
                                                ? selectedProduct.default_image.image_url
                                                : selectedProduct.default_image
                                        }
                                        alt={selectedProduct.item_name}
                                        sx={{ objectFit: "contain", borderRadius: 1, my: 2 }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {selectedProduct.sub_category.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="primary"
                                        onClick={() => handleOpenPriceBreakdown(selectedProduct)}
                                        sx={{ cursor: "pointer", textDecoration: "underline" }}
                                    >
                                        AED {formatPrice(selectedProduct.total_fee)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        {selectedProduct.item_description}
                                    </Typography>
                                    <Box mt={2}>
                                        <ButtonComponent
                                            onClick={() => handleDetailsClick(selectedProduct.uuid)}
                                            label="Buy item"
                                            buttonVariant="contained"
                                            textColor="primary.contrastText"
                                            hoverTextColor="primary.main"
                                        />
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Fade>
                </Modal>

                {/* Price Breakdown Modal */}
                <PriceBreakdownModal
                    open={openPriceBreakdown}
                    onClose={handleClosePriceBreakdown}
                    product={selectedProduct}
                />

                {/* Map Modal */}
                {selectedAddress && (
                    <MapViewModal
                        open={openMap}
                        onClose={handleCloseMap}
                        address={selectedAddress}
                    />
                )}
            </Box>
        </ThemeProvider>
    );
};

export default FeaturedProducts;

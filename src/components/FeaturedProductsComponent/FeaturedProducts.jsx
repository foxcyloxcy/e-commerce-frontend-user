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
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
    background: ModTheme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(0.1, 1),
    fontSize: '0.75rem',
    '&:hover': {
        background: ModTheme.palette.primary.dark,
        color: ModTheme.palette.secondary.main,
    },
}));

const ViewInDetailsButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(1),
    left: '50%',
    transform: 'translateX(-50%)',
    background: ModTheme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(0.1, 1),
    fontSize: '0.75rem',
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
        navigate('/product-details/'+productUuid);
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
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
                    padding: ModTheme.spacing(3),
                    marginTop: 2,
                    marginBottom: 10,
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <Typography variant="h4" align="center" gutterBottom marginBottom={1}>
                    Featured Products
                </Typography>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <Box key={index} padding={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                                <Avatar src={product.user.vendor.logo} alt={product.user.vendor.name} />
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    {product.user.vendor.name}
                                </Typography>
                            </Box>
                            <Card
                                sx={{
                                    position: 'relative',
                                    backgroundColor: ModTheme.palette.secondary.background,
                                    height: 450, // Set consistent height for all cards
                                    display: 'flex',
                                    flexDirection: 'column',
                                    ':hover': {
                                        boxShadow: 10,
                                    },
                                }}
                            >
                                <LazyLoadImage
                                    effect="blur"
                                    src={product.default_image ? product.default_image.image_url : product.default_image}
                                    alt={product.name}
                                    style={{ objectFit: 'contain', maxHeight: 200, width: '100%' }}
                                />
                                <Divider />
                                <CardContent sx={{ flexGrow: 1, marginBottom: 2 }}>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {product.sub_category.name}
                                    </Typography>
                                    <TruncatedText variant="h6">
                                        {product.item_name}
                                    </TruncatedText>
                                    <Box
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'flex-start', 
                                            flexDirection:'column', 
                                            marginTop: 1 
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            onClick={() => handleOpenPriceBreakdown(product)}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            AED {formatPrice(product.total_fee)}
                                        </Typography>
                                        {
                                            product.address && (
                                                <Typography
                                                    variant="body1"
                                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={() => handleOpenMap(product.address)}>
                                                    Collection {parseAddress(product.address)}
                                                </Typography>
                                            )
                                        }
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <QuickViewButton onClick={() => handleOpenModal(product)}>
                                        Quick View
                                    </QuickViewButton>
                                </CardActions>
                                <CardActions>
                                    <ViewInDetailsButton onClick={() => handleDetailsClick(product.uuid)}>
                                        Detail View
                                    </ViewInDetailsButton>
                                </CardActions>
                            </Card>
                        </Box>
                    ))}
                </Slider>

                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModal}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
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
                                        sx={{ objectFit: 'contain' }}
                                    />
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {selectedProduct.sub_category.name}
                                    </Typography>
                                    <Typography
                                            variant="body1"
                                            color="primary"
                                            onClick={() => handleOpenPriceBreakdown(selectedProduct)}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            AED {formatPrice(selectedProduct.total_fee)}
                                        </Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        {selectedProduct.item_description}
                                    </Typography>
                                    <ButtonComponent
                                        onClick={() => handleDetailsClick(selectedProduct.uuid)}
                                        label="Buy item"
                                        buttonVariant="contained"
                                        textColor="primary.contrastText"
                                        hoverTextColor="primary.main"
                                    />
                                </>
                            )}
                        </Box>
                    </Fade>
                </Modal>

                <PriceBreakdownModal
                    open={openPriceBreakdown}
                    onClose={handleClosePriceBreakdown}
                    product={selectedProduct}
                />
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

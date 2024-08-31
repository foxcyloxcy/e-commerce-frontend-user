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
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';

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

// Price breakdown modal component
// Price breakdown modal component
const PriceBreakdownModal = ({ open, onClose, product }) => {
    // Check if product exists before rendering the modal content
    if (!product) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Price breakdown
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1">
                        Item: AED {product.price}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Buyer Protection fee: AED {(product.total_fee - product.price).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Postage fees will be added at checkout.
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                        Our Buyer Protection fee is mandatory when you purchase an item on the platform. It is added to every purchase made with the 'Buy Now' button. The item price is set by the seller and may be subject to negotiation.
                    </Typography>
                    <Button onClick={onClose} variant="contained" fullWidth sx={{ mt: 3 }}>
                        Ok, close
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};


const FeaturedProducts = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openPriceBreakdown, setOpenPriceBreakdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
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
            const res = await api.get(`api/global/featured?size=7`);
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

    const handleDetailsClick = (product) => {
        navigate('/product-details', { state: { product } });
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <ThemeProvider theme={ModTheme}>
            <Box
                sx={{
                    padding: ModTheme.spacing(3),
                    marginTop: 2,
                    marginBottom: 10,
                }}
            >
                <Typography variant="h1" align="center" gutterBottom marginBottom={1}>
                    Featured Products
                </Typography>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <Box key={index} padding={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                                <Avatar src={product.user_avatar} alt={product.user_name} />
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    {product.user_name}
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
                                <CardMedia
                                    component="img"
                                    image={
                                        product.default_image
                                            ? product.default_image.image_url
                                            : product.default_image
                                    }
                                    alt={product.name}
                                    sx={{ objectFit: 'cover', maxHeight: 200, width: '100%' }}
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
                                        <Typography variant="body1" color="primary">
                                            AED {formatPrice(product.price)}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            onClick={() => handleOpenPriceBreakdown(product)}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            AED {formatPrice(product.total_fee)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <QuickViewButton onClick={() => handleOpenModal(product)}>
                                        Quick View
                                    </QuickViewButton>
                                </CardActions>
                                <CardActions>
                                    <ViewInDetailsButton onClick={() => handleDetailsClick(product)}>
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
                                width: 600,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            {selectedProduct && (
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {selectedProduct.item_name}
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <img
                                        src={selectedProduct.default_image.image_url}
                                        alt={selectedProduct.item_name}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        AED {selectedProduct.price}
                                    </Typography>
                                    <Button
                                        onClick={() => handleDetailsClick(selectedProduct)}
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 3 }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Fade>
                </Modal>

                <PriceBreakdownModal
                    open={openPriceBreakdown}
                    onClose={handleClosePriceBreakdown}
                    product={selectedProduct}
                />
            </Box>
        </ThemeProvider>
    );
};

export default FeaturedProducts;

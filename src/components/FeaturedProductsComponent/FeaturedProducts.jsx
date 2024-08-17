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
} from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
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

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
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
                    marginTop: 5,
                    marginBottom: 10,
                }}
            >
                <Typography variant="h1" align="center" gutterBottom marginBottom={5}>
                    Featured Products
                </Typography>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <Box key={index} padding={2}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    backgroundColor: ModTheme.palette.secondary.background,
                                    height: '100%',
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
                                    sx={{ objectFit: 'contain', maxHeight: 200, width: '100%' }}
                                />
                                <Divider />
                                <CardContent sx={{ flexGrow: 1, marginBottom: 2 }}>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {product.sub_category.name}
                                    </Typography>
                                    <Typography variant="h6">{product.item_name}</Typography>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
                                    >
                                        <Typography variant="body1" color="primary">
                                            {product.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <QuickViewButton onClick={() => handleOpenModal(product)}>
                                        Quick View
                                    </QuickViewButton>
                                </CardActions>
                                <CardActions>
                                    <ViewInDetailsButton onClick={() => handleOpenModal(product)}>
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
                                        image={selectedProduct.default_image.image_url}
                                        alt={selectedProduct.item_name}
                                        sx={{ objectFit: 'contain' }}
                                    />
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {selectedProduct.sub_category.name}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        {selectedProduct.price}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        {selectedProduct.item_description}
                                    </Typography>
                                    <ButtonComponent
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
            </Box>
        </ThemeProvider>
    );
};

export default FeaturedProducts;

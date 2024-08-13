import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Modal,
    Backdrop,
    Fade,
} from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, Divider, } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';

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
        color: ModTheme.palette.secondary.main
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
        color: ModTheme.palette.secondary.main
    },
}));

const FeaturedProducts = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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


    const handleDetailsClick = (product) => {
        navigate('/product-details', { state: { product } });
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
                <Grid container spacing={4} alignItems="stretch">
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    backgroundColor: ModTheme.palette.secondary.background,
                                    height: '100%', // Ensure the card takes up the full height of the Grid item
                                    display: 'flex',
                                    flexDirection: 'column', // Allow content to stack vertically
                                    ':hover': {
                                        boxShadow: 10, // theme.shadows[20]
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.default_image ? product.default_image.image_url : product.default_image }
                                    alt={product.name}
                                    sx={{ objectFit: 'contain', maxHeight: 200, width: '100%' }} // Max height to prevent overflow
                                />
                                <Divider />
                                <CardContent sx={{ flexGrow: 1, marginBottom: 2 }}> {/* Ensure content takes up available space */}
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {product.sub_category.name}
                                    </Typography>
                                    <Typography variant="h6">{product.item_name}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
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
                                    <ViewInDetailsButton onClick={() => handleDetailsClick(product)}>
                                        Detail View
                                    </ViewInDetailsButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

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
                                        sx={{ objectFit: "contain" }}
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
                                        textColor='primary.contrastText'
                                        hoverTextColor='primary.main'
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

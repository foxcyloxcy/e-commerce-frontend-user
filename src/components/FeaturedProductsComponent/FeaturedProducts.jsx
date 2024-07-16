import React, { useState } from 'react';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const products = [
    {
        category: "Men's Shoes",
        name: 'DNK Brown Shoes',
        image: 'men shoes.jpg', // replace with actual image paths
        oldPrice: 'AED 35.00',
        newPrice: 'AED 32.00',
        onSale: true,
    },
    {
        category: "Men's Jeans",
        name: 'Light Blue Jeans',
        image: 'men jeans.jpg', // replace with actual image paths
        oldPrice: '',
        newPrice: 'AED 145.00',
        onSale: false,
    },
    {
        category: "Men's Shoes",
        name: 'DNK Red Sport Shoes',
        image: 'nike men shoes.jpg', // replace with actual image paths
        oldPrice: 'AED 35.00',
        newPrice: 'AED 32.00',
        onSale: true,
    },
    {
        category: "Women's Jeans",
        name: 'Blue Denim Shorts',
        image: 'women jeans.jpg', // replace with actual image paths
        oldPrice: 'AED 45.00',
        newPrice: 'AED 35.00',
        onSale: true,
    },
];


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

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
    };

    return (
        <ThemeProvider theme={ModTheme}>
            <Box
                sx={{
                    padding: ModTheme.spacing(6),
                    marginTop: 5,
                    marginBottom: 10,
                }}
            >
                <Typography variant="h1" align="center" gutterBottom marginBottom={5}>
                    Featured Products
                </Typography>
                <Grid container spacing={4}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    backgroundColor: ModTheme.palette.secondary.background,
                                    height: 400, // Fixed height for the card
                                    ':hover': {
                                        boxShadow: 10, // theme.shadows[20]
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {product.category}
                                    </Typography>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                        <Typography variant="body1" color="primary">
                                            {product.newPrice}
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
                                        {selectedProduct.name}
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={selectedProduct.image}
                                        alt={selectedProduct.name}
                                    />
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {selectedProduct.category}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        {selectedProduct.newPrice}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.
                                    </Typography>
                                    <ButtonComponent
                                        label="Add to cart"
                                        buttonVariant="contained"
                                        textColor='primary.contrastText'
                                        hoverTextColor='secondary.main'
                                        startIcon={<AddShoppingCartIcon />}
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

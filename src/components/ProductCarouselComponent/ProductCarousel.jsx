// ProductCarousel.js
import React from 'react';
import { Box, Typography, Button, CardMedia, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBackIos, ArrowForwardIos, AddShoppingCart } from '@mui/icons-material';

const ProductCarousel = ({ product }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} alignItems="center">
            <Box position="relative" flex="1">
                <IconButton
                    onClick={handlePrevImage}
                    sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
                >
                    <ArrowBackIos />
                </IconButton>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.images[currentImageIndex]}
                    alt={product.name}
                    sx={{
                        objectFit: 'contain',
                        width: '100%',
                        maxHeight: isSmallScreen ? '300px' : '500px',
                    }}
                />
                <IconButton
                    onClick={handleNextImage}
                    sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>
            <Box flex="1" p={2}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                    {product.price}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCart />}
                    sx={{ marginTop: 2 }}
                >
                    Add to cart
                </Button>
            </Box>
        </Box>
    );
};

export default ProductCarousel;

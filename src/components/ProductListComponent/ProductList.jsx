import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Typography, CardActions, Grid, Container, Box, TextField, FormControl, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const products = [
    {
        id: 1,
        name: 'DNK Brown shoes',
        brand: 'DNK',
        category: 'Shoes',
        color: 'Brown',
        description: 'This is the description for product 1.',
        price: 'AED 1000.00',
        image: 'men shoes.jpg'
    },
    {
        id: 2,
        name: 'Nike Black and red shoes',
        brand: 'Nike',
        category: 'Shoes',
        color: 'Black',
        description: 'This is the description for product 2.',
        price: 'AED 200.00',
        image: 'nike men shoes.jpg'
    },
    {
        id: 3,
        name: 'Levi\'s Jeans',
        brand: 'Levi\'s',
        category: 'Jeans',
        color: 'Blue',
        description: 'This is the description for product 3.',
        price: 'AED 5000.00',
        image: 'men jeans.jpg'
    },
    {
        id: 4,
        name: 'Women Jeans',
        brand: 'Levi\'s',
        category: 'Jeans',
        color: 'Blue',
        description: 'This is the description for product 4.',
        price: 'AED 3330.00',
        image: 'women jeans.jpg'
    },
    // Add more products as needed
];

const brands = ['DNK', 'Nike', 'Levi\'s'];
const colors = ['Black', 'Brown', 'Blue'];
const categories = ['Shoes', 'Jeans', 'Shirts'];

const ProductList = () => {
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 50, max: 50000 });

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setSelectedCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(value)
                ? prevSelectedCategories.filter(category => category !== value)
                : [...prevSelectedCategories, value]
        );
    };

    const handleBrandChange = (event) => {
        const { value } = event.target;
        setSelectedBrands(prevSelectedBrands =>
            prevSelectedBrands.includes(value)
                ? prevSelectedBrands.filter(brand => brand !== value)
                : [...prevSelectedBrands, value]
        );
    };

    const handleColorChange = (event) => {
        const { value } = event.target;
        setSelectedColors(prevSelectedColors =>
            prevSelectedColors.includes(value)
                ? prevSelectedColors.filter(color => color !== value)
                : [...prevSelectedColors, value]
        );
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        const numericValue = parseInt(value, 10);

        if (numericValue >= 50 && numericValue <= 50000) {
            setPriceRange(prevPriceRange => ({
                ...prevPriceRange,
                [name]: numericValue
            }));
        }
    };

    const filteredProducts = products.filter(product => {
        const productPrice = parseFloat(product.price.replace('AED ', ''));
        return (
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
            productPrice >= priceRange.min && productPrice <= priceRange.max
        );
    });

    return (
        <ThemeProvider theme={ModTheme}>
            <Grid container sx={{ 
                display: 'flex', 
                mt: 10,
                mb: 5,
                padding: 1,
                minHeight: '80vh'
                }}>
                <Box sx={{ width: {xs:'25%', sm:'25%', md:'25%', lg:'20%', xl:'20%'}, paddingRight: 1, marginBottom: { xs: 2, md: 0 } }}>
                <Typography variant="h1" sx={{ fontSize: { xs: '0.8rem', sm:'0.9rem', md: '1rem', lg:'1.1rem', xl:'1.2rem' } }}>Filters</Typography>
                    <Box sx={{ marginBottom: 3, marginTop: 1 }}>
                        <TextField
                            label="Search..."
                            variant="outlined"
                            value={search}
                            onChange={handleSearchChange}
                            fullWidth
                        />
                    </Box>
                    <Box
                    sx={{ marginBottom: 3 }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '0.5rem', sm:'0.6rem', md: '0.8rem', lg:'1rem', xl:'1.2rem' } }}>Price Range (AED)</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1, flexDirection: { xs: 'column', md: 'row' } }}>
                            <TextField
                                size='small'
                                label="Min"
                                variant="outlined"
                                name="min"
                                value={priceRange.min}
                                onChange={handlePriceChange}
                                type="number"
                                InputProps={{ inputProps: { min: 50, max: 50000 } }}
                                fullWidth
                                sx={{ fontSize: { xs: '0.3rem', sm: '0.4rem', md: '0.5rem', lg: '0.6rem', xl: '0.7rem' } }}
                            />
                            <TextField
                                size='small'
                                label="Max"
                                variant="outlined"
                                name="max"
                                value={priceRange.max}
                                onChange={handlePriceChange}
                                type="number"
                                InputProps={{ inputProps: { min: 50, max: 50000 } }}
                                fullWidth
                                sx={{ fontSize: { xs: '0.3rem', sm: '0.4rem', md: '0.5rem', lg: '0.6rem', xl: '0.7rem' } }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '0.5rem', sm:'0.6rem', md: '0.8rem', lg:'1rem', xl:'1.2rem' } }}>Categories</Typography>
                        <FormGroup>
                            {categories.map(category => (
                                <FormControlLabel
                                    control={<Checkbox value={category} onChange={handleCategoryChange} />}
                                    label={<Typography sx={{ fontSize: { xs: '0.4rem', sm: '0.5rem', md: '0.7rem', lg: '0.9rem', xl: '1rem' } }}>{category}</Typography>}
                                    key={category}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '0.6rem', sm:'0.7rem', md: '0.8rem', lg:'1rem', xl:'1.2rem' } }}>Brands</Typography>
                        <FormGroup>
                            {brands.map(brand => (
                                <FormControlLabel
                                    control={<Checkbox value={brand} onChange={handleBrandChange} />}
                                    label={<Typography sx={{ fontSize: { xs: '0.4rem', sm: '0.5rem', md: '0.7rem', lg: '0.9rem', xl: '1rem' } }}>{brand}</Typography>}
                                    key={brand}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '0.5rem', sm:'0.6rem', md: '0.8rem', lg:'1rem', xl:'1.2rem' } }}>Colors</Typography>
                        <FormGroup>
                            {colors.map(color => (
                                <FormControlLabel
                                    control={<Checkbox value={color} onChange={handleColorChange} />}
                                    label={<Typography sx={{ fontSize: { xs: '0.4rem', sm: '0.5rem', md: '0.7rem', lg: '0.9rem', xl: '1rem' } }}>{color}</Typography>}
                                    key={color}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Box>
                <Box sx={{ width: {xs:'75%', sm:'75%', md:'75%', lg:'80%', xl:'80%'} }}>
                    <Grid container spacing={2} 
                    sx={{ 
                        marginBottom: 10,
                        }}>
                        {filteredProducts.map(product => (
                            <Grid item key={product.id} xs={6} sm={6} md={4} lg={3}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        backgroundColor: ModTheme.palette.secondary.background,
                                        height: { xs: 260, md: 350, lg: 450, xl: 500 }, // Fixed height for the card
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        ':hover': {
                                            boxShadow: 10, // theme.shadows[20]
                                        },
                                    }}>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                height: { xs: 100, md: 150, lg: 175, xl: 200 },
                                                objectFit: 'cover'
                                            }}
                                            image={product.image}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="div"
                                            sx={{ fontSize: { xs: '0.5rem', sm:'0.6rem', md: '0.8rem', lg:'1rem', xl:'1.2rem' } }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" component="div" color="primary"
                                            sx={{ fontSize: { xs: '0.3rem', sm: '0.4rem', md: '0.5rem', lg: '0.8rem', xl: '1rem' } }}>
                                                {product.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary"
                                            sx={{ fontSize: { xs: '0.3rem', sm: '0.4rem', md: '0.5rem', lg: '0.8rem', xl: '1rem' } }}>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary"
                                            sx={{ fontSize: { xs: '0.3rem', sm: '0.4rem', md: '0.5rem', lg: '0.8rem', xl: '1rem' } }}>
                                                Dubai, United Arab Emirates
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                    <CardActions sx={{ position: 'relative', bottom: 0 }}>
                                        <ButtonComponent
                                            sx={{ fontSize: { xs: '0.3rem', sm: '0.4rem', md: '0.5rem', lg: '0.8rem', xl: '1rem' } }}
                                            label="Add to cart"
                                            size="small"
                                            buttonVariant="contained"
                                            textColor='primary.contrastText'
                                            hoverTextColor='secondary.main'
                                            startIcon={<AddShoppingCartIcon />}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </ThemeProvider>
    );
}

export default ProductList;

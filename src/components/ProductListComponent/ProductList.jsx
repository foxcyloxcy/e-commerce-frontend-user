// ProductListing.js
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Typography, CardActions, Grid, Container, Box, TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const products = [
    {
        id: 1,
        name: 'DNK Brown shoes',
        category: 'Shoes',
        description: 'This is the description for product 1.',
        price: 'AED 10.00',
        image: 'men shoes.jpg'
    },
    {
        id: 2,
        name: 'Nike Black and red shoes',
        category: 'Shoes',
        description: 'This is the description for product 2.',
        price: 'AED 20.00',
        image: 'nike men shoes.jpg'
    },
    {
        id: 3,
        name: 'Levi\'s Jeans',
        category: 'Jeans',
        description: 'This is the description for product 3.',
        price: 'AED 50.00',
        image: 'men jeans.jpg'
    },
    {
        id: 4,
        name: 'Women Jeans',
        category: 'Jeans',
        description: 'This is the description for product 4.',
        price: 'AED 30.00',
        image: 'women jeans.jpg'
    },
    // Add more products as needed
];

const ProductList = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            (category === '' || product.category === category)
        );
    });

    return (
        <ThemeProvider theme={ModTheme}>
            <Container>
                <Box sx={{ marginTop: 10, marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        value={search}
                        onChange={handleSearchChange}
                        sx={{ marginRight: 2 }}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                            <MenuItem value=""><em>All</em></MenuItem>
                            <MenuItem value="Shoes">Shoes</MenuItem>
                            <MenuItem value="Jeans">Jeans</MenuItem>
                            <MenuItem value="Shirts">Shirts</MenuItem>
                            {/* Add more categories as needed */}
                        </Select>
                    </FormControl>
                </Box>
                <Grid container spacing={4} sx={{ marginTop: 5, marginBottom: 10 }}>
                    {filteredProducts.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    backgroundColor: ModTheme.palette.secondary.background,
                                    height: 500, // Fixed height for the card
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
                                        height="200"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" component="div" color="primary">
                                            {product.price}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <CardActions sx={{ position: 'relative', bottom: 0 }}>
                                    <ButtonComponent
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
            </Container>
        </ThemeProvider>
    );
}

export default ProductList;

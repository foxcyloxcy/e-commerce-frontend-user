// ProductListing.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid, Container } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';

const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is the description for product 1.',
        price: '$10.00',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is the description for product 2.',
        price: '$20.00',
        image: 'https://via.placeholder.com/150'
    },
    // Add more products as needed
];

const ProductList = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container>
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Card>
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
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Add to Cart
                                    </Button>
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

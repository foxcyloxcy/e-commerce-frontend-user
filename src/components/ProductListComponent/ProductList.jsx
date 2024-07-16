// ProductListing.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Typography, CardActions, Grid, Container, Box } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const products = [
    {
        id: 1,
        name: 'DNK Brown shoes',
        description: 'This is the description for product 1.',
        price: 'AED 10.00',
        image: 'men shoes.jpg'
    },
    {
        id: 2,
        name: 'Nike Black and red shoes',
        description: 'This is the description for product 2.',
        price: 'AED 20.00',
        image: 'nike men shoes.jpg'
    },
    // Add more products as needed
];

const ProductList = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container>
                <Grid container spacing={4}
                    sx={{
                        marginTop: 15,
                        marginBottom: 10
                    }}>
                    {products.map(product => (
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
                                        boxShadow: 20, // theme.shadows[20]
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

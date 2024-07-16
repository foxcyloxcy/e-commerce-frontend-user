import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../ThemeComponent/ModTheme';

const products = [
  {
    category: "Men's Shoes",
    name: 'DNK Black Blue Sport Shoes',
    image: 'path-to-image1', // replace with actual image paths
    oldPrice: 'AED35.00',
    newPrice: 'AED32.00',
    onSale: true,
  },
  {
    category: "Men's Jeans",
    name: 'Dark Brown Jeans',
    image: 'path-to-image2', // replace with actual image paths
    oldPrice: '',
    newPrice: 'AED145.00',
    onSale: false,
  },
  {
    category: "Men's Shoes",
    name: 'DNK Red Sport Shoes',
    image: 'path-to-image3', // replace with actual image paths
    oldPrice: 'AED35.00',
    newPrice: 'AED32.00',
    onSale: true,
  },
  {
    category: "Women's Jeans",
    name: 'Blue Denim Shorts',
    image: 'path-to-image4', // replace with actual image paths
    oldPrice: 'AED45.00',
    newPrice: 'AED35.00',
    onSale: true,
  },
];

const SaleBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  background: '#000',
  color: '#fff',
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  fontSize: '0.75rem',
}));

const FeaturedProducts = () => {


  return (
    <ThemeProvider theme={ModTheme}>
    <Box sx={{ 
        padding: ModTheme.spacing(6),
        marginTop: 10,
        marginBottom: 10,
     }}>
      <Typography variant="h1" align="center" gutterBottom marginBottom={10}>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ position: 'relative',
                backgroundColor: ModTheme.palette.secondary.background
             }} >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.category}
                </Typography>
                <Typography variant="h6">{product.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  {/* {product.oldPrice && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ textDecoration: 'line-through', marginRight: 1 }}
                    >
                      {product.oldPrice}
                    </Typography>
                  )} */}
                  <Typography variant="body1" color="primary">
                    {product.newPrice}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Customize
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </ThemeProvider>
  );
};

export default FeaturedProducts;

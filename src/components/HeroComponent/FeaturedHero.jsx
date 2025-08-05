import React from 'react';
import { Box, Typography, Button, ThemeProvider, Container, Grid } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, VerifiedUser, Sell } from '@mui/icons-material';


const FeaturedHero = ({ parentIsLoggedIn }) => {
  const navigate = useNavigate();
  const imageRoute = 'featuredHeroMobile.png'

  const handlePostItemRoute = () => {
    if (parentIsLoggedIn) {
      navigate('/add-product');
    } else {
      navigate('/login');
    }
  };

  const handleSearchRoute = () => {
    navigate('/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties=');
  };

  const item = {
    image: imageRoute, // Replace with your image URL
    title: 'Shop and Sell Secondhand',
    description: 'Sell now and make space for something new!',
  };

      const features = [
    {
      icon: <Sell fontSize="large" />,
      title: 'BUY EASILY',
      desc: 'Filter to search, checkout without creating an account',
    },
    {
      icon: <VerifiedUser fontSize="large" />,
      title: 'SELL EASILY',
      desc: 'Upload your items or use our concierge service',
    },
    {
      icon: <LocalShipping fontSize="large" />,
      title: 'DELIVERY OPTIONS',
      desc: 'Collection & delivery within 4 hours, large items assemble included international options.'
    },
  ];

  return (
    <ThemeProvider theme={ModTheme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          mt: {xs: 8, md: 8}
        }}
      >
        {/* Background Image as Banner */}
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: '100%',
            height: { md: '200px' }, // Adjust height for banner size
            objectFit: {xs: 'contain', md: 'cover'},
          }}
        />


              <Container sx={{ py: 6 }}>
                <Grid container spacing={4} justifyContent="center">
                  {features.map((feature, i) => (
                    <Grid item xs={12} sm={4} key={i} textAlign="center">
                      <Box>{feature.icon}</Box>
                      <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.primary" mt={1}>
                        {feature.desc}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Container>

        {/* Overlay Box */}
        {/* <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            top: { md: '50%' },
            left: { md: '25%' },
            transform: { md: 'translate(-50%, -50%)' },
            background: {xs:'#E3F2F7', md:'rgba(255, 255, 255, 0.8)'}, // Semi-transparent background
            padding: { xs: 2, md: 4 },
            borderRadius: {xs: 0, md:'8px'},
            textAlign: 'center',
            width: { xs: '100%', md: '40%' },
          }}
        >
          <Typography variant="h5" gutterBottom color="text.primary">
            {item.title}
          </Typography>

          <Button
            variant="contained"
            onClick={handlePostItemRoute}
            sx={{marginBottom: 1, marginRight: 1, borderRadius: 1,
              backgroundColor: ModTheme.palette.primary.light,}}
          >
            POST AN ITEM
          </Button>
          or
          <Button
            variant="contained"
            sx={{marginBottom: 1, marginLeft: 1, borderRadius: 1,
              backgroundColor: ModTheme.palette.primary.light,}}
            onClick={handleSearchRoute}
          >
            SEARCH FOR ITEMS
          </Button>

          <Typography variant="h6" sx={{fontSize: "1rem"}}>
            <Box
              component="a"
              href="/how-it-works"
              sx={{ textDecoration: 'underline', color: 'primary.main'}}
            >
              Learn how it works
            </Box>
          </Typography>
        </Box> */}
      </Box>
    </ThemeProvider>
  );
};

export default FeaturedHero;

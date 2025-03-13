import React from 'react';
import { Box, Typography, Button, ThemeProvider, useMediaQuery, } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';


const FeaturedHero = ({ parentIsLoggedIn }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
  // const imageRoute = isSmallScreen ? 'featuredHeroMobile.jpg': 'featuredHero.jpg'
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
            height: { md: '450px' }, // Adjust height for banner size
            objectFit: {xs: 'contain', md: 'cover'},
          }}
        />

        {/* Overlay Box */}
        <Box
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
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FeaturedHero;

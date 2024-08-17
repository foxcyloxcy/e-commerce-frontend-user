import React from 'react';
import { Box, Typography, Button, ThemeProvider } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';

const FeaturedHero = ({ parentIsLoggedIn }) => {
  const navigate = useNavigate();

  const handlePostItemRoute = () => {
    if (parentIsLoggedIn) {
      navigate('/add-product');
    } else {
      navigate('/login');
    }
  };

  const handleSearchRoute = () => {
    navigate('/shop');
  };

  const item = {
    image: 'featuredHero.jpg', // Replace with your image URL
    title: 'Relove and repurpose your belongings, buy and sell your second hand items.',
    description: 'Sell now and make space for something new!',
  };

  return (
    <ThemeProvider theme={ModTheme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Background Image as Banner */}
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: '100%',
            height: { xs: '300px', md: '500px' }, // Adjust height for banner size
            objectFit: 'cover',
          }}
        />

        {/* Overlay Box */}
        <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            top: { md: '50%' },
            left: { md: '25%' },
            transform: { md: 'translate(-50%, -50%)' },
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            padding: { xs: 2, md: 4 },
            borderRadius: '8px',
            textAlign: 'center',
            width: { xs: '100%', md: '40%' },
          }}
        >
          <Typography variant="h6" gutterBottom color="text.primary">
            {item.title}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePostItemRoute}
            sx={{marginBottom: 1, marginRight: 1}}
          >
            POST AN ITEM
          </Button>
          or
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 1, marginBottom: 1 }}
            onClick={handleSearchRoute}
          >
            SEARCH FOR ITEMS
          </Button>

          <Typography>
            <Box
              component="a"
              href="#"
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

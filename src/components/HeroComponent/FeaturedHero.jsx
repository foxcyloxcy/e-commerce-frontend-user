import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';

const FeaturedHero = () => {
  const item = {
    image: 'featuredHero.jpg', // Replace with your image URL
    title: 'Ready to declutter your wardrobe?',
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
            height: { xs: '300px', md: '500px' },  // Adjust height for banner size
            objectFit: 'cover',
          }}
        />

        {/* Conditional Overlay Box Positioning */}
        <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            top: { md: '50%' },
            left: { md: '25%' },
            transform: { md: 'translate(-50%, -50%)' },
            backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent background
            padding: { xs: 2, md: 4 },
            borderRadius: '8px',
            textAlign: 'center',
            width: { xs: '100%', md: '40%' },
          }}
        >
          <Typography variant="h4" gutterBottom color="text.primary">
            {item.title}
          </Typography>
          <Box
            component="button"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              marginBottom: 2,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Sell now
          </Box>
          <Typography>
            <Box component="a" href="#" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
              Learn how it works
            </Box>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FeaturedHero;

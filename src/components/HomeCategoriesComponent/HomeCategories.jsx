import React, { useState } from 'react';
import { Grid, Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const categories = [
  { label: 'Women', image: 'women.png' },
  { label: 'Men', image: 'men.png' },
  { label: 'Baby & Children', image: 'baby.png' },
  { label: 'Home', image: 'Home.png' },
  { label: 'Pets', image: 'pets.png' },
];

const ImageContainer = styled(Box)(({ theme, image }) => ({
  position: 'relative',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common,
  [theme.breakpoints.down('sm')]: {
    minHeight: 150,
  },
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(37, 87, 115, 0.6), rgba(37, 87, 115, 0))', //rgba(184, 212, 230, baby blue color
    borderRadius: theme.shape.borderRadius,
  },
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
  },
}));

const HomeCategories = () => {
  const theme = useTheme();
  const [displayedCategories, setDisplayedCategories] = useState(categories);

  return (
    <Box p={4} mt={10}>
      <Grid container spacing={2}
                  display='flex'
                  justifyContent='center'>
        {displayedCategories.map((category, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
          >
            <ImageContainer image={category.image}>
              {/* <Typography variant="h6" component="div" sx={{ position: 'relative', zIndex: 1 }}>
                {category.label}
              </Typography> */}
            </ImageContainer>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeCategories;

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, ThemeProvider } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FeaturedHero.css';  // Import the custom CSS
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ModTheme from '../ThemeComponent/ModTheme';

const carouselItems = [
  {
    title: 'Reloved',
    description: 'Your marketplace to buy and sell your second-hand items. View and browse products on the categories below.',
    image: 'reloved_banner.jpeg'
  },
  {
    title: 'Reloved',
    description: 'Your marketplace to buy and sell your second-hand items. View and browse products on the categories below.',
    image: 'reloved_banner.jpeg'
  },
  {
    title: 'Reloved',
    description: 'Your marketplace to buy and sell your second-hand items. View and browse products on the categories below.',
    image: 'reloved_banner.jpeg'
  }
];

const FeaturedHero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000
  };

  return (
    <ThemeProvider theme={ModTheme}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: {
                xs:'left', 
                sm:'left', 
                md:'left',
                lg: 'center',
                xl: 'center'
              },
              justifyContent: 'center',
              color: 'white',
              padding: 10
            }}>
              <Typography variant="h1" component="h1" sx={{
                paddingBottom: 2
              }}>{item.title}</Typography>
              <Typography sx={{
                variant:{
                  xs:'body2',
                  sm:'body2',
                  md:'body2',
                  lg:'body1',
                  xl:'body1',
                }
              }}  component="p">{item.description}</Typography>
              {/* <ButtonComponent
                height='50px'
                width="30%"
                label="Shop now"
                buttonVariant="contained"
                textColor='primary.contrastText'
                hoverTextColor='secondary.main'
              /> */}
            </Box>
          </Box>
        ))}
      </Slider>
      {/* <Box sx={{ position: 'absolute', bottom: 200, left: '50%', transform: 'translateX(-50%)' }}>
      </Box> */}
    </Box>
    </ThemeProvider>
  );
};

export default FeaturedHero;
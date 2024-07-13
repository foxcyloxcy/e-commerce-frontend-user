import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FeaturedHero.css';  // Import the custom CSS
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const carouselItems = [
  {
    title: '',
    description: '',
    image: 'Home.png'
  },
  {
    title: '',
    description: '',
    image: 'women.png'
  },
  {
    title: '',
    description: '',
    image: 'pets.png'
  }
];

const FeaturedHero = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
  
    return (
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
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Typography variant="h3" component="h1">{item.title}</Typography>
                <Typography variant="h6" component="p">{item.description}</Typography>
              </Box>
            </Box>
          ))}
        </Slider>
        <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
        <ButtonComponent
          height="50px"
          width="100%"
          label="View Collection"
                                          buttonVariant="contained"
                              textColor='primary.contrastText'
                    hoverTextColor='secondary.main'
        />
        </Box>
      </Box>
    );
  };
  
  export default FeaturedHero;
import { Box, } from '@mui/material';
import { styled } from '@mui/system';

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
      minHeight: 100,
    },
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // background: 'linear-gradient(to top, rgba(37, 87, 115, 0.6), rgba(37, 87, 115, 0))', //rgba(184, 212, 230, baby blue color
      borderRadius: theme.shape.borderRadius,
    },
    cursor: 'pointer',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
    },
  }));

  export default ImageContainer
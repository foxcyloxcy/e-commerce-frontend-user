import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Box, Typography, Button, Collapse, Fade, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import api from '../../assets/baseURL/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
  },
}));

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [viewingSubCategories, setViewingSubCategories] = useState(false);
  const theme = useTheme();
  const history = useNavigate();

  const loadCategories = useCallback(async () => {
    try {
      const res = await api.get("api/global/category");
      if (res.status === 200) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategoryId(categoryId);
    setTimeout(() => setViewingSubCategories(true), 300); // Match this duration with the Fade timeout
  };

  const routeToProductList = (subCategoryId) => {
    history("/shop", { state: { subCategoryId: subCategoryId } });
  };


  const handleBackClick = () => {
    setViewingSubCategories(false);
    setExpandedCategoryId(null);
  };

  return (
    <Box p={4} mt={10}>
      {!viewingSubCategories ? (
        <Fade in={!viewingSubCategories} timeout={300}>
          <Grid container spacing={2} display='flex' justifyContent='center'>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <ImageContainer
                  image={category.image}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Typography variant="h6" component="div" sx={{ position: 'relative', zIndex: 1 }}>
                    {category.name}
                  </Typography>
                </ImageContainer>
              </Grid>
            ))}
          </Grid>
        </Fade>
      ) : (
        <Fade in={viewingSubCategories} timeout={1000}>
          <Box>
              <ArrowBackIcon onClick={handleBackClick} sx={{
                cursor: 'pointer',
                position: 'absolute'
              }}/>
            <Grid container spacing={2} display='flex' justifyContent='center'>
              {categories
                .find((category) => category.id === expandedCategoryId)
                ?.sub_category.map((subCategory) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={subCategory.id}>
                <ImageContainer
                  image={subCategory.image}
                  onClick={() => routeToProductList(subCategory.id)}
                >
                  <Typography variant="h6" component="div" sx={{ position: 'relative', zIndex: 1 }}>
                    {subCategory.name}
                  </Typography>
                </ImageContainer>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default HomeCategories;

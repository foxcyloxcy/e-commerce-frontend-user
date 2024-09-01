import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Box, Typography, Fade, useTheme } from '@mui/material';
import api from '../../assets/baseURL/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageContainer from '../ReusableComponents/ImageContainerComponent/ImageContainer';

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
    <Box p={4} mt={3}>
      {!viewingSubCategories ? (
        <Fade in={!viewingSubCategories} timeout={300}>
          <Grid container spacing={2} display='flex' justifyContent='center'>
            {categories.map((category) => (
              <Grid item xs={4} sm={4} md={4} lg={3} key={category.id}>
                <ImageContainer
                  image={
                    category.name === 'Women' ? 
                    'women.png': category.name === 'Men' ?
                    'men.png' : category.name === 'Baby and Children' ?
                    'baby.png': category.name === 'Furniture and Home' ?
                    'Home.png': category.name === 'Pets' ?
                    'pets.png' : ''
                  }
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Typography variant="h6" component="div" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* {category.name} */}
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

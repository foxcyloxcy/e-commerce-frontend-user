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
                  component="img"
                  loading="lazy"
                  alt={category.name}
                  image={
                    category.name === 'Women' ? 
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/women.png': category.name === 'Men' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/men.png' : category.name === 'Baby and Children' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/baby.png': category.name === 'Furniture and Home' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/Home.png': category.name === 'Pets' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/pets.png' : ''
                  }
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Typography variant="h6" component="div" sx={{ position: 'relative', zIndex: 1 }}>
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
                position: 'absolute',
              }}/>
            <Grid container spacing={2} display='flex' justifyContent='center'>
              {categories
                .find((category) => category.id === expandedCategoryId)
                ?.sub_category.map((subCategory) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={subCategory.id}>
                <ImageContainer
                  alt={subCategory.name}
                  image={
                    subCategory.name === 'Clothes' ? 
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/clothes.png': subCategory.name === 'Shoes' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/shoes.png' : subCategory.name === 'Bags' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/bags.png': subCategory.name === 'Accessories' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/accessories.png': subCategory.name === 'Baby Clothes (0-4yrs)' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/baby_cloth_0_to_4.png' : subCategory.name === 'Baby Clothes (0-4yrs)' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/baby_cloth_0_to_4.png' : subCategory.name === 'Girls Clothing' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/girls_cloth.png' : subCategory.name === 'Boys Clothing' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/boys_cloth.png' : subCategory.name === 'Teenage Girls Clothes' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/teen_girls_cloth.png' : subCategory.name === 'Teenage Boys Clothes' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/teen_boys_cloth.png' : subCategory.name === 'Toys and Games' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/toys_and_games.png' : subCategory.name === 'Baby Care' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/baby_care.png' : subCategory.name === 'Buggies and Travel' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/baggies_and_travel.png' : subCategory.name === 'Bed' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/bed.png' : subCategory.name === 'Kitchenwear' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/kitchenware.png' : subCategory.name === 'Outside' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/outside_furniture.png' : subCategory.name === 'Seating' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/seating.png' : subCategory.name === 'Storage and Wardrobes' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/storage_and_wardrobes.png' : subCategory.name === 'Table' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/tables.png' : subCategory.name === 'Birds' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/birds.png' : subCategory.name === 'Cats' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/cats.png' : subCategory.name === 'Dogs' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/dogs.png' : subCategory.name === 'Fish' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/fish.png' : subCategory.name === 'Tortoise' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/tortoise.png' : subCategory.name === 'Others' ?
                    'https://reloved-uat.s3.ap-northeast-1.amazonaws.com/asset/categories-imgs/others.png' :""
                  }
                  onClick={() => routeToProductList(subCategory.id)}
                >
                  <Typography variant="h6" component="div" sx={{ position: 'relative', zIndex: 1 }}>
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

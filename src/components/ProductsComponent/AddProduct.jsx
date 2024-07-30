import React, { useEffect, useState, useCallback } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography, Container, ThemeProvider, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';

const libraries = ['places'];

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [location, setLocation] = useState(null);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [acceptOffers, setAcceptOffers] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const brandOptions = ["Brand1", "Brand2", "Brand3"];
  const colorOptions = ["Red", "Blue", "Green"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAGgTLA3l7r3jFcuzdcsmknwsSRUjTh4cY',
    libraries,
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files].slice(0, 10));
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    setBrands((prev) => checked ? [...prev, value] : prev.filter((brand) => brand !== value));
  };

  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    setColors((prev) => checked ? [...prev, value] : prev.filter((color) => color !== value));
  };

  const handleSubCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSubCategories((prev) => checked ? [...prev, value] : prev.filter((subCategory) => subCategory !== value));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (value < 50 || value > 50000) {
      setPriceError('Price must be between AED 50 and AED 50,000');
    } else {
      setPriceError('');
    }
  };

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    try {
      const response = await api.get(`api/global/sub-category?category_id=${categoryId}`);
      console.log(response)
      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priceError) {
      return;
    }
    const productData = {
      productName,
      description,
      images,
      price,
      location,
      brands,
      colors,
      acceptOffers,
      selectedCategory,
      selectedSubCategories,
    };
    console.log(productData);
  };

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

  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{
        padding: 3,
        marginTop: 10,
        marginBottom: 5,
        maxWidth: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
        boxSizing: 'border-box'
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{
          marginBottom: 3
        }}>
          Post your pre-loved item
        </Typography>
        <form onSubmit={handleSubmit}>


          <Grid container spacing={2}>
          <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Select Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                label="Price"
                type="number"
                value={price}
                onChange={handlePriceChange}
                error={Boolean(priceError)}
                helperText={priceError}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={acceptOffers} onChange={(e) => setAcceptOffers(e.target.checked)} />}
                  label="Accept Offers"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Images (max 10)
                <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              {images.map((image, index) => (
                <Typography key={index}>{image.name}</Typography>
              ))}
            </Grid>
            <Grid item xs={12}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '400px' }}
                  zoom={8}
                  center={{ lat: -3.745, lng: -38.523 }}
                  onClick={handleMapClick}
                >
                  {location && <Marker position={location} />}
                </GoogleMap>
              ) : (
                <Typography>Loading map...</Typography>
              )}
            </Grid>
            {subCategories.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6">Subcategories</Typography>
                <FormGroup>
                  {subCategories.map((subCategory) => (
                    <FormControlLabel
                      key={subCategory.id}
                      control={
                        <Checkbox
                          value={subCategory.id}
                          checked={selectedSubCategories.includes(subCategory.id)}
                          onChange={handleSubCategoryChange}
                        />
                      }
                      label={subCategory.name}
                    />
                  ))}
                </FormGroup>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6">Brands</Typography>
              <FormGroup>
                {brandOptions.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={<Checkbox value={brand} checked={brands.includes(brand)} onChange={handleBrandChange} />}
                    label={brand}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Colors</Typography>
              <FormGroup>
                {colorOptions.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={<Checkbox value={color} checked={colors.includes(color)} onChange={handleColorChange} />}
                    label={color}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddProduct;

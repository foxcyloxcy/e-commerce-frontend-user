import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography, Container, ThemeProvider } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import ModTheme from '../ThemeComponent/ModTheme';

const libraries = ['places'];

const EditProduct = ({ productData }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [location, setLocation] = useState(null);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [acceptOffers, setAcceptOffers] = useState(false);

  const brandOptions = ["Brand1", "Brand2", "Brand3"];
  const colorOptions = ["Red", "Blue", "Green"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries,
  });

  useEffect(() => {
    if (productData) {
      setProductName(productData.productName);
      setDescription(productData.description);
      setImages(productData.images);
      setPrice(productData.price);
      setLocation(productData.location);
      setBrands(productData.brands);
      setColors(productData.colors);
      setAcceptOffers(productData.acceptOffers);
    }
  }, [productData]);

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

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (value < 50 || value > 50000) {
      setPriceError('Price must be between AED 50 and AED 50,000');
    } else {
      setPriceError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priceError) {
      return;
    }
    const updatedProductData = {
      productName,
      description,
      images,
      price,
      location,
      brands,
      colors,
      acceptOffers,
    };
    console.log(updatedProductData);
  };

  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{ 
        padding: 3, 
        marginTop: 10,
        marginBottom: 5,
        maxWidth: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
        boxSizing: 'border-box' 
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                  center={location || { lat: -3.745, lng: -38.523 }}
                  onClick={handleMapClick}
                >
                  {location && <Marker position={location} />}
                </GoogleMap>
              ) : (
                <Typography>Loading map...</Typography>
              )}
            </Grid>
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
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default EditProduct;

import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, InputLabel, FormControl, Grid, Typography, Paper } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(null);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [acceptOffers, setAcceptOffers] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
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
    setBrands(event.target.value);
  };

  const handleColorChange = (event) => {
    setColors(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      description,
      images,
      price,
      location,
      brands,
      colors,
      acceptOffers,
    };
    console.log(productData);
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
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
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="brand-label">Brands</InputLabel>
              <Select
                labelId="brand-label"
                multiple
                value={brands}
                onChange={handleBrandChange}
              >
                <MenuItem value="Brand1">Brand1</MenuItem>
                <MenuItem value="Brand2">Brand2</MenuItem>
                <MenuItem value="Brand3">Brand3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="color-label">Colors</InputLabel>
              <Select
                labelId="color-label"
                multiple
                value={colors}
                onChange={handleColorChange}
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
              </Select>
            </FormControl>
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
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddProduct;

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography, Container, ThemeProvider, MenuItem, Select, InputLabel, FormControl, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomMap from './CustomMapComponent/CustomMap';
import CloseIcon from '@mui/icons-material/Close';
import { APIProvider } from '@vis.gl/react-google-maps';
import FileInput from './FileInput'; // Import your custom FileInput component
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import Swal from 'sweetalert2';


const AddProduct = (props) => {
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const { userToken } = props;
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [address, setAddress] = useState(null);
  const [acceptOffers, setAcceptOffers] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [selectedPropertyValues, setSelectedPropertyValues] = useState({});


  const history = useNavigate();

  const isLoaded = true

  const handleImageUpload = (files) => {
    setImages((prevImages) => [...prevImages, ...files].slice(0, 10));
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleBidChange = (event) => {
    const { checked } = event.target;
    setAcceptOffers(checked ? 1 : 0);
  };

  const handleSubCategoryChange = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategories(subCategory);
    setSelectedSubCategoryId(subCategory.id)
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
    resetForm();
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    try {
      const response = await api.get(`api/global/sub-category?category_id=${categoryId}`);
      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (propertyId, valueId) => (event) => {
    const { checked } = event.target;

    console.log(propertyId, valueId)
    setSelectedPropertyValues((prevValues) => {
      const updatedValues = { ...prevValues };
      if (checked) {
        if (!updatedValues[propertyId]) {
          updatedValues[propertyId] = [];
        }
        updatedValues[propertyId].push(valueId);
      } else {
        updatedValues[propertyId] = updatedValues[propertyId].filter((id) => id !== valueId);
        if (updatedValues[propertyId].length === 0) {
          delete updatedValues[propertyId];
        }
      }
      console.log(updatedValues)
      return updatedValues;
    });

    console.log(selectedPropertyValues)
    console.log(selectedSubCategories)
  };


  const handleAddressData = async (addressData) => {
    const addressDetails = JSON.stringify(addressData)
    setAddress(addressDetails)
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setImages([]);
    setPrice('');
    setPriceError('');
    setAddress(null);
    setAcceptOffers(0);
    setSelectedCategory('');
    setSubCategories([]);
    setSelectedSubCategories('');
    setSelectedPropertyValues({})
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (priceError) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('item_name', productName);
    formData.append('item_description', description);
    formData.append('address', address);
    formData.append('price', price);
    formData.append('is_bid', acceptOffers);
    formData.append('sub_category_id', selectedSubCategoryId);

    let index = 0;

    // Append selected property values
    Object.keys(selectedPropertyValues).forEach((propertyId) => {
      selectedPropertyValues[propertyId].forEach((valueId) => {
        formData.append(`properties[${index}]`, valueId);
        index++;
      });
    });

    images.forEach((image, index) => {
      formData.append(`imgs[${index}]`, image);
    });

    try {
      const res = await api.post("/api/auth/items", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res)
      // if(res.status === 400){
      //   const successMessage = res.data.message;

      //   Swal.fire({
      //     title: successMessage,
      //     text: 'You will receive an email after your item gets approved. This can take up to 72hrs max.',
      //     icon: 'success',
      //     showCancelButton: true,
      //     confirmButtonText: 'Add Another',
      //     confirmButtonColor: ModTheme.palette.primary.main,
      //     cancelButtonText: 'Go to Shop'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       resetForm();
      //     } else {
      //       history("/shop");
      //     }
      //   });
      // }

      if (res.status === 200) {
        const successMessage = res.data.message;

        Swal.fire({
          title: successMessage,
          text: 'You will receive an email after your item gets approved. This can take up to 72hrs max.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Add Another',
          confirmButtonColor: ModTheme.palette.primary.main,
          cancelButtonText: 'Go to Shop'
        }).then((result) => {
          if (result.isConfirmed) {
            resetForm();
          } else {
            history("/shop");
          }
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message ? error.response.data.message : error.response,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Go to My Profile',
        confirmButtonColor: ModTheme.palette.primary.main,
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          history("/my-profile");
        } else {
          
        }
      });
    } finally {
      setLoading(false);
    }
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
        boxSizing: 'border-box',
        minHeight: '60vh'
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{
          marginBottom: 3
        }}>
          Post your reloved item
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
            {subCategories.length > 0 && (
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Subcategory</InputLabel>
                  <Select
                    value={selectedSubCategories}
                    onChange={handleSubCategoryChange}
                    label="Select Subcategory"
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory.id} value={subCategory}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {selectedSubCategories && (
              <>
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
                    error={priceError.length > 0}
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
                      control={<Checkbox checked={acceptOffers} onChange={handleBidChange} />}
                      label="Accept Offers"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FileInput
                    onChange={handleImageUpload}
                    multiple
                    maxFiles={10}
                  />
                </Grid>
                <Grid item xs={12}>
                  {images.map((image, index) => (
                    <Grid container alignItems="center" spacing={1} key={index}>
                      <Grid item>
                        <Typography>{image.name}</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleRemoveImage(index)} size="small" color="primary">
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  {isLoaded ? (
                    <APIProvider apiKey={apiKey}>
                      <CustomMap
                        addressData={handleAddressData}
                        Editing={true} />
                    </APIProvider>
                  ) : (
                    <Typography>Loading map...</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {selectedSubCategories.sub_category_property.map((property) => (
                    <React.Fragment key={property.id}>
                      <Typography variant="h6" gutterBottom>{property.name}</Typography>
                      <FormGroup row>
                        {property.sub_category_property_value.map((value) => (
                          <FormControlLabel
                            key={value.id}
                            control={
                              <Checkbox
                                checked={
                                  selectedPropertyValues[property.id]?.includes(value.id) || false
                                }
                                onChange={handleCheckboxChange(property.id, value.id)}
                              />
                            }
                            label={value.name}
                          />
                        ))}
                      </FormGroup>
                      <Divider sx={{ marginY: '20px' }} />
                    </React.Fragment>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Adding Product...' : 'Add Product'}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddProduct;

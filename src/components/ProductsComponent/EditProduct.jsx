import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography, Container, ThemeProvider, MenuItem, Select, InputLabel, FormControl, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomMap from './CustomMapComponent/CustomMap';
import CloseIcon from '@mui/icons-material/Close';
import FileInput from './FileInput'; // Import your custom FileInput component
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import ImageViewModal from '../ReusableComponents/ModalComponent/ImageViewModal';

const EditProduct = ({ userToken }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
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
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [modalImageUrl, setModalImageUrl] = useState('');

  const { state } = useLocation();
  console.log(state)
  const history = useNavigate();

  useEffect(() => {
    if (state && state.product) {
      const {
        item_name,
        item_description,
        item_image,
        price,
        address,
        is_bid,
        sub_category,
        sub_category_id,
        propertyValues = {}
      } = state.product;
  
      setProductName(item_name || '');
      setDescription(item_description || '');
      setImages(item_image || []);
      setPrice(price || '');
      setAddress(address || null);
      setAcceptOffers(is_bid || 0);
      setSelectedCategory(sub_category?.category_id || '');
      setSelectedSubCategories(sub_category_id || '');
      setSelectedSubCategoryId(sub_category_id || '');
      setSelectedPropertyValues(propertyValues);

      loadCategories();
      handleCategoryChange(sub_category?.category_id);
      console.log(selectedSubCategories)
    }
  }, [state]);

  const handleImageUpload = (files) => {
    setImages((prevImages) => [...prevImages, ...files].slice(0, 10));
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getFilenameFromUrl = (url) => {
    // Use split to get the last part of the URL after the last '/'
    const parts = url.split('/');
    return parts.pop(); // pop removes and returns the last element
  }

  const handleBidChange = (event) => {
    const { checked } = event.target;
    setAcceptOffers(checked ? 1 : 0);
  };

  const handleCategoryChange = async (categoryId) => {
    try {
      const response = await api.get(`api/global/sub-category?category_id=${categoryId}`);
      if (response.status === 200) {
        setSubCategories(response.data.data);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryChange = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategories(subCategory);
    setSelectedSubCategoryId(subCategory.id);
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

  const handleCheckboxChange = (propertyId, valueId) => (event) => {
    const { checked } = event.target;
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
      return updatedValues;
    });
  };

  const handleAddressData = (addressData) => {
    setAddress(JSON.stringify(addressData));
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
    setSelectedPropertyValues({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (priceError) return;

    const formData = new FormData();
    formData.append('item_name', productName);
    formData.append('item_description', description);
    formData.append('address', address);
    formData.append('price', price);
    formData.append('is_bid', acceptOffers);
    formData.append('sub_category_id', selectedSubCategoryId);

    let index = 0;
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

      if (res.status === 200) {
        const successMessage = res.data.message;

        Swal.fire({
          title: successMessage,
          text: 'Your item has been updated.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          history("/shop");
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
      });
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
          Edit your reloved item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small" disabled>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory || ""}
                  onChange={handleCategoryChange}
                  label="Select Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id || ""}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small" disabled>
                  <InputLabel>Select Subcategory</InputLabel>
                  <Select
                    value={selectedSubCategories || ""}
                    onChange={handleSubCategoryChange}
                    label="Select Subcategory"
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory.id} value={subCategory.id || ""}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
                      control={<Checkbox checked={acceptOffers === 1} onChange={handleBidChange} />}
                      label="Accept offers"
                    />
                  </FormGroup>
                </Grid>
                {selectedSubCategories.sub_category_property &&
                  selectedSubCategories.sub_category_property.map((property) => (
                    <Grid item xs={12} key={property.id}>
                      <Typography variant="h6" gutterBottom>
                        {property.name}
                      </Typography>
                      <FormGroup>
                        {property.values.map((value) => (
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
                            label={value.value}
                          />
                        ))}
                      </FormGroup>
                    </Grid>
                  ))}
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
                      <Grid item xs={10}>
                        <Typography
                          noWrap
                          variant="body1"
                          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => handleImageClick(image.image_url)}
                        >
                          {getFilenameFromUrl(image.image_url)}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => handleRemoveImage(index)} size="small" color="primary">
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <CustomMap onAddressChange={handleAddressData} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Save
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Container>

    <ImageViewModal
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      modalImageUrl={modalImageUrl}
    />
    </ThemeProvider>
  );
};

export default EditProduct;

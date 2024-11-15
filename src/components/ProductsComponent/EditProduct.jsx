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
  const [selectedSubCategoriesId, setSelectedSubCategoriesId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [selectedPropertyValues, setSelectedPropertyValues] = useState({});
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [modalImageUrl, setModalImageUrl] = useState('');

  const { state } = useLocation();

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
        propertyValues = {},
        uuid
      } = state.product;

      setProductName(item_name || '');
      setDescription(item_description || '');
      setImages(item_image || []);
      setPrice(price || '');
      setAddress(JSON.parse(address) || null);
      setAcceptOffers(is_bid || 0);
      setSelectedCategory(sub_category?.category_id || '');
      setSelectedSubCategoriesId(sub_category_id || '');
      setSelectedSubCategoryId(sub_category_id || '');

      loadCategories();
      loadSubCategory(sub_category_id);
      loadProductDetail(uuid)
      handleCategoryChange(sub_category?.category_id, sub_category_id);
      handleAddressData(JSON.parse(address))
    }
  }, [state]);


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCategoryChange = async (categoryId, subCategoryId) => {
    try {
      const response = await api.get(`api/global/sub-category?category_id=${categoryId}`);

      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadSubCategory = async (subCategoryId) => {
    try {
      const response = await api.get(`api/global/sub-category/properties?sub_category_id=${subCategoryId}`);

      if (response.status === 200) {
        setSelectedSubCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadProductDetail = useCallback(async (productUuid) => {
    try {
        let query = `api/global/items/${productUuid}`;
        const res = await api.get(query);
        if (res.status === 200) {
            // console.log(res.data)
            setSelectedPropertyValues(res.data.item_property_details);
        }
    } catch (error) {
        console.log(error);
    }
  }, []);

  const handleAddressData = async (addressDataFromProduct) => {
    setAddress(addressDataFromProduct)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (priceError) return;

    const formData = new FormData();
    formData.append('item_name', productName);
    formData.append('item_description', description);
    formData.append('address', address);

    images.forEach((image, index) => {
      formData.append(`imgs[${index}]`, image);
    });

    try {
      const res = await api.put(`/api/auth/items/${uuid}`, formData, {
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
          confirmButtonColor: ModTheme.palette.primary.main,
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
        confirmButtonColor: ModTheme.palette.primary.main,
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
                  <Divider sx={{ my: 2 }} />
                  <CustomMap
                    addressData={handleAddressData}
                    mapDataValue={address}
                    Editing={true}
                  />
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

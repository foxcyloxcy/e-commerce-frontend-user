import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  ThemeProvider,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomMap from './CustomMapComponent/CustomMap';
import FileInput from './FileInput'; // Import your custom FileInput component
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import ImageViewModal from '../ReusableComponents/ModalComponent/ImageViewModal';

const EditProduct = ({ userToken }) => {
  const [currentProductName, setCurrentProductName] = useState('');
  const [editedProductName, setEditedProductName] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  const [currentPrice, setCurrentPrice] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [currentAddress, setCurrentAddress] = useState(null);
  const [editedAddress, setEditedAddress] = useState(null);
  const [acceptOffers, setAcceptOffers] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [selectedPropertyValues, setSelectedPropertyValues] = useState({});
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [modalImageUrl, setModalImageUrl] = useState('');

  const { state } = useLocation();
  const navigate = useNavigate();

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
        uuid,
      } = state.product;

      // Set current (existing) values
      setCurrentProductName(item_name || '');
      setEditedProductName(item_name || ''); // Initialize edited with current
      setCurrentDescription(item_description || '');
      setEditedDescription(item_description || '');
      setCurrentImages(item_image || []);
      setEditedImages(item_image || []);
      setCurrentPrice(price || '');
      setEditedPrice(price || '');
      setCurrentAddress(JSON.parse(address) || null);
      setEditedAddress(JSON.parse(address) || null);
      setAcceptOffers(is_bid || 0);
      setSelectedCategory(sub_category?.category_id || '');
      setSelectedSubCategoryId(sub_category_id || '');

      loadCategories();
      loadSubCategory(sub_category_id);
      loadProductDetail(uuid);
    }
  }, [state]);

  const loadCategories = useCallback(async () => {
    try {
      const res = await api.get('api/global/category');
      if (res.status === 200) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadSubCategory = async (subCategoryId) => {
    try {
      const response = await api.get(`api/global/sub-category/properties?sub_category_id=${subCategoryId}`);
      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadProductDetail = useCallback(async (productUuid) => {
    try {
      const res = await api.get(`api/global/items/${productUuid}`);
      if (res.status === 200) {
        setSelectedPropertyValues(res.data.item_property_details);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('item_name', editedProductName);
    formData.append('item_description', editedDescription);
    formData.append('address', JSON.stringify(editedAddress));


    try {
      const res = await api.put(`/api/auth/items/${state.product.uuid}`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Your item has been updated.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: ModTheme.palette.primary.main,
        }).then(() => {
          navigate('/shop');
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonColor: ModTheme.palette.primary.main,
      });
    }
  };

  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{ padding: 3, marginTop: 10, marginBottom: 5, maxWidth: '60%' }}>
        <Typography variant="h4" gutterBottom>Edit your reloved item</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                fullWidth
                value={editedProductName}
                onChange={(e) => setEditedProductName(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />


            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <CustomMap
                addressData={setEditedAddress}
                mapDataValue={editedAddress}
                Editing={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default EditProduct;

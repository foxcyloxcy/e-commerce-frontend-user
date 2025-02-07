import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, CardMedia, IconButton, CardActions, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';
import api from '../../../assets/baseURL/api';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const TruncatedText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const StatusBadge = styled(Box)(({ theme, status }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    backgroundColor: status === 1 ? '#255773' : '#606060',
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: 'bold',
}));

const DashedCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: { sm: '400px', md: '500px' },
    background: '#fff',
    border: `2px dashed ${theme.palette.primary.main}`,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}));

const MyProducts = (props) => {
    const { userToken, fromParentUserData } = props;
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();
    const userData = JSON.parse(fromParentUserData);

    const loadProducts = useCallback(async (page) => {
        try {
            const res = await api.get(`/api/auth/me/items?status=0,1,2,3,4&page=${page}&size=${itemsPerPage - (page === 1 ? 1 : 0)}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (res.status === 200) {
                let fetchedProducts = res.data.data.data;

                if (page === 1) {
                    // fetchedProducts = [{ isAddItemCard: true }, ...fetchedProducts];
                    fetchedProducts = [...fetchedProducts];
                }

                setProductsData(fetchedProducts);
                setTotalPages(res.data.data.last_page);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userToken, itemsPerPage]);

    useEffect(() => {
        loadProducts(currentPage);
    }, [loadProducts, currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleDetailsClick = (productUuid) => {
        navigate('/my-product-details', { state: { productUuid } });
    };

    const handleMamoFeatureItem = async (uuid) => {

        try {
            const res = await api.post(`/api/auth/payment/mamopay/checkout/featured-product/${uuid}`, {
                discount: ""
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const mamopayUrl = res.data.data.payment_url
                window.location.href = mamopayUrl
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleEditClick = (product) => {
        navigate('/edit-product', { state: { product } });
    };

    const handleDeleteClick = (productUuid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: ModTheme.palette.primary.main,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Implement delete functionality here
                try {
                    const res = await api.delete(`api/auth/items/${productUuid}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.status === 200) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: res.data.data.message,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: ModTheme.palette.primary.main,
                            confirmButtonText: 'Ok'
                        }).then((deleteResult) => {
                            if (deleteResult.isConfirmed) {
                                loadProducts();
                            }
                        })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    if (!productsData || productsData.length <= 0) {
        return (
        <Grid container spacing={2}>
            <Grid item>
            <Typography>
                No posted items.
            </Typography>
            </Grid>
        </Grid>
        );
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {productsData.map((product, index) => (
                    // product.isAddItemCard ? (
                    //     <Grid item xs={12} sm={12} md={6} lg={4} key={`add-item`} style={{ display: 'flex' }}>
                    //         <DashedCard onClick={handleAddProductClick} sx={{ background: ModTheme.palette.secondary.dark }}>
                    //             <AddCircleOutlineIcon sx={{ fontSize: 50, color: ModTheme.palette.primary.main }} />
                    //             <Typography variant="body1">
                    //                 Add item
                    //             </Typography>
                    //         </DashedCard>
                    //     </Grid>
                    // ) : (
                        <Grid item xs={12} sm={12} md={4} lg={4} key={product.id} style={{ display: 'flex' }}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#fff', position: 'relative', height: '500px' }}>
                                <StatusBadge status={product.status}>
                                    {product.status === 0 ? 'Pending' :
                                        product.status === 1 ? 'Approved' :
                                            product.status === 2 ? 'Rejected' :
                                                product.status === 3 ? 'Sold' :
                                                    product.status === 4 ? 'Bid accepted' : 'Archived'}
                                </StatusBadge>

                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.default_image ? product.default_image.image_url : 'no image available.'}
                                    alt={product.item_name}
                                    sx={{ objectFit: 'cover' }}
                                />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <TruncatedText variant="h6">{product.item_name}</TruncatedText>
                                    <TruncatedText variant="body2">{product.item_description}</TruncatedText>
                                    <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                        AED {product.price}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: ModTheme.palette.primary.light }}>
                                        {product.is_bid ? 'You are accepting offers' : ''}
                                    </Typography>
                                </CardContent>

                                <CardContent sx={{ position: 'absolute', width: '100%', top: '70%' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton 
                                            color="primary" 
                                            onClick={() => handleEditClick(product)} 
                                            disabled={product.status !== 1 && product.status !== 0}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDeleteClick(product.uuid)}
                                            disabled={product.status !== 1 && product.status !== 0}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleMamoFeatureItem(product.uuid)}
                                        disabled={product.status !== 1 && product.status !== 0}
                                    >
                                        Feature Item
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleDetailsClick(product.uuid)}
                                        sx={{ marginTop: 1 }}
                                    >
                                        Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default MyProducts;

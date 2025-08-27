import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
    Container, Grid, Typography, Paper, Divider, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Checkbox, Link, CircularProgress, Button, Card, CardMedia, Stack

} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';  // Make sure you have SweetAlert2 installed
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ReusableComponents/ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import api from '../../assets/baseURL/api';
import secureLocalStorage from 'react-secure-storage';
import secure from '../../assets/baseURL/secure';
import MapViewModal from '../ReusableComponents/ModalComponent/MapViewModal';
import PriceBreakdownModal from '../ReusableComponents/ModalComponent/PriceBreakDownModal';


const ProductDetails = () => {
    const { productUuid } = useParams();
    const [productsData, setProductsData] = useState(null);
    const [offerPrice, setOfferPrice] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [discountBreakDown, setDiscountBreakDown] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state for offers
    const [parsedUserData, setParsedUserData] = useState(null)
    const [userToken, setUserToken] = useState(null)
    // const [confirmCollection, setConfirmCollection] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [agreeRefund, setAgreeRefund] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [openMap, setOpenMap] = useState(false);
    const [openPriceBreakdownModal, setOpenPriceBreakdownModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const storageKey = secure.storageKey;
    const storagePrefix = secure.storagePrefix;
    const [comment, setComment] = useState('');  // New state for comment
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState("");

    const loadProducts = useCallback(async (storedUserToken) => {

        try {

            let dynamicApi;
            if (storedUserToken) {

                dynamicApi = 'auth'

            } else {

                dynamicApi = 'global'

            }

            let query = `api/${dynamicApi}/items/${productUuid}`;

            if (storedUserToken) {
                const res = await api.get(query, {
                    headers: {
                        Authorization: `Bearer ${storedUserToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setProductsData(res.data);
                    setSelectedImage(res.data.item_details.images[0].image_url)
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            } else {
                const res = await api.get(query);

                if (res.status === 200) {
                    setProductsData(res.data);
                    setSelectedImage(res.data.item_details.images[0].image_url)
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [productUuid]);

    useEffect(() => {

        const storedIsLoggedIn = secureLocalStorage.getItem(`${storagePrefix}_isLoggedIn`, {
            hash: storageKey,
        });
        const storedUserData = secureLocalStorage.getItem(`${storagePrefix}_userData`, {
            hash: storageKey,
        });
        const storedUserToken = secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
            hash: storageKey,
        });

        if (storedIsLoggedIn) {
            setIsLoggedIn(storedIsLoggedIn);
        } else {
            setIsLoggedIn(null);
        }

        if (storedUserData) {
            const objectUserData = JSON.parse(storedUserData)
            setParsedUserData(objectUserData);
        } else {
            setParsedUserData(null);
        }

        if (storedUserToken) {
            setUserToken(storedUserToken);
        } else {
            setUserToken(null);
        }

        loadProducts(storedUserToken);
    }, [loadProducts]);

    useEffect(() => {
        const productDetailsPrompt = localStorage.getItem(`product_details_prompt`);

        if (productDetailsPrompt || productDetailsPrompt !== null) {
            if (productDetailsPrompt === "Yes") {
                Swal.fire({
                    text: "You may explore additional details and ask any questions about the item below. After completing your purchase, the chat button will become available, allowing you to coordinate collection.",
                    icon: 'info',
                    confirmButtonColor: ModTheme.palette.primary.main,
                    confirmButtonText: 'OK, I got it.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem(`product_details_prompt`, 'No');
                    }
                });
            }
        }

    }, [])

    const handleMamoCheckout = async (uuid) => {

        // if (!confirmCollection) {
        //     Swal.fire('Error', 'You need to confirm collecting the item', 'error');
        //     return;
        // }

        if (!agreeRefund) {
            Swal.fire('Error', 'You need to agree to all terms and conditions', 'error');
            return;
        }

        if (!isLoggedIn) {
            setLoading(true);
            try {
                const res = await api.post(
                    `/api/global/payment/mamopay/checkout/${uuid}`,
                    { discount: discountCode },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (res.status === 200) {
                    const mamopayUrl = res.data.data.payment_url;
                    window.location.href = mamopayUrl;
                }
            } catch (error) {
                console.error("Error:", error);

                let errorCode = 'Unknown';

                if (error.response) {
                    // The request was made and the server responded with a status code
                    errorCode = error.response.status; // e.g., 400, 401, 500
                } else if (error.request) {
                    // The request was made but no response was received
                    errorCode = 'No response from server';
                } else if (error.code) {
                    // Some network or client-side error
                    errorCode = error.code; // e.g., ECONNABORTED, ENOTFOUND
                }

                Swal.fire({
                    title: 'Payment Error',
                    text: `An error occurred while processing your payment. Error code: ${errorCode}`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: ModTheme.palette.primary.main,
                });
            } finally {
                setLoading(false);
            }
        } else {

            try {
                setLoading(true);
                const res = await api.post(
                    `/api/auth/payment/mamopay/checkout/${uuid}`,
                    { discount: discountCode }, // discount_code field
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (res.status === 200) {
                    const mamopayUrl = res.data.data.payment_url;
                    window.location.href = mamopayUrl;
                }
            } catch (error) {
                console.error("Error:", error);

                let errorCode = 'Unknown';

                if (error.response) {
                    // The request was made and the server responded with a status code
                    errorCode = error.response.status; // e.g., 400, 401, 500
                } else if (error.request) {
                    // The request was made but no response was received
                    errorCode = 'No response from server';
                } else if (error.code) {
                    // Some network or client-side error
                    errorCode = error.code; // e.g., ECONNABORTED, ENOTFOUND
                }

                Swal.fire({
                    title: 'Payment Error',
                    text: `An error occurred while processing your payment. Error code: ${errorCode}`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: ModTheme.palette.primary.main,
                });
            } finally {
                setLoading(false);
            }
        }
    };


    const handleApplyDiscountCode = async (itemId) => {

        if (!isLoggedIn) {
            Swal.fire({
                title: 'Oops!',
                text: 'You need to login first before you can apply discount.',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: "Ok, I'll login.",
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        setLoading(true);
        const discountData = new FormData();
        discountData.append('discount', discountCode);
        discountData.append('item_id', itemId);

        try {
            const res = await api.post("/api/auth/discount/validate", discountData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200 && res.data.total_discount_breakdown) {

                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: ModTheme.palette.primary.main,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setDiscountBreakDown(res.data); // Ensure the correct path here
                    }
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Oops!', error.response.data.message, 'error');
        } finally {
            setLoading(false);
        }

    }

    const handleOffers = async (productData) => {

        if (!isLoggedIn) {
            Swal.fire({
                title: 'Oops!',
                text: 'You need to login first before you can make an offer to an item.',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        if (offerPrice < 50) {
            Swal.fire('Error', 'Item value must be over AED 50', 'error');
            return;
        }

        if (offerPrice > 50000) {
            Swal.fire('Error', 'Item value must be under AED 50,000', 'error');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('item_id', productData.item_details.id);
        formData.append('seller_id', productData.item_details.user.id);
        formData.append('buyer_id', parsedUserData.id);
        formData.append('remarks', 'sample remarks');
        formData.append('asking_price', offerPrice);

        try {
            const res = await api.post("/api/auth/item-bid", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Continue shopping',
                    confirmButtonColor: ModTheme.palette.primary.main,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/shop");
                    }
                });
            }
        } catch (error) {
            Swal.fire('Error!', error.toString(), 'error');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleOpenMap = (address) => {
        setSelectedAddress(address);
        setOpenMap(true);
    };

    const handleCloseMap = () => {
        setOpenMap(false);
        setSelectedAddress(null);
    };

    const parseAddress = (address) => {
        const objectAddress = JSON.parse(address)
        // console.log(objectAddress)
        let addressName = ""

        if (objectAddress[1]) {
            addressName = objectAddress[1].name
        }
        return addressName.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleOpenPriceBreakdown = (product) => {

        setSelectedProduct(product);
        setOpenPriceBreakdownModal(true);
    };

    const handleClosePriceBreakdown = () => {
        setOpenPriceBreakdownModal(false);
        setSelectedProduct(null);
    }

    const handleCommentSubmit = async () => {
        if (!parsedUserData && !isLoggedIn) {
            Swal.fire({
                title: 'Oops!',
                text: 'You need to login first before you can ask/answer questions.',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: "Ok, I'll login.",
                confirmButtonColor: ModTheme.palette.primary.main,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }


        if (!comment) {
            Swal.fire('Error', 'Please enter a comment', 'error');
            Swal.fire({
                title: 'Oops!',
                text: 'Please enter a comment',
                icon: 'error',
                confirmButtonText: "Ok",
                confirmButtonColor: ModTheme.palette.primary.main,
            })
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('item_id', productsData.item_details.id);
        formData.append('owner_id', productsData.item_details.user.id);
        formData.append('user_id', parsedUserData.id);
        formData.append('comments', comment);

        try {
            const res = await api.post("/api/auth/item-comment", formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {

                setComment('');  // Clear the input field after submission
                loadProducts()
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to submit comment', 'error');
        } finally {
            setLoading(false);
        }
    };

    const dateParser = (dateInput) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const date = new Date(dateInput);

        // Extract values
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0'); // Ensures 2-digit day
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0'); // Ensures 2-digit hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensures 2-digit minutes

        // Format date as "Oct-dd-yyyy hh:mm"
        return `${month}-${day}-${year} ${hours}:${minutes}`;
    };

    // Handle rendering after data is loaded
    if (!productsData || !productsData.item_details) {
        return <Container sx={{
            padding: 2,
            mt: 15,
            mb: 10,
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography>Loading item details...</Typography>
            <CircularProgress size={54} />
        </Container>
    }

    return (
        <ThemeProvider theme={ModTheme}>
            <Container
                sx={{
                    mt: 8,
                    mb: 10,
                }}
            >
                <Grid container>
                    <Button
                        variant="text"
                        color="primary"
                        disabled={loading}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />Go back
                    </Button>
                </Grid>
                <Box sx={{ p: 0, maxWidth: '1400px' }}>
                    <Grid container spacing={4}>
                        {/* Image Section */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={0}>
                                <CardMedia
                                    component="img"
                                    image={selectedImage}
                                    alt="Main product"
                                    sx={{
                                        borderRadius: 2,
                                        minHeight: { xs: 300, md: 450 },
                                        maxHeight: { xs: 300, md: 450 },
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                                <Stack direction="row" spacing={1} mt={2} sx={{ overflowX: 'auto' }}>
                                    {productsData?.item_details.images?.map((photo, idx) => (
                                        <img
                                            key={idx}
                                            src={photo.image_url}
                                            width="60"
                                            height="60"
                                            alt={`thumb-${idx}`}
                                            style={{
                                                borderRadius: 4,
                                                border: selectedImage === photo.image_url ? '2px solid #1a2d5a' : '2px solid transparent',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => setSelectedImage(photo.image_url)}
                                        />
                                    ))}
                                </Stack>
                            </Card>
                        </Grid>

                        {/* Details Section */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" sx={{ color: ModTheme.palette.primary.main, fontWeight: 'bold' }}>
                                {productsData?.item_details.item_name || 'Product Name'}
                            </Typography>

                            <Grid container spacing={1} mt={0.5}>
                                {productsData?.item_property_details?.map((propertyGroup, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Typography variant="body2" fontWeight="bold">
                                            {propertyGroup.properties}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {propertyGroup.values?.map((val) => val.name).join(', ') || 'N/A'}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box
                                mt={0.5}
                                sx={{
                                    maxWidth: '30%',
                                }}>
                                {/* Price and Discount */}
                                {discountBreakDown && discountBreakDown.total_discount_breakdown.total ? (
                                    <>
                                        <Typography component="div" color="primary" sx={{ textDecoration: 'line-through' }}>
                                            AED {formatPrice(productsData.item_details.total_fee_breakdown.total)}
                                        </Typography>
                                        <Typography
                                            component="div"
                                            color="primary"
                                            onClick={() => handleOpenPriceBreakdown(discountBreakDown)}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            AED {formatPrice(discountBreakDown.total_discount_breakdown.total)}
                                        </Typography>
                                    </>
                                ) : (
                                    // Only render this block if discountBreakDown is not true
                                    productsData.item_details.my_offer === null || productsData.item_details.my_offer === "" ? (
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            onClick={() => handleOpenPriceBreakdown(productsData.item_details)}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            AED {formatPrice(productsData.item_details.total_fee_breakdown.total)}
                                        </Typography>
                                    ) : (
                                        <>
                                            <Typography component="div" color="primary" sx={{ textDecoration: 'line-through' }}>
                                                AED {formatPrice(productsData.item_details.total_fee_breakdown.total)}
                                            </Typography>
                                            <Typography
                                                component="div"
                                                color="primary"
                                                onClick={() => handleOpenPriceBreakdown(productsData.item_details.my_offer)}
                                                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                            >
                                                AED {formatPrice(productsData.item_details.my_offer.total_fee_breakdown.total)}
                                            </Typography>
                                        </>
                                    )
                                )}
                            </Box>

                            {/* Address */}
                            {productsData?.item_details?.address && (
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 0, cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => handleOpenMap(productsData?.item_details?.address)}
                                >
                                    Collection: {parseAddress(productsData?.item_details?.address)}
                                </Typography>
                            )}

                            {/* Terms Agreement */}
                            <Box mt={1}>
                                <FormControlLabel
                                    control={<Checkbox checked={agreeRefund} onChange={(e) => setAgreeRefund(e.target.checked)} />}
                                    label={
                                        <Typography variant="body2">
                                            I agree to all{' '}
                                            <Link href="/terms-and-conditions" target="_blank">terms and conditions</Link>{' '}
                                            and it is the buyer's responsibility to arrange collection of the item.
                                        </Typography>
                                    }
                                />
                            </Box>

                            {/* Offer Field if bidding */}
                            {productsData?.item_details?.is_bid === 1 && !productsData?.item_details?.my_offer && (
                                <Grid container spacing={1} mt={0.5}>
                                    <Grid item xs={12} sm={7}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="ENTER OFFER"
                                            variant="outlined"
                                            value={offerPrice}
                                            onChange={(e) => setOfferPrice(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            disabled={loading || !offerPrice}
                                            onClick={() => handleOffers(productsData)}
                                            sx={{ backgroundColor: ModTheme.palette.primary.main }}
                                        >
                                            Offer
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}

                            {/* Discount Code Input */}
                                <Grid container spacing={1} mt={0.5}>
                                    <Grid item xs={12} sm={7}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="ENTER DISCOUNT CODE"
                                            variant="outlined"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            disabled={loading || !discountCode}
                                            onClick={() => handleApplyDiscountCode(productsData.item_details.id)}
                                            sx={{ backgroundColor: ModTheme.palette.primary.main }}
                                        >
                                            Apply Discount
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                            {/* Add to Cart (or Confirm) */}
                            <Button
                                variant="contained"
                                disabled={!agreeRefund}
                                sx={{
                                    backgroundColor: ModTheme.palette.primary.main,
                                    mt: 1,
                                    width: '100%',
                                }}
                                onClick={() => handleMamoCheckout(productsData.item_details.uuid)}
                            >
                                Buy Item
                            </Button>

                            {/* Chat Info */}
                            <Typography variant="body2" color="text.secondary" mt={2}>
                                The chat function will become available after you purchase your item. You can ask questions in the Q&A below.
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Description */}
                    <Box mt={2}>
                        <Typography variant="h6" sx={{ color: ModTheme.palette.primary.main }} gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {productsData?.item_details?.item_description || 'No description available.'}
                        </Typography>
                    </Box>
                </Box>

                {/* New Comments Section */}
                <Paper sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Item questions and answers
                    </Typography>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                        {productsData.item_comments && productsData.item_comments.length > 0 ? (
                            productsData.item_comments.map((comment, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    {
                                        parsedUserData ? (
                                            <Typography variant="body1" fontWeight="bold">
                                                {
                                                    parsedUserData.id === comment.user.id ? 'You' : comment.user.id === productsData.item_details.user.id ? 'Item Owner' : comment.user.vendor.name}
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" fontWeight="bold">
                                                {comment.user.id === productsData.item_details.user.id ? 'Item Owner' : comment.user.vendor.name}
                                            </Typography>
                                        )

                                    }
                                    <Typography variant="body1">
                                        {comment.comments}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {dateParser(comment.created_at)}
                                    </Typography>
                                    <Divider sx={{ mt: 1 }} />
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No question available.
                            </Typography>
                        )}
                        {
                            parsedUserData ? (
                                <>
                                    <TextField
                                        label={parsedUserData.id === productsData.item_details.user.id ? 'Add an answer' : 'Add a question'}
                                        multiline
                                        rows={4}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 2 }}
                                    />
                                    <ButtonComponent
                                        label={parsedUserData.id === productsData.item_details.user.id ? 'Submit answer' : 'Submit question'}
                                        size="small"
                                        buttonVariant="contained"
                                        textColor="primary.contrastText"
                                        hoverTextColor="secondary.main"
                                        sx={{ mt: 1 }}
                                        onClick={handleCommentSubmit}
                                    />
                                </>
                            )
                                :
                                (
                                    <>
                                        <TextField
                                            label='Add a question'
                                            multiline
                                            rows={4}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mt: 2 }}
                                        />
                                        <ButtonComponent
                                            label='Submit question'
                                            size="small"
                                            buttonVariant="contained"
                                            textColor="primary.contrastText"
                                            hoverTextColor="secondary.main"
                                            sx={{ mt: 1 }}
                                            onClick={handleCommentSubmit}
                                        />
                                    </>
                                )
                        }
                    </Box>
                </Paper>

                {selectedProduct && (
                    <PriceBreakdownModal
                        open={openPriceBreakdownModal}
                        onClose={handleClosePriceBreakdown}
                        product={selectedProduct}
                    />
                )}
                {selectedAddress && (
                    <MapViewModal
                        open={openMap}
                        onClose={handleCloseMap}
                        address={selectedAddress}
                    />
                )}
            </Container>
        </ThemeProvider>
    );
};

export default ProductDetails;

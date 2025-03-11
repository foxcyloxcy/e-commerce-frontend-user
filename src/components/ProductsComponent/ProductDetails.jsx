import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, Paper, Divider, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Checkbox, Link, CircularProgress, Button } from '@mui/material';
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
    const [confirmCollection, setConfirmCollection] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [agreeRefund, setAgreeRefund] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [openMap, setOpenMap] = useState(false);
    const [openPriceBreakdownModal, setOpenPriceBreakdownModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const storageKey = secure.storageKey;
    const storagePrefix = secure.storagePrefix;
    const [comment, setComment] = useState('');  // New state for comment
    const navigate = useNavigate();

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

                    setProductsData(res.data);
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            } else {
                const res = await api.get(query);

                if (res.status === 200) {

                    setProductsData(res.data);
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

    useEffect(()=>{
        const productDetailsPrompt = localStorage.getItem(`product_details_prompt`);

        if(productDetailsPrompt || productDetailsPrompt !== null){
            if(productDetailsPrompt === "Yes"){
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

    },[])

    const handleMamoCheckout = async (uuid) => {
        if (!isLoggedIn) {
            Swal.fire({
                title: 'Oops!',
                text: 'You need to login first before you can buy an item.',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: "Ok, I'll login.",
                confirmButtonColor: ModTheme.palette.primary.main,
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        if (!confirmCollection) {
            Swal.fire('Error', 'You need to confirm collecting the item', 'error');
            return;
        }

        if (!agreeRefund) {
            Swal.fire('Error', 'You need to agree to the refund policy', 'error');
            return;
        }

        setLoading(true);
        try {
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

            Swal.fire({
                title: 'Payment Error',
                text: 'An error occurred while processing your payment. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: ModTheme.palette.primary.main,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleApplyDiscountCode = async (itemId) => {

        if (!isLoggedIn) {
            Swal.fire({
                title: 'Oops!',
                text: 'You need to login first before you can buy an item.',
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
            backgroundColor: 'secondary.background',
            padding: 2,
            mt: 15,
            mb: 10,
            boxShadow: 10,
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
                    backgroundColor: 'secondary.background',
                    padding: 2,
                    mt: 15,
                    mb: 10,
                    boxShadow: 10,
                    maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
                }}
            >
            <Grid container xs={12}>
              <Button
                variant="text"
                color="primary"
                disabled={loading}
                sx={{
                    mb: 1
                }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />Go back
              </Button>
                </Grid>
                <Grid container spacing={4} sx={{
                    pt:0
                }}>
                    <Grid item xs={12} md={6}
                    >
                        <Carousel showArrows={false} infiniteLoop={true} autoPlay>
                            {productsData.item_details.images.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '400px',
                                    }}
                                >
                                    <img
                                        src={image.image_url}
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            {productsData.item_details.item_name}
                        </Typography>
                        {
                            discountBreakDown && discountBreakDown.total_discount_breakdown.total ? ( // Check for discountBreakDown and its total
                                <>
                                    <Typography component="div" color="primary" sx={{ textDecoration: 'line-through' }}>
                                        AED {formatPrice(productsData.item_details.total_fee_breakdown.total)}
                                    </Typography>
                                    <Typography
                                        component="div"
                                        color="primary"
                                        onClick={() => handleOpenPriceBreakdown(discountBreakDown)}
                                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                        AED {formatPrice(discountBreakDown.total_discount_breakdown.total)}  {/* Render the correct total after discount */}
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
                            )
                        }
                        {
                            productsData.item_details.address && (
                                <Typography
                                    variant="body1"
                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => handleOpenMap(productsData.item_details.address)}>
                                    Collection {parseAddress(productsData.item_details.address)}
                                </Typography>
                            )
                        }
                        <Typography variant="body1" color="textSecondary" paragraph>
                            {productsData.item_details.item_description}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" fontStyle='italic' paragraph>
                            The chat function will become available after you purchase your item, you can ask questions related to the item in the Q&A below.
                        </Typography>
                        <Grid container alignItems="center" spacing={2} width="100%">
                            {productsData.item_details.is_bid === 1 &&
                                (productsData.item_details.my_offer === null || productsData.item_details.my_offer === "") && (
                                    <>
                                        <Grid item width="60%">
                                            <TextField
                                                size="small"
                                                label="ENTER OFFER"
                                                variant="outlined"
                                                value={offerPrice}
                                                onChange={(e) => setOfferPrice(e.target.value)}
                                                sx={{ marginRight: 2 }}
                                            />
                                        </Grid>
                                        <Grid item width="40%">
                                            <ButtonComponent
                                                label="Offer"
                                                size="small"
                                                buttonVariant="contained"
                                                textColor="primary.contrastText"
                                                hoverTextColor="secondary.main"
                                                onClick={() => handleOffers(productsData)}
                                                disabled={loading || !offerPrice}
                                            />
                                        </Grid>
                                    </>
                                )
                            }
                            {
                                parsedUserData && (
                                    <>

                                        <Grid item width="60%"
                                            sx={{ marginTop: 0 }}>
                                            <TextField
                                                size="small"
                                                label="ENTER DISCOUNT CODE"
                                                variant="outlined"
                                                value={discountCode}
                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                sx={{ marginRight: 2, marginTop: 0 }}
                                            />
                                        </Grid>
                                        <Grid item width="40%"
                                            sx={{ marginTop: 0 }}>
                                            <ButtonComponent
                                                label="aPPLY DISCOUNT"
                                                size="small"
                                                buttonVariant="contained"
                                                textColor="primary.contrastText"
                                                hoverTextColor="secondary.main"
                                                onClick={() => handleApplyDiscountCode(productsData.item_details.id)}
                                                disabled={loading}
                                            />
                                        </Grid>
                                        <Grid item width="100%">
                                            <FormControlLabel
                                                control={<Checkbox checked={confirmCollection} onChange={(e) => setConfirmCollection(e.target.checked)} />}
                                                label="I can confirm it’s the buyer's responsibility to collect the item"
                                            />
                                        </Grid>
                                        <Grid item width="100%">
                                            <FormControlLabel
                                                control={<Checkbox checked={agreeRefund} onChange={(e) => setAgreeRefund(e.target.checked)} />}
                                                label={
                                                    <div>
                                                        <span>I agree to all </span>
                                                        <Link href={'/terms-and-conditions'} target="_blank">terms and conditions</Link>
                                                    </div>
                                                }
                                            />
                                        </Grid>
                                    </>
                                )
                            }

                            <Grid item width="100%">
                                <ButtonComponent
                                    label={loading ? "Processing..." : "Buy Item"}
                                    size="small"
                                    buttonVariant="contained"
                                    textColor="primary.contrastText"
                                    hoverTextColor="secondary.main"
                                    startIcon={!loading && <AddShoppingCartIcon />}
                                    onClick={() => handleMamoCheckout(productUuid)}
                                    disabled={loading} // Disable button while loading
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Additional Information
                    </Typography>
                    <Divider />
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {productsData.item_property_details.map((info, index) => (
                                        <TableCell key={index}>
                                            <Typography variant="body1" fontWeight="bold">
                                                {info.properties}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {productsData.item_property_details.map((info, index) => (
                                        <TableCell key={index}>
                                            {info.values.length > 0
                                                ? info.values.map((value) => (
                                                    <Typography key={value.id}>{value.name}</Typography>
                                                ))
                                                : 'Not Available'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

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

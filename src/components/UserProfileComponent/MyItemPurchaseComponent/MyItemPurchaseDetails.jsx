import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, Paper, Divider, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Checkbox } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Make sure you have SweetAlert2 installed
import ModTheme from '../../ThemeComponent/ModTheme';
import ButtonComponent from '../../ReusableComponents/ButtonComponent/ButtonComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import api from '../../../assets/baseURL/api';
import secureLocalStorage from 'react-secure-storage';
import secure from '../../../assets/baseURL/secure';
import MapViewModal from '../../ReusableComponents/ModalComponent/MapViewModal';
import PriceBreakdownModal from '../../ReusableComponents/ModalComponent/PriceBreakDownModal';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const MyItemPurchaseDetails = () => {
    const { state } = useLocation();
    const { productUuid } = state;
    const [productsData, setProductsData] = useState(null);
    const [offerPrice, setOfferPrice] = useState('');
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
    const navigate = useNavigate();

    const loadProducts = useCallback(async () => {
        try {

            let dynamicApi;
            if (userToken) {

                dynamicApi = 'auth'

            } else {

                dynamicApi = 'global'

            }

            let query = `api/${dynamicApi}/items/${productUuid}`;

            if (userToken) {
                const res = await api.get(query, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setProductsData(res.data);
                }
            } else {
                const res = await api.get(query);

                if (res.status === 200) {
                    console.log(parsedUserData)
                    console.log(res.data)
                    setProductsData(res.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [productUuid, userToken]);

    useEffect(() => {
        Swal.fire({
            text: "You may explore additional details and ask any questions about the item below. After completing your purchase, the chat button will become available, allowing you to coordinate collection.",
            icon: 'info',
            confirmButtonColor: ModTheme.palette.primary.main,
            confirmButtonText: 'OK, I got it.'
        });

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

    const handleMamoCheckout = async (uuid) => {

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

        if (!confirmCollection) {
            Swal.fire('Error', 'You need to confirm collecting the item', 'error');
            return;
        }

        if (!agreeRefund) {
            Swal.fire('Error', 'You need to agree to the refund policy', 'error');
            return;
        }

        try {
            const res = await api.post(`/api/auth/payment/mamopay/checkout/${uuid}`, "checkout", {
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


    const handleChatSeller = (userMobileNo) => {
        
        // Remove '+' and spaces from the mobile number
        const filteredMobileNo = userMobileNo.replace(/[+ ]/g, '');
    
        const userWhatsApp = `https://wa.me/${filteredMobileNo}`;
    
        window.open(userWhatsApp, '_blank');
    };

    // Handle rendering after data is loaded
    if (!productsData || !productsData.item_details) {
        return <Typography>Loading...</Typography>;
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
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
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
                            productsData.item_details.my_offer === null || productsData.item_details.my_offer === "" ? (
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    onClick={() => handleOpenPriceBreakdown(productsData.item_details)}
                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    AED {formatPrice(productsData.item_details.total_fee_breakdown.total)}
                                </Typography>
                            ) :
                                (
                                    <>
                                        <Typography component="div" color="primary" sx={{ textDecoration: 'line-through' }}>
                                            AED {formatPrice(productsData.item_details.total_fee_breakdown.total)}
                                        </Typography>
                                        <Typography component="div" color="primary">
                                            AED {formatPrice(productsData.item_details.my_offer.asking_price)}
                                        </Typography>
                                    </>
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
                        <Grid item width="30%">
                        <ButtonComponent
                            label="Chat seller"
                            size="small"
                            buttonVariant="contained"
                            textColor="primary.contrastText"
                            hoverTextColor="secondary.main"
                            startIcon={<WhatsAppIcon />}
                            onClick={() => handleChatSeller(productsData.item_details.user.mobile_number)}
                            disabled={loading || !offerPrice}
                        />
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

export default MyItemPurchaseDetails;

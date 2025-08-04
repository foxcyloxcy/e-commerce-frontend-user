import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Stack,
    Divider,
    TextField,
} from '@mui/material';
import api from '../../assets/baseURL/api';
import secureLocalStorage from 'react-secure-storage';
import secure from '../../assets/baseURL/secure';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productUuid } = useParams();
    const storagePrefix = secure.storagePrefix;
    const storageKey = secure.storageKey;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [parsedUserData, setParsedUserData] = useState(null)
    const [userToken, setUserToken] = useState(null)

    const [productsData, setProductsData] = useState(null);
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
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            } else {
                const res = await api.get(query);

                if (res.status === 200) {
                    console.log(res.data)
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

    return (
        <Box sx={{ pt: { xs: 8, }, px: { xs: 4, md: 6 }, backgroundColor: '#fff' }}>

            {/* Product Section */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card elevation={0}>
                        <CardMedia component="img" image="/images/striped-shirt.jpg" alt="Main product" />
                        <Stack direction="row" spacing={1} mt={2}>
                            <img src="/images/striped-shirt.jpg" width="60" alt="thumb" />
                            <img src="/images/folded-shirt1.jpg" width="60" alt="thumb" />
                            <img src="/images/folded-shirt2.jpg" width="60" alt="thumb" />
                        </Stack>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" sx={{ color: '#1a2d5a', fontWeight: 'bold' }}>
                        Boy’s Striped Shirt
                    </Typography>
                    <Typography mt={2}>Category</Typography>
                    <Typography variant="body2" color="text.secondary">Kidswear</Typography>
                    <Typography mt={1}>Brand</Typography>
                    <Typography mt={1}>Size</Typography>
                    <Typography variant="body2" color="text.secondary">Very good</Typography>

                    <Typography variant="h5" mt={3} sx={{ color: '#1a2d5a', fontWeight: 'bold' }}>
                        AED 75
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1a2d5a',
                            borderRadius: 2,
                            mt: 2,
                            mb: 2,
                            width: '100%',
                        }}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>

            {/* Description */}
            <Box mt={1}>
                <Typography variant="h6" sx={{ color: '#1a2d5a', fontWeight: 'bold' }} gutterBottom>
                    Product Description
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                    <li>Light blue and white striped short-sleeve shirt</li>
                    <li>Fits 4–5 years</li>
                </ul>
            </Box>
        </Box>
    );
};

export default ProductDetailsPage;
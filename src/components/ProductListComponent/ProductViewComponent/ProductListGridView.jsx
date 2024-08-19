import React, { useState } from 'react';
import {
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
    Card,
    CardContent,
    Button,
    CardMedia,
    Avatar,
    Box,
    Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModTheme from '../../ThemeComponent/ModTheme';
import { styled } from '@mui/system';

const ProductListGridView = ({ productsData, handleProductView }) => {
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Number of products per page

    // Handle pagination change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleDetailsClick = (product) => {
        navigate('/product-details', { state: { product } });
    };

    const TruncatedText = styled(Typography)({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Get current products based on pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <Grid item xs={12} md={8} lg={9}>
            <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                <Grid container display="flex" justifyContent="space-between" alignItems="center">
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography variant="body1">{productsData.length} Items found</Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                            <Select defaultValue="latest">
                                <MenuItem value="latest">Latest items</MenuItem>
                                <MenuItem value="cheapest">Cheapest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </header>
            <Grid container spacing={2}>
                {currentProducts.map((product) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                            <Avatar src={product.user_avatar} alt={product.user_name} />
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                {product.user_name}
                            </Typography>
                        </Box>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                background: '#fff',
                                position: 'relative',
                                height: '430px',
                            }}
                        >
                            {/* Product Image */}
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.default_image ? product.default_image.image_url : 'no image available.'}
                                alt={product.item_name}
                                sx={{ objectFit: 'cover' }}
                            />

                            {/* Card Content */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <TruncatedText variant="h6">{product.item_name}</TruncatedText>
                                <TruncatedText variant="body2">{product.item_description}</TruncatedText>
                                <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                    AED {formatPrice(product.price)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: ModTheme.palette.primary.light }}>
                                    {product.is_bid ? 'Accepting offers' : ''}
                                </Typography>
                            </CardContent>

                            {/* Details Button */}
                            <CardContent sx={{ position: 'absolute', width: '100%', top: '83%' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ marginTop: '10px' }}
                                    onClick={() => handleDetailsClick(product)}
                                >
                                    Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={Math.ceil(productsData.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Grid>
    );
};

export default ProductListGridView;

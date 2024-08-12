import React from 'react';
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
    Button
} from '@mui/material';
import { ChevronLeft, ChevronRight, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ModTheme from '../../ThemeComponent/ModTheme';

const ProductListGrid = ({ productsData, handleProductView  }) => {

    const navigate = useNavigate();

    const handleDetailsClick = (product) => {
        navigate('/product-details', { state: { product } });
    };

    return (
        <Grid item xs={12} md={8} lg={9}>
            <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                <Grid container alignItems="center">
                <Grid item xs={3} sm={3} md={4}>
                        <Typography variant="body1">{productsData.length} Items found</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                    <FormControl variant="outlined" sx={{minWidth:'100%'}}>
                            <Select defaultValue="latest">
                                <MenuItem value="latest">Latest items</MenuItem>
                                <MenuItem value="trending">Trending</MenuItem>
                                <MenuItem value="popular">Most Popular</MenuItem>
                                <MenuItem value="cheapest">Cheapest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={4} display='flex' justifyContent='center'>
                        <Tooltip title="List view">
                            <IconButton onClick={()=>{
                                handleProductView('list')
                            }}>
                                <ChevronLeft />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Grid view">
                            <IconButton onClick={()=>{
                                handleProductView('grid')
                            }}>
                                <ChevronRight />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </header>
            {productsData.map((product) => (
                <Card key={product.id} sx={{ marginBottom: '20px', background: '#fff' }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={3}>
                            <div style={{ position: 'relative' }}>
                                {product.is_new && <span className="badge badge-danger">NEW</span>}
                                <img src={product.default_image ? product.default_image.image_url : 'default_image_url'} alt="Product" style={{ width: '100%' }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography variant="h6">{product.item_name}</Typography>
                                <Typography variant="body2">
                                    {product.item_description}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardContent>
                                <Typography variant="h6">AED {product.price}</Typography>
                                <Typography variant="body2" sx={{ color: ModTheme.palette.primary.light }}>
                                    {product.is_bid ? "Accepting Offers" : ""}
                                </Typography>
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
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Grid>
    );
};

export default ProductListGrid;

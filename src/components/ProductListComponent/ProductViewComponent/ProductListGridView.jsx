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
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ModTheme from '../../ThemeComponent/ModTheme';

const ProductListGridView = ({ productsData, handleProductView }) => {
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
            <Grid container spacing={2}>
                {productsData.map((product) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background:'#fff' }}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                {product.is_new && <span className="badge badge-danger">NEW</span>}
                                <img src={product.default_image ? product.default_image.image_url : 'default_image_url'} alt="Product" style={{ width: '100%' }} />
                            </div>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{product.item_name}</Typography>
                                <Typography variant="body2">
                                    {product.item_description}
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                    AED {product.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: ModTheme.palette.primary.light }}>
                                    {product.is_bid ? "Accepting Offers" : ""}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ paddingTop: 0 }}>
                                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
                                    Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default ProductListGridView;

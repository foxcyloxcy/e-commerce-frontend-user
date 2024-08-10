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
import ModTheme from '../ThemeComponent/ModTheme';

const ProductListGridView = ({ productsData }) => {
    return (
        <Grid item xs={12} md={8} lg={9}>
            <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                <Grid container alignItems="center">
                    <Grid item xs={12} md>
                        <Typography variant="body1">{productsData.length} Items found</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" sx={{ minWidth: 150, marginRight: '10px' }}>
                            <Select defaultValue="latest">
                                <MenuItem value="latest">Latest items</MenuItem>
                                <MenuItem value="trending">Trending</MenuItem>
                                <MenuItem value="popular">Most Popular</MenuItem>
                                <MenuItem value="cheapest">Cheapest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Tooltip title="List view">
                            <IconButton>
                                <ChevronLeft />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Grid view">
                            <IconButton>
                                <ChevronRight />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </header>
            <Grid container spacing={2}>
                {productsData.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card sx={{ background: '#fff', position: 'relative' }}>
                            <div style={{ position: 'relative' }}>
                                {product.is_new && <span className="badge badge-danger">NEW</span>}
                                <img src={product.default_image ? product.default_image.image_url : 'default_image_url'} alt="Product" style={{ width: '100%' }} />
                            </div>
                            <CardContent>
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

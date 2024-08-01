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

const ProductListGrid = () => {
    return (
        <Grid item xs={12} md={8} lg={9}>
            <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                <Grid container alignItems="center">
                    <Grid item xs={12} md>
                        <Typography variant="body1">32 Items found</Typography>
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
            {[1, 2, 3, 4].map((product) => (
                <Card key={product} sx={{ marginBottom: '20px', background: '#fff', }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={3}>
                            <div style={{ position: 'relative' }}>
                                {product === 1 && <span className="badge badge-danger">NEW</span>}
                                <img src={`assets/images/items/AED ${product}.jpg`} alt="Product" style={{ width: '100%' }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography variant="h6">Great product name goes here</Typography>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                    Ut wisi enim ad minim veniam
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardContent>
                                <Typography variant="h6">AED 140</Typography>
                                <Typography variant="body2" sx={{ color: ModTheme.palette.primary.light }}>
                                    Accepting Offers
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
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

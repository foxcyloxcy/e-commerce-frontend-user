import React from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material';
import ModTheme from '../../ThemeComponent/ModTheme';

const ProductListGridView = ({ productsData }) => {
    return (
        <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={2}>
                {productsData.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#fff' }}>
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

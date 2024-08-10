import React from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material';
import ModTheme from '../../ThemeComponent/ModTheme';

const ProductListListView = ({ productsData }) => {
    return (
        <Grid item xs={12} md={8} lg={9}>
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

export default ProductListListView;

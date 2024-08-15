import React, {useState, useEffect, useCallback} from 'react';
import { Box, Grid, Paper, Avatar, Typography, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import ModTheme from '../../ThemeComponent/ModTheme';
import api from '../../../assets/baseURL/api';



const MyProducts = () => {
    const [productsData, setProductsData] = useState([]);
    const loadProducts = useCallback(async () => {
        try {
            let query = `api/global/items?`;

            const res = await api.get(query);
            if (res.status === 200) {
                setProductsData(res.data.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadProducts();



    }, [loadProducts,]);


    return(
            <Grid container spacing={2}>
                {productsData.map((product) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background:'#fff' }}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                {product.is_new && <span className="badge badge-danger">NEW</span>}
                                <img src={product.default_image ? product.default_image.image_url : 'no image available.'} alt={product.item_name} style={{ width: '100%' }} />
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
                                    {product.is_bid ? "You are accepting offers" : ""}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ paddingTop: 0 }}>
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
    )
  }


export default MyProducts;
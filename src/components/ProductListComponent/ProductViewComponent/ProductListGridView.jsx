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
    Button,
    CardMedia
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate } from 'react-router-dom';
import ModTheme from '../../ThemeComponent/ModTheme';
import ViewListIcon from '@mui/icons-material/ViewList';
import { styled } from '@mui/system';


const ProductListGridView = ({ productsData, handleProductView }) => {

    const navigate = useNavigate();

    const handleDetailsClick = (product) => {
        navigate('/product-details', { state: { product } });
    };

    const TruncatedText = styled(Typography)({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

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
                                <MenuItem value="cheapest">Cheapest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} md={4} display='flex' justifyContent='center'>
                    <Tooltip title="List view">
                            <IconButton onClick={()=>{
                                handleProductView('list')
                            }}>
                                <ViewListIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Grid view">
                            <IconButton onClick={()=>{
                                handleProductView('grid')
                            }}>
                                <GridViewIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </header>
            <Grid container spacing={2}>
                {productsData.map((product) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} style={{ display: 'flex' }}>
                <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#fff', position: 'relative', height: '430px' }}>

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
                            AED {product.price}
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
        </Grid>
    );
};

export default ProductListGridView;

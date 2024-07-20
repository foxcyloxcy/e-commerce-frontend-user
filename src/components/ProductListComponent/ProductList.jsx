import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Grid,
    FormControl,
    Input,
    Checkbox,
    Slider,
    Button,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    Select,
    Tooltip,
    Divider,
    Card,
    CardContent,
    Drawer,
    useMediaQuery,
    ThemeProvider
} from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ChevronLeft, ChevronRight, Star, StarBorder, FavoriteBorder } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import ModTheme from '../ThemeComponent/ModTheme';
import { styled, alpha } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const categories = {
    Men: ['Shirts', 'Pants', 'Shoes'],
    Women: ['Dresses', 'Tops', 'Shoes'],
    Home: ['Furniture', 'Decor', 'Kitchen'],
    Pets: ['Food', 'Toys', 'Accessories'],
    'Baby & Children': ['Clothing', 'Toys', 'Furniture'],
};

const ProductList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('lg'));
    const [elevate, setElevate] = useState(false);
    const isLoggedIn = true

    const handleMenuOpen = (event, category) => {
        setAnchorEl(event.currentTarget);
        setSubCategories(categories[category]);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'secondary',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    if (isLoggedIn) {
        const trigger = useScrollTrigger({
          disableHysteresis: true,
          threshold: 10,
        });
    
        useEffect(() => {
          setElevate(trigger);
        }, [trigger]);
      }

    const drawerContent = (
        <Container sx={{ width: 300,
            paddingLeft: 0
         }}>
            <Typography variant="h6" sx={{ padding: 2 }}>Filters</Typography>

            {isSmallScreen && (
                <>
                    <Divider />
                    <Typography variant="h6" component="h3" gutterBottom sx={{ padding: 2 }}>
                        Categories
                    </Typography>
                </>
            )}
            {isSmallScreen && (
                <>
                    <Toolbar sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        background: ModTheme.palette.secondary.contrastText
                    }}>
                        {Object.keys(categories).map((category) => (
                            <Button
                                key={category}
                                color="inherit"
                                onClick={(event) => handleMenuOpen(event, category)}
                            >
                                {category}
                            </Button>
                        ))}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {subCategories.map((subCategory) => (
                                <MenuItem key={subCategory} onClick={handleMenuClose}>
                                    {subCategory}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                    <Divider sx={{ marginY: '20px' }} />
                </>
            )}

            <div style={{ padding: 16 }}>
                {!isSmallScreen && (
                    <Divider />
                )}
                <Typography variant="h6" component="h3" gutterBottom>
                    Brands
                </Typography>
                <FormGroup>
                    {['Mercedes', 'Toyota', 'Mitsubishi', 'Nissan', 'Honda'].map((brand) => (
                        <FormControlLabel
                            key={brand}
                            control={<Checkbox />}
                            label={
                                <div>
                                    {brand}
                                    <Typography component="span" variant="body2" sx={{ float: 'right' }}>
                                        {Math.floor(Math.random() * 100)}
                                    </Typography>
                                </div>
                            }
                        />
                    ))}
                </FormGroup>
                <Divider sx={{ marginY: '20px' }} />
                <Typography variant="h6" component="h3" gutterBottom>
                    Price range
                </Typography>
                <Slider defaultValue={50} />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Input placeholder="AED 50" type="number" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Input placeholder="AED 50000" type="number" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
                    Apply
                </Button>
                <Divider sx={{ marginY: '20px' }} />
                <Typography variant="h6" component="h3" gutterBottom>
                    Sizes
                </Typography>
                <FormGroup row>
                    {['XS', 'SM', 'LG', 'XXL'].map((size) => (
                        <FormControlLabel
                            key={size}
                            control={<Checkbox />}
                            label={<Button variant="outlined">{size}</Button>}
                        />
                    ))}
                </FormGroup>
                <Divider sx={{ marginY: '20px' }} />
                <Typography variant="h6" component="h3" gutterBottom>
                    More filter
                </Typography>
                <RadioGroup defaultValue="any">
                    {['Any condition', 'Brand new', 'Used items', 'Very old'].map((condition) => (
                        <FormControlLabel key={condition} value={condition.toLowerCase()} control={<Radio />} label={condition} />
                    ))}
                </RadioGroup>
            </div>
        </Container>
    );

    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{ marginTop: 16,
                        maxWidth: {xs:'sm', sm:'md', md:'lg', lg:'xl', xl:'xl'},
                        paddingLeft:0,
                        paddingRight: 0
             }}>
                <AppBar sx={{
                    position: 'fixed',
                    top: 59,
                    transform: 'translate(0, 0)',
                    backgroundColor: elevate ? ModTheme.palette.primary.dark : 'transparent',
                    transition: 'background-color 0.30s, box-shadow 0.30s',
                    boxShadow: elevate ? '4px 4px 0px 2px rgba(0, 0, 0, 0.3)' : 'none',
                    borderBottom: elevate ? 'none' : `1px #606060 solid`,
                    borderTop: elevate ? `1px #606060 solid`: 'none'
                }}>
                    <Toolbar>
                        {isSmallScreen && (
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        {!isSmallScreen && Object.keys(categories).map((category) => (
                            <Button
                                key={category}
                                color='secondary'
                                onClick={(event) => handleMenuOpen(event, category)}
                            >
                                {category}
                            </Button>
                        ))}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {subCategories.map((subCategory) => (
                                <MenuItem key={subCategory} onClick={handleMenuClose}>
                                    {subCategory}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    {drawerContent}
                </Drawer>
                <Container sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    
                }}>
                    <Grid container spacing={2}>
                        {!isSmallScreen && (
                            <Grid item xs={12} md={3} className='filter-grid'>
                                {drawerContent}
                            </Grid>
                        )}
                        <Grid item xs={12} md={9}>
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
                                                <img src={`assets/images/items/AED {product}.jpg`} alt="Product" style={{ width: '100%' }} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <CardContent>
                                                <Typography variant="h6">Great product name goes here</Typography>
                                                {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ display: 'flex' }}>
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} />
                            ))}
                            <StarBorder />
                          </div>
                          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
                            7/10
                          </Typography>
                        </div> */}
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
                                                <Button variant="outlined" fullWidth startIcon={<FavoriteBorder />} sx={{ marginTop: '10px' }}>
                                                    Add to wishlist
                                                </Button>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default ProductList;

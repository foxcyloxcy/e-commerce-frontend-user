import React, { useState, useEffect, useCallback } from 'react';
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
import api from '../../assets/baseURL/api';

const ProductList = (props) => {
    const { parentIsLoggedIn } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
    const [elevate, setElevate] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loadCategories = useCallback(async () => {
        try {
            const res = await api.get("api/global/category");
            if (res.status === 200) {
                setCategories(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await api.get(`api/global/sub-category?category_id=${categoryId}`);
            if (response.status === 200) {
                setSubCategories(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        border: '1px solid',
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.background,
        [theme.breakpoints.up('md')]: {
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
        color: theme.palette.secondary.main
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'secondary.main',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const drawerContent = (
        <Container sx={{ width: 300, paddingLeft: 0 }}>
            <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 2 }}>Filters</Typography>
            {isSmallScreen && (
                <>
                    <Divider />
                    <Typography variant="h6" component="h3" gutterBottom sx={{ padding: 2 }}>
                        Categories
                    </Typography>
                    <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', background: ModTheme.palette.secondary.contrastText }}>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <Button
                                    color="inherit"
                                    onClick={() => handleCategoryChange(category.id)}
                                >
                                    {category.name}
                                </Button>
                                {selectedCategory === category.id && subCategories.length > 0 && (
                                    <div style={{ paddingLeft: '20px' }}>
                                        {subCategories.map((subCategory) => (
                                            <Button key={subCategory.id} color="inherit">
                                                {subCategory.name}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Toolbar>
                    <Divider sx={{ marginY: '20px' }} />
                </>
            )}
            <div style={{ padding: 2 }}>
                {!isSmallScreen && <Divider />}
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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Input placeholder="AED 50" type="number" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Input placeholder="AED 50,000" type="number" />
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

    useEffect(() => {
        if (parentIsLoggedIn) {
            setIsLoggedIn(parentIsLoggedIn)
        } else {
            setIsLoggedIn(false)
        }

        if (isLoggedIn) {
            setElevate(trigger);
        } else {
            setElevate(false)
        }

        loadCategories();
    }, [trigger, loadCategories]);

    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                marginTop: 16,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
                paddingLeft: 0,
                paddingRight: 0
            }}>
                <AppBar
                    position={isLoggedIn ? 'fixed' : 'absolute'}
                    sx={{
                        top: 59,
                        transform: 'translate(0, 0)',
                        backgroundColor: elevate ? ModTheme.palette.primary.dark : 'transparent',
                        transition: 'background-color 0.30s, box-shadow 0.30s',
                        boxShadow: elevate ? '4px 4px 0px 2px rgba(0, 0, 0, 0.3)' : 'none',
                        borderBottom: elevate ? 'none' : `1px #606060 solid`,
                        borderTop: elevate ? `1px #606060 solid` : 'none'
                    }}>
                    <Toolbar>
                        {isSmallScreen && (
                            <IconButton edge="start" color="secondary.main" aria-label="menu" onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon color="secondary.main" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        {!isSmallScreen && categories.map((category) => (
                            <Button
                                key={category.id}
                                color='secondary'
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    {drawerContent}
                </Drawer>
                <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Grid container spacing={2}>
                        {!isSmallScreen && (
                            <Grid item xs={12} md={4} lg={3} className='filter-grid'>
                                {drawerContent}
                            </Grid>
                        )}
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
                                                <img src={`assets/images/items/AED {product}.jpg`} alt="Product" style={{ width: '100%' }} />
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

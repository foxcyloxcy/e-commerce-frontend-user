import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Grid,
    Button,
    Drawer,
    useMediaQuery,
    ThemeProvider,
    Popper,
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ExpandLess, ExpandMore} from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import ModTheme from '../ThemeComponent/ModTheme';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import api from '../../assets/baseURL/api';
import DrawerContent from './DrawerContent';
import ProductListListView from './ProductViewComponent/ProductListListView';
import ProductListGridView from './ProductViewComponent/ProductListGridView';
import { useLocation } from 'react-router-dom';

const ProductList = (props) => {
    const { parentIsLoggedIn } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
    const [elevate, setElevate] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [listView, setListView] = useState('list');
    const location = useLocation();
    const [priceRange, setPriceRange] = useState(['', '']);

    const handleApplyPriceRange = (minPrice, maxPrice) => {
        setPriceRange([minPrice, maxPrice]);
    };

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

    const loadProducts = useCallback(async (subCategoryId) => {
        try {
            let query = `api/global/items?`;

            if (subCategoryId) {
                query += `sub_category_id=${subCategoryId}&`;
            }

            if (priceRange[0] !== '' && priceRange[1] !== '') {
                query += `filter[min_price]=${priceRange[0]}&filter[max_price]=${priceRange[1]}`;
            }

            const res = await api.get(query);
            if (res.status === 200) {
                setProductsData(res.data.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [priceRange]);


    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    useEffect(() => {
        loadCategories();

        const subCategoryIdFromRoute = location.state?.subCategoryId;
        loadProducts(subCategoryIdFromRoute);

        if (parentIsLoggedIn === true) {
            setIsLoggedIn(parentIsLoggedIn);
        } else {
            setIsLoggedIn(false)
        }


    }, [loadCategories, loadProducts, parentIsLoggedIn]);

    useEffect(() => {

        if (isLoggedIn === true) {
            setElevate(trigger);
        } else {
            setElevate(false)
        }
    }, [parentIsLoggedIn, trigger])


    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleToggleCategory = (categoryId) => {
        setOpenCategory((prevOpenCategory) => ({
            ...prevOpenCategory,
            [categoryId]: !prevOpenCategory[categoryId],
        }));
    };

    const handleProductView = (view) => {
        setListView(view)
    };

    const handleSubCategoryClick = (subCategory) => {
        loadProducts(subCategory.id);
        setSelectedSubCategory(subCategory)
    };

    const handleMouseEnter = (categoryId, event) => {
        setHoveredCategory(categoryId);
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = (event) => {
        // Ensure that mouse leave only triggers when the mouse actually leaves the Popper
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setHoveredCategory(null);
            setAnchorEl(null);
        }
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

    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                minHeight: '60vh',
                marginTop: 18,
                marginBottom: 10,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
                zIndex: 2, // To make sure the container is above the overlay
            }}>
                <AppBar
                    position={isLoggedIn ? 'fixed' : 'absolute'}
                    sx={{
                        top: 59,
                        transform: 'translate(0, 0)',
                        backgroundColor: elevate ? ModTheme.palette.primary.dark : 'transparent',
                        transition: 'background-color 0.30s, box-shadow 0.30s',
                        boxShadow: elevate ? '4px 4px 0px 2px rgba(0, 0, 0, 0.3)' : 'none',
                        borderBottom: elevate ? 'none' : `2px #606060 solid`,
                        borderTop: elevate ? `2px #606060 solid` : 'none',
                        paddingLeft: 1,
                        paddingRight: 1,
                        zIndex: 3, // To make sure the AppBar is above the overlay
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='secondary'
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        {!isSmallScreen && categories.map((category) => (
                            <Button
                                key={category.id}
                                onMouseEnter={(event) => handleMouseEnter(category.id, event)}
                                sx={{
                                    fontSize: '0.50rem',
                                    '@media (min-width:200px)': {
                                        fontSize: '0.3rem',
                                    },
                                    '@media (min-width:300px)': {
                                        fontSize: '0.4rem',
                                    },
                                    '@media (min-width:400px)': {
                                        fontSize: '0.5rem',
                                    },
                                    '@media (min-width:600px)': {
                                        fontSize: '0.6rem',
                                    },
                                    '@media (min-width:960px)': {
                                        fontSize: '0.8rem',
                                    },
                                    '@media (min-width:1280px)': {
                                        fontSize: '1rem',
                                    },
                                }}
                            >
                                {category.name}
                                {openCategory[category.id] ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                        ))}
                    </Toolbar>
                </AppBar>
                {hoveredCategory && (
                    <Popper
                        open={Boolean(hoveredCategory)}
                        anchorEl={anchorEl}
                        placement="bottom-start"
                        disablePortal={false}
                        onMouseLeave={handleMouseLeave}
                        style={{ zIndex: 4 }} // To make sure the Popper is above the overlay
                    >
                        <Paper>
                            <List>
                                {categories.find(cat => cat.id === hoveredCategory)?.sub_category.map((subCategory) => (
                                    <ListItem button key={subCategory.id} onClick={() => handleSubCategoryClick(subCategory)}>
                                        <ListItemText primary={subCategory.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Popper>
                )}
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <DrawerContent
                        categories={categories}
                        openCategory={openCategory}
                        handleToggleCategory={handleToggleCategory}
                        isSmallScreen={isSmallScreen}
                        handleSubCategoryClick={handleSubCategoryClick}
                        onApplyPriceRange={handleApplyPriceRange}
                        subCategoryFromParent={selectedSubCategory}
                    />
                </Drawer>

                <Grid container spacing={1}>
                    {!isSmallScreen && (
                        <Grid item xs={12} md={4} lg={3} className='filter-grid'>
                            <DrawerContent
                                categories={categories}
                                openCategory={openCategory}
                                handleToggleCategory={handleToggleCategory}
                                isSmallScreen={isSmallScreen}
                                handleSubCategoryClick={handleSubCategoryClick}
                                onApplyPriceRange={handleApplyPriceRange}
                                subCategoryFromParent={selectedSubCategory}
                            />
                        </Grid>
                    )}
                    {
                        listView === 'list' ?
                            <ProductListListView productsData={productsData} handleProductView={handleProductView} />
                            :
                            <ProductListGridView productsData={productsData} handleProductView={handleProductView} />
                    }

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ProductList;

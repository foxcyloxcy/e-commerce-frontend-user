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
    Pagination,
    Typography,
    TextField
} from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import ModTheme from '../ThemeComponent/ModTheme';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import api from '../../assets/baseURL/api';
import DrawerContent from './DrawerContent';
import ProductListListView from './ProductViewComponent/ProductListListView';
import ProductListGridView from './ProductViewComponent/ProductListGridView';
import { useLocation } from 'react-router-dom';

const ProductList = (props) => {
    const { parentIsLoggedIn, userToken, userData } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [keyword, setKeyword] = useState('');
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
    const [elevate, setElevate] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [listView, setListView] = useState('list');
    const location = useLocation();
    const [priceRange, setPriceRange] = useState(['', '']);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(8);

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

    const loadProducts = useCallback(async (subCategoryId, page) => {
        if (!page) {
            page = 1;
        }

        try {
            let dynamicApi = userToken ? 'auth' : 'global';
            let query = `api/${dynamicApi}/items?page=${page}&size=${itemsPerPage}&`;

            if (subCategoryId) {
                query += `sub_category_id=${subCategoryId}&`;
            }

            if (priceRange[0] !== '' && priceRange[1] !== '') {
                query += `filter[min_price]=${priceRange[0]}&filter[max_price]=${priceRange[1]}&`;
            }

            if (keyword) {
                query += `filter[keyword]=${keyword}&`; // Added keyword to the query
            }

            const res = userToken
                ? await api.get(query, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                : await api.get(query);

            if (res.status === 200) {
                const fetchedProducts = res.data.data.data;
                setProductsData(fetchedProducts);
                setTotalPages(res.data.data.last_page);
            }
        } catch (error) {
            console.log(error);
        }
    }, [priceRange, keyword, userToken]);


    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    useEffect(() => {
        loadCategories();

        const subCategoryIdFromRoute = location.state?.subCategoryId;
        loadProducts(subCategoryIdFromRoute, currentPage);

        if (parentIsLoggedIn === true) {
            setIsLoggedIn(parentIsLoggedIn);
        } else {
            setIsLoggedIn(false)
        }


    }, [loadCategories, loadProducts, parentIsLoggedIn, currentPage]);

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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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

    const handleSearchChange = (event) => {
        setKeyword(event.target.value); // Updates the keyword on input change
    };

    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                minHeight: '60vh',
                marginTop: 18,
                marginBottom: 5,
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
                        {!isSmallScreen && categories.map((category) => (
                            <Button
                                key={category.id}
                                onMouseEnter={(event) => handleMouseEnter(category.id, event)}
                                sx={{
                                    fontSize: '1rem',
                                }}
                            >
                                {category.name}
                                {openCategory[category.id] ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                        ))}
                    </Toolbar>
                </AppBar>
                <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                    <Grid container display="flex" justifyContent="space-between" alignItems="center">
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search..."
                                value={keyword}
                                onChange={handleSearchChange} // Update keyword on typing
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{mr: 1}}/>
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={8}>
                            <Typography variant="body1" sx={{
                                display: 'flex',
                                justifyContent: {xs:'flex-end', sm:'flex-end', md:'flex-end'},
                                flexDirection: 'row'
                            }}>{productsData.length} Items found</Typography>
                        </Grid>
                        {/* <Grid item xs={4} sm={4} md={4}>
                            <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                            <Select defaultValue="latest">
                                <MenuItem value="latest">Latest items</MenuItem>
                                <MenuItem value="cheapest">Cheapest</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid> */}
                    </Grid>
                </header>
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

                    <ProductListGridView productsData={productsData} handleProductView={handleProductView} userToken={userToken} userData={userData} />

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                        />
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ProductList;

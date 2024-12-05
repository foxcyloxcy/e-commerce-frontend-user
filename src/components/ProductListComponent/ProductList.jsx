import React, { useState, useEffect, useCallback, memo } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Grid,
    Button,
    FormControl,
    Select,
    Drawer,
    useMediaQuery,
    ThemeProvider,
    Popper,
    Paper,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Pagination,
    Typography,
    TextField
} from '@mui/material';
import { Search as SearchIcon, FilterList as Filter, ExpandLess, ExpandMore } from '@mui/icons-material';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import DrawerContent from './DrawerContent';
import ProductListGridView from './ProductViewComponent/ProductListGridView';
import { useLocation } from 'react-router-dom';

const ProductList = (props) => {
    const { parentIsLoggedIn, userToken, userData } = props;
    const [categories, setCategories] = useState([]);
    const [subCategoryIdFromDrawer, setSubCategoryIdFromDrawer] = useState("");
    const [openCategory, setOpenCategory] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [keyword, setKeyword] = useState('');
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const location = useLocation();
    const [priceRange, setPriceRange] = useState(['', '']);
    const [propertiesFilter, setPropertiesFilter] = useState("");
    const [newItems, setNewItems] = useState(1)
    const [lastSubCategoryId, setLastSubCategoryId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProductsCount, setTotalProductsCount] = useState(1);
    const [itemsPerPage] = useState(8);
    const MemoizedDrawerContent = memo(DrawerContent);
    const MemoizedProductListGridView = memo(ProductListGridView);

    const handleApplyPriceRange = (minPrice, maxPrice) => {
        setPriceRange([minPrice, maxPrice]);
    };

    const handleApplyPropertiesFilter = () => {
        // Retrieve the selected values from localStorage
        const selectedValues = localStorage.getItem('selectedValues') || '';
    
        // Convert the comma-delimited string to an array
        const valuesArray = selectedValues ? selectedValues.split(',') : [];
    
        // Apply the properties filter
        setPropertiesFilter(valuesArray);
    };

    const loadCategories = useCallback(async () => {
        try {
            const res = await api.get("api/global/category");
            if (res.status === 200) {
                // console.log(res.data)
                setCategories(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);


    const loadProducts = useCallback(
        async (subCategoryId, page = 1) => {
            const currentSubCategoryId = subCategoryId || subCategoryIdFromDrawer;
    
            // Reset propertiesFilter if subCategoryId has changed
            if (currentSubCategoryId !== lastSubCategoryId) {
                setPropertiesFilter("");
                setLastSubCategoryId(currentSubCategoryId); // Update the last used subCategoryId
                localStorage.removeItem('selectedValues')
            }
    
            try {
                let dynamicApi = userToken ? "auth" : "global";
                let query = `api/${dynamicApi}/items?page=${page}&size=${itemsPerPage}&sort=${newItems}&`;
    
                // Append filters if they exist
                if (currentSubCategoryId) query += `sub_category_id=${currentSubCategoryId}&`;
                if (priceRange[0] !== "" && priceRange[1] !== "")
                    query += `filter[min_price]=${priceRange[0]}&filter[max_price]=${priceRange[1]}&`;
                if (keyword) query += `filter[keyword]=${keyword}&`;
                if (propertiesFilter) query += `filter[properties]=${propertiesFilter}&`;
    
                const res = userToken
                    ? await api.get(query, {
                          headers: {
                              Authorization: `Bearer ${userToken}`,
                              "Content-Type": "application/json",
                          },
                      })
                    : await api.get(query);
    
                if (res.status === 200) {
                    const fetchedProducts = res.data.data.data;
                    setTotalProductsCount(res.data.data.total);
                    setProductsData(fetchedProducts);
                    setTotalPages(res.data.data.last_page);
                }
            } catch (error) {
                console.error("Error loading products:", error);
            }
        },
        [
            userToken,
            itemsPerPage,
            newItems,
            priceRange,
            keyword,
            propertiesFilter,
            subCategoryIdFromDrawer,
            lastSubCategoryId, // Include as a dependency
        ]
    );
    
    

    useEffect(() => {

        const subCategoryIdFromRoute = location.state?.subCategoryId;
        if (subCategoryIdFromRoute) {
            loadProducts(subCategoryIdFromRoute, currentPage);
        } else {
            loadProducts(null, currentPage);
        }
    
        setIsLoggedIn(parentIsLoggedIn || false);
    }, [loadProducts, parentIsLoggedIn, currentPage]);

    useEffect(() => {
        loadCategories();
    }, []);



    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        loadProducts(selectedSubCategory?.id, value);
    };

    const handleToggleCategory = (categoryId) => {
        setOpenCategory((prevOpenCategory) => ({
            ...prevOpenCategory,
            [categoryId]: !prevOpenCategory[categoryId],
        }));
    };

    const handleSubCategoryClick = (subCategory) => {
        setSelectedSubCategory(subCategory)
        setSubCategoryIdFromDrawer(subCategory.id)
        loadProducts(subCategory.id);
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setKeyword(searchValue);
        loadProducts(selectedSubCategory?.id, 1); // Reset page to 1 on search change
    };

    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                minHeight: '60vh',
                marginTop: 20,
                marginBottom: 5,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
                zIndex: 2, // To make sure the container is above the overlay
                WebkitOverflowScrolling: 'touch'
            }}>
                <AppBar
                    position={isLoggedIn ? 'fixed' : 'absolute'}
                    sx={{
                        top: 59,
                        transform: 'translate(0, 0)',
                        backgroundColor: isLoggedIn ? ModTheme.palette.primary.dark : 'transparent',
                        transition: 'background-color 0.30s, box-shadow 0.30s',
                        boxShadow: isLoggedIn ? '4px 4px 0px 2px rgba(0, 0, 0, 0.3)' : 'none',
                        borderBottom: isLoggedIn ? 'none' : `2px #606060 solid`,
                        borderTop: isLoggedIn ? `2px #606060 solid` : 'none',
                        zIndex: 3, // To make sure the AppBar is above the overlay
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='secondary'
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer}
                            sx={{ mr: 2 }}
                        >
                            <Filter />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                    <Grid container display="flex" justifyContent="space-between" alignItems="center">
                    <Grid item xs={6} sm={6} md={5}>
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
                        <Grid item xs={6} sm={6} md={5}>
                            <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                                <Select 
                                    value={newItems} 
                                    onChange={(e) => setNewItems(e.target.value)} // Update newItems state
                                >
                                    <MenuItem value={1}>Newest</MenuItem>
                                    <MenuItem value={2}>Oldest</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <Typography variant="body1" sx={{
                                display: 'flex',
                                justifyContent: {xs:'center', sm:'center', md:'flex-end'},
                                flexDirection: 'row',
                                mt: {xs: 1, sm: 1, md: 0}
                            }}>{totalProductsCount} Items found</Typography>
                        </Grid>
                    </Grid>
                </header>
                
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <MemoizedDrawerContent 
                        categories={categories}
                        openCategory={openCategory}
                        handleToggleCategory={handleToggleCategory}
                        handleSubCategoryClick={handleSubCategoryClick}
                        onApplyPriceRange={handleApplyPriceRange}
                        onApplyPropertiesFilter={handleApplyPropertiesFilter}
                        subCategoryFromParent={selectedSubCategory} 
                    />
                </Drawer>

                <Grid container spacing={1}>


                    <Grid item xs={12}>
                    <MemoizedProductListGridView productsData={productsData} />
                    </Grid>

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

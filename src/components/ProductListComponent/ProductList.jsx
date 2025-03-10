import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Grid,
    FormControl,
    Select,
    Drawer,
    useMediaQuery,
    ThemeProvider,
    MenuItem,
    Pagination,
    Typography,
    TextField,
    CircularProgress,
    Divider,
    Button,
    List,
    ListItem,
    ListItemText,
    Collapse,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box
} from '@mui/material';
import { Search as SearchIcon, FilterList as Filter, ExpandLess, ExpandMore } from '@mui/icons-material';
import ModTheme from '../ThemeComponent/ModTheme';
import api from '../../assets/baseURL/api';
import DrawerContent from './DrawerContent';
import ProductListGridView from './ProductViewComponent/ProductListGridView';
import { useSearchParams } from 'react-router-dom';

const ProductList = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { parentIsLoggedIn, userToken, userData } = props;
    const [categories, setCategories] = useState([]);
    const [subCategoryIdFromDrawer, setSubCategoryIdFromDrawer] = useState("");
    const [openCategory, setOpenCategory] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
    const [productsData, setProductsData] = useState([]);
    const [lastSubCategoryId, setLastSubCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProductsCount, setTotalProductsCount] = useState(1);
    const MemoizedDrawerContent = memo(DrawerContent);
    const MemoizedProductListGridView = memo(ProductListGridView);
    
    const [priceRange, setPriceRange] = useState({
        minPrice: "",
        maxPrice: "",
    });
    const [errors, setErrors] = useState({ minPrice: "", maxPrice: "" });

    const page = Number(searchParams.get("page")) || 1;
    const size = 70;
    const sort = searchParams.get("sort") || 1;
    const urlCategoryId = searchParams.get("category_id");
    const urlCategoryName = searchParams.get("category_name");
    const subCategoryId = searchParams.get("sub_category_id");
    const subCategoryName = searchParams.get("sub_category_name");
    const keyword = searchParams.get("filter_keyword") || "";
    const properties = searchParams.get("filter_properties") || "";
    const priceMinPrice = searchParams.get("filter_min_price");
    const priceMaxPrice = searchParams.get("filter_max_price");
    const pageScroll = searchParams.get("page_scroll")|| 0

    const validatePriceRange = () => {
        const { minPrice, maxPrice } = priceRange;
        const validationErrors = {};

        if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
            validationErrors.minPrice = "Minimum price cannot exceed maximum price";
        }
        if (minPrice && Number(minPrice) < 50) {
            validationErrors.minPrice = "Minimum price must be at least AED 50";
        }
        if (maxPrice && Number(maxPrice) > 50000) {
            validationErrors.maxPrice = "Maximum price cannot exceed AED 50,000";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleApplyPriceRange = () => {

        if (!validatePriceRange()) return;
        const updatedParams = new URLSearchParams(searchParams);

        updatedParams.set("filter_min_price", priceRange.minPrice);
        updatedParams.set("filter_max_price", priceRange.maxPrice);
        updatedParams.set("page_scroll", 0);
        updatedParams.set("page", 1);

        setSearchParams(updatedParams); // ✅ Correct way to update URL search params
    };

    const handleSortChange = (event) => {
        const updatedParams = new URLSearchParams(searchParams);
        const value = event.target.value;
        updatedParams.set("sort", value)
        updatedParams.set("page", 1);
        updatedParams.set("page_scroll", 0);
        setSearchParams(updatedParams);
    };

    const loadCategories = useCallback(async () => {
        try {
            const res = await api.get("api/global/category");
            if (res.status === 200) {
                // console.log(res.data.data)
                setCategories(res.data.data);
                if(subCategoryId !== "" || subCategoryId !== null || subCategoryId !== undefined){
                    checkExistingSubcategoryId(res.data.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, []);


    const loadProducts = useCallback(
        async () => {

            setLoading(true)
            const currentSubCategoryId = subCategoryId || subCategoryIdFromDrawer;

            // Reset propertiesFilter if subCategoryId has changed
            if (currentSubCategoryId !== lastSubCategoryId) {
                const updatedParams = new URLSearchParams(searchParams);
                updatedParams.delete('filter_properties');
                setLastSubCategoryId(currentSubCategoryId); // Update the last used subCategoryId
            }

            try {
                let dynamicApi = userToken ? "auth" : "global";

                let query = `api/${dynamicApi}/items?page=${page}&size=${size}&sort=${sort}&sub_category_id=${currentSubCategoryId}&filter[min_price]=${priceMinPrice}&filter[max_price]=${priceMaxPrice}&filter[keyword]=${keyword}&filter[properties]=${properties}&`;


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
                    setLoading(false)
                    window.scrollTo(0, parseInt(pageScroll, 10));
                }
            } catch (error) {
                console.error("Error loading products:", error);
            }
        },
        [
            userToken,
            searchParams,
            subCategoryIdFromDrawer,
            lastSubCategoryId, // Include as a dependency
        ]
    );



    useEffect(() => {
        loadProducts()
    }, [searchParams]);

    useEffect(() => {
        loadCategories();
    }, []);



    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handlePageChange = (event, value) => {
        const updatedParams = new URLSearchParams(searchParams);

        // Directly set the page value (no need to add +1)
        updatedParams.set("page", value);

        setSearchParams(updatedParams); // ✅ Correctly update the URL params
    };

    const handleToggleCategory = (categoryId) => {
        setOpenCategory((prevOpenCategory) => ({
            ...prevOpenCategory,
            [categoryId]: !prevOpenCategory[categoryId],
        }));
    };

    const handleSubCategoryClick = (subCategory, categoryId, categoryName) => {
        setSelectedSubCategory(subCategory)
        setSubCategoryIdFromDrawer(subCategory.id)
        setSearchParams((prevParams) => {
            const updatedParams = new URLSearchParams(prevParams);

            if (subCategory) {
                updatedParams.set('sub_category_id', subCategory.id);
                updatedParams.set("category_id", categoryId);
                updatedParams.set("category_name", categoryName);
                updatedParams.set("sub_category_name", subCategory.name);
                updatedParams.set("page", 1);
                updatedParams.set("page_scroll", 0);
                updatedParams.delete('filter_properties');
            } else {
                updatedParams.delete('sub_category_id');
            }


            return updatedParams;
        });
    };

    const checkExistingSubcategoryId = async (categoryData) => {
        if (!urlCategoryId || !subCategoryId) return null;
        const parentCategory = categoryData.find(category =>
            category.id === parseInt(urlCategoryId)
        );
            
            const selectedSubCategory = parentCategory.sub_category.find(sub => sub.id === parseInt(subCategoryId));
        
            if (selectedSubCategory) {
                setSelectedSubCategory(selectedSubCategory); // Set sub_category_property
            }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            const keyword = event.target.value;
            const updatedParams = new URLSearchParams(searchParams);

            if (keyword) {
                updatedParams.set("filter_keyword", keyword);
                updatedParams.set("page", 1);
                updatedParams.set("page_scroll", 0);
            } else {
                updatedParams.delete("filter_keyword");
            }

            setSearchParams(updatedParams); // ✅ Correct way to update search params
        }
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (valueId) => {
        const updatedParams = new URLSearchParams(searchParams);

        // Ensure `filter_properties` is always a valid string before splitting
        let valuesArray = updatedParams.get('filter_properties') ? updatedParams.get('filter_properties').split(',') : [];

        // Toggle the value: add if not present, remove if already exists
        if (valuesArray.includes(valueId.toString())) {
            valuesArray = valuesArray.filter(id => id !== valueId.toString());
        } else {
            valuesArray.push(valueId.toString());
        }

        // Update or remove `filter_properties`
        if (valuesArray.length === 0) {
            updatedParams.delete('filter_properties');
        } else {
            updatedParams.set('filter_properties', valuesArray.join(','));
            updatedParams.set('page', 1)
        }

        setSearchParams(updatedParams); // ✅ Correct way to update search params without removing other params
    };

    const isChecked = (valueId) => {
        let valuesArray = searchParams.get('filter_properties') ? searchParams.get('filter_properties').split(',') : [];
        return valuesArray.includes(valueId.toString());
    };

    return (
        <ThemeProvider theme={ModTheme}>

                    <Container sx={{
                        minHeight: loading ? '2500vh' : 'auto',
                        marginTop: { xs: 18, sm: 18, md: 10, },
                        marginBottom: 5,
                        maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
                        zIndex: 2, // To make sure the container is above the overlay
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {
                            isSmallScreen === true && (
                                <AppBar
                                    position={parentIsLoggedIn ? 'fixed' : 'absolute'}
                                    sx={{
                                        top: 59,
                                        transform: 'translate(0, 0)',
                                        backgroundColor: parentIsLoggedIn ? ModTheme.palette.primary.dark : 'transparent',
                                        transition: 'background-color 0.30s, box-shadow 0.30s',
                                        boxShadow: parentIsLoggedIn ? '4px 4px 0px 2px rgba(0, 0, 0, 0.3)' : 'none',
                                        borderBottom: parentIsLoggedIn ? 'none' : `2px #606060 solid`,
                                        borderTop: parentIsLoggedIn ? `2px #606060 solid` : 'none',
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
                                            <Typography variant="body1">Filter</Typography>
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                            )
                        }
                        <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                            <Grid container display="flex" justifyContent="space-between" alignItems="center">
                                <Grid item xs={6} sm={6} md={5}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Search..."
                                        // value={keyword} // Update keyword on typing
                                        onKeyDown={handleSearchKeyDown}
                                        InputProps={{
                                            startAdornment: <SearchIcon sx={{ mr: 1 }} />
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6} md={5}>
                                    <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                                        <Select
                                            value={sort}
                                            onChange={handleSortChange}// Update newItems state
                                        >
                                            <MenuItem value={1}>Newest</MenuItem>
                                            <MenuItem value={2}>Oldest</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <Typography variant="body1" sx={{
                                        display: 'flex',
                                        justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' },
                                        flexDirection: 'row',
                                        mt: { xs: 1, sm: 1, md: 0 }
                                    }}>{totalProductsCount} Items found</Typography>
                                </Grid>
                            </Grid>
                        </header>
                        <Grid container spacing={3}>
                            {
                                isSmallScreen === false ? (
                                    <Grid item md={3}>
                                        <Typography variant="h6" sx={{ paddingBottom: 2 }}>Filters</Typography>
                                        <Divider />

                                        <Typography variant="h6" gutterBottom>Price range</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="AED 50"
                                                    placeholder="AED 50"
                                                    name="minPrice"
                                                    type="number"
                                                    size="small"
                                                    value={priceRange.minPrice}
                                                    onChange={handlePriceChange}
                                                    error={!!errors.minPrice}
                                                    helperText={errors.minPrice || ''}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="AED 50,000"
                                                    placeholder="AED 50,000"
                                                    name="maxPrice"
                                                    type="number"
                                                    size="small"
                                                    value={priceRange.maxPrice}
                                                    onChange={handlePriceChange}
                                                    error={!!errors.maxPrice}
                                                    helperText={errors.maxPrice || ''}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ marginTop: '10px' }}
                                            onClick={handleApplyPriceRange}
                                        >
                                            Apply
                                        </Button>
                                        <Divider sx={{ marginTop: '10px' }} />

                                        <Typography variant="h6" gutterBottom sx={{ pt: 2 }}>Categories</Typography>
                                    {subCategoryId ? (
                <Grid container display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="grey.100">
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight="bold" sx={{
                            textAlign:"center"
                        }}>
                            {urlCategoryName} : {subCategoryName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="text" color="primary" fullWidth>
                            Reset Category
                        </Button>
                    </Grid>

                </Grid>
                                        ) : (
                                            <List>
                                                {categories.map(category => (
                                                    <React.Fragment key={category.id}>
                                                        <ListItem button onClick={() => handleToggleCategory(category.id)}>
                                                            <ListItemText primary={category.name} />
                                                            {openCategory[category.id] ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={openCategory[category.id]} timeout="auto" unmountOnExit>
                                                            <List component="div" disablePadding>
                                                                {category.sub_category.map(subCategory => (
                                                                    <ListItem
                                                                        button
                                                                        key={subCategory.id}
                                                                        sx={{ pl: 4 }}
                                                                        onClick={() => handleSubCategoryClick(subCategory, category.id, category.name)}
                                                                    >
                                                                        <ListItemText primary={subCategory.name} />
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Collapse>
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        )}
                                        <Divider sx={{ marginY: '20px' }} />

                                        {selectedSubCategory &&
                                            selectedSubCategory.sub_category_property.map((property) => (
                                                <React.Fragment key={property.id}>
                                                    <Typography variant="h6" gutterBottom>{property.name}</Typography>
                                                    <FormGroup row>
                                                        {property.sub_category_property_value.map((value) => (
                                                            <FormControlLabel
                                                                value={searchParams.get('filter_properties') ? searchParams.get('filter_properties').split(',') : []}
                                                                key={value.id}
                                                                control={
                                                                    <Checkbox
                                                                        onChange={() => handleCheckboxChange(value.id)}
                                                                        checked={isChecked(value.id)}
                                                                    />
                                                                }
                                                                label={value.name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                    <Divider sx={{ marginY: '20px' }} />
                                                </React.Fragment>
                                            ))}
                                    </Grid>
                                )
                                    :

                                    (<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                                        <MemoizedDrawerContent
                                            categories={categories}
                                            openCategory={openCategory}
                                            handleToggleCategory={handleToggleCategory}
                                            handleSubCategoryClick={handleSubCategoryClick}
                                            searchParams={searchParams}
                                            setSearchParams={setSearchParams}
                                            subCategoryFromParent={selectedSubCategory}
                                        />
                                    </Drawer>)
                            }



                            <Grid item xs={12} sm={12} md={9} lg={9} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                {loading ? <CircularProgress size={36} /> : <MemoizedProductListGridView productsData={productsData} searchParams={searchParams} setSearchParams={setSearchParams} />}

                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    shape="rounded"
                                    hidePrevButton
                                    hideNextButton
                                />
                            </Grid>

                        </Grid>
                    </Container>

            
        </ThemeProvider>
    );
};

export default ProductList;

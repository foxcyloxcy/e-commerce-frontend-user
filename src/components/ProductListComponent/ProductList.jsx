import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container,
    Grid,
    Button,
    Drawer,
    useMediaQuery,
    ThemeProvider
} from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import ModTheme from '../ThemeComponent/ModTheme';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import api from '../../assets/baseURL/api';
import DrawerContent from './DrawerContent';
import ProductListGrid from './ProductListGrid';

const ProductList = (props) => {
    const { parentIsLoggedIn } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('md'));
    const [elevate, setElevate] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [productsData, setProductsData] = useState([]);

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

    const loadProducts = useCallback(async () => {
        try {
            const res = await api.get(`api/global/items?sub_category_id=1`);
            if (res.status === 200) {
                const data = res.data.data
                console.log(data)
                setProductsData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadCategories();
        loadProducts();
        setIsLoggedIn(parentIsLoggedIn);
    }, [loadCategories, parentIsLoggedIn]);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    useEffect(() => {
        setElevate(trigger);
    }, [trigger]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleToggleCategory = (categoryId) => {
        setOpenCategory((prevOpenCategory) => ({
            ...prevOpenCategory,
            [categoryId]: !prevOpenCategory[categoryId],
        }));
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
                        borderTop: elevate ? `1px #606060 solid` : 'none',
                        paddingLeft: 1,
                        paddingRight: 1
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
                                    fontSize:  '1rem',
                                },
                            }}
                                key={category.id}
                                color='secondary'
                                onClick={() => handleToggleCategory(category.id)}
                            >
                                {category.name}
                                {openCategory[category.id] ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                        ))}
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <DrawerContent
                        categories={categories}
                        openCategory={openCategory}
                        handleToggleCategory={handleToggleCategory}
                    />
                </Drawer>
                <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Grid container spacing={2}>
                        {!isSmallScreen && (
                            <Grid item xs={12} md={4} lg={3} className='filter-grid'>
                                <DrawerContent
                                    categories={categories}
                                    openCategory={openCategory}
                                    handleToggleCategory={handleToggleCategory}
                                />
                            </Grid>
                        )}
                        <ProductListGrid />
                    </Grid>
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default ProductList;

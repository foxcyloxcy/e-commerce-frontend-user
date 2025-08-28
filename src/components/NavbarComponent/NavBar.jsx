import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CssBaseline from '@mui/material/CssBaseline';
import { Search as SearchIcon, FilterList as Filter, ExpandLess, ExpandMore } from '@mui/icons-material';
import { ThemeProvider, Box, useMediaQuery, Drawer, List, ListItem, ListItemText, Divider, Backdrop, TextField } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ReusableComponents/ButtonComponent/ButtonComponent';
import secureLocalStorage from "react-secure-storage";
import secure from '../../assets/baseURL/secure';

const NavBar = (props) => {

  const { parentIsLoggedIn, refreshParent } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const linkPathName = useLocation(Link);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleMenu = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    refreshParent()
    navigate('/login');
  }, [navigate]);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      const keyword = event.target.value;
      const updatedParams = new URLSearchParams(searchParams);

      if (keyword) {
        updatedParams.set("page", 1);
        updatedParams.set("sort", 1);
        updatedParams.set("category_id", "");
        updatedParams.set("category_name", "");
        updatedParams.set("sub_category_id", "");
        updatedParams.set("sub_category_name", "");
        updatedParams.set("filter_min_price", "");
        updatedParams.set("filter_max_price", "");
        updatedParams.set("filter_keyword", keyword);
        updatedParams.set("filter_properties", "");
        updatedParams.set("page_scroll", 0);

        // ✅ Redirect with params
        navigate(`/shop?${updatedParams.toString()}`);
      } else {
        updatedParams.delete("filter_keyword");
        navigate(`/shop?${updatedParams.toString()}`);
      }
    }
  };

  useEffect(() => {
    const storedIsLoggedIn = secureLocalStorage.getItem(`${storagePrefix}_isLoggedIn`, {
      hash: storageKey,
    });

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn);
    } else {
      setIsLoggedIn(false)
    }

    if (parentIsLoggedIn === true) {
      setIsLoggedIn(parentIsLoggedIn);
    } else {
      setIsLoggedIn(false)
    }

  }, [parentIsLoggedIn]);

  const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(ModTheme.breakpoints.down('md')) && !isSmallScreen;

  return (
    <>
      <ThemeProvider theme={ModTheme}>
        <CssBaseline />
        <AppBar
          position={isLoggedIn ? 'fixed' : 'absolute'}
          color="transparent"
          elevation={isLoggedIn ? 4 : 0}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '60px',
            backgroundColor: isLoggedIn ? ModTheme.palette.primary.dark : 'transparent',
            transition: linkPathName.pathname !== '/shop' ? 'background-color 0.75s, box-shadow 0.75s' : 'none',
            boxShadow: isLoggedIn && linkPathName.pathname !== '/shop' ? '0px 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          }}
        >
          <Toolbar sx={{
            px: '0 !important',
          }}>
            {isSmallScreen || isMediumScreen ? (
              // Small & medium screens: stack vertically
              <Box sx={{
                width: linkPathName.pathname !== '/shop' ? '90%' : '100%',
                display: 'flex',
                alignItems: 'center',
                height: '1vh',
                justifyContent: linkPathName.pathname !== '/shop' ? 'flex-start' : 'center',
                p: 0
              }}>
                {/* Logo */}
                <a href="/" style={{ display: "inline-block", width: '100px', marginRight: '16px' }}>
                  <img
                    src="https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_header_logo.png"
                    alt="reloved_header_logo"
                    style={{ width: "100px", height: "auto", objectFit: "contain" }}
                  />
                </a>

                {/* Search Bar */}
                {linkPathName.pathname !== '/shop' && (
                  <TextField
                    halfwidth='true'
                    variant="outlined"
                    placeholder="Search user or item"
                    onKeyDown={handleSearchKeyDown}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        height: "0.1vh", // Adjust as needed
                        width: '130px'
                      },
                    }}
                  />
                )}
              </Box>
            ) : (
              // Large screens: logo left, search right
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                {/* Logo */}
                <a href="/" style={{ display: "inline-block", marginRight: "16px" }}>
                  <img
                    src="https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_header_logo.png"
                    alt="reloved_header_logo"
                    style={{ width: "150px", height: "auto", objectFit: "contain" }}
                  />
                </a>

                {/* Search Bar */}
                {linkPathName.pathname !== '/shop' && (
                  <TextField
                    halfwidth='true'
                    variant="outlined"
                    placeholder="Search user or item"
                    onKeyDown={handleSearchKeyDown}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        height: "1vh", // Adjust as needed
                      },
                    }}
                  />
                )}

              </Box>
            )}

            {isSmallScreen || isMediumScreen ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  position: 'absolute',
                  p: 0,
                  left: { xs: '95%' }
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', }}>
                <ButtonComponent
                  component={Link}
                  to="/"
                  label="Home"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                  hoverBackgroundColor={"none"}
                  ripple={true}
                />
                <ButtonComponent
                  component={Link}
                  to="/our-story"
                  label="about"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                  hoverBackgroundColor={"none"}
                  ripple={true}
                />
                <ButtonComponent
                  component={Link}
                  to="/our-delivery-partners"
                  label="Delivery"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                  hoverBackgroundColor={"none"}
                  paddingLeft={2}
                  paddingRight={2}
                  ripple={true}
                />
                <ButtonComponent
                  component={Link}
                  to="/on-your-behalf"
                  label="concierge"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                  paddingLeft={3}
                  paddingRight={2}
                  hoverBackgroundColor={"none"}
                  ripple={true}
                />
                <ButtonComponent
                  component={Link}
                  to="/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties="
                  label="Shop"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                  hoverBackgroundColor={"none"}
                  paddingRight={0}
                  paddingLeft={2}
                  ripple={true}
                />
                {isLoggedIn === true ? (
                  <>
                    <ButtonComponent
                      component={Link}
                      to="/add-product"
                      label="Sell"
                      textColor={isLoggedIn ? 'primary.main' : 'primary.contrastText'}
                      hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                      hoverBackgroundColor={"none"}
                      paddingLeft={0}
                      paddingRight={1}
                      ripple={true}
                    />
                    <ButtonComponent
                      component={Link}
                      to="/my-profile"
                      label="Profile"
                      textColor={isLoggedIn ? 'primary.main' : 'primary.contrastText'}
                      hoverTextColor={isLoggedIn ? 'secondary.main' : 'primary.light'}
                      hoverBackgroundColor={"none"}
                      paddingLeft={0}
                      paddingRight={2}
                      ripple={true}
                    />
                    <ButtonComponent
                      label="Logout"
                      onClick={handleLogout}
                      marginRight={1}
                      buttonVariant="contained"
                      textColor='primary.contrastText'
                      hoverTextColor='secondary.main'

                    />
                  </>
                ) : (
                  <>
                    <ButtonComponent
                      component={Link}
                      to="/login"
                      label="Login"
                      buttonVariant="contained"
                      textColor='primary.contrastText'
                      hoverTextColor='secondary.main'
                      marginRight={1}
                      marginLeft={1}
                      ripple={true}
                    />
                    <Divider orientation="vertical" flexItem />
                    <ButtonComponent
                      component={Link}
                      to="/register"
                      label="Register"
                      marginRight={1}
                      marginLeft={1}
                      buttonVariant="contained"
                      textColor='primary.contrastText'
                      hoverTextColor='secondary.main'
                    />
                  </>
                )}
              </Box>
            )}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleClose}
              sx={{
                '& .MuiDrawer-paper': {
                  width: isSmallScreen ? '75%' : '50%',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: ModTheme.palette.primary.dark,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                <IconButton color="inherit" onClick={handleClose} sx={{ alignSelf: 'flex-end' }}>
                  <CloseIcon />
                </IconButton>
                <List component="nav" sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                  {isLoggedIn === true ? (
                    <ButtonComponent
                      label="Logout"
                      onClick={handleLogout}
                      buttonVariant="contained"
                      textColor='primary.contrastText'
                      hoverTextColor='secondary.main'
                    />
                  ) : (
                    <>
                      <ButtonComponent
                        component={Link}
                        to="/login"
                        label="Login"
                        buttonVariant="contained"
                        textColor='primary.contrastText'
                        hoverTextColor='secondary.main'
                        onClick={handleClose}
                      />
                      <Divider orientation="vertical" flexItem />
                      <ButtonComponent
                        component={Link}
                        to="/register"
                        label="Register"
                        buttonVariant="contained"
                        textColor='primary.contrastText'
                        hoverTextColor='secondary.main'
                        onClick={handleClose}
                      />
                    </>
                  )}
                </List>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: ModTheme.palette.background.default,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <List component="nav">
                  <ListItem button component={Link} to="/" onClick={handleClose}>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button component={Link} to="/our-story" onClick={handleClose}>
                    <ListItemText primary="About" />
                  </ListItem>
                  <ListItem button component={Link} to="/our-delivery-partners" onClick={handleClose}>
                    <ListItemText primary="Delivery" />
                  </ListItem>
                  <ListItem button component={Link} to="/on-your-behalf" onClick={handleClose}>
                    <ListItemText primary="Concierge" />
                  </ListItem>
                  <ListItem button component={Link} to="/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties=" onClick={handleClose}>
                    <ListItemText primary="Shop" />
                  </ListItem>
                  {isLoggedIn && (
                    <>
                      <ListItem button component={Link} to="/add-product" onClick={handleClose}>
                        <ListItemText primary="Sell" />
                      </ListItem>
                      <ListItem button component={Link} to="/my-profile" onClick={handleClose}>
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </>

                  )}
                </List>
              </Box>
            </Drawer>
            {isMediumScreen && (
              <Backdrop
                open={drawerOpen}
                onClick={handleClose}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                }}
              />
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default NavBar;

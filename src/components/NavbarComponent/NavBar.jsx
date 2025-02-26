import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Box, useMediaQuery, Drawer, List, ListItem, ListItemText, Divider, Backdrop } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import ButtonComponent from '../ReusableComponents/ButtonComponent/ButtonComponent';
import secureLocalStorage from "react-secure-storage";
import secure from '../../assets/baseURL/secure';

const NavBar = (props) => {

  const { parentIsLoggedIn, refreshParent } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const linkPathName = useLocation(Link);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;


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
            transform: 'translate(0, 0)',
            backgroundColor: isLoggedIn ? ModTheme.palette.primary.dark : 'transparent',
            transition: linkPathName.pathname !== '/shop' ? 'background-color 0.75s, box-shadow 0.75s' : 'none',
            boxShadow: isLoggedIn && linkPathName.pathname !== '/shop' ? '0px 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          }}
        >
          <Toolbar>

            {isSmallScreen || isMediumScreen ? (
              <a href="/" style={{ height: '80px', width: '100%' }}>
                <img src={'https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_header_logo.png'} alt='reloved_header_logo' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </a>
            ) : (
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <a href="/">
                  <img src={'https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_header_logo.png'} alt='reloved_header_logo' style={{ width: '150px', height: 'auto', objectFit: 'contain' }} />
                </a>
              </Typography>
            )}

            {isSmallScreen || isMediumScreen ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  position: 'absolute',
                  left: { xs: '90%', sm: '95%', md: '95%' }
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <ButtonComponent
                  component={Link}
                  to="/"
                  label="Home"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'primary.main' : 'primary.light'}
                />
                <ButtonComponent
                  component={Link}
                  to="/our-story"
                  label="about"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'primary.main' : 'primary.light'}
                />
                <ButtonComponent
                  component={Link}
                  to="/shop?page=1&sort=1&sub_category_id=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties="
                  label="Shop"
                  textColor={isLoggedIn ? 'primary.main' : 'secondary.main'}
                  hoverTextColor={isLoggedIn ? 'primary.main' : 'primary.light'}
                />
                {isLoggedIn === true ? (
                  <>
                    <ButtonComponent
                      component={Link}
                      to="/add-product"
                      label="Sell"
                      textColor={isLoggedIn ? 'primary.main' : 'primary.contrastText'}
                      hoverTextColor={isLoggedIn ? 'primary.main' : 'primary.light'}
                    />
                    <ButtonComponent
                      component={Link}
                      to="/my-profile"
                      label="Profile"
                      textColor={isLoggedIn ? 'primary.main' : 'primary.contrastText'}
                      hoverTextColor={isLoggedIn ? 'primary.main' : 'primary.light'}
                    />
                    <ButtonComponent
                      label="Logout"
                      onClick={handleLogout}
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
                    />
                    <Divider orientation="vertical" flexItem />
                    <ButtonComponent
                      component={Link}
                      to="/register"
                      label="Register"
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
                  <ListItem button component={Link} to="/shop?page=1&sort=1&sub_category_id=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties=" onClick={handleClose}>
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

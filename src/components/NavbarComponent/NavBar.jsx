import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Box, useMediaQuery, Drawer, List, ListItem, ListItemText, Divider, Backdrop } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavBar = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [elevate, setElevate] = useState(false);

  const handleMenu = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoggedIn) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 10,
    });

    useEffect(() => {
      setElevate(trigger);
    }, [trigger]);
  }

  const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(ModTheme.breakpoints.down('md')) && !isSmallScreen;

  return (
    <>
      <ThemeProvider theme={ModTheme}>
        <CssBaseline />
        <AppBar
          position={isLoggedIn ? 'fixed' : 'absolute'}
          color="transparent"
          elevation={elevate ? 4 : 0}
          sx={{
            transform: 'translate(0, 0)',
            backgroundColor: elevate ? ModTheme.palette.primary.dark : 'transparent',
            transition: 'background-color 0.75s, box-shadow 0.75s',
            boxShadow: elevate ? '0px 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Reloved Logo
            </Typography>
            {isSmallScreen || isMediumScreen ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <ButtonComponent
                  label="Home"
                  textColor={elevate ? 'secondary.main' : 'primary.contrastText'}
                  hoverTextColor={elevate ? 'primary.main' : 'primary.light'}
                />
                <ButtonComponent
                  label="Shop"
                  textColor={elevate ? 'secondary.main' : 'primary.contrastText'}
                  hoverTextColor={elevate ? 'primary.main' : 'primary.light'}
                />
                <ButtonComponent
                  label="About"
                  textColor={elevate ? 'secondary.main' : 'primary.contrastText'}
                  hoverTextColor={elevate ? 'primary.main' : 'primary.light'}
                />
                <ButtonComponent
                  label="Login"
                  buttonVariant="contained"
                  textColor='primary.contrastText'
                  hoverTextColor='secondary.main'
                />
                <ButtonComponent
                  label="Register"
                  buttonVariant="contained"
                  textColor='primary.contrastText'
                  hoverTextColor='secondary.main'
                />
              </Box>
            )}
            <Drawer
              anchor="right"
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '50%',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '10%',
                  backgroundColor: ModTheme.palette.background.default,
                  display: 'flex',
                  flexDirection: 'column', // Changed to column alignment
                  justifyContent: 'space-between', // Adjusted for spacing
                  alignItems: 'center',
                  padding: '5px',
                }}
              >
                <IconButton color="inherit" onClick={handleClose} sx={{ alignSelf: 'flex-end' }}>
                  <CloseIcon />
                </IconButton>
                <List component="nav" sx={{ display: 'flex', flexDirection: 'row', gap: 2, }}>
                  <ButtonComponent
                    label="Login"
                    buttonVariant="contained"
                    textColor='primary.contrastText'
                    hoverTextColor='secondary.main'
                  />
                  <Divider orientation="vertical" flexItem />
                  <ButtonComponent
                    label="Register"
                    buttonVariant="contained"
                    textColor='primary.contrastText'
                    hoverTextColor='secondary.main'
                  />
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
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Shop" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="About" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            {isMediumScreen && (
              <Backdrop
                open={Boolean(anchorEl)}
                onClick={handleClose}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                }}
              />
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {/* Content goes here */}
    </>
  );
};

export default NavBar;

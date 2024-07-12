import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Box, useMediaQuery, Button, Drawer, List, ListItem, ListItemText, Divider, Backdrop, ListItemIcon } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavBar = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [elevate, setElevate] = useState(false);

  if (isLoggedIn) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    useEffect(() => {
      setElevate(trigger);
    }, [trigger]);
  }

  const isSmallScreen = useMediaQuery(ModTheme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(ModTheme.breakpoints.down('md')) && !isSmallScreen;

  console.log(ListItemText)
  console.log(<Button color="inherit">Home</Button>
  )

  return (
    <>
      <ThemeProvider theme={ModTheme}>
        <CssBaseline />
        <AppBar
          position={isLoggedIn ? 'sticky' : 'static'}
          color="transparent"
          elevation={elevate ? 4 : 0}
          sx={{
            backgroundColor: elevate ? 'white' : 'transparent',
            transition: 'background-color 0.5s, box-shadow 0.5s',
            boxShadow: elevate ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Website
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
                <Button color="inherit">Home</Button>
                <Button color="inherit">Shop</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact Us</Button>
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
                  height: '20%',
                  backgroundColor: ModTheme.palette.background.default,
                  display: 'flex',
                  flexDirection: 'row', // Changed to row alignment
                  justifyContent: 'space-around', // Adjusted for spacing
                  alignItems: 'center',
                  padding: '10px', // Added padding for spacing
                }}
              >
                <List component="nav" sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ListItem button sx={{ flexGrow: 1 }}>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <Divider orientation="vertical" flexItem />
                  <ListItem button sx={{ flexGrow: 1 }}>
                    <ListItemText primary="Register" />
                  </ListItem>
                </List>
                <IconButton color="inherit" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
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
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Contact Us" />
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
        <Offset />
      </ThemeProvider>
      {/* Content goes here */}
    </>
  );
};

export default NavBar;

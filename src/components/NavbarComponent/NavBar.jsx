import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const NavBar = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [elevate, setElevate] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  useEffect(() => {
    setElevate(trigger);
  }, [trigger]);

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
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
            <div>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Home</MenuItem>
                <MenuItem onClick={handleClose}>Shop</MenuItem>
                <MenuItem onClick={handleClose}>About</MenuItem>
                <MenuItem onClick={handleClose}>Contact Us</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Offset />
      {/* Content goes here */}
    </React.Fragment>
  );
};

export default NavBar;

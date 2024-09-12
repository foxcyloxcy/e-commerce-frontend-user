import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemText, ThemeProvider, Divider, IconButton, Drawer, Grid } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import ModTheme from '../ThemeComponent/ModTheme';
import UserProfileDetails from './UserProfileDetailsComponent/UserProfileDetails';
import VendorProfileDetails from './VendorProfileComponent/VendorProfileDetails';
import MyProducts from './MyProductsComponent/MyProducts';
import MyOffers from './MyOffersComponent/MyOffers';
import OffersToMe from './OffersToMeComponent/OffersToMe';
import ChangePassword from './UserPasswordChangeComponent/ChangePassword';

// Define the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Apply the fade-in animation to the Content component
const Content = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 0.8s ease-in-out`,
  paddingLeft: 10,
  paddingRight: 10,
}));

const MyProfile = (props) => {
  const { userToken, userData } = props;
  const [activeTab, setActiveTab] = useState('Profile settings');
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for drawer

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile settings':
        return <UserProfileDetails userToken={userToken} fromParentUserData={userData} />;
      case 'My products':
        return <MyProducts userToken={userToken} fromParentUserData={userData} />;
      case 'My offers':
        return <MyOffers userToken={userToken} fromParentUserData={userData} />;
      case 'Offers to me':
        return <OffersToMe userToken={userToken} fromParentUserData={userData} />;
      case 'Vendor settings':
        return <VendorProfileDetails userToken={userToken} />;
      case 'Change password':
        return <ChangePassword userToken={userToken} />;
      default:
        return null;
    }
  };

  const SidebarContent = (
    <List>
      <ListItem button onClick={() => setActiveTab('Profile settings')}>
        <ListItemText primary="Personal Profile" />
      </ListItem>
      <ListItem button onClick={() => setActiveTab('Change password')}>
        <ListItemText primary="Change Password" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('Vendor settings')}>
        <ListItemText primary="Vendor Profile" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('My products')}>
        <ListItemText primary="My products" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('My offers')}>
        <ListItemText primary="My offers" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('Offers to me')}>
        <ListItemText primary="Offers to me" />
      </ListItem>
    </List>
  );

  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{ marginTop: 10, marginBottom: 5, minHeight: '70vh' }}>
        <Grid container spacing={2}>
          {/* Sidebar - visible on medium and above */}
          <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box>{SidebarContent}</Box>
          </Grid>

          {/* Drawer for small and medium screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ display: { md: 'none' } }} // Show only on small and medium screens
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ display: { md: 'none' } }} // Drawer only on small and medium screens
          >
            {SidebarContent}
          </Drawer>

          {/* Content - takes full width on small screens and 9/12 on medium and larger */}
          <Grid item xs={12} md={10}>
            <Content key={activeTab}>
              {renderContent()}
            </Content>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MyProfile;

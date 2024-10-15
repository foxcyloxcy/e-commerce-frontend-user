import React, { useEffect, useState } from 'react';
import { Box, Container, List, ListItem, ListItemText, ThemeProvider, Divider, IconButton, Drawer, Grid, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import ModTheme from '../ThemeComponent/ModTheme';
import UserProfileDetails from './UserProfileDetailsComponent/UserProfileDetails';
import VendorProfileDetails from './VendorProfileComponent/VendorProfileDetails';
import MyProducts from './MyProductsComponent/MyProducts';
import MyOffers from './MyOffersComponent/MyOffers';
import OffersToMe from './OffersToMeComponent/OffersToMe';
import MyItemPurchase from './MyItemPurchaseComponent/MyItemPurchase';
import ChangePassword from './UserPasswordChangeComponent/ChangePassword';
import secureLocalStorage from "react-secure-storage";
import secure from '../../assets/baseURL/secure';


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

const MyProfile = () => {

  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;
  const [activeTab, setActiveTab] = useState('Profile settings');
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for drawer


  useEffect(()=>{
    const storedUserData = secureLocalStorage.getItem(`${storagePrefix}_userData`, {
      hash: storageKey,
    });
    const storedUserToken = secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
      hash: storageKey,
    });
    
      if (storedUserData) {
        setUserData(storedUserData);
      } else {
        setUserData(null);
      }

      if (storedUserToken) {
        setUserToken(storedUserToken);
      } else {
        setUserToken(null);
      }
  },[userToken, userData])

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
        case 'My Item Purchase':
          return <MyItemPurchase userToken={userToken} />;
      default:
        return null;
    }
  };

  const SidebarContent = (
    <List sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
      <Divider />
      <ListItem button onClick={() => setActiveTab('Profile settings')}>
        <ListItemText primary="Personal Profile" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('Change password')}>
        <ListItemText primary="Change Password" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('Vendor settings')}>
        <ListItemText primary="Vendor Profile" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('My products')}>
        <ListItemText primary="My Items" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('My offers')}>
        <ListItemText primary="My Pending Bids" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('Offers to me')}>
        <ListItemText primary="Bids Received" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => setActiveTab('My Item Purchase')}>
        <ListItemText primary="My Purchase" />
      </ListItem>
      <Divider />
    </List>
  );

  if (!userData || !userToken) {
    return (
        <Grid container spacing={2} marginLeft={5}>
            <Typography>
                Loading...
            </Typography>
        </Grid>
    )
}

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
            sx={{
              display: { md: 'none' },
              ml: 0
            }} // Show only on small and medium screens
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ display: { md: 'none' } }} // Drawer only on small and medium screens
          >
            <Typography variant="h6" sx={{ padding: 2, backgroundColor: 'primary.dark', width: "100%" }}>My Profile</Typography>
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

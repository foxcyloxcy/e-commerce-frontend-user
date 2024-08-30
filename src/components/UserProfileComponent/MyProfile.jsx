import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemText, ThemeProvider, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import ModTheme from '../ThemeComponent/ModTheme';
import UserProfileDetails from './UserProfileDetailsComponent/UserProfileDetails';
import VendorProfileDetails from './VendorProfileComponent/VendorProfileDetails';
import MyProducts from './MyProductsComponent/MyProducts';
import MyOffers from './MyOffersComponent/MyOffers';
import OffersToMe from './OffersToMeComponent/OffersToMe';

// Define the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Root = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 220,
  height: '100%',
  backgroundColor: ModTheme.palette.secondary.background,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

// Apply the fade-in animation to the Content component
const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: 10,
  paddingRight: 10,
  animation: `${fadeIn} 0.8s ease-in-out`, // Set the fade-in animation
}));

const MyProfile = (props) => {
  const { userToken } = props
  const [activeTab, setActiveTab] = useState('Profile settings');

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile settings':
        return <UserProfileDetails userToken={userToken}/>;
      case 'My products':
        return <MyProducts userToken={userToken} />;
      case 'My offers':
        return <MyOffers userToken={userToken} />; // Replace with your MyOffers component
      case 'Offers to me':
        return <OffersToMe userToken={userToken} />; // Replace with your OffersToMe component
      case 'Vendor settings':
        return <VendorProfileDetails userToken={userToken} />; // Replace with your OffersToMe component
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{ marginTop: 10, marginBottom: 5 }}>
        <Root>
          <Sidebar>
            <List>
              <ListItem button onClick={() => setActiveTab('Profile settings')}>
                <ListItemText primary="Personal Profile" />
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
          </Sidebar>
          <Content key={activeTab}> {/* Adding key triggers re-animation when content changes */}
            {renderContent()}
          </Content>
        </Root>
      </Container>
    </ThemeProvider>
  );
};

export default MyProfile;

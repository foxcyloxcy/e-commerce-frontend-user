import React from 'react';
import { Box, Container, Grid, Paper, Avatar, Typography, Switch, List, ListItem, ListItemAvatar, ListItemText, Button, IconButton, ThemeProvider, Divider } from '@mui/material';
import { styled } from '@mui/system';
import SettingsIcon from '@mui/icons-material/Settings';
import ModTheme from '../ThemeComponent/ModTheme';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';

const Root = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 200,
  backgroundColor: ModTheme.palette.secondary.background,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const ProfileInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: ModTheme.palette.secondary.background,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SettingsItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const MyProfile = () => {
  return (
    <ThemeProvider theme={ModTheme}>
            <Container sx={{
        marginTop: 10,
        marginBottom: 5
    }}>
      <Root>
        <Sidebar>
          <List>
            <ListItem button>
              <ListItemText primary="Profile settings" />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary="My products" />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary="My offers" />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary="Offers to me" />
            </ListItem>
          </List>
        </Sidebar>
        <Content>
          <ProfileInfo>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt="Annie Stacey"
                  src="https://via.placeholder.com/150"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h6">Annie Stacey</Typography>
                <Typography variant="body2">CEO / Co-Founder</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">Profile Information</Typography>
                <Typography variant="body2">
                  Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2">Full Name: Alec M. Thompson</Typography>
                  <Typography variant="body2">Mobile: (44) 123 1234 123</Typography>
                  <Typography variant="body2">Email: alec.thompson@mail.com</Typography>
                  <Typography variant="body2">Location: USA</Typography>
                </Box>
              </Grid>
            </Grid>
          </ProfileInfo>
        </Content>
      </Root>
    </Container>
    </ThemeProvider>
  );
};

export default MyProfile;

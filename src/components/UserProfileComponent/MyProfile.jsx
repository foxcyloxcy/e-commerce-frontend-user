import React from 'react';
import { Box, Tabs, Tab, Typography, AppBar, Drawer, List, ListItem, ListItemText, CssBaseline, Toolbar } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyProfile = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawer = (
    <List>
      <ListItem button onClick={() => setValue(0)}>
        <ListItemText primary="Profile Details" />
      </ListItem>
      <ListItem button onClick={() => setValue(1)}>
        <ListItemText primary="My Products" />
      </ListItem>
      <ListItem button onClick={() => setValue(2)}>
        <ListItemText primary="My Offers" />
      </ListItem>
      <ListItem button onClick={() => setValue(3)}>
        <ListItemText primary="Offers Available" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={true}
          onClose={() => {}}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer variant="permanent" open>
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <TabPanel value={value} index={0}>
          Profile Details Content
        </TabPanel>
        <TabPanel value={value} index={1}>
          My Products Content
        </TabPanel>
        <TabPanel value={value} index={2}>
          My Offers Content
        </TabPanel>
        <TabPanel value={value} index={3}>
          Offers Available Content
        </TabPanel>
      </Box>
    </Box>
  );
}

export default MyProfile;
import React from 'react';
import { Box, Typography, List, ListItem, Link, Paper, Container, ThemeProvider } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const ContactUs = () => {
  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{
        marginTop: 15,
        marginBottom: 10,
        maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
      }}>
        <Paper elevation={3} sx={{ padding: 4, mt: 5, background: '#fff' }}>

          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>

          <Typography variant="body1" paragraph 
            sx={{
              display: 'flex',
            }}
            >
            <MailOutlineIcon/> Email us at <Link sx={{
              paddingLeft: 0.8
            }} href="mailto:hello@therelovedmarketplace.com"> hello@therelovedmarketplace.com</Link>
          </Typography>

          <Typography variant="body1" paragraph
            sx={{
              display: 'flex',
            }}
            >
          <WhatsAppIcon/> Send us a message at 
            <Link sx={{
              paddingLeft: 0.8
            }} href="https://wa.me/+971561748641" target="_blank" rel="noopener noreferrer"> WhatsApp
            </Link>
          </Typography>
          
        </Paper>
      </Container>
    </ThemeProvider>

  );
};

export default ContactUs;

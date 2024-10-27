import React from 'react';
import { Box, Typography, List, ListItem, Link, Paper, Container, ThemeProvider } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

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
          <Typography variant="body1" paragraph>
            Email us at <Link href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>

  );
};

export default ContactUs;

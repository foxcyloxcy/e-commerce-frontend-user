import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Button,
  CircularProgress,
  ThemeProvider
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';
import ModTheme from '../ThemeComponent/ModTheme';

const OnYourBehalf = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const calendlyRef = useRef(null);

  // Load Calendly script when needed
  useEffect(() => {
    if (showCalendly && !document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        setTimeout(() => {
          setCalendlyLoaded(true);
        }, 1000); // Fallback in case widget takes time
      };
      document.head.appendChild(script);
    } else if (showCalendly) {
      // Script already present, just wait for widget to render
      setTimeout(() => setCalendlyLoaded(true), 1000);
    }
  }, [showCalendly]);

  return (
    <ThemeProvider theme={ModTheme}>
      <Box sx={{ backgroundColor: '#F5F5F2', py: 8, px: 2, textAlign: 'center' }}>
        {/* Image Section */}
        <Box
          component="img"
          src="/concierge_image.jpg" // Replace with your image path
          alt="Get your item collected"
          sx={{
            width: { xs: "100%" },
            height: { xs: 300 },
            objectFit: { xs: "cover" },
            objectPosition: "15% 5%"
          }}
        />
        <Typography variant="h5" fontWeight="bold" gutterBottom color={ModTheme.palette.primary.main}>
          No time to list your items?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          We will come to your house, take the photos and upload on your behalf.
        </Typography>

        {showCalendly && (
          <Box sx={{ mb: 6 }}>
            {!calendlyLoaded && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            )}
            <Box
              ref={calendlyRef}
              className="calendly-inline-widget"
              data-url="https://calendly.com/hello-therelovedmarketplace/onyourbehalf?text_color=255773&primary_color=5e97c3"
              style={{
                minWidth: '320px',
                height: '700px',
                display: calendlyLoaded ? 'block' : 'none',
              }}
            />
          </Box>
        )}


        <Grid container spacing={2} justifyContent="center" mb={4}>
          <Grid item xs={12} sm={4}>
            <Stack spacing={0.5} alignItems="center">
              <CalendarMonthIcon sx={{ fontSize: 40, color: ModTheme.palette.primary.main }} />
              <Typography variant="h6" fontWeight="bold">Book</Typography>
              <Typography variant="body2">Choose a date & fill out the quick form.</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack spacing={0.5} alignItems="center">
              <ShoppingBagIcon sx={{ fontSize: 40, color: ModTheme.palette.primary.main }} />
              <Typography variant="h6" fontWeight="bold">Reloved lists on your behalf</Typography>
              <Typography variant="body2">We create an account on your behalf and upload your items.</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack spacing={0.5} alignItems="center">
              <AttachMoneyIcon sx={{ fontSize: 40, color: ModTheme.palette.primary.main }} />
              <Typography variant="h6" fontWeight="bold">Wait for the sale</Typography>
              <Typography variant="body2">Once your item sells you will receive the full amount in your designated bank account.</Typography>
            </Stack>
          </Grid>
        </Grid>

        {!showCalendly && (
          <Button
            variant="contained"
            sx={{ bgcolor: ModTheme.palette.primary.main, mb: 6 }}
            onClick={() => setShowCalendly(true)}
          >
            Book Now
          </Button>
        )}

        <Paper
          elevation={0}
          sx={{ backgroundColor: '#e9f1fa', p: 4, mx: 'auto', maxWidth: 500, borderRadius: 2, mb: 6 }}
        >
          <Stack spacing={2} alignItems="flex-start">
            <Typography><CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />Clear photos</Typography>
            <Typography><CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />We price and upload</Typography>
            <Typography><CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />Hassle free</Typography>
          </Stack>
        </Paper>

        <Typography variant="body1" fontStyle="italic" mb={1}>
          “Sophie came to my house, took photos of everything and then I liaised with the buyer to collect the items. It was so easy!”
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Emma, Dubai Marina
        </Typography>

        {!showCalendly && (
          <a href="/on-your-behalf-terms"
            rel="noopener noreferrer">
            <Button variant="contained" sx={{ bgcolor: ModTheme.palette.primary.main }}>
              View concierge terms and conditions
            </Button>
          </a>
        )}


      </Box>
    </ThemeProvider>
  );
};

export default OnYourBehalf;

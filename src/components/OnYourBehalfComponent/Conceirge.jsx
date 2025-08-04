import React from 'react';
import { Box, Typography, Grid, Paper, Stack, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';

const OnYourBehalf = () => {
  return (
    <Box sx={{ backgroundColor: '#F5F5F2', py: 8, px: 2, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="#255773">
        Let Us Sell For You
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        No time to list? We will come to your house, take the photos and upload on your behalf.
      </Typography>

      <Button variant="contained" sx={{ bgcolor: '#255773', mb: 6 }}>
        Book Now
      </Button>

      <Typography variant="h5" fontWeight="bold" gutterBottom color="#255773">
        How It Works
      </Typography>

      <Grid container spacing={4} justifyContent="center" mb={6}>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1} alignItems="center">
            <CalendarMonthIcon sx={{ fontSize: 40, color: '#255773' }} />
            <Typography variant="h6" fontWeight="bold">Book</Typography>
            <Typography variant="body2">Choose a date & fill out the quick form</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1} alignItems="center">
            <ShoppingBagIcon sx={{ fontSize: 40, color: '#255773' }} />
            <Typography variant="h6" fontWeight="bold">Hand Over</Typography>
            <Typography variant="body2">We will upload on your behalf</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1} alignItems="center">
            <AttachMoneyIcon sx={{ fontSize: 40, color: '#255773' }} />
            <Typography variant="h6" fontWeight="bold">We Sell</Typography>
            <Typography variant="body2">You get paid when it sells</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ backgroundColor: '#e9f1fa', p: 4, mx: 'auto', maxWidth: 500, borderRadius: 2, mb: 6 }}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography><CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />Clear photos</Typography>
          <Typography><CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />We price and upload</Typography>
          <Typography><CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />No upfront cost — just a small % when sold</Typography>
        </Stack>
      </Paper>

      <Typography variant="body1" fontStyle="italic" mb={1}>
        “Sophie came to my house, took photos of everything and then I liaised with the buyer to collect the items. It was so easy!”
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Emma, Dubai Marina
      </Typography>

      <Button variant="contained" sx={{ bgcolor: '#255773'}}>
        Book Your Concierge Service
      </Button>
    </Box>
  );
};

export default OnYourBehalf;

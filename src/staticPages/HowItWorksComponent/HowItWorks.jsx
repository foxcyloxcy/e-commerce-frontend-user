import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const HowItWorks = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          How It Works
        </Typography>
        
        {/* List Items Section */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            List your items in just a few minutes:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">1. <strong>Upload Photos:</strong> Add high-quality images of the items you want to sell.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">2. <strong>Provide a Detailed Description:</strong> Make sure your description is clear and accurate.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">3. <strong>Top Tip:</strong> Price your item based on its condition to attract buyers.</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* User-Friendly Purchasing */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            User-Friendly Purchasing:
          </Typography>
          <Typography variant="body1">
            - You can browse and filter for secondhand items.
          </Typography>
          <Typography variant="body1">
            - Place bids on items where sellers are open to offers.
          </Typography>
        </Box>

        {/* Easy Shipping */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Easy Shipping:
          </Typography>
          <Typography variant="body1">
            - Buyers are responsible for item collection, either in person, via courier, or through our trusted delivery partners.
          </Typography>
          <Typography variant="body1">
            - After a purchase, buyers and sellers will receive each other's contact details to arrange the collection or delivery.
          </Typography>
        </Box>

        {/* Cash-Free Transactions */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Cash-Free Transactions:
          </Typography>
          <Typography variant="body1">
            - All payments are processed securely through Stripe and deposited into your bank account, making the process smoother and more convenient than cash transactions.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HowItWorks;

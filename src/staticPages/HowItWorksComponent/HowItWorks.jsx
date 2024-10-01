import React from 'react';
import { Container, Typography, Box, Grid, Paper, Card, CardMedia } from '@mui/material';

const HowItWorks = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          How It Works
        </Typography>
        
        {/* List Items Section */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
            mb: 5
          }}>
            List your items in just a few minutes:
          </Typography>
          <Grid container spacing={2} sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                1. <strong>Upload Photos:</strong> Add high-quality images of the items you want to sell.
              </Typography>
              <Typography variant="body1" gutterBottom>
                2. <strong>Provide a Detailed Description:</strong> Make sure your description is clear and accurate.
              </Typography>
              <Typography variant="body1" gutterBottom>
                3. <strong>Top Tip:</strong> Price your item based on its condition to attract buyers.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image="/item-listing.jpg"
                  alt="Listing items"
                  sx={{ height: 250 }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* User-Friendly Purchasing */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
            mb: 5
          }}>
            User-Friendly Purchasing:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                - You can browse and filter for secondhand items.
              </Typography>
              <Typography variant="body1">
                - Place bids on items where sellers are open to offers.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image="/buying-process.jpg"
                  alt="Buying process"
                  sx={{ height: 250 }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Easy Shipping */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
            mb: 5
          }}>
            Easy Shipping:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                - Buyers are responsible for item collection, either in person, via courier, or through our trusted delivery partners.
              </Typography>
              <Typography variant="body1">
                - After a purchase, buyers and sellers will receive each other's contact details to arrange the collection or delivery.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image="/shipping.png"
                  alt="Shipping process"
                  sx={{ height: 250 }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Cash-Free Transactions */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
            mb: 5
          }}
          >
            Cash-Free Transactions:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                - All payments are processed securely through Stripe and deposited into your bank account, making the process smoother and more convenient than cash transactions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image="/cash-free.jpg"
                  alt="Cash-free transactions"
                  sx={{ height: 250 }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HowItWorks;

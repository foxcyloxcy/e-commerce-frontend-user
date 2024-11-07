import React from 'react';
import { Container, Box, Grid, Card, CardMedia, ThemeProvider, useMediaQuery } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const HowItWorks = () => {
  const isMediumScreen = useMediaQuery(ModTheme.breakpoints.up('md'));

  return (
    <ThemeProvider theme={ModTheme}>
      <Container maxWidth="lg" sx={{ mt: 15, mb: 5 }}>
        
        {/* Stacked List Items Section */}
        <Box mb={4}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    isMediumScreen
                      ? "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/desktop_images/list_your_items1.png"
                      : "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/list_your_items1.png"
                  }
                  alt="Listing items"
                  sx={{ height: 'auto', objectFit: 'contain' }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* User-Friendly Purchasing */}
        <Box mb={4}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    isMediumScreen
                      ? "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/desktop_images/user_friendly_purchase2.png"
                      : "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/user_friendly_purchase2.png"
                  }
                  alt="Buying process"
                  sx={{ height: 'auto', objectFit: 'contain' }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Easy Shipping */}
        <Box mb={4}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    isMediumScreen
                      ? "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/desktop_images/easy_delivery3.png"
                      : "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/easy_delivery3.png"
                  }
                  alt="Shipping process"
                  sx={{ height: 'auto', objectFit: 'contain' }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Cash-Free Transactions */}
        <Box>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    isMediumScreen
                      ? "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/desktop_images/cash_free_transactions4.png"
                      : "https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/how-it-works-imgs/cash_free_transactions4.png"
                  }
                  alt="Cash-free transactions"
                  sx={{ height: 'auto', objectFit: 'contain' }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default HowItWorks;

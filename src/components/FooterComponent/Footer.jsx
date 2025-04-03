import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ModTheme from '../ThemeComponent/ModTheme';

function Copyright(props) {
    return (
        <Typography variant="body2" color="secondary.dark" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://therelovedmarketplace.com/">
                Reloved
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Box
                sx={{
                    // backgroundColor: 'primary.light',
                    // color: 'secondary.background',
                    backgroundColor: 'primary.dark',
                    color: 'primary.main',
                    py: 3,
                    px: 3,
                    mt: 'auto',
                    borderTop: `1px solid ${ModTheme.palette.primary.light}`,
                }}
            >

                    <Grid container spacing={2} textAlign="left">
                        <Grid item xs={12} sm={6} md={3} sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Box component="img" src="https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_footer_banner.png" alt="Reloved Icon" 
                            sx={{ 
                                width: {xs: '50%', md: '70%'}, 
                                maxWidth: { xs: 'xs', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl' },
                                alignSelf: { xs: 'center', sm:'center', md:'start'}
                                }} />
                            <br />
                            The UAE's easiest marketplace for reloved items.
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6">Quick Links</Typography>
                            <Link href="/" color="inherit" underline="hover" variant="body2">Home</Link><br />
                            <Link href="/our-story" color="inherit" underline="hover" variant="body2">Our Story</Link><br />
                            <Link href="/contact-us" color="inherit" underline="hover" variant="body2">Contact Us</Link><br />
                            <Link href="/our-delivery-partners" color="inherit" underline="hover" variant="body2">Delivery Partners</Link><br />
                            <Link href="/how-it-works" color="inherit" underline="hover" variant="body2">How It Works</Link><br />
                            <Link href="/faq" color="inherit" underline="hover" variant="body2">Frequently Asked Questions</Link><br />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6">Follow Us</Typography>
                            <Link href="https://www.instagram.com/reloveduae/" color="inherit" underline="hover" variant="body2">Instagram</Link><br />
                            {/* <Link href="https://www.facebook.com/people/Reloved-Marketplace/61564862618552/" color="inherit" underline="hover" variant="body2">Facebook</Link><br /> */}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6">Policies</Typography>
                            <Link href="/terms-of-use" color="inherit" underline="hover" variant="body2">Terms of use</Link><br />
                            <Link href="/buyer-and-seller-terms" color="inherit" underline="hover" variant="body2">Seller and Buyer Terms</Link><br />
                            <Link href="/refund-policy" color="inherit" underline="hover" variant="body2">Return/Refund</Link><br />
                            <Link href="/privacy-policy" color="inherit" underline="hover" variant="body2">Privacy Policy</Link><br />
                        </Grid>
                    </Grid>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.dark',
                    py: 1,
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Copyright sx={{ mt: 1, mb: 1 }} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default Footer;

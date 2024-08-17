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
                    mt: 'auto',
                    borderTop: `1px solid ${ModTheme.palette.primary.light}`,
                }}
            >
                <Container>
                    <Grid container spacing={2} textAlign="left">
                        <Grid item xs={12} sm={6} md={3} sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Box component="img" src="reloved_footer_banner.png" alt="Reloved Icon" 
                            sx={{ 
                                width: '80%', 
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
                            <Link href="#" color="inherit" underline="hover" variant="body2">Contact</Link><br />
                            <Link href="#" color="inherit" underline="hover" variant="body2">How it works</Link><br />
                            <Link href="#" color="inherit" underline="hover" variant="body2">Frequently asked questions</Link><br />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6">Follow Us</Typography>
                            <Link href="#" color="inherit" underline="hover" variant="body2">Facebook</Link><br />
                            <Link href="#" color="inherit" underline="hover" variant="body2">Instagram</Link><br />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6">Policies</Typography>
                            <Link href="/terms-of-use" color="inherit" underline="hover" variant="body2">Terms of use</Link><br />
                            <Link href="/buyer-and-seller-terms" color="inherit" underline="hover" variant="body2">Seller and Buyer Terms</Link><br />
                            <Link href="#" color="inherit" underline="hover" variant="body2">Return/Refund</Link><br />
                            <Link href="/privacy-policy" color="inherit" underline="hover" variant="body2">Privacy Policy</Link><br />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.dark',
                    py: 1,
                }}
            >
                <Container>
                    <Copyright sx={{ mt: 1, mb: 1 }} />
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Footer;

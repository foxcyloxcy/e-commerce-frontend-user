import React from 'react';
import { Container, Typography, Box, ThemeProvider, Paper } from '@mui/material';
import ModTheme from '../components/ThemeComponent/ModTheme';
import BuyerAndSellerTerms from './BuyerAndSellerTermsComponent/BuyerAndSellerTerms';
import CookiesPolicy from './CookiePolicyComponent/CookiesPolicy';
import DataProcessingAgreement from './DataProcessingComponent/DataProcessing';
import PrivacyPolicy from './PrivacyPolicyComponent/PrivacyPolicy';
import RefundPolicy from './RefundPolicyComponent/RefundPolicy';
import ShippingAndDelivery from './ShippingAndDeliveryComponent/ShippingAndDelivery';
import TermsOfUse from './TermsOfUseComponent/TermsOfUse';

const TermsAndConditions = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                marginTop: 13,
                marginBottom: 10,
                minHeight: '60vh',
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl' },
            }}>
                <Paper elevation={3} sx={{ background: '#fff', width: '100%', pb: 1, pt: 2 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            TERMS AND CONDITIONS
                        </Typography>

                        <TermsOfUse/>
                        <BuyerAndSellerTerms/>
                        <DataProcessingAgreement/>
                        <PrivacyPolicy/>
                        <RefundPolicy/>
                        <ShippingAndDelivery/>
                        <CookiesPolicy/>

                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default TermsAndConditions;

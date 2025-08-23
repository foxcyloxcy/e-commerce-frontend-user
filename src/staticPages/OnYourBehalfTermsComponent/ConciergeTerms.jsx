import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ThemeProvider } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const ConciergeTerms = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, my: 10 }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: ModTheme.palette.primary.main ,mb: 3, textAlign: 'center' }}
                >
                    Reloved 'On Your Behalf' Service — Terms & Conditions
                </Typography>

                {/* Section 1 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                    1. Service Overview
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, mt: 2 }}>
                    Reloved will visit your chosen location on the agreed date and time to photograph and upload up to 30 secondhand items to your personal Reloved account. The session will last up to 1 hour.
                </Typography>

                {/* Section 2 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                    2. Consent & Authorization
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="You give Reloved permission to act on your behalf for the sole purpose of uploading and listing your items to your Reloved account." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="You agree to create a Reloved account and provide login details for us to access and complete the listing process." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="You authorize Reloved to photograph, edit, and upload images of your items as required." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="You understand that once the listing is complete, Reloved will not manage your account, communications, or any post-listing activities — full control and responsibility remain with you." />
                    </ListItem>
                </List>

                {/* Section 3 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                    3. Payment Terms
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="The total service fee is AED 280 / USD 78." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Payment is required in full to confirm your appointment." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="The fee is non-refundable, unless cancellation is made with a minimum of 48 hours’ notice prior to the appointment." />
                    </ListItem>
                </List>

                {/* Section 4 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                    4. After the Appointment – Your Responsibilities
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="You are responsible for managing your listings, responding to buyer enquiries, setting or adjusting pricing, and arranging collections or deliveries." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="You also agree to remove sold items and keep your account active and up to date." />
                    </ListItem>
                </List>

                {/* Section 5 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                    5. Sales Disclaimer
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Reloved will ensure all listings are uploaded with care and quality, but we cannot guarantee the sale of any item.
                </Typography>

                {/* Section 6 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                    6. Agreement & Confirmation
                </Typography>
                <Typography variant="body1">
                    By proceeding with payment and confirming your appointment, you acknowledge and accept the terms outlined above.
                </Typography>
            </Box>
        </ThemeProvider>
    );
};

export default ConciergeTerms;

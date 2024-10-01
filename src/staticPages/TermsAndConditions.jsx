import React from 'react';
import { Container, Typography, Box, ThemeProvider, Paper } from '@mui/material';
import ModTheme from '../components/ThemeComponent/ModTheme';

const TermsAndConditions = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                marginTop: 13,
                marginBottom: 10,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
            }}>
                <Paper elevation={3} sx={{ padding: 4, background: '#fff', width: '100%' }}>
                    <Box>
                        <Typography variant="h2" align="center" gutterBottom>
                            TERMS AND CONDITIONS
                        </Typography>

                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default TermsAndConditions;

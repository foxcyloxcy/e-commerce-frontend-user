import { ThemeProvider } from '@emotion/react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme'; // Make sure ModTheme is imported correctly



const HomeListItem = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f7f7f7' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    understand how it works
                </Typography>
                <a href="/how-it-works" target="_blank"
                    rel="noopener noreferrer">
                    <Button variant="contained" sx={{ bgcolor: '#002a4e' }}>
                        How it works
                    </Button>
                </a>
            </Box>
        </ThemeProvider>
    );
};

export default HomeListItem;
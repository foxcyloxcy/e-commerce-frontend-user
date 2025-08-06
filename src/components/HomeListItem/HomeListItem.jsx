import { ThemeProvider } from '@emotion/react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme'; // Make sure ModTheme is imported correctly



const HomeListItem = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Box sx={{ textAlign: 'center', py: 6, bgcolor: '#f7f7f7' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Have something to sell?
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#002a4e' }}>
                    List an item
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default HomeListItem;
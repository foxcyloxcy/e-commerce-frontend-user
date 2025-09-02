import { ThemeProvider } from '@emotion/react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme'; // Make sure ModTheme is imported correctly



const HomeListItem = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Box sx={{ textAlign: 'center', py: 2, bgcolor: '#f7f7f7' }}>
                {/* <a href="/how-it-works"
                    rel="noopener noreferrer">
                    <Button variant="contained" sx={{ bgcolor: ModTheme.palette.primary.main, mr: 2 }}>
                        How it works
                    </Button>
                </a> */}

                <a href="/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties="
                    rel="noopener noreferrer">
                    <Button variant="contained" sx={{ bgcolor: ModTheme.palette.primary.main }}>
                        Shop Reloved
                    </Button>
                </a>
            </Box>
        </ThemeProvider>
    );
};

export default HomeListItem;
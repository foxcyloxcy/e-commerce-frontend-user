import React from 'react';
import { Container, Typography, Box, Paper, Avatar, ThemeProvider } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const OurStoryPage = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{ marginTop: 15,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
             }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Our Story
                </Typography>

                <Paper elevation={3} sx={{ padding: 4, marginBottom: 4, background: '#fff' }}>
                    <Typography variant="body1" paragraph>
                        Reloved, is your go-to marketplace for buying and selling second-hand clothes, baby items, furniture, accessories, and more.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At Reloved, we believe in the power of sustainability and the positive impact of rehoming items. Our mission is to make it easy for you to find new homes and to purchase used items, while also making it simple to discover unique treasures.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our platform is designed to be hassle-free, connecting buyers and sellers seamlessly. Whether you’re looking to declutter your space or hunt for a special find, Reloved provides a space where you can do both with ease. By participating in our marketplace, you're not only making environmentally conscious choices, but also supporting the local community.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Join us in our journey to promote sustainability, save money, and support local. Reloved is here to make second-hand shopping a delightful and rewarding experience for everyone.
                    </Typography>
                </Paper>

                <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 4 }}>
                    <Avatar
                        alt="Founder"
                        src="/reloved_founder.jpg"  // Replace this with the correct path for the image
                        sx={{ width: 350, height: 350, marginBottom: 2, alignSelf:'center' }}
                    />
                    <Typography variant="h5" align="center" gutterBottom>
                        A message from the founder
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Drawing from my own experiences, I realised how many items we all have in our homes and wardrobes that could be resold or recycled to support sustainability. The UAE, with its stunning cities, inspired me to want new outfits each weekend without spending a fortune or feeling guilty about the environmental impact. Moreover, Dubai’s transient nature, with expats frequently leaving, often leads to luxurious furniture being sold at low prices or even given away for free. I wanted a way to access these items for my home without always buying new.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        When I couldn’t find an easy-to-use platform to resell items and make some extra cash, I decided to create one myself: a user-friendly website designed for you. My mission is to leave this planet better than I found it.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Thank you for contributing to environmental sustainability and supporting my dream of providing the people of the UAE with a platform I wish had existed years ago.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Warm regards,
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Annie x
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>

    );
}

export default OurStoryPage;

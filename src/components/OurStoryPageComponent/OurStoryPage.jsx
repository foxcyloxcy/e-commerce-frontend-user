import React from 'react';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';

const OurStoryPage = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Story
      </Typography>
      
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="body1" paragraph>
          Reloved, is your go-to marketplace for buying and selling second-hand clothes, baby items, furniture, accessories, and more. 
          At Reloved, we believe in the power of sustainability and the positive impact of rehoming items. Our mission is to make it easy for you to find new homes and to purchase used items, while also making it simple to discover unique treasures. 
          Our platform is designed to be hassle-free, connecting buyers and sellers seamlessly. Whether you’re looking to declutter your space or hunt for a special find, Reloved provides a space where you can do both with ease. By participating in our marketplace, you're not only making environmentally conscious choices, but also supporting the local community.
          Join us in our journey to promote sustainability, save money, and support local. Reloved is here to make second-hand shopping a delightful and rewarding experience for everyone.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
        <Avatar 
          alt="Founder" 
          src="/path-to-your-image.jpg"  // Replace this with the correct path for the image
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <Typography variant="h5" align="center" gutterBottom>
          A message from the founder
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Drawing from my own experiences, I realised how many items we all have in our homes and wardrobes that could be resold or recycled to support sustainability. The UAE, with its stunning cities, inspired me to want new outfits each weekend without spending a fortune or feeling guilty about the environmental impact. Moreover, Dubai’s transient nature, with expats frequently leaving, often leads to luxurious furniture being sold at low prices or even given away for free. I wanted a way to access these items for my home without always buying new.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          When I couldn’t find an easy-to-use platform to resell items and make some extra cash, I decided to create one myself: a user-friendly website designed for you. My mission is to leave this planet better than I found it.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Thank you for contributing to environmental sustainability and supporting my dream of providing the people of the UAE with a platform I wish had existed years ago.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Warm regards,
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Annie x
        </Typography>
      </Box>
    </Container>
  );
}

export default OurStoryPage;

import React from 'react';
import { Typography, Box, Card, CardContent, Link, CardMedia, ThemeProvider } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const DeliveryPartners = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Box sx={{ maxWidth: 900, margin: 'auto', marginTop: 10, marginBottom: 5, padding: 2 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Our Delivery Partners
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Whether you’re wanting to get a sofa, wardrobe, or a dress delivered, no item is too small or too big with our delivery partners.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Small Items
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            You can arrange for collection of the item by selecting the ‘box’ service on your Careem app.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Furniture
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            All large furniture items can be arranged by WhatsApping or emailing Mirza at Shah Movers. Quote ‘reloved’ to ensure you obtain a discounted price.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Contact details:
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Phone: <Link href="tel:0508579207">0508579207</Link><br />
                            Email: <Link href="mailto:mirza@shahmovers.com">mirza@shahmovers.com</Link>
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            The team can also disassemble or reassemble your items.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Top Tip:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Ensure you have spoken with the seller prior to using our delivery partners to check they are available to hand over your item.
                        </Typography>

                        <CardMedia
                            component="img"
                            image="/delivery-partners-image.jpg" // Update the path if needed
                            alt="Delivery Partners"
                            sx={{ height: 300, objectFit: 'contain', marginBottom: 2 }}
                        />

                        <Typography variant="body1" color="textSecondary">
                            Reloved is not responsible for any of the delivery options you choose, and delivery is an additional payment from the buyer.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
};

export default DeliveryPartners;

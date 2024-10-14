import React from 'react';
import {
    Box, Typography, Container, Paper, ThemeProvider, List,
    ListItem,
    ListItemText,
    Divider,
    Link
} from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const BuyerAndSellerTerms = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                marginTop: 15,
                marginBottom: 10,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
            }}>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4, background: '#fff' }}>
                    <Typography variant="h4" gutterBottom>
                    SELLER TERMS AND CONDITIONS
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Thank you for choosing to sell your items on Pre Amada Fze (also referred to as Reloved). We appreciate your commitment to providing a safe and reliable platform for buyers and sellers to transact with each other. As a seller on our platform, you agree to abide by the following terms and conditions:
                    </Typography>

                    <List>
                        <ListItem>
                            <ListItemText primary="1. Listing Items: You may only list items that you own and have the legal right to sell. You must provide accurate and detailed information about the item in the item description, including its condition, features, and any defects. You may not list items that are prohibited by law or our platform policies, including counterfeit items, illegal drugs, weapons, or items that infringe on intellectual property rights." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2. Pricing and Fees: You are responsible for setting the price of your item, and may adjust the price at any time. Our platform charges a 20% commission fee for each item bought, this will be an additional payment via a service fee for using the platform which is absorbed by the buyer. The buyer is responsible for any other fees associated with the transaction, such as arranging delivery or arranging a return of the item if the buyer is dissatisfied.  " />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="3. Shipping and Delivery: The buyer is responsible for ensuring the item is delivered whether through collection or any other agreed delivery method. You should provide accurate shipping information, and collaborate with any courier service that the buyer has arranged to ensure a smooth and easy collection process. The buyer may choose from a variety of shipping methods, including standard ground shipping, expedited shipping, or local pickup. As a seller, you must ensure that the item is received by the buyer in a timely and secure manner. If the buyer wishes to arrange for the delivery of the item, it is their responsibility to do so.  " />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="4. Communication with Buyers: You should respond to buyer enquiries and messages promptly and professionally. You should be available to answer questions about your item, shipping, and other transaction details. You should notify the buyer of any delays or issues with shipping and delivery. Communication is key in ensuring a smooth and satisfactory transaction for both the buyer and seller." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="5. Refunds and Returns: The buyer is responsible for ensuring that they collect the item within agreed timeframes. Failure to do so will result in the buyer being unable to request a refund if the item is not up to their standards. If the buyer wishes to arrange for delivery, they must liaise with the seller and assume responsibility for collecting, couriering, and paying for the item. However, we recommend that the seller and buyer arrange for collection whenever possible. It is the seller's responsibility to provide accurate information about the item's condition and address any issues with the buyer. If a buyer requests a return or refund within a 48 hour timeframe, the seller should work with the buyer to promptly resolve the issue. If the seller is unable to reach a resolution with the buyer, the buyer may escalate the issue to our customer support team for assistance. It is important for sellers to resolve any issues with buyers amicably and in a timely manner to maintain a positive reputation on our platform." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="6. Prohibited Activities: You may not engage in any fraudulent or illegal activities on our platform, including selling counterfeit items, manipulating feedback ratings, or engaging in price gouging. You may not use our platform to harass or intimidate buyers, or to solicit personal information from buyers. Sellers found engaging in any prohibited activities may face account suspension or termination, and may be held liable for any damages caused to buyers." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="7. Termination of Account: We reserve the right to suspend or terminate your account if you violate any of these terms or engage in any fraudulent or illegal activity. We may also remove any listings or content that violate our policies. As a seller, it is important to ensure that you comply with our policies and guidelines to maintain a positive and trustworthy image on our platform." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="8. Changes to Terms and Conditions: We may update or modify these terms and conditions at any time. We will notify you of any changes via email or by posting a notice on our platform. Your continued use of our platform after such notice constitutes your acceptance of the updated terms and conditions." />
                        </ListItem>
                    </List>

                    <Typography variant="body1" paragraph>
                    Thank you for choosing our platform for your selling needs. As a seller on our platform, you play a critical role in maintaining the integrity and trustworthiness of our platform. If you have any questions or concerns about these terms and conditions, please do not hesitate to contact us at <Link href="mailto:hello@therelovedmarketplace.com ">hello@therelovedmarketplace.com </Link>
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        BUYER TERMS AND CONDITIONS
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Thank you for choosing to buy your items on Pre Amada Fze (also referred to as Reloved). We appreciate your commitment to providing a safe and reliable platform for buyers and sellers to transact with each other. As a buyer on our platform, you agree to abide by the following terms and conditions:
                    </Typography>

                    <List>
                        <ListItem>
                            <ListItemText primary="1. Purchasing Items: Prior to purchasing your item you must ensure you have received a sufficient number of photos and information prior to making your purchase. You must not purchase items that are prohibited by law or our platform policies, including counterfeit items, illegal drugs, weapons, or items that infringe on intellectual property rights." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2. Pricing and Fees: Our platform charges a 20% commission fee for each item bought, this will be an additional payment to the item you purchase. You are responsible for any other fees associated with the transaction, such as arranging a return of the item if you (the buyer) is dissatisfied. " />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="3. Shipping and Delivery: You (the buyer) are responsible for ensuring the item is collected from the seller through collection or any other agreed delivery method. You may choose from a variety of shipping methods, including standard ground shipping, expedited shipping, or local pickup. As a buyer, you must ensure that the item is received by them in a timely and secure manner. " />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="4. Refunds and Returns: The buyer is responsible for ensuring that they collect the item within a timely manner as agreed with the seller. Failure to do so will result in the buyer being unable to request a refund if the item is not up to their standards. If the buyer wishes to arrange for delivery, they must liaise with the seller and assume responsibility for collecting, couriering, and paying for the item. We recommend that the seller and buyer arrange for collection whenever possible. It is the seller's responsibility to provide accurate information about the item's condition and address any issues with the buyer. If a buyer requests a return or refund within a 48 hour timeframe, the seller should work with the buyer to promptly resolve the issue. If the buyer is unable to reach a resolution with the seller the buyer may escalate the issue to our customer support team for assistance. It is important for users to resolve any issues amicably and in a timely manner to maintain a positive reputation on our platform." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="5. Prohibited Activities: You may not engage in any fraudulent or illegal activities on our platform, including selling counterfeit items, manipulating feedback ratings, or engaging in price gouging. You may not use our platform to harass or intimidate users, or to solicit personal information from users. Users found engaging in any prohibited activities may face account suspension or termination, and may be held liable for any damages caused to buyers." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="6. Termination of Account: We reserve the right to suspend or terminate your account if you violate any of these terms or engage in any fraudulent or illegal activity. We may also remove any listings or content that violate our policies. As a buyer, it is important to ensure that you comply with our policies and guidelines to maintain a positive and trustworthy image on our platform." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="7. Changes to Terms and Conditions: We may update or modify these terms and conditions at any time. We will notify you of any changes via email or by posting a notice on our platform. Your continued use of our platform after such notice constitutes your acceptance of the updated terms and conditions." />
                        </ListItem>
                    </List>

                    <Typography variant="body1" paragraph>
                        Thank you for choosing our platform for your buying needs. As a buyer on our platform, you play a critical role in maintaining the integrity and trustworthiness of our platform. If you have any questions or concerns about these terms and conditions, please do not hesitate to contact us at <Link href="mailto:hello@therelovedmarketplace.com ">hello@therelovedmarketplace.com </Link>
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default BuyerAndSellerTerms;

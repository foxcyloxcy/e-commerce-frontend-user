import React from 'react';
import { Box, Typography, Container, Paper, ThemeProvider } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';

const TermsAndConditions = () => {
    return (
        <ThemeProvider theme={ModTheme}>
        <Container sx={{
            marginTop: 15,
            marginBottom: 10,
            maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
        }}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4, background: '#fff' }}>
                <Typography variant="h4" gutterBottom>
                    Seller Terms
                </Typography>

                <Typography variant="body1" paragraph>
                    Thank you for choosing to sell your items on Reloved! We appreciate your commitment to providing a safe and reliable platform for buyers and sellers to transact with each other. As a seller on our platform, you agree to abide by the following terms and conditions:
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Listing Items
                </Typography>
                <Typography variant="body1" paragraph>
                    You may only list items that you own and have the legal right to sell. You must provide accurate and detailed information about the item in the item description, including its condition, features, and any defects. You may not list items that are prohibited by law or our platform policies, including counterfeit items, illegal drugs, weapons, or items that infringe on intellectual property rights.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Pricing and Fees
                </Typography>
                <Typography variant="body1" paragraph>
                    You are responsible for setting the price of your item, and may adjust the price at any time. Our platform charges a 20% commission fee for each item bought, this will be an additional payment via a service fee for using the platform which is absorbed by the buyer. The buyer is responsible for any other fees associated with the transaction, such as arranging a return of the item if the buyer is dissatisfied.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Shipping and Delivery
                </Typography>
                <Typography variant="body1" paragraph>
                    The buyer is responsible for ensuring the item is delivered whether through collection or any other agreed delivery method. You should provide accurate shipping information, and collaborate with any courier service that the buyer has arranged to ensure a smooth and easy collection process. The buyer may choose from a variety of shipping methods, including standard ground shipping, expedited shipping, or local pickup. As a seller, you must ensure that the item is received by the buyer in a timely and secure manner. If the buyer wishes to arrange for the delivery of the item, it is their responsibility to do so. However, as the seller, you must cooperate with the buyer and ensure that the item is given to them in a timely manner.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Communication with Buyers
                </Typography>
                <Typography variant="body1" paragraph>
                    You should respond to buyer inquiries and messages promptly and professionally. You should be available to answer questions about your item, shipping, and other transaction details. You should notify the buyer of any delays or issues with shipping and delivery. Communication is key in ensuring a smooth and satisfactory transaction for both the buyer and seller.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Refunds and Returns
                </Typography>
                <Typography variant="body1" paragraph>
                    The buyer is responsible for ensuring that they collect the item within 48 hours of purchase. Failure to do so will result in the buyer being unable to request a refund if the item is not up to their standards. If the buyer wishes to arrange for delivery, they must liaise with the seller and assume responsibility for collecting, couriering, and paying for the item. However, we recommend that the seller and buyer arrange for collection whenever possible. It is the seller's responsibility to provide accurate information about the item's condition and address any issues with the buyer. If a buyer requests a return or refund within a 48-hour timeframe, the seller should work with the buyer to promptly resolve the issue. If the seller is unable to reach a resolution with the buyer, the buyer may escalate the issue to our customer support team for assistance. It is important for sellers to resolve any issues with buyers amicably and in a timely manner to maintain a positive reputation on our platform.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Prohibited Activities
                </Typography>
                <Typography variant="body1" paragraph>
                    You may not engage in any fraudulent or illegal activities on our platform, including selling counterfeit items, manipulating feedback ratings, or engaging in price gouging. You may not use our platform to harass or intimidate buyers, or to solicit personal information from buyers. Sellers found engaging in any prohibited activities may face account suspension or termination, and may be held liable for any damages caused to buyers.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Termination of Account
                </Typography>
                <Typography variant="body1" paragraph>
                    We reserve the right to suspend or terminate your account if you violate any of these terms or engage in any fraudulent or illegal activity. We may also remove any listings or content that violate our policies. As a seller, it is important to ensure that you comply with our policies and guidelines to maintain a positive and trustworthy image on our platform.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Changes to Terms and Conditions
                </Typography>
                <Typography variant="body1" paragraph>
                    We may update or modify these terms and conditions at any time. We will notify you of any changes via email or by posting a notice on our platform. Your continued use of our platform after such notice constitutes your acceptance of the updated terms and conditions.
                </Typography>

                <Typography variant="body1" paragraph>
                    Thank you for choosing our platform for your selling needs. As a seller on our platform, you play a critical role in maintaining the integrity and trustworthiness of our platform. If you have any questions or concerns about these terms and conditions, please do not hesitate to contact us.
                </Typography>

                <Typography variant="h4" gutterBottom>
                    Buyer Terms
                </Typography>

                <Typography variant="body1" paragraph>
                    Thank you for choosing to buy your items on Reloved! We appreciate your commitment to providing a safe and reliable platform for buyers and sellers to transact with each other. As a buyer on our platform, you agree to abide by the following terms and conditions:
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Purchasing Items
                </Typography>
                <Typography variant="body1" paragraph>
                    Prior to purchasing your item you must ensure you have received a sufficient number of photos and information prior to making your purchase. You must not purchase items that are prohibited by law or our platform policies, including counterfeit items, illegal drugs, weapons, or items that infringe on intellectual property rights.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Pricing and Fees
                </Typography>
                <Typography variant="body1" paragraph>
                    Our platform charges a 20% commission fee for each item bought, this will be an additional payment to the item you purchase. You are responsible for any other fees associated with the transaction, such as arranging a return of the item if you (the buyer) are dissatisfied.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Shipping and Delivery
                </Typography>
                <Typography variant="body1" paragraph>
                    You (the buyer) are responsible for ensuring the item is collected from the seller through collection or any other agreed delivery method. You may choose from a variety of shipping methods, including standard ground shipping, expedited shipping, or local pickup. As a buyer, you must ensure that the item is received in a timely and secure manner.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Refunds and Returns
                </Typography>
                <Typography variant="body1" paragraph>
                    The buyer is responsible for ensuring that they collect the item within 48 hours unless agreed with the seller. Failure to do so will result in the buyer being unable to request a refund if the item is not up to their standards. If the buyer wishes to arrange for delivery, they must liaise with the seller and assume responsibility for collecting, couriering, and paying for the item. We recommend that the seller and buyer arrange for collection whenever possible. It is the seller's responsibility to provide accurate information about the item's condition and address any issues with the buyer. If a buyer requests a return or refund within a 48-hour timeframe, the seller should work with the buyer to promptly resolve the issue. If the buyer is unable to reach a resolution with the seller, the buyer may escalate the issue to our customer support team for assistance. It is important for users to resolve any issues amicably and in a timely manner to maintain a positive reputation on our platform.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Prohibited Activities
                </Typography>
                <Typography variant="body1" paragraph>
                    You may not engage in any fraudulent or illegal activities on our platform, including selling counterfeit items, manipulating feedback ratings, or engaging in price gouging. You may not use our platform to harass or intimidate users, or to solicit personal information from users. Users found engaging in any prohibited activities may face account suspension or termination, and may be held liable for any damages caused to buyers.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Termination of Account
                </Typography>
                <Typography variant="body1" paragraph>
                    We reserve the right to suspend or terminate your account if you violate any of these terms or engage in any fraudulent or illegal activity. We may also remove any listings or content that violate our policies. As a buyer, it is important to ensure that you comply with our policies and guidelines to maintain a positive and trustworthy image on our platform.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Changes to Terms and Conditions
                </Typography>
                <Typography variant="body1" paragraph>
                    We may update or modify these terms and conditions at any time. We will notify you of any changes via email or by posting a notice on our platform. Your continued use of our platform after such notice constitutes your acceptance of the updated terms and conditions.
                </Typography>

                <Typography variant="body1" paragraph>
                    Thank you for choosing our platform for your buying needs. As a buyer on our platform, you play a critical role in maintaining the integrity and trustworthiness of our platform. If you have any questions or concerns about these terms and conditions, please do not hesitate to contact us at hello@therelovedmarketplace.com.
                </Typography>
            </Paper>
        </Container>
        </ThemeProvider>
    );
};

export default TermsAndConditions;

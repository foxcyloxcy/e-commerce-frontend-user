import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, ThemeProvider, Container, Paper } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const RefundPolicy = () => {
  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{
        marginTop: 10, marginBottom: 5,
        maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
      }}>
        <Paper elevation={3} sx={{ padding: 4, mt: 5, background: '#fff' }}>
          <Typography variant="h4" gutterBottom>
            REFUND POLICY
          </Typography>

          <Typography paragraph>
            At Pre Amada Fze (Reloved), we strive to provide a safe and reliable platform for buyers and sellers to transact with each other. We understand that sometimes a buyer may need to return an item or request a refund, and we are committed to ensuring a fair and transparent refund process. Reloved work with Mamo Pay, a payment gateway service for a smooth process of transactions.
          </Typography>

          <Typography variant="h6" gutterBottom>
            In the event that you need to request a refund for an item purchased on our platform, please follow the steps outlined below:
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary="1. Contact the seller: " secondary=" If you are not satisfied with your purchase, please contact the seller directly to request a return or refund. The seller will have the opportunity to resolve the issue with you directly. The buyer has two days to request a refund from the seller." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.	Wait for the seller's response:" secondary=" Once you have initiated a refund request, the seller will have the opportunity to respond and provide their own explanation or resolution. The seller will have up to 7 days to respond to the refund request." />
            </ListItem>
            <ListItem>
              <ListItemText primary="3.	Escalate the refund request:" secondary=" If you are unable to reach a resolution with the seller, you can escalate the refund request to our customer support team. We will review the case and make a determination based on the information provided by both parties." />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography paragraph>
            Please note that our refund policy applies only to items purchased through our platform. We are not responsible for any refunds or returns for items purchased outside of our platform and nor are we responsible for reimbursing any costs, this sits solely with the seller however the platform, Reloved will assist those where required in receiving the refund from the seller. 
          </Typography>
          <Typography paragraph>
            For any service fees paid for the purchase of an item will not be refunded but the price of the item will be. 
          </Typography>
          <Typography variant="h6" gutterBottom>
            Additionally, we will not issue refunds for the following:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="●	Items that have been used, altered, or damaged after delivery" />
            </ListItem>
            <ListItem>
              <ListItemText primary="●	Items that are not in their original condition or packaging" />
            </ListItem>
            <ListItem>
              <ListItemText primary="●	Items that were purchased more than two days prior to the refund request" />
            </ListItem>
            <ListItem>
              <ListItemText primary="●	Items that were custom-made or personalized" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography paragraph sx={{ mt: 2 }}>
            Finally, please be aware that our refund policy may be subject to change at any time. We encourage you to review this policy regularly to stay informed of any updates or changes. Reloved are not liable for any refunds, however we can help in cases where there are disputes.
          </Typography>

          <Typography paragraph>
            Thank you for choosing our platform for your buying and selling needs. If you have any questions or concerns about our refund policy, please do not hesitate to contact us on <a href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</a>.
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default RefundPolicy;

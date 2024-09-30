import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, ThemeProvider, Container } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const RefundPolicy = () => {
  return (
    <ThemeProvider theme={ModTheme}>
        <Container sx={{ marginTop: 10,
    maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
    }}>
      <Typography variant="h4" gutterBottom>
        REFUND POLICY
      </Typography>

      <Typography paragraph>
        At Pre Amada Fze (Reloved), we strive to provide a safe and reliable platform for buyers and sellers to transact with each other. We understand that sometimes a buyer may need to return an item or request a refund, and we are committed to ensuring a fair and transparent refund process. Reloved works with Stripe, a payment gateway service, for smooth transaction processes.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Steps to Request a Refund:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="1. Contact the seller" secondary="If you are not satisfied with your purchase, contact the seller directly to request a return or refund. The buyer has two days to request a refund from the seller." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Wait for the seller's response" secondary="The seller has up to 7 days to respond to your refund request. During this time, they will provide their own explanation or resolution." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Escalate the refund request" secondary="If you can't reach a resolution with the seller, escalate the refund request to our customer support team. We will review the case and make a determination." />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Important Notes:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Refunds apply only to items purchased through our platform." />
        </ListItem>
        <ListItem>
          <ListItemText primary="We are not responsible for refunds or returns for items purchased outside of our platform." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Reloved can assist in cases where required but is not liable for reimbursing any costs." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Service fees paid for the purchase of an item are non-refundable." />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        No Refunds Will Be Issued For:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Items used, altered, or damaged after delivery." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Items not in original condition or packaging." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Items purchased more than two days prior to the refund request." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Custom-made or personalized items." />
        </ListItem>
      </List>

      <Typography paragraph sx={{ mt: 2 }}>
        Please note that our refund policy may be subject to change. We encourage you to review this policy regularly to stay informed of any updates or changes.
      </Typography>

      <Typography paragraph>
        If you have any questions or concerns about our refund policy, please contact us at <a href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</a>.
      </Typography>
      </Container>
      </ThemeProvider>
  );
};

export default RefundPolicy;

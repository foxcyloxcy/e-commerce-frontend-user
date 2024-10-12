import React from 'react';
import { Box, Typography, List, ListItem, Link, Paper, Container } from '@mui/material';

const CookiesPolicy = () => {
  return (
    <Container sx={{
      marginTop: 15,
      marginBottom: 10,
      maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
    }}>
      <Paper elevation={3} sx={{ padding: 4, mt: 5, background: '#fff' }}>

        <Typography variant="h4" gutterBottom>
          Cookies Policy
        </Typography>
        <Typography variant="body1" paragraph>
          At <strong>Pre Amada Fze</strong>, trading as <strong>Reloved</strong>, we use cookies to improve your experience on our website. Specifically, we use cookies to:
        </Typography>
        <List>
          <ListItem>- Store information for the time you are on the Website (called "Session Cookies")</ListItem>
          <ListItem>- Store information to recognize your browser or device each time you visit (called "Persistent Cookies")</ListItem>
          <ListItem>- Store your login and password information, if you choose to</ListItem>
          <ListItem>- Store your user settings, like audio and display settings</ListItem>
          <ListItem>- Analyze your behavior on our Website, so we can continue to improve</ListItem>
          <ListItem>- Allow others to advertise on our Website or track information about you to improve advertising</ListItem>
        </List>
        <Typography variant="body1" paragraph>
          By using our Website or any of our services, you consent to our use of cookies. This Cookies Policy explains what cookies are, how we use them, and your rights in relation to our use of cookies. We also discuss third-party cookies and their implications.
        </Typography>

        <Typography variant="h6" gutterBottom>
          What are cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Cookies are small files placed on your device to store information, including your preferences or device details. They help adapt the Website to your needs and do not store personal data.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How we use cookies
        </Typography>
        <Typography variant="body1" paragraph>
          We use technical cookies for navigation and to facilitate your use of the Website. You can manage or deactivate cookies via your browser settings, but this may affect your access to certain parts of the Website. We also use analytics cookies to collect aggregated data on how you use the Website. These cookies include:
        </Typography>
        <List>
          <ListItem>- Internet protocol (IP) address</ListItem>
          <ListItem>- Browser type and device information</ListItem>
          <ListItem>- Operating system</ListItem>
          <ListItem>- Internet Service Provider (ISP)</ListItem>
          <ListItem>- Country information</ListItem>
          <ListItem>- Date and time of visit</ListItem>
          <ListItem>- Web page origin (referral) and exit page</ListItem>
          <ListItem>- Number of clicks</ListItem>
        </List>

        <Typography variant="body1" paragraph>
          We use session cookies to keep track of your browsing during a session, and persistent cookies to recognize you across sessions, store login details, and save your settings. Third-party cookies may track your behavior for advertising purposes, including remarketing cookies that allow us to display ads on other websites. When we use these cookies, we will ask for your consent.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Consent
        </Typography>
        <Typography variant="body1" paragraph>
          Upon visiting our Website, you will see a cookie consent banner. If you choose to proceed, you agree to the use of cookies. You can manage cookies via your browser, but doing so may affect how the Website functions.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Browser Cookie Management
        </Typography>
        <Typography variant="body1" paragraph>
          You can manage cookies through your browser settings. Deleting cookies may remove preferences you have set on the Website and others. For more help on managing cookies, visit your browser’s help pages:
        </Typography>
        <List>
          <ListItem>
            <Link href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies" target="_blank" rel="noopener">
              Internet Explorer
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://support.mozilla.org/en-us/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener">
              Firefox
            </Link>
          </ListItem>
          <ListItem>
            <Link href="http://www.apple.com/legal/privacy/" target="_blank" rel="noopener">
              Safari
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://support.google.com/accounts/answer/61416?hl=en" target="_blank" rel="noopener">
              Chrome
            </Link>
          </ListItem>
          <ListItem>
            <Link href="http://www.opera.com/help/tutorials/security/cookies/" target="_blank" rel="noopener">
              Opera
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          How to contact us
        </Typography>
        <Typography variant="body1" paragraph>
          For any questions about our cookies policy, you can reach us at: <Link href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</Link>
        </Typography>

      </Paper>
    </Container>

  );
};

export default CookiesPolicy;

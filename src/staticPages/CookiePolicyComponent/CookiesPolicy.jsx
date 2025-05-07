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
          At (Company Name: <strong>Pre Amada Fze</strong>), trading as <strong>Reloved</strong> - For transparency <strong>Pre Amada Fze</strong> will be referred to as <strong>Reloved</strong> throughout all our terms and conditions.  <strong>Reloved (the "Website")</strong>, we use cookies to make your overall experience on our Website better. Specifically, we use cookies to:
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
            By using our Website or any of our services, you consent to our use of cookies. This Cookies Policy will explain what cookies are, how we use them, and what your rights are in relation to our use of cookies. We'll also discuss our third-party cookies and what they mean for you.
        </Typography>

        <Typography variant="h6" gutterBottom display="inline" sx={{textDecoration: 'underline'}}>
          What are cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Cookies are small files that are placed on your device to store information. Specifically, cookies are small strings of text used to store information that may concern you, your behavior on the web, your preferences, or your device. Cookies are mainly used to adapt the operation of the Website to your expectations, offering a more personalized browsing experience and memorizing the choices you made previously.
        </Typography>

        <Typography variant="body1" paragraph>
          There are various types of cookies. Cookies do not record or store any personal data from your device.
        </Typography>

        <Typography variant="h6" gutterBottom display="inline" sx={{textDecoration: 'underline'}}>
          How we use cookies
        </Typography>

        <Typography variant="body1" paragraph>
          Technical cookies, which can also sometimes be called HTML cookies, are used for navigation and to facilitate your access to and use of the site. They are necessary for the transmission of communications on the network or to supply services requested by you. The use of technical cookies allows the safe and efficient use of the Website.
        </Typography>

        <Typography variant="body1" paragraph>
          You can manage or request the general deactivation or cancelation of cookies through your browser. If you do this though, please be advised this action might slow down or prevent access to some parts of the Website.
        </Typography>

        <Typography variant="body1" paragraph>
          We also use cookies that are retransmitted by an analytics or statistics provider to collect aggregated information on the number of users and how they visit the Website. These are also considered technical cookies when they operate as described.
        </Typography>

        <Typography variant="body1" paragraph>
          Analytics may collect information through log data, such as:
        </Typography>

        <List>
          <ListItem>- Internet protocol (IP) address</ListItem>
          <ListItem>- Type of Browser and Device</ListItem>
          <ListItem>- Operating system</ListItem>
          <ListItem>- Internet Service Provider (ISP)</ListItem>
          <ListItem>- Country information</ListItem>
          <ListItem>- Date and time of visit</ListItem>
          <ListItem>- Web page origin (referral) and exit page</ListItem>
          <ListItem>- Possibly the number of clicks</ListItem>
        </List>

        <Typography variant="body1" paragraph>
          We don't use this information to identify you, but rather to understand usage trends on our Website.
        </Typography>

        <Typography variant="body1" paragraph>
          We use session cookies to keep track of how you browse on your visits to the Website. Temporary session cookies are deleted automatically at the end of the browsing session - these are mostly used to keep track of what you do from page to page, such as with online shopping, keeping track of what is in your cart.
        </Typography>

        <Typography variant="body1" paragraph>
          Persistent cookies, on the other hand, remain active longer than just one particular session. These help us recognize you.We also use them to store your login and password info, if you choose, and to store your user settings.
        </Typography>

        <Typography variant="body1" paragraph>
          Third-party cookies: We also utilize third-party cookies, which are cookies sent by a third-party to your computer. Persistent cookies are often third-party cookies. The majority of third-party cookies consist of tracking cookies used to identify online behavior, understand interests and then customize advertising for you.
        </Typography>

        <Typography variant="body1" paragraph>
          We use remarketing cookies, which place files on your browser or device to allow us to display advertisements to you on other websites.
        </Typography>

        <Typography variant="body1" paragraph>
          When these types of cookies are used, we will ask for your explicit consent.
        </Typography>

        <Typography variant="h6" gutterBottom display="inline" sx={{textDecoration: 'underline'}}>
          Consent
        </Typography>
        <Typography variant="body1" paragraph>
          When you arrive to our Website, we will request your consent for cookies through a clearly visible cookie banner/ notice at the user’s first visit.
        </Typography>

        <Typography variant="h6" gutterBottom display="inline" sx={{textDecoration: 'underline'}}>
          What can you do about cookies?
        </Typography>

        <Typography variant="body1" paragraph>
          If you want, you can prevent the use of cookies, but then you may not be able to use our Website as we intend. To proceed without changing the options related to cookies, simply continue to use our Website.
        </Typography>

        <Typography variant="body1" paragraph>
          You can also manage cookies through the settings of your browser on your device. However, deleting cookies from your browser may remove the preferences you have set for the Website, as well as preferences you've set for other websites.
        </Typography>

        <Typography variant="body1" paragraph>
          For further information and support, you can also visit the specific help page of the web browser you are using:
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

        <Typography variant="h6" gutterBottom display="inline" sx={{textDecoration: 'underline'}}>
          How to contact us
        </Typography>
        <Typography variant="body1" paragraph>
        For any questions on our cookies policy, you can reach us at the following email:  <Link href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</Link>
        </Typography>

      </Paper>
    </Container>

  );
};

export default CookiesPolicy;

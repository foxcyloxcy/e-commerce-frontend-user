import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, ThemeProvider, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const FrequentlyAskQuestions = () => {
  const faqs = [
    {
      question: 'How do I get started on the reloved platform?',
      answer: 'Click "sign up" to create your account, you can use your account to buy or sell pre-loved items.',
    },
    {
      question: 'What can I buy and sell on the platform?',
      answer: 'You can sell and buy from our different categories from clothes to baby accessories, furniture to handbags and so much more!',
    },
    {
      question: 'How does the reloved marketplace ensure the quality of pre-loved items?',
      answer: 'All items go through an approval process, so the items are reviewed before they are listed on the website. All our users sign a declaration confirming their items listed have an accurate description.',
    },
    {
      question: 'How do I get paid for an item I sell?',
      answer: `If you sell an item you will receive the full price you selected to sell the item for. Payments are processed through Mamo Pay. 
      When linking a card to the app you will be directed to Mamo Pay's terms and conditions. Payments may take up to 5 working days to be received, as per Mamo Pay's policy.`,
    },
    {
      question: 'When purchasing an item I notice there is a platform fee what is this?',
      answer: 'The platform fee is charged to the buyer, this is to maintain our platform for all users.',
    },
    {
      question: 'How do I communicate with the seller?',
      answer: `You can communicate with the seller by asking questions under the item page. Once you've purchased, you will receive the seller's contact details and collection address.`,
    },
    {
      question: 'How do I communicate with the buyer?',
      answer: 'The buyer’s details will be available once the transaction is approved and you’ve accepted the sale.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'All payments are processed through our third party provider Mamo Pay.',
    },
    {
      question: 'What is your shipping/delivery policy?',
      answer: 'All items are collection only, we can recommend trusted partners for collection and delivery. It is the buyers responsibility to arrange collection / delivery for their item. They will also pay any necessary fees for this if they use our delivery partners. ',
    },
    {
      question: 'What is your return/exchange policy?',
      answer: `You must notify the seller within 2 days if you are unhappy with the product, you will liaise directly for the seller in regards to this. If you need assistance in mitigating an issue please contact our support team. Further information can be found in our refund policy. The reloved platform is not responsible for any refunds.`,
    },
    {
      question: 'Can I track my order?',
      answer: 'Once you have purchased your item you will contact the seller to arrange collection. ',
    },
    {
      question: 'Are the prices negotiable?',
      answer: 'If the seller accepts offers, this will be shown before purchase. Sellers can accept or reject offers.',
    },
    // {
    //   question: 'What condition are the pre-loved luxury items in?',
    //   answer: 'All conditions are stated in the item description.',
    // },
    // {
    //   question: `Can I return an item if it doesn't fit me or if I'm not satisfied?`,
    //   answer: `Liaise with the seller to arrange a refund. Reloved is not liable for returns or refunds.`,
    // },
    // {
    //   question: 'Can I request a specific pick-up or delivery time for furniture items?',
    //   answer: 'You can liaise with the seller, or use our delivery partners for collection.',
    // },
    {
      question: 'What steps do you take to ensure the cleaniness of items?',
      answer: 'All items are managed by the seller you can ask any questions related to the item on the public Q&A at the bottom of each listed item',
    },
    {
      question: 'Can I purchase items directly from your social media channels?',
      answer: 'Our social media showcases items, but all transactions are done via the Reloved website.',
    },
    {
      question: 'How do you determine the pricing of pre-loved items?',
      answer: `Pricing is set by the seller, based on the original price and condition. Contact support at hello@therelovedmarketplace.com for assistance.`,
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can email us at hello@therelovedmarketplace.com, and our team will respond within 72 hours.',
    },
    {
      question: 'How can I feature an item on the home page?',
      answer: 'Once you have posted your item you can click on your profile, my items and then you can feature your item here. The price is AED 100 for 7 days.',
    },
  ];

  return (
    <ThemeProvider theme={ModTheme}>
        <Container sx={{ marginTop: 10, marginBottom: 5,
    maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
    }}>
        <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h6'>{faq.question}</Typography>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails>
            <Typography variant='body1'>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
        </Container>
    </ThemeProvider>
  );
};

export default FrequentlyAskQuestions;

import React from 'react';
import { Container, Typography, List, ListItem, Divider, ThemeProvider, Paper } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const PrivacyPolicy = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                marginTop: 10,
                marginBottom: 10,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
            }}>
                <Typography variant="h4" gutterBottom align="center">
                    Privacy Policy
                </Typography>
                <Paper elevation={3} sx={{ padding: 4, marginBottom: 4, background: '#fff' }}>
                <Typography variant="body1" paragraph>
                    Thank you for choosing to be part of our community at Reloved! We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at hello@therelovedmarketplace.com.
                </Typography>

                <Typography variant="body1" paragraph>
                    The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                </Typography>

                <Typography variant="body1" paragraph>
                    Please read this privacy notice carefully, as it will help you understand what we do with the information that we collect.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Table of Contents
                </Typography>

                <List>
                    <ListItem>1. WHAT INFORMATION DO WE COLLECT?</ListItem>
                    <ListItem>2. HOW DO WE USE YOUR INFORMATION?</ListItem>
                    <ListItem>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</ListItem>
                    <ListItem>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</ListItem>
                    <ListItem>5. HOW LONG DO WE KEEP YOUR INFORMATION?</ListItem>
                    <ListItem>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</ListItem>
                    {/* <ListItem>7. DO WE COLLECT INFORMATION FROM MINORS?</ListItem> */}
                    <ListItem>7. WHAT ARE YOUR PRIVACY RIGHTS?</ListItem>
                    <ListItem>8. CONTROLS FOR DO-NOT-TRACK FEATURES</ListItem>
                    <ListItem>9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</ListItem>
                    <ListItem>10. DO WE MAKE UPDATES TO THIS NOTICE?</ListItem>
                    <ListItem>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</ListItem>
                </List>

                <Divider style={{ margin: '20px 0' }} />

                <Typography variant="h5" gutterBottom>
                    1. WHAT INFORMATION DO WE COLLECT?
                </Typography>

                <Typography variant="h4">
                    Personal information you disclose to us
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                        <i>We collect personal information that you provide to us.</i> 
                </Typography>

                <Typography variant="body1" paragraph>
                    We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the App and/or Website or otherwise when you contact us.
                </Typography>

                <Typography variant="body1" paragraph>
                    The personal information that we collect depends on the context of your interactions with us and the App and/or Website, the choices you make and the products and features you use. The personal information we collect may include the following:
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; contact preferences; bank details; and other similar information.
                </Typography>

                <Typography variant="body1" paragraph>
                    All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.
                </Typography>

                <Typography variant="h4">
                    <strong>Information automatically collected</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                        <i>
                        Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our App and/or Website.
                        </i>
                </Typography>

                <Typography variant="body1" paragraph>
                    We automatically collect certain information when you visit, use or navigate the App and/or Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our App and/or Website and other technical information. This information is primarily needed to maintain the security and operation of our App and/or Website, and for our internal analytics and reporting purposes.
                </Typography>

                <Typography variant="body1" paragraph>
                    Like many businesses, we also collect information through cookies and similar technologies.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>The information we collect includes:</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Log and Usage Data:</strong> Log and usage data is service-related, diagnostic, usage and performance information our servers automatically collect when you access or use our App and/or Website and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the App and/or Website (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps') and hardware settings).
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Device Data:</strong> We collect device data such as information about your computer, phone, tablet or other device you use to access the App and/or Website. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system and system configuration information.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Location Data:</strong> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the App and/or Website. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    2. HOW DO WE USE YOUR INFORMATION?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                    <i>
                    We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
                        </i>
                </Typography>

                <Typography variant="body1" paragraph>
                    We use personal information collected via our App and/or Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
                </Typography>

                <Typography variant="body1" paragraph>
                    We use the information we collect or receive:
                </Typography>

                <List>
                    <ListItem>Request feedback. We may use your information to request feedback and to contact you about your use of our App and/or Website.</ListItem>
                    <ListItem>To send administrative information to you. We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.</ListItem>
                    <ListItem>To protect our Services. We may use your information as part of our efforts to keep our App and/or Website safe and secure (for example, for fraud monitoring and prevention).</ListItem>
                    <ListItem>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</ListItem>
                    <ListItem>To respond to legal requests and prevent harm. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.</ListItem>
                    <ListItem>Fulfill and manage your orders. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the App and/or Website. We will pass your bank and personal information through to Mamo Pay / Business to process any payments that you make or receive, this element of your data will also be subject to mamo business’ data and privacy policies. </ListItem>
                    <ListItem>Administer prize draws and competitions. We may use your information to administer prize draws and competitions when you elect to participate in our competitions.</ListItem>
                    <ListItem>To send you marketing and promotional communications. We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. For example, when expressing an interest in obtaining information about us or our App and/or Website, subscribing to marketing or otherwise contacting us, we will collect personal information from you. You can opt-out of our marketing emails at any time (see the "WHAT ARE YOUR PRIVACY RIGHTS?" below).</ListItem>
                    <ListItem>Deliver targeted advertising to you. We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness.</ListItem>
                    <ListItem>For other business purposes. We may use your information for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our App and/or Website, products, marketing and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information. We will not use identifiable personal information without your consent.</ListItem>
                </List>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong> <i>
                    We share information with mamo business for payment processes and with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </i>
                </Typography>

                <Typography variant="body1" paragraph>
                    We may process or share your data that we hold based on the following legal basis:
                </Typography>

                <List>
                    <ListItem>Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.</ListItem>
                    <ListItem>Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</ListItem>
                    <ListItem>Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</ListItem>
                    <ListItem>Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</ListItem>
                    <ListItem>Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    More specifically, we may need to process your data or share your personal information in the following situations:
                </Typography>

                <List>
                    <ListItem>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</ListItem>
                </List>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                        <i>
                         We may use cookies and other tracking technologies to collect and store your information.
                        </i>
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    5. HOW LONG DO WE KEEP YOUR INFORMATION?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                    <i>
                    We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</i> 
                </Typography>

                <Typography variant="body1" paragraph>
                    We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than 2 years.
                </Typography>

                <Typography variant="body1" paragraph>
                    When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    6. HOW DO WE KEEP YOUR INFORMATION SAFE?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                    <i>
                    We aim to protect your personal information through a system of organizational and technical security measures.
                        </i> 
                </Typography>

                <Typography variant="body1" paragraph>
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our App and/or Website is at your own risk. You should only access the App and/or Website within a secure environment.
                </Typography>

                {/* <Typography variant="h5" gutterBottom>
                    7. DO WE COLLECT INFORMATION FROM MINORS?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
                </Typography>

                <Typography variant="body1" paragraph>
                    We do not knowingly solicit data from or market to children under 18 years of age. By using the App and/or Website, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the App and/or Website. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at EMAIL.
                </Typography> */}

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    7. WHAT ARE YOUR PRIVACY RIGHTS?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                    <i>In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</i>
                </Typography>

                <Typography variant="body1" paragraph>
                    In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
                </Typography>

                <Typography variant="body1" paragraph>
                    If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer">European Data Protection Authorities</a>.
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are a resident in Switzerland, the contact details for the data protection authorities are available here: <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer">Swiss Data Protection Authorities</a>.
                </Typography>

                <Typography variant="h4" gutterBottom>
                    GENERAL DATA PROTECTION REGULATION (GDPR)
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are from the European Economic Area (EEA), reloved's legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.
                </Typography>

                <Typography variant="body1" paragraph>
                    reloved may process your Personal Data because:
                </Typography>

                <List>
                    <ListItem>We need to perform a contract with you</ListItem>
                    <ListItem>You have given us permission to do so</ListItem>
                    <ListItem>The processing is in our legitimate interests and it’s not overridden by your rights</ListItem>
                    <ListItem>For payment processing purposes</ListItem>
                    <ListItem>To comply with the law</ListItem>
                </List>

                <Typography variant="h4" gutterBottom>
                    Retention of Data
                </Typography>

                <Typography variant="body1" paragraph>
                    reloved will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                </Typography>

                <Typography variant="body1" paragraph>
                    reloved will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
                </Typography>

                <Typography variant="h4" gutterBottom>
                    Transfer of Data
                </Typography>

                <Typography variant="body1" paragraph>
                    Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                </Typography>

                <Typography variant="body1" paragraph>
                    reloved will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                </Typography>

                <Typography variant="h4" gutterBottom>
                    Disclosure of Data. Legal Requirements
                </Typography>

                <List>
                    <ListItem>To comply with a legal obligation</ListItem>
                    <ListItem>To protect and defend the rights or property of reloved</ListItem>
                    <ListItem>To prevent or investigate possible wrongdoing in connection with the Service</ListItem>
                    <ListItem>To protect the personal safety of users of the Service or the public</ListItem>
                    <ListItem>To protect against legal liability</ListItem>
                </List>

                <Typography variant="h4" gutterBottom>
                    Security of Data
                </Typography>

                <Typography variant="body1" paragraph>
                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Your Rights Under the GDPR
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are a resident of the European Economic Area (EEA), you have certain data protection rights. reloved aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
                </Typography>

                <Typography variant="body1" paragraph>
                    If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
                </Typography>

                <Typography variant="body1" paragraph>
                    In certain circumstances, you have the following data protection rights:
                </Typography>

                <List>
                    <ListItem>
                        <Typography variant="body1">
                            <strong>The right to access, update, or delete the information we have on you:</strong> Whenever possible, you can access, update, or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us for assistance.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            <strong>The right of rectification:</strong> You have the right to have your information rectified if that information is inaccurate or incomplete.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            <strong>The right to object:</strong> You have the right to object to our processing of your Personal Data.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            <strong>The right of restriction:</strong> You have the right to request that we restrict the processing of your personal information.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            <strong>The right to data portability:</strong> You have the right to be provided with a copy of the information we have on you in a structured, machine-readable, and commonly used format.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            <strong>The right to withdraw consent:</strong> You also have the right to withdraw your consent at any time where reloved relied on your consent to process your personal information.
                        </Typography>
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    Please note that we may ask you to verify your identity before responding to such requests.
                </Typography>

                <Typography variant="body1" paragraph>
                    You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer">EU Data Protection Authorities</a>.
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are a resident in Switzerland, the contact details for the data protection authorities are available here: <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer">Swiss Data Protection Authority</a>.
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    8. CONTROLS FOR DO-NOT-TRACK FEATURES
                </Typography>

                <Typography variant="body1" paragraph>
                    Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                    <i>Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</i>
                </Typography>

                <Typography variant="body1" paragraph>
                    California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are under 18 years of age, reside in California, and have a registered account with the App and/or Website, you have the right to request removal of unwanted data that you publicly post on the App and/or Website. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the App and/or Website, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>CCPA Privacy Notice</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    The California Code of Regulations defines a "resident" as:
                </Typography>

                <List>
                    <ListItem>
                        <Typography variant="body1">
                            (1) Every individual who is in the State of California for other than a temporary or transitory purpose and
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            (2) Every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose
                        </Typography>
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    All other individuals are defined as "non-residents."
                </Typography>

                <Typography variant="body1" paragraph>
                    If this definition of "resident" applies to you, we must adhere to certain rights and obligations regarding your personal information.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>What categories of personal information do we collect?</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    We have collected the following categories of personal information in the past twelve (12) months:
                </Typography>

                <Typography variant="body1" paragraph>
                    We may also collect other personal information outside of these categories in instances where you interact with us in-person, online, or by phone or mail in the context of:
                </Typography>

                <List>
                    <ListItem>
                        <Typography variant="body1">
                            Receiving help through our customer support channels;
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            Participation in customer surveys or contests; and
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            Facilitation in the delivery of our Services and to respond to your inquiries.
                        </Typography>
                    </ListItem>
                </List>
                <Typography variant="h5" gutterBottom>
                    How Do We Use and Share Your Personal Information?
                </Typography>

                <Typography variant="body1" paragraph>
                    More information about our data collection and sharing practices can be found in this privacy notice.
                </Typography>

                <Typography variant="body1" paragraph>
                    You may contact us at <a href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</a>.
                </Typography>

                <Typography variant="body1" paragraph>
                    If you are using an authorized agent to exercise your right to opt-out, we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Will Your Information Be Shared with Anyone Else?</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.
                </Typography>

                <Typography variant="body1" paragraph>
                    We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal data.
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    Your Rights with Respect to Your Personal Data
                </Typography>

                {/* <Typography variant="body1" paragraph>
                    <strong>Right to Request Deletion of the Data - Request to Delete:</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation, or any processing that may be required to protect against illegal activities.
                </Typography> */}

                <Typography variant="body1" paragraph>
                    <strong>Right to Be Informed - Request to Know:</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    Depending on the circumstances, you have a right to know:
                </Typography>

                <List>
                    <ListItem>
                        <Typography variant="body1">
                            Whether we collect and use your personal information;
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            The categories of personal information that we collect;
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            The purposes for which the collected personal information is used;
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            Whether we sell your personal information to third parties;
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            The categories of personal information that we sold or disclosed for a business purpose;
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            The categories of third parties to whom the personal information was sold or disclosed for a business purpose; and
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            The business or commercial purpose for collecting or selling personal information.
                        </Typography>
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights:</strong> We will not discriminate against you if you exercise your privacy rights.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Verification Process:</strong>
                </Typography>

                <Typography variant="body1" paragraph>
                    Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g., phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.
                </Typography>

                <Typography variant="body1" paragraph>
                    We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. If, however, we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity, and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Other Privacy Rights:</strong>
                </Typography>

                <List>
                    <ListItem>
                        <Typography variant="body1">
                            You may object to the processing of your personal data.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            You may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the data.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">
                            You may request to opt-out from future selling of your personal information to third parties. Upon receiving a request to opt-out, we will act upon the request as soon as feasibly possible, but no later than 15 days from the date of the request submission.
                        </Typography>
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    To exercise these rights, you can contact us at <a href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</a>. If you have a complaint about how we handle your data, we would like to hear from you.
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    10. Do We Make Updates to This Notice?
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>In Short:</strong>
                    <i>
                    Yes, we will update this notice as necessary to stay compliant with relevant laws.</i>
                </Typography>

                <Typography variant="body1" paragraph>
                    We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
                </Typography>

                <Divider style={{ margin: '2rem 0' }} />

                <Typography variant="h5" gutterBottom>
                    11. How Can You Contact Us About This Notice?
                </Typography>

                <Typography variant="body1" paragraph>
                    If you have questions or comments about this notice, you may email us at <a href="mailto:hello@therelovedmarketplace.com">hello@therelovedmarketplace.com</a>.
                </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default PrivacyPolicy;

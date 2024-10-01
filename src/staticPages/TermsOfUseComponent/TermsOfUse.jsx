import React from 'react';
import { Container, Typography, Box, ThemeProvider, Paper } from '@mui/material';
import ModTheme from '../../components/ThemeComponent/ModTheme';

const TermsOfUse = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container sx={{
                marginTop: 13,
                marginBottom: 10,
                maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
            }}>
                <Paper elevation={3} sx={{ padding: 4, background: '#fff', width: '100%' }}>
                    <Box>
                        <Typography variant="h2" align="center" gutterBottom>
                            TERMS OF USE
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            AGREEMENT TO TERMS
                        </Typography>

                        <Typography variant="body1" paragraph>
                            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Reloved ("Company," “we," “us," or “our”), concerning your access to and use of the Platform.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE PLATFORM AND YOU MUST DISCONTINUE USE IMMEDIATELY AND CLOSE YOUR ACCOUNT.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Our platform facilitates the buying and selling of items between individuals. While we make every effort to ensure the accuracy and reliability of our platform, we cannot guarantee the quality or authenticity of the items listed for sale. Therefore, it is important that buyers exercise due diligence and thoroughly review the item description and seller feedback before making a purchase.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            As a seller on our platform, you are responsible for accurately describing your item and its condition, as well as ensuring that you have the right to sell the item. You are also responsible for ensuring accurate shipping information and location collection. You are responsible to ensure the item is collected within 48 hours of purchase through an agreed delivery method as agreed with the buyer.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            As a buyer on our platform, you are responsible for paying for the item in a timely manner. You are also responsible for inspecting the item upon receipt and notifying the seller of any issues or discrepancies. As the buyer, it is your responsibility for arranging the collection of the item, whether it be through personal collection or arranging for a courier to deliver to your address. The buyer is responsible for paying the service platform fee.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Supplemental terms and conditions or documents that may be posted on the Platform from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Platform so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Platform after the date such revised Terms of Use are posted.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Because we have a growing number of services, we sometimes need to provide additional terms for specific services (and such services are deemed part of the “Service” hereunder and shall also be subject to these Terms). Those additional terms and conditions, which are available with the relevant service, then become part of your agreement with us if you use those services. In the event of a conflict between these Terms and any additional applicable terms we may provide for a specific service, such additional terms shall control for that specific service.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Reloved reserves the right to change or modify these Terms at any time and in our sole discretion. If we make material changes to these Terms, we will use reasonable efforts to provide notice of such changes, such as by providing notice through the Service or updating the “Last Updated” date at the beginning of these Terms. By continuing to access or use the Service, you confirm your acceptance of the revised Terms and all of the terms incorporated therein by reference effective as of the date these Terms are updated. It is your sole responsibility to review the Terms from time to time to view such changes and to ensure that you understand the terms and conditions that apply when you access or use the Service.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            YOUR ACCESS TO THE SERVICE
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Creating an account on our platform is simple and free. With an account, you can buy and sell items, track your purchases, and manage your personal information.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            To create an account, you will need to provide your name, email address, and a password. We recommend using a strong and unique password to protect your account. Once you have created an account, you can update your personal information and preferences at any time.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            As a registered user, you will have access to a dashboard where you can view your purchase history, track your shipments, and manage your orders. You can also view your selling activity, including your listings, sales, and feedback from buyers.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            To ensure the security of your account, we recommend enabling two-factor authentication (2FA) for added protection. 2FA requires you to enter a unique code sent to your phone or email when logging in, adding an extra layer of security to your account.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            If you have any issues accessing your account or need to reset your password, our customer support team is available to assist you. Please do not hesitate to contact us if you have any questions or concerns about your account.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            TRANSACTIONS BETWEEN BUYERS AND SELLERS
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Our platform facilitates the buying and selling of used items between individuals. When a buyer purchases an item, they will pay the seller directly through our platform. We will charge the buyer a 20% commission fee for the item they sell through our platform. This fee will be included in the check-out process of the purchase. The commission percentage may be subject to change.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Please note that any additional fees associated with the transaction, such as shipping or payment processing fees, are the responsibility of the buyer and seller. Reloved will not be liable for any such fees.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            The seller's contact details will only become available to the buyer once the purchase has been completed. It is the buyer's responsibility to arrange collection, and an agreed method will be confirmed between the buyer and seller. Reloved will not be involved in the collection, shipping, or delivery of the item, and will not be liable for any issues that may arise during this process.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            The buyer will have two days from the transaction date to arrange delivery from the seller. Buyers may request a refund within two days of receiving the item, if the item received does not match the description provided by the seller or if there are significant issues with the item. Refund requests should be submitted to the seller directly. If the buyer and seller cannot resolve the issue, please contact our customer support team for assistance.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            If you encounter any issues with a transaction, please contact the buyer or seller directly to resolve the issue. If you are unable to resolve the issue, please contact our customer support team for assistance.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            It is important to note that Reloved is not responsible for the quality or condition of the items sold on our platform. We are not liable for any faults, defects, or damages that may be present in the items sold. We encourage buyers to carefully review the item description and photos provided by the seller before making a purchase. Additionally, we recommend that sellers accurately describe their item and its condition to avoid any disputes with buyers.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            INTELLECTUAL PROPERTY RIGHTS
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Unless otherwise indicated, the Platform is our proprietary property and all source code, databases, functionality, software, webapp designs, audio, video, text, photographs, and graphics on the Platform (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws, international copyright laws, and international conventions. The Content and the Marks are provided on the Platform “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Platform and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Provided that you are eligible to use the Platform, you are granted a limited license to access and use the Platform and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Platform, the Content and the Marks.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            USER REPRESENTATIONS
                        </Typography>
                        <Typography variant="body1" paragraph>
                            By using the Platform, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Platform through automated or non-human means, whether through a bot, script, or otherwise; (4) you will not use the Platform for any illegal or unauthorized purpose; and (5) your use of the Platform will not violate any applicable law or regulation.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Platform (or any portion thereof).
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            PROHIBITED ACTIVITIES
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You may not access or use the Platform for any purpose other than that for which we make the Platform available. The Platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </Typography>
                        <Typography variant="body1" paragraph component='span'>
                            As a user of the Platform, you agree not to:
                            <ul>
                                <li>Systematically retrieve data or other content from the Platform to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                                <li>Circumvent, disable, or otherwise interfere with security-related features of the Platform, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Platform and/or the Content contained therein.</li>
                                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Platform.</li>
                                <li>Use any information obtained from the Platform in order to harass, abuse, or harm another person.</li>
                                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                                <li>Use the Platform in a manner inconsistent with any applicable laws or regulations.</li>
                                <li>Engage in unauthorized framing of or linking to the Platform.</li>
                                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Platform or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Platform.</li>
                                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                                <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                                <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).</li>
                                <li>Interfere with, disrupt, or create an undue burden on the Platform or the networks or services connected to the Platform.</li>
                                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Platform to you.</li>
                                <li>Attempt to bypass any measures of the Platform designed to prevent or restrict access to the Platform, or any portion of the Platform.</li>
                                <li>Copy or adapt the Platform’s software.</li>
                                <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Platform.</li>
                                <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Platform, or using or launching any unauthorized script or other software.</li>
                                <li>Use a buying agent or purchasing agent to make purchases on the Platform.</li>
                                <li>Make any unauthorized use of the Platform, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                                <li>Use the Platform as part of any effort to compete with us or otherwise use the Platform and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                            </ul>
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            USER GENERATED CONTRIBUTIONS
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Platform, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Platform and through third-party webapps. As such, any Contributions you transmit may be treated in accordance with the Platform Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:
                        </Typography>
                        <Typography variant="body1" component="ul" gutterBottom>
                            <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
                            <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Platform, and other users of the Platform to use your Contributions in any manner contemplated by the Platform and these Terms of Use.</li>
                            <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Platform and these Terms of Use.</li>
                            <li>Your Contributions are not false, inaccurate, or misleading.</li>
                            <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                            <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
                            <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                            <li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
                            <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                            <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                            <li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
                            <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                            <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.</li>
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            CONTRIBUTION LICENSE
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            You and the Platform agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            By submitting suggestions or other feedback regarding the Platform, you agree that we can use and share such feedback for any purpose without compensation to you.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Platform. You are solely responsible for your Contributions to the Platform and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            SUBMISSIONS
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Platform ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            THIRD-PARTY WEBAPP AND CONTENT
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The Platform may contain (or you may be sent via the Platform) links to other webapps ("Third-Party Webapps") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Webapps and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Webapps accessed through the Platform or any Third-Party Content posted on, available through, or installed from the Platform, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Webapps or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Webapps or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Platform and access the Third-Party Webapps or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any webapp to which you navigate from the Platform or relating to any applications you use or install from the Platform. Any purchases you make through Third-Party Webapps will be through other webapps and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Webapps and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Webapps.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            PLATFORM MANAGEMENT
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We reserve the right, but not the obligation, to: (1) monitor the Platform for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Platform or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Platform in a manner designed to protect our rights and property and to facilitate the proper functioning of the Platform.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Privacy Policy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We care about data privacy and security. By using the Platform, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Term and Termination
                        </Typography>
                        <Typography variant="body1" paragraph>
                            These Terms of Use shall remain in full force and effect while you use the Platform. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE PLATFORM (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE PLATFORM OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Modifications and Interruptions
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We reserve the right to change, modify, or remove the contents of the Platform at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Platform. We also reserve the right to modify or discontinue all or part of the Platform without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Platform.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We cannot guarantee the Platform will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Platform, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Platform at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Platform during any downtime or discontinuance of the Platform. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Platform or to supply any corrections, updates, or releases in connection therewith.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Governing Law
                        </Typography>
                        <Typography variant="body1" paragraph>
                            These Terms of Use and your use of the Platform are governed by and construed in accordance with the laws applicable at the headquarters of Company, without regard to its conflict of law principles.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Dispute Resolution
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Any legal action of whatever nature brought by either you or us (collectively, the “Parties” and individually, a “Party”) shall be commenced or prosecuted at the headquarters of Company, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Terms of Use. In no event shall any claim, action, or proceeding brought by either Party related in any way to the Platform be commenced more than one (1) year after the cause of action arose.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Corrections
                        </Typography>
                        <Typography variant="body1" paragraph>
                            There may be information on the Platform that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Platform at any time, without prior notice.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Disclaimer
                        </Typography>
                        <Typography variant="body1" paragraph>
                            THE PLATFORM IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE PLATFORM AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE PLATFORM AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE PLATFORM’S CONTENT OR THE CONTENT OF ANY WEBAPPS LINKED TO THE PLATFORM AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE PLATFORM, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE PLATFORM, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE PLATFORM BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE PLATFORM. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE PLATFORM, ANY HYPERLINKED WEBAPP, OR ANY WEBAPP OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Limitations of Liability
                        </Typography>
                        <Typography variant="body1" paragraph>
                            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE PLATFORM, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Indemnification
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Platform; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Platform with whom you connected via the Platform. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            User Data
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We will maintain certain data that you transmit to the Platform for the purpose of managing the performance of the Platform, as well as data relating to your use of the Platform. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Platform. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Electronic Communications, Transactions, and Signatures
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Visiting the Platform, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Platform, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE PLATFORM. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Miscellaneous
                        </Typography>
                        <Typography variant="body1" paragraph>
                            These Terms of Use and any policies or operating rules posted by us on the Platform or in respect to the Platform constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Platform. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body1" paragraph>
                            In order to resolve a complaint regarding the Platform or to receive further information regarding use of the Platform, please contact us at MAIL.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Terms of Use
                        </Typography>
                        <Typography variant="body1" paragraph>
                            By agreeing to this policy you are also agreeing to the other policies which include the following: buyer terms, cookie policy, data processing, privacy policy, refund policy, seller terms and the shipping and delivery policy. These policies can be found on our website and application.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default TermsOfUse;

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  Container
} from "@mui/material";
import ModTheme from "../../components/ThemeComponent/ModTheme";

const DataProcessingAgreement = () => {
  return (
    <ThemeProvider theme={ModTheme}>
      <Container sx={{
        marginTop: 15,
        marginBottom: 10,
        maxWidth: { xs: 'sm', sm: 'md', md: 'xl', lg: 'xl', xl: 'xl' },
      }}>
        <Paper elevation={3} sx={{ padding: 4, mt: 5, background: '#fff' }}>
          <Typography variant="h4" gutterBottom>
            Data Processing Agreement
          </Typography>

          {/* ... (Previous sections) */}


          <Typography variant="h6" gutterBottom>
            1. Scope, Order of Precedence and Term
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1.1 This Data Processing Agreement (“DPA”) is an addendum to the Terms of Use (“Agreement”) between Pre Amada Fze (“Reloved”) and the User. Reloved and User are individually a “party” and collectively the “parties.” Reloved is under the legal entity of Pre Amada FZE." />
            </ListItem>
            <ListItem>
              <ListItemText primary="1.2 This DPA applies where and only to the extent that Reloved processes Personal Data on behalf of the User in the course of providing the Services, and such Personal Data is subject to Data Protection Laws of the appropriate jurisdiction, including United Arab Emirates, the State of California, the European Union, the European Economic Area, and/or its member states, Switzerland, and/or the United Kingdom. The parties agree to comply with the terms and conditions in this DPA in connection with such Personal Data." />
            </ListItem>
            <ListItem>
              <ListItemText primary="          1.3 The duration of the Processing covered by this DPA shall be in accordance with the duration of the Agreement." />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            2. Definitions
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="2.1 The following terms have the meanings set forth below. All capitalized terms not defined in this DPA will have the meanings set forth in the Agreement." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.2 The following terms have the definitions given to them in the CCPA: 'Business,' 'Sell,' 'Service Provider,' and 'Third Party.'" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.3 'Controller' means the entity that determines the purposes and means of the Processing of Personal Data. 'Controller' includes equivalent terms in other Data Protection Law such as the CCPA-defined term 'Business' or 'Third Party' as context requires." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.4 'Data Protection Law' means all data protection and privacy laws applicable to the processing of Personal Data under the Agreement as it relates to the User including Regulation 2016/679 (General Data Protection Regulation) ('GDPR'), Cal. Civ. Code Title 1.81.5 § 1798.100 et seq. (California Consumer Privacy Act) ('CCPA'), and Federal Decree Law No. 45/2021 on the Protection of Personal Data ('PDL')." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.5 'Data Subject' means an identified or identifiable natural person." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.6 'De-identified Data' means a data set that does not contain any Personal Data. Aggregated data is De-identified Data. To 'De-identify' means to create De-identified Data from Personal Data." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.7 'EEA' means the European Economic Area." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.8 'Standard Contractual Clauses' means the European Union standard contractual clauses for international transfers from the European Economic Area to third countries Commission Implementing Decision (EU) 2021/914 of 4 June 2021." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.9 'Personal Data' means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked directly or indirectly with a Data Subject, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person. 'Personal Data' includes equivalent terms in other Data Protection Law such as the CCPA-defined term 'Personal Information' as context requires." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.10 'Personal Data Breach' means a breach of security of the Services leading to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.11 “Process” or “Processing” means any operation or set of operations which is performed upon Personal Data, whether by automatic means, such as collection, recording, organization, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, blocking, erasure or destruction." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.12 “Processor” means an entity that processes Personal Data on behalf of another entity. “Processor” includes equivalent terms in other Data Protection Law, such as the CCPA-defined term “Service Provider,” as context requires." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.13 “Sensitive Data” means the following types and categories of data: data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership; genetic data; biometric data; data concerning health, including protected health information governed by the Health Insurance Portability and Accountability Act; data concerning a natural person’s sex life or sexual orientation; government identification numbers (e.g., SSNs, driver’s license); payment card information; nonpublic personal information governed by the Gramm Leach Bliley Act; an unencrypted identifier in combination with a password or other access code that would permit access to a data subject’s account; and precise geolocation." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2.14 “Subprocessor” means a Processor engaged by a party who is acting as a Processor." />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            3. Description of the Parties’ Personal Data Processing Activities and Statuses of the Parties
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="3.1 Schedules 1-3 attached hereto describe the purposes of the parties’ Processing, the types or categories of Personal Data involved in the Processing, and the categories of Data Subjects affected by the Processing." />
            </ListItem>
            <ListItem>
              <ListItemText primary="3.2 Schedules 1-3 list the parties’ statuses under relevant Data Protection Law." />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            4. International Data Transfer
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="4.1 With respect to Personal Data of Data Subjects located in the United Arab Emirates, EEA, Switzerland, or the United Kingdom that User transfers to Reloved or permits Reloved to access, the parties agree that by executing this DPA they also execute the Standard Contractual Clauses, which will be incorporated by reference and form an integral part of this DPA. " />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            5. Data Protection Generally
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="5.1 Compliance. The parties will comply with their respective obligations under Data Protection Law and their privacy notices." />
            </ListItem>
            <ListItem>
              <ListItemText primary="5.2 User Processing of Personal Data. User represents and warrants that it has the consent or other lawful basis necessary to collect Personal Data in connection with the Services." />
            </ListItem>
            <ListItem>
              <ListItemText primary="5.3 Cooperation." />
            </ListItem>
            <List sx={{ ml: 5 }}>
              <ListItem>
                <ListItemText primary="5.3.1 Data Subject Requests. The parties will provide each other with reasonable assistance to enable each to comply with their obligations to respond to Data Subjects’ requests to exercise rights that those Data Subjects may be entitled to under Data Protection Law." />
              </ListItem>
              <ListItem>
                <ListItemText primary="5.3.2 Governmental and Investigatory Requests. User will promptly notify Reloved if User receives a complaint or inquiry from a regulatory authority indicating that Reloved has or is violating Data Protection Law." />
              </ListItem>
              <ListItem>
                <ListItemText primary="5.3.3 Other Requirements of Data Protection Law. Upon request, the parties will provide relevant information to each other to fulfill their respective obligations (if any) to conduct data protection impact assessments or prior consultations with data protection authorities." />
              </ListItem>
            </List>
            <ListItem>
              <ListItemText primary="5.4 Confidentiality. The parties will ensure that their employees, independent contractors, agents, and representatives are subject to an obligation to keep Personal Data confidential and have received training on data privacy and security that is commensurate with their responsibilities and the nature of the Personal Data." />
            </ListItem>
            <ListItem>
              <ListItemText primary="5.5 De-identified, Anonymized, or Aggregated Data. The parties may create De-identified Data from Personal Data and Process the De-identified Data for any purpose." />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            6. Data Security
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="6.1 Security Controls. Each party will maintain written information security policy that defines security controls that are based on the party’s assessment of risk to Personal Data that the party Processes and the party’s information systems. " />
            </ListItem>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            7. Reloved’s Obligations as a Processor, Subprocessor, or Service Provider
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="7.1 Reloved will have the obligations set forth in this Section 7 if it Processes Personal Data in its capacity as User’s Processor or Service Provider; for clarity, these obligations do not apply to Reloved in its capacity as a Controller, Business, or Third party." />
            </ListItem>
            <ListItem>
              <ListItemText primary="7.2 Scope of Processing." />
            </ListItem>
            <List sx={{ ml: 5 }}>
              <ListItem>
                <ListItemText primary="7.2.1 Reloved will Process Personal Data to provide Services to User under the Agreement, and comply with applicable law. Reloved will notify User if the law changes and those changes cause Reloved not to be able to comply with the Agreement." />
              </ListItem>
            </List>
            <ListItem>
              <ListItemText primary="7.3 Data Subjects’ Requests to Exercise Rights. Reloved will promptly inform User if Reloved receives a request from a Data Subject to exercise their rights with respect to their Personal Data under applicable Data Protection Law. User will be responsible for responding to such requests. Reloved will not respond to such Data Subjects except to acknowledge their requests. Reloved will provide User with commercially reasonable assistance, upon request, to help User to respond to a Data Subject’s request." />
            </ListItem>
            <ListItem>
              <ListItemText primary="7.4 Reloved’s Subprocessors." />
            </ListItem>
            <List sx={{ ml: 5 }}>
              <ListItem>
                <ListItemText primary="7.4.1 Existing Subprocessors. User agrees that Reloved may use the Subprocessors listed at Schedule 3." />
              </ListItem>
              <ListItem>
                <ListItemText primary="7.4.2 Use of Subprocessors. User grants Reloved general authorization to engage Subprocessors if Reloved and a Subprocessor enter into an agreement that requires the Subprocessor to meet obligations that are no less protective than this DPA." />
              </ListItem>
              <ListItem>
                <ListItemText primary="7.4.3 Notification of Additions or Changes to Subprocessors. Reloved will notify User of any additions to or replacements of its Subprocessors via email or other contact methods and make that list available on User’s request. Reloved will provide User with at least 30 days to object to the addition or replacement of Subprocessors in connection with Reloved’s performance under the Agreement, calculated from the date Reloved provides notice to User. If User reasonably objects to the addition or replacement of Reloved’s Subprocessor, Reloved will immediately cease using that Subprocessor in connection with Reloved’s Services under the Agreement, and the parties will enter into good faith negotiations to resolve the matter. If the parties are unable to resolve the matter within 15 days of User’s reasonable objection (which deadline the parties may extend by written agreement), User may terminate the Agreement and/or any statement of work, purchase order, or other written agreements. The parties agree that Reloved has sole discretion to determine whether User’s objection is reasonable; however, the parties agree that User’s objection is presumptively reasonable if the Subprocessor is a competitor of User and User has a reason to believe that competitor could obtain a competitive advantage from the Personal Data Reloved discloses to it, or User anticipates that Reloved’s use of the Subprocessor would be contrary to law applicable to User." />
              </ListItem>
              <ListItem>
                <ListItemText primary="7.4.4 Liability for Subprocessors. Reloved will be liable for the acts or omissions of its Subprocessors to the same extent as Reloved would be liable if performing the services of the Subprocessor directly under the DPA, except as otherwise set forth in the Agreement." />
              </ListItem>
            </List>
            <ListItem>
              <ListItemText primary="7.5 Personal Data Breach. Reloved will notify User without undue delay of a Personal Data Breach affecting Personal Data Reloved Processes in connection with the Services. Upon request, Reloved will provide information to User about the Personal Data Breach to the extent necessary for User to fulfill any obligations it has to investigate or notify authorities, except that Reloved reserves the right to redact information that is confidential or competitively sensitive. Notifications will be delivered to the email address User provides in User’s account. User agrees that email notification of a Personal Data Breach is sufficient. Reloved agrees that it will notify User if it changes its contact information. User agrees that Reloved may not notify User of security-related events that do not result in a Personal Data Breach." />
            </ListItem>
            <ListItem>
              <ListItemText primary="7.6 Deletion and Return of Personal Data. Upon deactivation of the Services, all Personal Data shall be deleted, save that this requirement shall not apply to the extent Reloved is required by applicable law to retain some or all of the Personal Data, or to Personal Data it has archived on back-up systems, which such Personal Data Reloved shall securely isolate and protect from any further processing, except to the extent required by applicable law." />
            </ListItem>
            <ListItem>
              <ListItemText primary="7.7 Audits." />
            </ListItem>
            <List sx={{ ml: 5 }}>
              <ListItem>
                <ListItemText primary="7.7.1 Reloved shall maintain records of its security standards. Upon User’s written request, Reloved shall provide (on a confidential basis) copies of relevant external ISMS certifications, audit report summaries and/or other documentation reasonably required by User to verify Reloved’s compliance with this DPA. Reloved shall further provide written responses (on a confidential basis) to all reasonable requests for information made by User, including responses to information security and audit questionnaires, that User (acting reasonably) considers necessary to confirm Reloved’s compliance with this DPA, provided that User shall not exercise this right more than once per year." />
              </ListItem>
            </List>
          </List>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            Schedule 1: Description of the Processing and Subprocessors
          </Typography>

          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table aria-label="Description of the Processing and Subprocessors table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Processing Activity</strong></TableCell>
                  <TableCell><strong>Status of the Parties</strong></TableCell>
                  <TableCell><strong>Categories of Personal Data Processed</strong></TableCell>
                  <TableCell><strong>Categories of Sensitive Data Processed</strong></TableCell>
                  <TableCell><strong>Frequency of Transfer</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    User discloses Personal Data to Reloved to provide, operate, and maintain Reloved Services.
                  </TableCell>
                  <TableCell>
                    User is a Controller.<br />
                    Reloved is a Controller.
                  </TableCell>
                  <TableCell>
                    Account registration, payment information, user content, communications, cookies and other tracking technologies, usage of Services, and third-party accounts.
                  </TableCell>
                  <TableCell>None</TableCell>
                  <TableCell>Continuous</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    User discloses Personal Data to improve, analyze, personalize, and Reloved Services.
                  </TableCell>
                  <TableCell>
                    User is a Controller.<br />
                    Reloved is a Controller.
                  </TableCell>
                  <TableCell>
                    Account registration, payment information, user content, communications, cookies and other tracking technologies, usage of Services, and third-party accounts.
                  </TableCell>
                  <TableCell>None</TableCell>
                  <TableCell>Continuous</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    User contacts Reloved for support.
                  </TableCell>
                  <TableCell>
                    User is a Controller.<br />
                    Reloved is a Controller.
                  </TableCell>
                  <TableCell>
                    Account registration, payment information, user content, communications, usage of Services, and third-party accounts.
                  </TableCell>
                  <TableCell>None</TableCell>
                  <TableCell>Continuous</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    User stores end-user data on Reloved Services.
                  </TableCell>
                  <TableCell>
                    Reloved is a Processor.<br />
                    User is a Controller or processor to a controller.
                  </TableCell>
                  <TableCell>As determined by User.</TableCell>
                  <TableCell>As determined by User.</TableCell>
                  <TableCell>As determined by User.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Schedule 2. Technical and Organizational Measures
          </Typography>

          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table aria-label="Technical and Organizational Measures table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Technical and Organizational Security Measure</strong></TableCell>
                  <TableCell><strong>Evidence of Technical and Organizational Security Measure</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Measures of pseudonymisation and encryption of personal data
                  </TableCell>
                  <TableCell>
                    Customer data is stored in a multi-tenant application with logical separation between Customer instances. Sensitive authentication information is encrypted on logical database level, and the database is encrypted at rest.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring ongoing confidentiality, integrity, availability and resilience of processing systems and services
                  </TableCell>
                  <TableCell>
                    eloved has policies and procedures in place to ensure confidentiality, integrity and resilience of processing systems and services. These include an Access Control Policy, Business Continuity and Disaster Recovery Policy, and a Secure Development Policy. eloved will maintain and provide policies upon request.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident
                  </TableCell>
                  <TableCell>
                    All database-stored customer data is backed up daily using Google Cloud SQL offered tooling which also provides restoring capabilities. Backups and restore capabilities are tested on an annual cadence.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Processes for regularly testing, assessing and evaluating the effectiveness of technical and organizational measures in order to ensure the security of the processing
                  </TableCell>
                  <TableCell>
                    eloved regularly monitors and tests controls to ensure they are operating as intended and updated as needed. eloved leadership monitors these controls regularly, and is notified immediately when a control is at risk so that prompt action can be taken.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for user identification and authorization
                  </TableCell>
                  <TableCell>
                    eloved maintains an Access Control Policy, which can be provided upon request. Measures for access control and authorization include formally documented roles and permissions, encrypted connection to production systems and networks, strong passwords stored within a password manager, and single-sign on or 2FA where available. eloved Access Control Policy applies to all eloved employees and to all external parties with access to eloved engineering networks and system resources.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for the protection of data during transmission
                  </TableCell>
                  <TableCell>
                    All data outside the eloved's private network is encrypted with HTTPS/SSL. All measures are outlined in the eloved's Data Management Policy, which can be provided upon request.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for the protection of data during storage
                  </TableCell>
                  <TableCell>
                    Database is encrypted at rest and managed by Google Cloud Platform.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring physical security of locations at which personal data are processed
                  </TableCell>
                  <TableCell>
                    eloved does not operate physical servers or other infrastructure. For employer-provided computers: All eloved employees are required to complete physical security training, and all employees and contractors are required to enable a screen lock when the work computer is left unattended.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring events logging
                  </TableCell>
                  <TableCell>
                    eloved has detailed event logging with automated alerts in case no events are tracked.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring system configuration, including default configuration
                  </TableCell>
                  <TableCell>
                    Security governance and management is outlined in eloved security policies, including the Information Security Roles and Responsibilities Policy, which all employees must review and agree to prior to joining eloved. Policy can be provided upon request. Roles are required within the organization to provide clearly defined responsibilities and an understanding of how the protection of information is to be accomplished. Their purpose is to clarify, coordinate activity, and actions necessary to disseminate security policy, standards, and implementation.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for certification/assurance of processes and products
                  </TableCell>
                  <TableCell>
                    eloved has completed its SOC2 Type II certification. Please reach out to EMAIL for a copy of the report.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring data minimisation
                  </TableCell>
                  <TableCell>
                    As noted in the Privacy Policy with the Agreement, data is collected to serve commercial or business purposes, such as providing, customizing and improving Services, marketing and selling the Services, corresponding with customers about Services, and meeting legal requirements. eloved will not collect additional categories of Personal Data or use the Personal Data we collected for materially different, unrelated or incompatible purposes without providing customer notice. More information about the data  eloved collects and opting-out is in the Privacy Policy of the Agreement.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring data quality
                  </TableCell>
                  <TableCell>
                    All data collection is instrumented by the eloved’s software engineering team and all data collection changes are peer reviewed. Data is tested during development and verified after deployment.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring limited data retention
                  </TableCell>
                  <TableCell>
                    eloved retains data as long as the eloved has a need for its use, or to meet regulatory or contractual requirements. Once data is no longer needed, it is securely disposed of or archived. eloved, in consultation with legal counsel, may determine retention periods for data. Retention periods shall be documented in the eloved Data Management Policy, which can be provided upon request.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for ensuring accountability
                  </TableCell>
                  <TableCell>
                    eloved employees are required to review and acknowledge eloved security practices and policies, complete security training, and go through a security walkthrough with a senior member of the engineering organization. eloved conducts background checks on all new employees and requires all employees to sign a non-disclosure agreement before gaining access to eloved information.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Measures for allowing data portability and ensuring erasure
                  </TableCell>
                  <TableCell>
                    Customer can ask for a copy of its Personal Data in a machine-readable format. Customer can also request that eloved transmit the data to another controller where technically feasible. The Service allows ability to export relevant application data in a standard CSV format. Additional export capabilities for all the customer data is available through an API. In the case that a customer wishes to exercise portability or erasure rights, the eloved has measures of retrieving securely stored data and has a process in place to ensure access is restricted only to those who have a business justification for accessing data during the copy, transfer, or erasure.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Technical and organizational measures of sub-processors
                  </TableCell>
                  <TableCell>
                    eloved collects and reviews the most security assessments from sub-processors on an annual basis.
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>

          {/* ... (Continue with other sections or schedules) */}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default DataProcessingAgreement;
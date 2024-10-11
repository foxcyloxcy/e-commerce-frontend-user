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
  ThemeProvider
} from "@mui/material";
import ModTheme from "../../components/ThemeComponent/ModTheme";

const DataProcessingAgreement = () => {
  return (
    <ThemeProvider theme={ModTheme}>
          <Box sx={{ padding: 4, mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Data Processing Agreement
      </Typography>

      {/* ... (Previous sections) */}


      <Typography variant="h6" gutterBottom>
        1. Scope, Order of Precedence and Term
      </Typography>
      <Typography paragraph>
        1.1 This Data Processing Agreement (“DPA”) is an addendum to the Terms of Use (“Agreement”) between Pre Amada Fze (“Reloved”) and the User. Reloved and User are individually a “party” and collectively the “parties.” Reloved is under the legal entity of Pre Amada FZE.
      </Typography>
      <Typography paragraph>
        1.2 This DPA applies where and only to the extent that Reloved processes Personal Data on behalf of the User in the course of providing the Services, and such Personal Data is subject to Data Protection Laws of the appropriate jurisdiction, including United Arab Emirates, the State of California, the European Union, the European Economic Area, and/or its member states, Switzerland, and/or the United Kingdom. The parties agree to comply with the terms and conditions in this DPA in connection with such Personal Data.
      </Typography>
      <Typography paragraph>
        1.3 The duration of the Processing covered by this DPA shall be in accordance with the duration of the Agreement.
      </Typography>

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
      </List>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" gutterBottom>
        Schedule 1: Description of the Processing and Subprocessors
      </Typography>

      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table aria-label="processing activities table">
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
                User discloses Personal Data to reloved to provide, operate, and maintain reloved Services.
              </TableCell>
              <TableCell>
                User is a Controller.<br />
                reloved is a Controller.
              </TableCell>
              <TableCell>
                Account registration, payment information, user content, communications, cookies and other tracking technologies, usage of Services, and third-party accounts.
              </TableCell>
              <TableCell>None</TableCell>
              <TableCell>Continuous</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                User discloses Personal Data to improve, analyze, personalize, and reloved Services.
              </TableCell>
              <TableCell>
                User is a Controller.<br />
                reloved is a Controller.
              </TableCell>
              <TableCell>
                Account registration, payment information, user content, communications, cookies and other tracking technologies, usage of Services, and third-party accounts.
              </TableCell>
              <TableCell>None</TableCell>
              <TableCell>Continuous</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                User contacts reloved for support.
              </TableCell>
              <TableCell>
                User is a Controller.<br />
                reloved is a Controller.
              </TableCell>
              <TableCell>
                Account registration, payment information, user content, communications, usage of Services, and third-party accounts.
              </TableCell>
              <TableCell>None</TableCell>
              <TableCell>Continuous</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                User stores end-user data on reloved Services.
              </TableCell>
              <TableCell>
                reloved is a Processor.<br />
                User is a Controller or processor to a controller.
              </TableCell>
              <TableCell>As determined by User.</TableCell>
              <TableCell>As determined by User.</TableCell>
              <TableCell>As determined by User.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* ... (Continue with other sections or schedules) */}
    </Box>
    </ThemeProvider>
  );
};

export default DataProcessingAgreement;
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
} from "@mui/material";

const DataProcessingAgreement = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Data Processing Agreement
      </Typography>

      {/* ... (Previous sections) */}

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
  );
};

export default DataProcessingAgreement;
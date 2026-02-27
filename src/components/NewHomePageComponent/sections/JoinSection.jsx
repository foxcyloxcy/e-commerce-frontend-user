import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

export default function JoinSection() {
  return (
    <Box sx={{ py: 10, textAlign: "center" }}>

      <Container maxWidth="md">

        <Typography variant="h4" gutterBottom>

          How to Join

        </Typography>

        <Typography sx={{ mb: 1 }}>
          1. Register your interest
        </Typography>

        <Typography sx={{ mb: 1 }}>
          2. Join WhatsApp group
        </Typography>

        <Typography sx={{ mb: 3 }}>
          3. Start discussion
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#25d366"
          }}
        >
          Join waitlist
        </Button>

      </Container>

    </Box>
  );
}

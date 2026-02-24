import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: "#111",
        color: "white",
        py: 10,
        textAlign: "center"
      }}
    >
      <Container maxWidth="md">

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Join the Discussion
        </Typography>

        <Typography variant="h6">
          We are hosting a WhatsApp discussion group
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#25d366"
          }}
        >
          Join Discussion
        </Button>

      </Container>
    </Box>
  );
}

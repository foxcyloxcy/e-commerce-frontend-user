import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: "#9b9595",
        color: "white",
        py: 38,
        textAlign: "center"
      }}
    >
      <Container maxWidth="md">

        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{color: ModTheme.palette.primary.main}}> 
          A New Beginning for Reloved 
        </Typography>

        <Typography variant="h6" sx={{color: ModTheme.palette.primary.main}}>
          We’re taking a break as we build something new for our community. 
Big things are on the way. Join the waitlist for early access and updates.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#25d366"
          }}
        >
          Join waitlist
        </Button>

      </Container>
    </Box>
  );
}

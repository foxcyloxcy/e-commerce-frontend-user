import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";
import NewUserLeadsModal from "../../ReusableComponents/ModalComponent/NewUserLeadsModal"

export default function HeroSection() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <Box
      sx={{
        backgroundImage: "url('/featured_new_leads.jpg')", // <-- your image
        backgroundSize: "cover",
        backgroundPosition: {xs:"left", md:"center"},
        backgroundRepeat: "no-repeat",

        color: "white",
        py: {xs: 19, sm: 25, md: 50 },
        textAlign: "center"
      }}
    >
      <Container maxWidth="md" minHeight="100vh">

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: ModTheme.palette.primary.main,
            textShadow: `2px 2px ${ModTheme.palette.primary.contrastText}`,
                fontSize: {
              xs: "1.75rem",  // ~h5
              sm: "2.125rem", // ~h4
              md: "2.5rem",   // ~h3
            }
          }}
        >
          A new beginning for Reloved
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "24px" },
            color: ModTheme.palette.primary.main,
            textShadow: `2px 2px ${ModTheme.palette.primary.contrastText}`,
            paddingBottom:2
          }}
        >
          We’re taking a break as we build something new for our community.
          Join the waitlist for early access and updates.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: ModTheme.palette.primary.main
          }}
          onClick={() => setOpenModal(true)}
        >
          Join waitlist
        </Button>

      </Container>

      <NewUserLeadsModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </Box>
  );
}
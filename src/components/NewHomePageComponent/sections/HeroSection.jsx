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
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        color: "white",
        py: 41,
        textAlign: "center"
      }}
    >
      <Container maxWidth="md">

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: ModTheme.palette.primary.dark,
            textShadow: `0px 2px 8px #000`
          }}
        >
          A New Beginning for Reloved
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: ModTheme.palette.primary.dark,
            textShadow: `0px 2px 8px #000`,
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
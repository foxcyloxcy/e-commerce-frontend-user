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
        backgroundPosition: {xs:"left", sm:"center", md:"center"},
        backgroundRepeat: "no-repeat",
          "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "75%",
          background: {xs:"rgba(0,0,0,0.3)", md:"none"},
          zIndex: 1
        },
        color: "white",
        py: {xs: 19, sm: 25, md: 60 },
        textAlign: "center"
      }}
    >
      <Container  minHeight="100vh"
      sx={{
        maxWidth:{ xs: "800px", sm:"250px", md: "400px"},
        position:{
          xs:"relative", sm:"relative", md: "absolute",
        },
        top: "20%",
        left: {xs:"0", sm:"30%", md:"60%"},
        zIndex: 1
      }}>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: {
              xs: ModTheme.palette.primary.dark, 
              sm:ModTheme.palette.primary.contrastText, 
              md:ModTheme.palette.primary.contrastText
            },

                fontSize: {
              xs: "1.75rem",  // ~h5
              sm: "2.125rem", // ~h4
              md: "2.5rem",   // ~h3
            },
          }}
        >
          A new beginning for Reloved
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "24px" },
            color: {
              xs: ModTheme.palette.primary.dark, 
              sm:ModTheme.palette.primary.contrastText, 
              md:ModTheme.palette.primary.contrastText
            },

            paddingBottom:2
          }}
        >
          We’re taking a break as we build something new for our community.
          Join the waitlist for early access and updates.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: ModTheme.palette.primary.light
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
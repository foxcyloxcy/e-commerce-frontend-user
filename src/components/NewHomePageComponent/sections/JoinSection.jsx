import React, { useState } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";
import NewUserLeadsModal from "../../ReusableComponents/ModalComponent/NewUserLeadsModal";

export default function JoinSection() {

  const [openModal, setOpenModal] = useState(false);

  return (

    <Box
      sx={{
        py: 12,
        backgroundColor: ModTheme.palette.secondary.dark,
        color: "white"
      }}
    >

      <Container maxWidth="lg">

        <Grid
          container
          alignItems="center"
          spacing={6}
        >

          {/* LEFT IMAGE */}

          <Grid item xs={12} md={6} textAlign="center">

            <Box
              component="img"
              src="https://cdn.scoreapp.com/cdn-cgi/image/onerror=redirect,format=webp,width=2328,quality=75,fit=scale-down/https://cdn.scoreapp.com/scorecards/49957/assets/1698673755YsmiKy_cta_2.png"
              sx={{
                width: "100%",
                maxWidth: "400px"
              }}
            />

          </Grid>



          {/* RIGHT CONTENT */}

          <Grid item xs={12} md={6}>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 3,
                color: ModTheme.palette.primary.main
              }}
            >
              How to join the discussion
            </Typography>


            <Typography sx={{ mb: 2, color: ModTheme.palette.primary.main }}>
              ✓ Register your interest and answer 5 questions.
            </Typography>

            <Typography sx={{ mb: 2, color: ModTheme.palette.primary.main }}>
              ✓ Join the WhatsApp group using the link provided.
            </Typography>

            <Typography sx={{ mb: 4, color: ModTheme.palette.primary.main }}>
              ✓ Jump in and enjoy. Leave whenever you want.
            </Typography>


            <Button
              variant="contained"
              size="small"
              onClick={() => setOpenModal(true)}
              sx={{
                backgroundColor: ModTheme.palette.primary.main,
                px: 2,
                py: 1,
                fontSize: "12px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: ModTheme.palette.primary.main
                }
              }}
            >
              Join waitlist
            </Button>

          </Grid>


        </Grid>

      </Container>


      <NewUserLeadsModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />

    </Box>

  );

}
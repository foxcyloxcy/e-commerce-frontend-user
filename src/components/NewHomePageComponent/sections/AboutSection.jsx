import React, { useState } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";
import NewUserLeadsModal from "../../ReusableComponents/ModalComponent/NewUserLeadsModal"

export default function AboutSection() {
  
    const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ py: 10, backgroundColor: ModTheme.palette.primary.light }}>

      <Container maxWidth="lg">

        <Grid container spacing={5} alignItems="center">

          <Grid item xs={12} md={6}>

            <img
              src="https://cdn.scoreapp.com/scorecards/240960/assets/169866739980ioPK_whatsapp_2.png"
              alt="whatsapp"
              style={{ width: "100%" }}
            />

          </Grid>

          <Grid item xs={12} md={6} sx={{color : ModTheme.palette.primary.contrastText}}>

            <Typography variant="h4" gutterBottom>

              Do you care about achieving results?

            </Typography>

            <Typography sx={{ mb: 2 }}>
              Join a discussion group with like minded people.
            </Typography>

            <Typography variant="h6">
              More knowledge
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Learn and grow from discussions.
            </Typography>

            <Typography variant="h6">
              Less confusion
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Gain clarity from experts.
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

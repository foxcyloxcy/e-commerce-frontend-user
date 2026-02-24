import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

export default function AboutSection() {
  return (
    <Box sx={{ py: 10 }}>

      <Container maxWidth="lg">

        <Grid container spacing={5} alignItems="center">

          <Grid item xs={12} md={6}>

            <img
              src="https://cdn.scoreapp.com/scorecards/240960/assets/169866739980ioPK_whatsapp_2.png"
              alt="whatsapp"
              style={{ width: "100%" }}
            />

          </Grid>

          <Grid item xs={12} md={6}>

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
                mt: 2,
                backgroundColor: "#25d366"
              }}
            >
              Join Discussion
            </Button>

          </Grid>

        </Grid>

      </Container>

    </Box>
  );
}

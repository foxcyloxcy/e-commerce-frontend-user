import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";

export default function BenefitsSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: ModTheme.palette.primary.light }}>

      <Container maxWidth="lg">

        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: ModTheme.palette.primary.main }}
        >
          What does the discussion give you?
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3}}>

          {[
            "Daily posts",
            "Recommended videos",
            "Weekly Q&A",
            "Growth opportunities"
          ].map((item) => (

            <Grid item xs={12} md={6} lg={3} key={item}>

              <Paper sx={{ p: 3, textAlign: "center", backgroundColor: ModTheme.palette.primary.contrastText }}>

                <Typography variant="h6">
                  {item}
                </Typography>

              </Paper>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>
  );
}

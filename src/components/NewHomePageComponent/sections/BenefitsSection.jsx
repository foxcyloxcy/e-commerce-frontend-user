import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";

export default function BenefitsSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f5f5f5" }}>

      <Container maxWidth="lg">

        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
        >
          What does the discussion give you?
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>

          {[
            "Daily posts",
            "Recommended videos",
            "Weekly Q&A",
            "Growth opportunities"
          ].map((item) => (

            <Grid item xs={12} md={3} key={item}>

              <Paper sx={{ p: 3, textAlign: "center" }}>

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

import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";

export default function BenefitsSection() {

  const benefits = [
    {
      icon: "/daily-post.png",
      text: "Daily posts"
    },
    {
      icon: "/podcast.png",
      text: "Recommended videos"
    },
    {
      icon: "/q-and-a.png",
      text: "Weekly Q&A"
    },
    {
      icon: "/opportunities.png",
      text: "Growth opportunities"
    }
  ];

  return (
    <Box
      sx={{
        py: 12,
      }}
    >

      <Container maxWidth="lg">

        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{
            mb: 6,
            color: ModTheme.palette.primary.main
          }}
        >
          What does being in the waitlist give you?
        </Typography>


        <Grid container>

          {benefits.map((item, index) => (

            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              key={index}
              sx={{
                textAlign: "center",
                px: 4,
                borderRight:
                  index !== benefits.length - 1
                    ? "1px solid #cfcfcf"
                    : "none"
              }}
            >

              <Box mb={2}>

                <img
                  src={item.icon}
                  alt={item.text}
                  style={{
                    height: "150px",
                    marginBottom: "10px"
                  }}
                />

              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: ModTheme.palette.primary.main
                }}
              >
                {item.text}
              </Typography>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>
  );
}
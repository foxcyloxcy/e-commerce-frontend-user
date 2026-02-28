import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import ModTheme from "../../ThemeComponent/ModTheme";
import NewUserLeadsModal from "../../ReusableComponents/ModalComponent/NewUserLeadsModal"

export default function JoinSection() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ py: 10, textAlign: "center", backgroundColor: ModTheme.palette.secondary.dark }}>

      <Container maxWidth="md">

        <Typography variant="h4" gutterBottom>
          How to Join
        </Typography>

        <Typography sx={{ mb: 1 }}>
          1. Register your interest
        </Typography>

        <Typography sx={{ mb: 1 }}>
          2. Join WhatsApp group
        </Typography>

        <Typography sx={{ mb: 3 }}>
          3. Start discussion
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
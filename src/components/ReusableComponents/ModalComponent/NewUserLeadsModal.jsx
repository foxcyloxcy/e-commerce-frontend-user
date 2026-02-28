import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Grid
} from "@mui/material";
import axios from "axios";
import ModTheme from "../../ThemeComponent/ModTheme";

export default function WaitlistModal({ open, handleClose }) {

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      await axios.post(
        "https://api.therelovedmarketplace.com/api/user-lead",
        form
      );

      alert("Successfully registered!");

      handleClose();

    } catch (error) {

      alert("Something went wrong");

    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 2
        }
      }}
    >

      <DialogContent>

        <Box textAlign="center" mb={3}>
          <Typography
            variant="h6"
            fontWeight="500"
          >
            Enter your details below to register for the discussion
          </Typography>
        </Box>


        <Grid container spacing={2} mb={2}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="first_name"
              placeholder="First name *"
              value={form.first_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="last_name"
              placeholder="Last name *"
              value={form.last_name}
              onChange={handleChange}
            />
          </Grid>

        </Grid>


        <Box mb={3}>
          <TextField
            fullWidth
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
          />
        </Box>


        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: ModTheme.palette.primary.main,
            height: "55px",
            fontSize: "18px",
            "&:hover": {
              backgroundColor: ModTheme.palette.primary.light
            }
          }}
        >
          Join waitlist
        </Button>

      </DialogContent>

    </Dialog>
  );
}
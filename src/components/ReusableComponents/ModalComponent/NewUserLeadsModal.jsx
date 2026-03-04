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
import ModTheme from "../../ThemeComponent/ModTheme";
import Swal from "sweetalert2";
import api from "../../../assets/baseURL/api";

export default function NewUserLeadsModal({ open, handleClose }) {

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.first_name || !form.last_name || !form.email) {

            Swal.fire({
                title: 'Warning',
                text: 'Please fill all required fields',
                icon: 'warning',
                confirmButtonColor: ModTheme.palette.primary.main
            });

            return;
        }

        try {

            const res = await api.post('/api/user-lead', form);

            if (res.data.status) {

                Swal.fire({
                    title: 'Success',
                    text: "You have submitted your details successfully, we will keep you updated with our progress. ",
                    icon: 'success',
                    confirmButtonColor: ModTheme.palette.primary.main,
                });

                setForm({
                    first_name: "",
                    last_name: "",
                    email: ""
                });

                handleClose();

            } else {

                Swal.fire({
                    title: 'Warning',
                    text: res.data.message,
                    icon: 'warning',
                    confirmButtonColor: ModTheme.palette.primary.main
                });

                setForm({
                    first_name: "",
                    last_name: "",
                    email: ""
                });

                handleClose();

            }

        } catch (error) {

            Swal.fire({
                title: 'Error',
                text: 'Oops! Something went wrong.',
                icon: 'error',
                confirmButtonColor: ModTheme.palette.primary.main
            });

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
                <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
                    <Box textAlign="center" mb={3}>
                        <Typography
                            variant="h6"
                            fontWeight="500"
                        >
                            Enter your details below to register for the waitlist
                        </Typography>
                    </Box>


                    <Grid container spacing={2} mb={2}>

                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                name="first_name"
                                placeholder="First name *"
                                value={form.first_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                required
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
                            required
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
                        type="submit"
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
                </Box>

            </DialogContent>

        </Dialog>
    );
}
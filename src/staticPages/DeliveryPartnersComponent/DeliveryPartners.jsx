import React from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    ThemeProvider
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ModTheme from "../../components/ThemeComponent/ModTheme";

const DeliveryPartners = () => {
    return (
        <ThemeProvider theme={ModTheme}>
            <Container maxWidth="lg" sx={{ my: { xs: 8, md: 10 } }}>
                <Box
                    sx={{
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // side-by-side on web
                    }}
                >
                    {/* Image Section */}
                    <Box
                        component="img"
                        src="/delivery-partners-image.jpg" // Replace with your image path
                        alt="Get your item collected"
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            height: { xs: 300, sm: 550, },
                            objectFit: {xs: "cover", sm:"contain"},
                        }}
                    />

                    {/* Content Section */}
                    <Box
                        sx={{
                            textAlign: { xs: "center", md: "left" },
                            p: { xs: 3, md: 5 },
                            width: { md: "50%" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                mb: 1,
                                color: ModTheme.palette.primary.main,
                                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                            }}
                        >
                            Get your item collected
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                mb: 2,
                                fontSize: { xs: "0.85rem", md: "1rem" },
                            }}
                        >
                            Use our delivery partners to collect on your behalf, starting from
                            just AED 40.
                        </Typography>

                        <Box sx={{
                            width: 70,
                            height: 70,
                            border: '2px solid #1a2d5a',
                            borderRadius: '50%',
                            display: "flex",
                            alignSelf: { xs: "center", md: "flex-start" },
                            justifyContent: "center",
                            alignItems:"center",
                            mb: 1,
                            backgroundColor: '#E3F2F7'
                        }}>
                            <LocalShippingIcon
                                sx={{
                                    fontSize: { xs: 40, md: 50 },
                                    color: "#1a2d5a",
                                }}
                            /></Box>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                mb: 3,
                                fontSize: { xs: "0.85rem", md: "1rem" },
                            }}
                        >
                            For larger pieces we can disassemble from the seller and assemble on
                            arrival, so you can shop secondhand furniture with convenience.
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: "bold",
                                color: ModTheme.palette.primary.main,
                                mb: 1,
                                fontSize: { xs: "1rem", md: "1.1rem" },
                            }}
                        >
                            International Delivery
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                mb: 3,
                                fontSize: { xs: "0.85rem", md: "1rem" },
                            }}
                        >
                            Shopping from outside the UAE? We also offer international shipping.
                            Just drop us a message before purchasing and we’ll confirm the
                            options and costs with you.
                        </Typography>


                        <a
                            href="https://wa.me/+971521026110" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="contained"
                                sx={{
                                    px: 3,
                                    py: 1,
                                    alignSelf: { xs: "center", md: "flex-start" },
                                    "&:hover": { bgcolor: "#a0c2ff" },
                                }}
                            >
                                Contact reloved
                            </Button>
                        </a>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default DeliveryPartners;

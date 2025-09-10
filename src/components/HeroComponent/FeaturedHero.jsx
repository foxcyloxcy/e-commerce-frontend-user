import React from 'react';
import { Box, Typography, ThemeProvider, Container, Grid, useMediaQuery } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, VerifiedUser, Sell } from '@mui/icons-material';
import Swal from "sweetalert2";

const FeaturedHero = ({ parentIsLoggedIn }) => {
  const isMobile = useMediaQuery(ModTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const imageRouteMobile = 'featuredHeroMobile.jpg';
  const imageRoute = 'featuredHero.png';

  const item = {
    image: isMobile ? imageRouteMobile : imageRoute,
    title: 'Shop and Sell Secondhand',
    description: 'Sell now and make space for something new!',
  };

  const handleFeatureClick = (feature) => {
    if (feature.title === "Sell Your Items") {
      if (parentIsLoggedIn) {
        navigate("/add-product");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Login or Register Required",
          text: "You need to login or register first before you can sell.",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Register",
          reverseButtons: true,
          confirmButtonColor: ModTheme.palette.primary.main,
          cancelButtonColor: ModTheme.palette.primary.main,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/register");
          }
        });
      }
    } else {
      navigate(feature.route);
    }
  };

  const features = [
    {
      icon: <Sell sx={{ fontSize: { xs: 25, sm: 30 }, color: "#255773" }} />,
      title: "Shop Secondhand",
      desc: "Filter, search and browse. You can checkout without even creating an account!",
      route: "/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties=",
    },
    {
      icon: <VerifiedUser sx={{ fontSize: { xs: 25, sm: 30 }, color: "#255773" }} />,
      title: "Sell Your Items",
      desc: "List your items without any charges, or book our concierge service.",
      route: "/add-product",
    },
    {
      icon: <LocalShipping sx={{ fontSize: { xs: 25, sm: 30 }, color: "#255773" }} />,
      title: "Delivery & Collection",
      desc: "We can offer collection & delivery within 4 hours within the UAE, whilst larger items can be also be assembled. International options are also available.",
      route: "/our-delivery-partners",
    },
  ];

  return (
    <ThemeProvider theme={ModTheme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          mt: { xs: 8, md: 8 }
        }}
      >
        {/* Background Image as Banner */}
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: '100%',
            height: { xs: '200px', sm: '250px' },
            objectFit: { xs: 'cover' },
          }}
        />

        <Container sx={{ py: 2 }}>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, i) => (
              <Grid item xs={4} key={i} textAlign="center">
                <Box
                  sx={{
                    width: { xs: 60, sm: 70 },
                    height: { xs: 60, sm: 70 },
                    border: '2px solid #1a2d5a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    backgroundColor: '#E3F2F7',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleFeatureClick(feature)}
                >
                  {feature.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  mt={1}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {feature.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FeaturedHero;

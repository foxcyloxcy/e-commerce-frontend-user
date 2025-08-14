import React from 'react';
import { Box, Typography, Button, ThemeProvider, Container, Grid, useMediaQuery } from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, VerifiedUser, Sell } from '@mui/icons-material';
import Swal from "sweetalert2";


const FeaturedHero = ({ parentIsLoggedIn }) => {
  const isMobile = useMediaQuery(ModTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const imageRouteMobile = 'featuredHeroMobile.jpg'
  const imageRoute = 'featuredHero.png'


  const handleSearchRoute = () => {
    navigate('/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties=');
  };

  const item = {
    image: isMobile ? imageRouteMobile : imageRoute, // Replace with your image URL
    title: 'Shop and Sell Secondhand',
    description: 'Sell now and make space for something new!',
  };

  const handleFeatureClick = (feature) => {
    if (feature.title === "Sell your items") {
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
      desc: "Filter to search, checkout without creating an account",
      route: "/shop?page=1&sort=1&category_id=&category_name=&sub_category_id=&sub_category_name=&filter_min_price=&filter_max_price=&filter_keyword=&filter_properties=",
    },
    {
      icon: <VerifiedUser sx={{ fontSize: { xs: 25, sm: 30 }, color: "#255773" }} />,
      title: "Sell your items",
      desc: "Upload your items or use our concierge service",
      route: "/add-product",
    },
    {
      icon: <LocalShipping sx={{ fontSize: { xs: 25, sm: 30 }, color: "#255773" }} />,
      title: "Delivery & Collection",
      desc: "Collection & delivery within 4 hours, large items assemble included international options.",
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
            height: { xs: '200px', sm: '250px' }, // Adjust height for banner size
            objectFit: { xs: 'cover', },
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
                >{feature.icon}</Box>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.primary" mt={1} sx={{
                  display: { xs: "none", sm: "block" }, // hide on xs, show on sm and up
                }}>
                  {feature.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Overlay Box */}
        {/* <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            top: { md: '50%' },
            left: { md: '25%' },
            transform: { md: 'translate(-50%, -50%)' },
            background: {xs:'#E3F2F7', md:'rgba(255, 255, 255, 0.8)'}, // Semi-transparent background
            padding: { xs: 2, md: 4 },
            borderRadius: {xs: 0, md:'8px'},
            textAlign: 'center',
            width: { xs: '100%', md: '40%' },
          }}
        >
          <Typography variant="h5" gutterBottom color="text.primary">
            {item.title}
          </Typography>

          <Button
            variant="contained"
            onClick={handlePostItemRoute}
            sx={{marginBottom: 1, marginRight: 1, borderRadius: 1,
              backgroundColor: ModTheme.palette.primary.light,}}
          >
            POST AN ITEM
          </Button>
          or
          <Button
            variant="contained"
            sx={{marginBottom: 1, marginLeft: 1, borderRadius: 1,
              backgroundColor: ModTheme.palette.primary.light,}}
            onClick={handleSearchRoute}
          >
            SEARCH FOR ITEMS
          </Button>

          <Typography variant="h6" sx={{fontSize: "1rem"}}>
            <Box
              component="a"
              href="/how-it-works"
              sx={{ textDecoration: 'underline', color: 'primary.main'}}
            >
              Learn how it works
            </Box>
          </Typography>
        </Box> */}
      </Box>
    </ThemeProvider>
  );
};

export default FeaturedHero;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import FeaturedProducts from '../FeaturedProductsComponent/FeaturedProducts';
import FeaturedHero from '../HeroComponent/FeaturedHero';
import HomeCategories from '../HomeCategoriesComponent/HomeCategories';
import Swal from 'sweetalert2';
import ModTheme from '../ThemeComponent/ModTheme';


export default function Home(props) {
    const { parentIsLoggedIn, userData, userToken, refreshParent } = props
    const history = useNavigate();

    const bankDetailsAlert = async (parsedUserData) => {
        if (parsedUserData.has_bank_details === "No" || parsedUserData.vendor_bank === null) 
                {
                Swal.fire({
                    title: 'Read me',
                    text: "Please visit your My Profile page and create your bank details. You are required to add bank details before you can post an item.",
                    icon: 'warning',
                    confirmButtonText: 'Go to My Profile',
                    confirmButtonColor: ModTheme.palette.primary.main,
                    showCancelButton: true,
                    cancelButtonText: 'I will do it later'
                }).then((result) => {
                    if (result.isConfirmed) {
                        history("/my-profile");
                        refreshParent()
                    }
                })
            }
    }

    useEffect(() => {
        if (userData && userToken) {
            const parsedUserData = JSON.parse(userData)
            bankDetailsAlert(parsedUserData)
        }

    }, [userData, userToken])

    return (
        <Grid container>
            <FeaturedHero parentIsLoggedIn={parentIsLoggedIn} />
            <Grid item xs={12}>
                <HomeCategories />
            </Grid>
            <Grid item xs={12}>
                <FeaturedProducts />
            </Grid>


        </Grid>
    )
}
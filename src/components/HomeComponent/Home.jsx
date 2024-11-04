import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '../FeaturedProductsComponent/FeaturedProducts';
import FeaturedHero from '../HeroComponent/FeaturedHero';
import HomeCategories from '../HomeCategoriesComponent/HomeCategories';
import Swal from 'sweetalert2';
import ModTheme from '../ThemeComponent/ModTheme';


export default function Home(props) {
    const { parentIsLoggedIn, userData, userToken, refreshParent } = props
    const history = useNavigate();

    useEffect(() => {
        if(userData && userToken){
            const parsedUserData = JSON.parse(userData)
            if(parsedUserData.has_bank_details === "No"){
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

    }, [userData, userToken])
    return (
        <>
            <FeaturedHero parentIsLoggedIn={parentIsLoggedIn} />
            <HomeCategories />
            <FeaturedProducts />
        </>
    )
}
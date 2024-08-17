import React from 'react';
import FeaturedProducts from '../FeaturedProductsComponent/FeaturedProducts';
import FeaturedHero from '../HeroComponent/FeaturedHero';
import HomeCategories from '../HomeCategoriesComponent/HomeCategories';


export default function Home(props) {
    const { parentIsLoggedIn } = props
    return(
        <>
        <FeaturedHero parentIsLoggedIn={parentIsLoggedIn}/>
        <HomeCategories/>
        <FeaturedProducts/>
        </>
    )
}
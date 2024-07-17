import React from 'react';
import FeaturedProducts from '../FeaturedProductsComponent/FeaturedProducts';
import FeaturedHero from '../HeroComponent/FeaturedHero';
import HomeCategories from '../HomeCategoriesComponent/HomeCategories';


export default function Home() {

    return(
        <>
        <FeaturedHero/>
        <HomeCategories/>
        <FeaturedProducts/>
        </>
    )
}
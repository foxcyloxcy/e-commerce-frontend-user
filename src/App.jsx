import React, { useState } from 'react';
import './App.css'
import Login from './components/LoginComponent/Login'
import Register from './components/RegisterComponent/Register'
import NavBar from './components/NavbarComponent/NavBar'
import Footer from './components/FooterComponent/Footer';
import FeaturedHero from './components/HeroComponent/FeaturedHero'
import ProductList from './components/ProductListComponent/ProductList';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <FeaturedHero/>
      <ProductList/>
      <Login />
      <Register />
      <Footer/>
    </>
  )
}

export default App

import React, { useState } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginComponent/Login'
import Register from './components/RegisterComponent/Register'
import NavBar from './components/NavbarComponent/NavBar'
import Footer from './components/FooterComponent/Footer';
import FeaturedHero from './components/HeroComponent/FeaturedHero'
import ProductList from './components/ProductListComponent/ProductList';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<FeaturedHero />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

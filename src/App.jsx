import React, { useState } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginComponent/Login'
import Register from './components/RegisterComponent/Register'
import NavBar from './components/NavbarComponent/NavBar'
import Footer from './components/FooterComponent/Footer';
import Home from './components/HomeComponent/Home';
import ProductList from './components/ProductListComponent/ProductList';
import ProductDetails from './components/ProductDetailsComponent/ProductDetails';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

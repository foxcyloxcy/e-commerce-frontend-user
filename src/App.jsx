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
import  secureLocalStorage  from  "react-secure-storage";
import secure from './assets/baseURL/secure';



function App() {
  const storageKey = secure.storageKey
  const storagePrefix = secure.storagePrefix;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState([]);

  if(secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
    hash: storageKey,
  })){
    let value = secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
      hash: storageKey,
    })
    console.log(value)
  }

  if(secureLocalStorage.getItem(`${storagePrefix}_userData`, {
    hash: storageKey,
  })){
    let value = secureLocalStorage.getItem(`${storagePrefix}_userData`, {
      hash: storageKey,
    })
    console.log(value)
  }



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

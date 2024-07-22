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
  const [isLoggedIn, setIsLoggedIn] = useState("")
  const [userData, setUserData] = useState("")
  const [userToken, setUserToken] = useState("")

  const handleClick = (loginUserData, loginUserToken, loginIsLoggedIn) => {
    setIsLoggedIn(loginIsLoggedIn)
    setUserData(loginUserData)
    setUserToken(loginUserToken)
  }

  return (
    <>
      <NavBar
      isLoggedIn={isLoggedIn}
      userData={userData}
      userToken={userToken}/>
      <Routes
        isLoggedIn={isLoggedIn}
        userData={userData}
        userToken={userToken}
      >
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/login" element={<Login refreshParent={handleClick}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

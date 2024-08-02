import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginComponent/Login';
import Register from './components/RegisterComponent/Register';
import NavBar from './components/NavbarComponent/NavBar';
import Footer from './components/FooterComponent/Footer';
import Home from './components/HomeComponent/Home';
import ProductList from './components/ProductListComponent/ProductList';
import ProductDetails from './components/ProductsComponent/ProductDetails';
import AddProduct from './components/ProductsComponent/AddProduct';
import secureLocalStorage from "react-secure-storage";
import secure from './assets/baseURL/secure';
import EditProduct from './components/ProductsComponent/EditProduct';
import MyProfile from './components/UserProfileComponent/MyProfile';
import UserVerification from './components/UserVerificationComponent/UserVerification';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [userData, setUserData] = useState("");
  const [userToken, setUserToken] = useState("");
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;

  useEffect(() => {
    const storedIsLoggedIn = secureLocalStorage.getItem(`${storagePrefix}_isLoggedIn`, {
      hash: storageKey,
    });
    const storedUserData =  secureLocalStorage.getItem(`${storagePrefix}_userData`, {
      hash: storageKey,
    });
    const storedUserToken = secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
      hash: storageKey,
    });

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn);
    }else{
      setIsLoggedIn("")
    }
    if (storedUserData) {
      setUserData(storedUserData);
    }else{
      setUserData("")
    }
    if (storedUserToken) {
      setUserToken(storedUserToken);
    }else{
      setUserToken("")
    }
  }, []);

  const handleClick = async () => {
    const storedIsLoggedIn = secureLocalStorage.getItem(`${storagePrefix}_isLoggedIn`, {
      hash: storageKey,
    });
    const storedUserData =  secureLocalStorage.getItem(`${storagePrefix}_userData`, {
      hash: storageKey,
    });
    const storedUserToken = secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
      hash: storageKey,
    });

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn);
    }
    if (storedUserData) {
      setUserData(storedUserData);
    }
    if (storedUserToken) {
      setUserToken(storedUserToken);
    }
  };

  const handleClickLogout = async () => {
    secureLocalStorage.removeItem(`${storagePrefix}_userData`, {
      hash: storageKey,
    });
    secureLocalStorage.removeItem(`${storagePrefix}_userToken`, {
      hash: storageKey,
    });
    secureLocalStorage.removeItem(`${storagePrefix}_isLoggedIn`,{
      hash: storageKey,
    });

    setIsLoggedIn(false);
  };

  return (
    <>
      <NavBar
      parentIsLoggedIn={isLoggedIn}
      refreshParent={handleClickLogout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails userToken={userToken}/>} />
        <Route path="/add-product" element={<AddProduct userToken={userToken}/>} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/verify" element={<UserVerification />} />
        <Route path="/shop" element={<ProductList parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login refreshParent={handleClick} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

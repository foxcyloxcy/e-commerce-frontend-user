import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginComponent/Login';
import Register from './components/RegisterComponent/Register';
import NavBar from './components/NavbarComponent/NavBar';
import Footer from './components/FooterComponent/Footer';
import Home from './components/HomeComponent/Home';
import ProductList from './components/ProductListComponent/ProductList';
import ProductDetails from './components/ProductDetailsComponent/ProductDetails';
import AddProduct from './components/AddProductComponent/AddProduct';
import secureLocalStorage from "react-secure-storage";
import secure from './assets/baseURL/secure';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [userData, setUserData] = useState("");
  const [userToken, setUserToken] = useState("");
  const storageKey = secure.storageKey;
  const storagePrefix = secure.storagePrefix;

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('IsLoggedIn');
    const storedUserData = localStorage.getItem('UserData');
    const storedUserToken = localStorage.getItem('UserToken');

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn);
    }
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    if (storedUserToken) {
      setUserToken(storedUserToken);
    }
  }, []);

  const handleClick = async (loginUserData, loginUserToken, loginIsLoggedIn) => {
    setIsLoggedIn(loginIsLoggedIn);
    setUserData(loginUserData);
    setUserToken(loginUserToken);

    secureLocalStorage.setItem(`${storagePrefix}_userData`, JSON.stringify(loginUserData), {
      hash: storageKey,
    });
    secureLocalStorage.setItem(`${storagePrefix}_userToken`, loginUserToken, {
      hash: storageKey,
    });
    secureLocalStorage.setItem(`${storagePrefix}_isLoggedIn`, loginIsLoggedIn, {
      hash: storageKey,
    });

  };

  return (
    <>
      <NavBar
        parentIsLoggedIn={isLoggedIn}
        parentUserData={userData}
        parentUserToken={userToken}
        refreshParent={handleClick}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/shop" element={<ProductList parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login refreshParent={handleClick} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

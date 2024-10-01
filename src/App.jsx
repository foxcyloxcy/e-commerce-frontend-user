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
import { ProtectedRoute, PublicRoute } from './RouteProtection';
import OurStoryPage from './staticPages/OurStoryPageComponent/OurStoryPage';
import BuyerAndSellerTerms from './staticPages/BuyerAndSellerTermsComponent/BuyerAndSellerTerms';
import TermsOfUse from './staticPages/TermsOfUseComponent/TermsOfUse';
import TermsAndConditions from './staticPages/TermsAndConditions';
import PrivacyPolicy from './staticPages/PrivacyPolicyComponent/PrivacyPolicy';
import AddVendorProfileDetails from './components/UserProfileComponent/VendorProfileComponent/AddVendorProfileDetails';
import PaymentSuccess from './components/PaymentSuccessComponent/PaymentSuccess';
import ChatMessage from './components/ChatMessageComponent/ChatMessage';
import ViewOffers from './components/UserProfileComponent/OffersToMeComponent/ViewOffers';
import ForgotPassword from './components/ForgotPasswordComponent/ForgotPassword';
import CreateNewPassword from './components/ForgotPasswordComponent/CreateNewPassword';
import FrequentlyAskQuestions from './staticPages/FAQComponent/FrequentAskQuestions';
import RefundPolicy from './staticPages/RefundPolicyComponent/RefundPolicy';

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
    const storedUserData = secureLocalStorage.getItem(`${storagePrefix}_userData`, {
      hash: storageKey,
    });
    const storedUserToken = secureLocalStorage.getItem(`${storagePrefix}_userToken`, {
      hash: storageKey,
    });

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn);
    } else {
      setIsLoggedIn("");
    }
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      setUserData("");
    }
    if (storedUserToken) {
      setUserToken(storedUserToken);
    } else {
      setUserToken("");
    }
  }, []);

  const handleClick = async () => {
    const storedIsLoggedIn = secureLocalStorage.getItem(`${storagePrefix}_isLoggedIn`, {
      hash: storageKey,
    });
    const storedUserData = secureLocalStorage.getItem(`${storagePrefix}_userData`, {
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
    secureLocalStorage.removeItem(`${storagePrefix}_isLoggedIn`, {
      hash: storageKey,
    });

    setIsLoggedIn(false);

    location.replace('/login');
  };

  return (
    <>
      <NavBar
        parentIsLoggedIn={isLoggedIn}
        refreshParent={handleClickLogout}
      />
      <Routes>
        <Route path="/" element={<Home parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/product-details" element={<ProductDetails userToken={userToken} />} />
        <Route path="/shop" element={<ProductList parentIsLoggedIn={isLoggedIn} userToken={userToken} userData={userData} />} />
        <Route path="/our-story" element={<OurStoryPage parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/terms-of-use" element={<TermsOfUse parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy parentIsLoggedIn={isLoggedIn} />} />
        <Route path="/buyer-and-seller-terms" element={<BuyerAndSellerTerms parentIsLoggedIn={isLoggedIn} />} />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddProduct userToken={userToken} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-vendor-profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddVendorProfileDetails userToken={userToken} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-product"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditProduct userToken={userToken} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyProfile userToken={userToken} userData={userData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-offers"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ViewOffers userToken={userToken} userData={userData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PaymentSuccess userToken={userToken} userData={userData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ChatMessage userToken={userToken} userData={userData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login refreshParent={handleClick} />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/verify"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <UserVerification refreshParent={handleClick}/>
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/create-password"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <CreateNewPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <FrequentlyAskQuestions />
            </PublicRoute>
          }
        />

        <Route
          path="/refund-policy"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <RefundPolicy />
            </PublicRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

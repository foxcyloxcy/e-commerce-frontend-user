import React, { useState } from 'react';
import './App.css'
import Login from './components/LoginComponent/Login'
import Register from './components/RegisterComponent/Register'
import NavBar from './components/NavbarComponent/NavBar'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Login />
      <Register />
    </>
  )
}

export default App

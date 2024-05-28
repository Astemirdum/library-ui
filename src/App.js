import React from 'react'
import AuthProvider from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/Router/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import { useEffect, useState } from 'react';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
        setIsAuth(true);
    }
    setLoading(false);
}, [])

  return (
    <AuthProvider value={{
      isAuth,
      setIsAuth,
      isLoading,
  }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

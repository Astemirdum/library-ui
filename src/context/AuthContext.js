import React, { useContext, useState, createContext, useCallback, useEffect } from 'react';
import { removeAuthToken } from '../API/GatewayService';
import { setAuthToken } from '../API/GatewayService';

export const AuthContext = createContext(null);

export function useAuthCtx() {
  return useContext(AuthContext)
}

function AuthProvider(props)  {

  const [user, setUser] = useState({
    username: '',
    role: '',
    isError: false
  })
  
  const {isAuth, setIsAuth, isLoading} = props.value;

  const login = (username, role, token) => {
    const newUser = {...user, username: username, role: role, isError: false}
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('auth', 'true');
    localStorage.setItem('token', token);
    setIsAuth(true);
  }

  const logout = () => {
    removeAuthToken();
    setUser(
      {
        username: '',
        role: '',
        isError: false
      }
    );
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.setItem('auth', 'false');
    setIsAuth(false);
  }

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (!user) {
      return
    }
    user = JSON.parse(user);
    console.log('user', user)
    if ((localStorage.getItem('auth') === 'true')) {
        setUser(prevUser => ({...prevUser, ...user}));
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);
    }
  }, [])


  const { children } = props;

  return (
    <AuthContext.Provider value={{ 
      user, setUser, isAuth, setIsAuth,  logout, login, isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
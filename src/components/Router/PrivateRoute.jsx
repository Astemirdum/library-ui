import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthCtx } from '../../context/AuthContext'

function PrivateRoute({ children }) {
  const { isAuth } = useAuthCtx();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router";
import PrivateRoute from './PrivateRoute'
import { useAuthCtx } from '../../context/AuthContext';
import Loader from "../UI/Loader/Loader";



const AppRouter = () => {
    const {isAuth, isLoading} = useAuthCtx();

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
        ?
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                    element={<PrivateRoute><route.component /></PrivateRoute>}
                />
            ))}
        </Routes>
            :
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                    element={<route.component />}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;

import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) =>{

    const isAuthenticated = localStorage.getItem("token")

    if(isAuthenticated)
    {
        return children;
    }
    else
    {
        return <Navigate to="/Login" />
    };

}

export default PrivateRoute
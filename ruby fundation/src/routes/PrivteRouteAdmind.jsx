import React from 'react'

const PrivteRouteAdmind= ({children}) =>{
  const isAuthenticated = localStorage.getItem("token")
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if(isAuthenticated && currentUser.admin)
    {
        return children;
    }
    else
    {
        return <Navigate to="/" />
    };
}

export default PrivteRouteAdmind

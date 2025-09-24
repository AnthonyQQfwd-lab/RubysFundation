import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/ServicesUsers';

import '../styles/NavBar/NavBar.css'
function NavBar() {
    const navigate = useNavigate();
    function singOut()
    {
        navigate('/');
        localStorage.removeItem('token');
    }

    function goToWantedPage()
    {
      navigate('/wanted')
    }

    function goToProfilePage()
    {
      navigate('/Profile')
    }

    function goToPostPage()
    {
      navigate('/Post')
    }
    
    function goToMessagePage()
    {
      navigate('/Message')
    }

  return (
    <div id="topNav">
        <img src="https://veryceleb.com/wp-content/uploads/brian-peppers_17594-780x405-768x399.jpeg" alt="" />
        <button className='active' href='#home'>Home</button>
        <button onClick={goToWantedPage}>Wanted</button>
        <button onClick={goToProfilePage}>Profile</button>
        <button onClick={goToPostPage}>Create</button>
        <button onClick={goToMessagePage}>Chat</button>
        <button onClick={singOut}>Log Out</button>
    </div>
  )
}

export default NavBar
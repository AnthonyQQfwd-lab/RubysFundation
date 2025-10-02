import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/ServicesUsers';

import '../styles/NavBar/NavBar.css'

function NavBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  function singOut() {
    navigate('/');
    localStorage.removeItem('token');
  }

  function goToHomePage() {
    navigate('/Home');
  }

  function goToWantedPage() {
    navigate('/wanted');
  }

  function goToProfilePage() {
    navigate('/Profile');
  }

  function goToPostPage() {
    navigate('/Post');
  }
    
  function goToMessagePage() {
    navigate('/Message');
  }

  return (
    <div id="topNav">
      <img id="logoNavBar" src="..\public\images\Rubys_Fundation_Logo.png" alt="logo" />
      <button onClick={goToHomePage}>Home</button>
      <button onClick={goToWantedPage}>Wanted</button>
      <button onClick={goToProfilePage}>Profile</button>
      <button onClick={goToPostPage}>Create</button>
      <button onClick={goToMessagePage}>Chat</button>
      <button onClick={singOut}>Log Out</button>
      
      
    </div>
  )
}

export default NavBar;

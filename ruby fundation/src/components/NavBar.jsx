import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/ServicesUsers';
import '../styles/NavBar/NavBar.css'
function NavBar() {
    const navigate = useNavigate();
    function singOut()
    {
        navigate('/LogIn');
    }

  return (
    <div id="topNav">
        <img src="https://veryceleb.com/wp-content/uploads/brian-peppers_17594-780x405-768x399.jpeg" alt="" />
        <button class='active' href='#home'>Home</button>
        <button href='#wanted'>Wanted</button>
        <button href='#profile'>Profile</button>
        <button href='#create'>Create</button>
        <button href='#chat'>Chat</button>
        <button onClick={singOut}>Log Out</button>
    </div>
  )
}

export default NavBar
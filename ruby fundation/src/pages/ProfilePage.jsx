import React from 'react'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'
import '../styles/ProfilePage/ProfilePage.css'
function ProfilePage() {
  return (
    <div id="profilePage">
        
        <NavBar />
        <div id="profileContainer">
            <Profile />
        </div>
        
    </div>
  )
}

export default ProfilePage
import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/HomePage/HomePage.css'
import OutPutAdoption from '../components/OutPutAdoption'

function HomePage() {
  return (
    <div id="homePage">
        <NavBar />
        <div id="outPutAdoptionContainer">
            <OutPutAdoption />
        </div>
        
    </div>
  )
}

export default HomePage
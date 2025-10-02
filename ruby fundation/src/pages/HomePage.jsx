import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/HomePage/HomePage.css'
import OutPutAdoption from '../components/OutPutAdoption'
import FooterBar from '../components/FooterBar'
function HomePage() {
  return (
    <div id="homePage">
        <NavBar />
        <div id="outPutAdoptionContainer">
            <OutPutAdoption />
            <div id="footerContainer">
                 <FooterBar />
            </div>
        </div>
        
    </div>
  )
}

export default HomePage
import React from 'react'
import LogInForm from '../components/LogInForm'
import FundationLogo from '../components/FundationLogo'
import '../styles/LoginPage/LoginPage.css'
function LoginPage() {
  return (
    <div id="loginPageStyle">
        <FundationLogo />
        <LogInForm />
    </div>
  )
}

export default LoginPage
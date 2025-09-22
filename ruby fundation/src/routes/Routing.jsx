import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
const Routing = () => {
  return (
    
    <Router>
        <Routes>
            {/*path es como saldra en la url */}
            {/*si se desea agregar otra ruta solamente se hace lo mismo pero con su respectivo path y elemento */}
            <Route path='Register' element={<RegisterPage />} />
            <Route path='Login' element={<LoginPage />} />
            <Route path='Home' element={<HomePage />} />
        </Routes>
    </Router>
  );
};

export default Routing
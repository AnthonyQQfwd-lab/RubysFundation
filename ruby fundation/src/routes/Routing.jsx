import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import MessagePage from '../pages/MessagePage';
import PostPage from '../pages/PostPage';
import ProfilePage from '../pages/ProfilePage';
import WantedPage from '../pages/WantedPage';
import PrivateRoute from './PrivateRoute';
const Routing = () => {
  return (
    
    <Router>
        <Routes>
            {/*path es como saldra en la url */}
            {/*si se desea agregar otra ruta solamente se hace lo mismo pero con su respectivo path y elemento */}
            <Route path='Register' element={<RegisterPage />} />
            <Route path='Login' element={<LoginPage />} />
            <Route path='Home' element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path='Message' element={<PrivateRoute><MessagePage /></PrivateRoute>} />
            <Route path='Wanted' element={<PrivateRoute><WantedPage /></PrivateRoute>} />
            <Route path='Post' element={<PrivateRoute><PostPage /></PrivateRoute>} />
            <Route path='Profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Routes>
    </Router>
  );
};

export default Routing
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import '../styles/NavBar/NavBar.css';

function NavBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  const singOut = () => {
    navigate('/');
    localStorage.removeItem('token');
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand onClick={() => navigate('/Home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/images/Rubys_Fundation_Logo.png" 
            alt="logo" 
            width={50} 
            height={50} 
            className="d-inline-block align-top me-2"
          />
          Ruby's Fundation
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-light" className="me-2" onClick={() => navigate('/Home')}>Home</Button>
            <Button variant="outline-light" className="me-2" onClick={() => navigate('/wanted')}>Wanted</Button>
            <Button variant="outline-light" className="me-2" onClick={() => navigate('/Profile')}>Profile</Button>
            <Button variant="outline-light" className="me-2" onClick={() => navigate('/Post')}>Create</Button>
            <Button variant="outline-light" className="me-2" onClick={() => navigate('/Message')}>Chat</Button>
            <Button variant="danger" onClick={singOut}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

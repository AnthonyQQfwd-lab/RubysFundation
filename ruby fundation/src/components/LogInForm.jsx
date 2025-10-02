import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers } from '../services/ServicesUsers';
import { getAdmins } from '../services/ServicesAdmins';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LogInForm() {
  const navigate = useNavigate();
  const [userGmail, setUserGmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const adminsData = await getAdmins();
      const usersData = await getUsers();
      setUsers(usersData);
      setAdmins(adminsData);
    }
    fetchUsuarios();
  }, []);

  async function logInUser() {
    try {
      if (userGmail.trim() === '' || userPassword.trim() === '') {
        alert('Please fill in all fields');
        return;
      }

      const verifiedUser = users.find(
        (u) =>
          u.userGmail?.trim().toLowerCase() === userGmail.trim().toLowerCase() &&
          u.userPassword === userPassword
      );

      const verifiedAdmin = admins.find(
        (a) =>
          a.adminGmail?.trim().toLowerCase() === userGmail.trim().toLowerCase() &&
          a.userPassword === userPassword
      );

      if (verifiedAdmin) {
        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({
            name: verifiedAdmin.UserName,
            userId: verifiedAdmin.id,
            gmail: verifiedAdmin.adminGmail,
            admin: true,
          })
        );
        localStorage.setItem('token', verifiedAdmin.id);
        alert('Signed in correctly as Admin');
        navigate('/AdminDashboard');
        return;
      }

      if (verifiedUser) {
        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({
            name: verifiedUser.UserName,
            userId: verifiedUser.userId,
            gmail: verifiedUser.userGmail,
            phoneNumber: verifiedUser.userPhoneNumber,
            helpedPets: verifiedUser.userHelpedPets,
            adoptedPets: verifiedUser.userAdoptedPets,
          })
        );
        localStorage.setItem('token', verifiedUser.id);
        alert('Signed in correctly');
        navigate('/Home');
        return;
      }

      alert('Gmail or password is incorrect');
    } catch (error) {
      console.error('Login error', error);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="shadow-lg p-4" style={{ minWidth: '350px' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Sign In</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Gmail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your gmail"
                    value={userGmail}
                    onChange={(e) => setUserGmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" onClick={logInUser}>
                    Log In
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <small>
                  Don’t have an account? <Link to="/Register">Register here</Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LogInForm;

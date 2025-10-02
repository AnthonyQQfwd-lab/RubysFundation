import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, createUsers } from '../services/ServicesUsers';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegisterForm() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userGmail, setUserGmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userHelpedPets, setUserHelpedPets] = useState(0);
  const [userAdoptedPets, setUserAdoptedPets] = useState(0);
  const [userUbication, setUserUbication] = useState("");

  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUsuarios() {
      const users = await getUsers();
      setUsers(users);
    }
    fetchUsuarios();
  }, []);

  async function userRegister() {
    if (
      userName.trim() === '' ||
      userGmail.trim() === '' ||
      userPassword.trim() === '' ||
      userPhoneNumber.trim() === '' ||
      userId.trim() === '' ||
      userUbication.trim() === ''
    ) {
      alert("fill empty spaces");
      return;
    }

    const userFound = users.find(
      (u) => u.userGmail.trim().toLowerCase() === userGmail.trim().toLowerCase()
    );

    if (userFound) {
      alert("User already register");
      return;
    }

    const newUser = {
      UserName: userName,
      userId: userId,
      userGmail: userGmail,
      userPassword: userPassword,
      userPhoneNumber: userPhoneNumber,
      userHelpedPets: 0,
      userAdoptedPets: 0,
      userUbication: userUbication,
    };

    await createUsers(newUser);

    alert("now sign in ");
    navigate('/');
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="shadow-lg p-4" style={{ minWidth: '400px' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Register Form</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formId">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Gmail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your gmail"
                    value={userGmail}
                    onChange={(e) => setUserGmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    value={userPhoneNumber}
                    onChange={(e) => setUserPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUbication">
                  <Form.Label>Ubication</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your ubication"
                    value={userUbication}
                    onChange={(e) => setUserUbication(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" onClick={userRegister}>
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;

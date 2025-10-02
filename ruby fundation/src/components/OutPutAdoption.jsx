import React, { useEffect, useState } from 'react';
import { getPets } from '../services/ServicesAdoptionPets';
import { Card, Button, Modal, Row, Col, Container, Image } from 'react-bootstrap';
import CarouselPet from './CarouselPet';
import ContactBtn from './ContactBtn';

function OutPutAdoption() {
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({});
  const [showModal, setShowModal] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const adoptionPets = await getPets();
        setPets(adoptionPets);
      } catch (error) {
        console.error("Error getting pets", error);
      }
    };

    fetchPets();
    const interval = setInterval(fetchPets, 5000);
    return () => clearInterval(interval);
  }, []);

  function openDialog(pet) {
    setPet(pet);
    setShowModal(true);
  }

  return (
    <Container className="my-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {pets.map(pet => (
          <Col key={pet.id}>
            <Card className="h-100 shadow-sm">
              {pet.photos?.length > 0 && (
                <Card.Img
                  variant="top"
                  src={pet.photos[0]}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                  {pet.breed} - {pet.age} years
                  <br />
                  Ubication: {pet.ubication}
                  <br />
                  Size: {pet.size}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="primary" onClick={() => openDialog(pet)}>See more</Button>
                <ContactBtn userId={currentUser.userId} keeperId={pet.keeperId} petId={pet.id} petStatus={pet.status} />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          {pet.photos?.length === 1 ? (
            <Image src={pet.photos[0]} fluid style={{ maxHeight: '300px', objectFit: 'cover' }} />
          ) : pet.photos?.length > 1 ? (
            <CarouselPet photos={pet.photos} />
          ) : null}
        </Modal.Header>
        <Modal.Body>
          <h2>{pet.name}</h2>
          <p>{pet.specie}</p>
          <p>Ubication: {pet.ubication}</p>
          <p>Size: {pet.size} - {pet.age} years</p>
          <h5>Description</h5>
          <p>{pet.description}</p>
          <h5>Keeper</h5>
          <p>{pet.keeper}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OutPutAdoption;

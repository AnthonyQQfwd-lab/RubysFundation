import React, { useState, useRef } from 'react';
import { getPets, createPets } from '../services/ServicesAdoptionPets';
import { createMissingPets } from '../services/ServicesMissingPets';
import { createSearchingPets } from '../services/ServicesSearchingPets';
import { Container, Row, Col, Card, Button, Form, Modal, Image } from 'react-bootstrap';

function InputPets() {
  const [images, setImagesBase64] = useState([]);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petSize, setPetSize] = useState("");
  const [petSpecie, setPetSpecie] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petUbication, setPetUbication] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [petType, setPetType] = useState("Adoption");

  const fileInputRef = useRef(null);

  async function uploadImage(e) {
    const files = Array.from(e.target.files);
    const base64Promises = files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }));
    try {
      const base64Images = await Promise.all(base64Promises);
      setImagesBase64(base64Images);
    } catch (error) {
      console.error('Error converting images:', error);
    }
  }

  async function publish() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const pet = {
      photos: images,
      name: petName,
      keeper: currentUser.name,
      keeperId: currentUser.userId,
      specie: petSpecie,
      breed: petBreed,
      size: petSize,
      age: petAge,
      description: petDescription,
      ubication: petUbication,
      status: petType
    };

    try {
      if (petType === "Adoption") await createPets(pet);
      if (petType === "Missing") await createMissingPets(pet);
      if (petType === "Wanted") await createSearchingPets(pet);

      setImagesBase64([]);
      setPetName(""); setPetAge(""); setPetSpecie(""); setPetBreed(""); setPetSize(""); setPetUbication(""); setPetDescription("");
      if (fileInputRef.current) fileInputRef.current.value = null;
      setShowModal(false);
    } catch (error) {
      console.error("Error publishing pet:", error);
    }
  }

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Create a Publication</h2>
      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <Button variant="success" onClick={() => { setPetType("Adoption"); setShowModal(true); }}>Adoption Pet</Button>
        </Col>
        <Col xs="auto">
          <Button variant="warning" onClick={() => { setPetType("Wanted"); setShowModal(true); }}>Wanted Pet</Button>
        </Col>
        <Col xs="auto">
          <Button variant="danger" onClick={() => { setPetType("Missing"); setShowModal(true); }}>Missing Pet</Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{petType} Pet Publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control type="file" multiple accept="image/*" onChange={uploadImage} ref={fileInputRef}/>
              <Row className="mt-2">
                {images.map((img, i) => (
                  <Col xs={4} md={3} key={i} className="mb-2">
                    <Image src={img} thumbnail style={{ height: '100px', objectFit: 'cover' }}/>
                  </Col>
                ))}
              </Row>
            </Form.Group>

            {petType !== "Missing" && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={petName} onChange={e => setPetName(e.target.value)} />
              </Form.Group>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control type="text" value={petBreed} onChange={e => setPetBreed(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control type="text" value={petSize} onChange={e => setPetSize(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            {petType !== "Missing" && (
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={petAge} onChange={e => setPetAge(e.target.value)} />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Specie</Form.Label>
              <Form.Control type="text" value={petSpecie} onChange={e => setPetSpecie(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ubication</Form.Label>
              <Form.Control type="text" value={petUbication} onChange={e => setPetUbication(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={petDescription} onChange={e => setPetDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={publish}>Publish</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default InputPets;

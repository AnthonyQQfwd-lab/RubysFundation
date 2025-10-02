import React, { useState } from 'react';
import { updatePets } from '../services/ServicesAdoptionPets';
import Modal from 'react-bootstrap/Modal';

function BtnEditPets({ pet }) {
  const [showModal, setShowModal] = useState(false);
  const [size, setSize] = useState("");
  const [age, setAge] = useState(pet.age || 0);
  const [description, setDescription] = useState("");
  const [ubication, setUbication] = useState("");

  function openDialog() {
    setSize(pet.size || "");
    setAge(pet.age || 0);
    setDescription(pet.description || "");
    setUbication(pet.ubication || "");
    setShowModal(true);
  }

  async function updatePet() {
    if (!size || !age || !description || !ubication) {
      alert("Fill empty spaces");
      return;
    }

    const updatedPet = {
      size,
      age,
      description,
      ubication
    };

    try {
      await updatePets(pet.id, updatedPet);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error updating pet");
    }
  }

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <h1>Editing {pet.name}</h1>
        </Modal.Header>
        <Modal.Body>
          <label>Size</label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label>Ubication</label>
          <input type="text" value={ubication} onChange={(e) => setUbication(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={updatePet}>Confirm</button>
        </Modal.Footer>
      </Modal>

      <button onClick={openDialog}>Edit</button>
    </div>
  );
}

export default BtnEditPets;

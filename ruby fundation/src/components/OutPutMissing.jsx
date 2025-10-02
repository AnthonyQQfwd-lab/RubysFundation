import React, { useEffect, useState } from 'react'
import { getSearchingPets } from '../services/ServicesSearchingPets';

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import '../styles/HomePage/HomePage.css'
import CarouselPet from './CarouselPet';
import ContactBtn from './ContactBtn';

function OutPutMissing() {
  const [pets, setPets] = useState([])
    const [pet, setPet] = useState({})
    const [showModal, setShowModal] = useState(false)
    
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const searchingPets = await getSearchingPets()
                setPets(searchingPets)
            } catch (error) {
                console.error("Error getting pets", error)
            }
        }

        fetchPets()
        const interval = setInterval(fetchPets, 5000) 
        return () => clearInterval(interval) 
    }, [])

    function openDialog(pet)
    {
        setPet(pet)
        setShowModal(true)
    }
    
        
    

    console.log(pets)
    return (
        <div id="cardsContainer">
            <Modal show={showModal} onHide={() => setShowModal(false)} >
                <Modal.Header className="photosContainer">
                    
                    {pet.photos?.length === 1 ? (
                        <img
                        className="petPhotos"
                        src={pet.photos[0]}
                        alt="Pet photo"
                        />
                    ) : (
                        pet.photos?.length > 1 && <CarouselPet photos={pet.photos} />
                    )}
                </Modal.Header>
                <Modal.Body>
                    <h2>{pet.name}</h2>
                    <p>{pet.specie}</p>
                    <p> Ubication: {pet.ubication}</p>
                    <p> Size: {pet.size} - {pet.age} years  </p>
                    <h4>description</h4>
                    <p>{pet.description}</p>
                    <h4>Keeper</h4>
                    <p>{pet.keeper}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setShowModal(false)} >close</button>
                    <button>Send message</button>
                </Modal.Footer>
            </Modal>
            
            {pets.map(pet => 
                <Card key={pet.id} className="mb-2 p-2 shadow-sm" >
                    <Card.Header className='photosContainer'>
                        <img className='petPhotos' src={pet.photos[0]} alt="" />
                    </Card.Header>
                    <Card.Body className='petCards'>
                        <h3>{pet.name}</h3>
                        <p>{pet.breed} - age: {pet.age}  </p>
                        <p>{pet.ubication}</p>
                        <p>{pet.size}</p>
                    </Card.Body>
                    <Card.Footer>
                        
                        <button onClick={() => openDialog(pet) }>See more</button>
                        <ContactBtn  userId={currentUser.userId} keeperId={pet.keeperId} petId={pet.id} petStatus={pet.status}/>
                    </Card.Footer>
                </Card>
            )}


        </div>

    )
}

export default OutPutMissing

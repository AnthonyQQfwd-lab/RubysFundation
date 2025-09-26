import React, { useEffect, useState } from 'react'
import { getPets } from '../services/ServicesAdoptionPets'
import { Await } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import '../styles/HomePage/HomePage.css'
function OutPutAdoption() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const adoptionPets = await getPets()
                setPets(adoptionPets)
            } catch (error) {
                console.error("Error getting pets", error)
            }
        }

        fetchPets()
        const interval = setInterval(fetchPets, 5000) // cada 5s revisa cambios
        return () => clearInterval(interval) // limpia al desmontar
    }, [])

    console.log(pets)
    return (
        <div id="cardsContainer">
            
            {pets.map(pet => 
                <Card key={pet.id} className="mb-2 p-2 shadow-sm">
                    <Card.Body>
                        <img className='petPhotos' src={pet.photos[0]} alt="" />
                    </Card.Body>
                    <Card.Footer><span>footer</span></Card.Footer>
                </Card>
            )}


        </div>

    )
}

export default OutPutAdoption
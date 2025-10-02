import React,{useEffect, useState} from 'react'
import { getPets, deletePets } from '../services/ServicesAdoptionPets'
import { getMissingPets, deleteMissingPets } from '../services/ServicesMissingPets'
import { getSearchingPets, deleteSearchingPets } from '../services/ServicesSearchingPets'
import BtnDelete from './BtnDelete'
import BtnDeleteWanted from './BtnDeleteWanted'
import BtnDeleteSearching from './BtnDeleteSearching'
import Card from 'react-bootstrap/Card';
import '../styles/AdminPage/adminPage.css'
function AdminDashboard() {

    const [adoptionPets, setAdoptionPets] = useState([])
    const [wantedPets, setWantedPets] = useState([])
    const [missingPets, setMissingPets] = useState([])

    useEffect(() => {
            const fetchPets = async () => {
                try {
                    const wantedPets = await getSearchingPets()
                    const adoptionPets = await getPets()
                    const missingPets = await getMissingPets()
                    setAdoptionPets(adoptionPets)
                    setWantedPets(wantedPets)
                    setMissingPets(missingPets)
                } catch (error) {
                    console.error("Error getting pets", error)
                }
            }
    
            fetchPets()
            const interval = setInterval(fetchPets, 5000) 
            return () => clearInterval(interval) 
        }, [])


  return (
    <div id="cardsContainer">
        {adoptionPets.length > 0 ? (
                    adoptionPets.map(pet => (
                        <Card key={pet.id} className="mb-2 p-2 shadow-sm">
                            <Card.Header className='photosContainer'>
                                <img className='petPhotos' src={pet.photos?.[0] || '/placeholder.png'} alt={pet.name} />
                            </Card.Header>
                            <Card.Body className='petCards'>
                                <h3>{pet.name}</h3>
                                <p>{pet.breed} - age: {pet.age}</p>
                                <p>{pet.ubication}</p>
                                <p>{pet.size}</p>
                            </Card.Body>
                            <Card.Footer>
                                <BtnDelete petId={pet.id}/>
                            </Card.Footer>
                        </Card>
                    ))
                ) : (
            []
        )}
            {wantedPets.map(pet => 
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
                        
                        <BtnDeleteSearching petId={pet.id} />
                        
                    </Card.Footer>
                </Card>
            )}

            {missingPets.map(pet => 
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
                        
                        <BtnDeleteWanted petId={pet.id}/>
                        
                    </Card.Footer>
                </Card>
            )}

        
    </div>
  )
}

export default AdminDashboard

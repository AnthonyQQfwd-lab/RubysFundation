import React, { useState, useEffect } from 'react'
import { getUsers } from '../services/ServicesUsers';
import { getPets } from '../services/ServicesAdoptionPets';
import { getMissingPets } from '../services/ServicesMissingPets';
import { getSearchingPets } from '../services/ServicesSearchingPets';
import BtnDelete from './BtnDelete';
import BtnDeleteWanted from './BtnDeleteWanted';
import BtnDeleteSearching from './BtnDeleteSearching';
import BtnEditPets from './BtnEditPets';
import Card from 'react-bootstrap/Card';
import '../styles/ProfilePage/ProfilePage.css'

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [adoptionPets, setAdoptionPets] = useState([])
  const [wantedPets, setWantedPets] = useState([])
  const [missingPets, setMissingPets] = useState([])
  
  
  useEffect(() => {
    async function fetchUser() {
      const sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const users = await getUsers();
      const foundUser = users.find(u => u.userId === sessionUser.userId);
      setCurrentUser(foundUser);
    }
    fetchUser()
  }, []);

  
  useEffect(() => {
    if (!currentUser) return; 

    async function fetchPets() {
      const adoptionPets = await getPets();
      const wantedPets = await getSearchingPets();
      const missingPets = await getMissingPets();

      const adoptionPetsFiltered = adoptionPets.filter(pet => pet.keeperId === currentUser.userId);
      const wantedPetsFiltered = wantedPets.filter(pet => pet.keeperId === currentUser.userId);
      const missingPetsFiltered = missingPets.filter(pet => pet.keeperId === currentUser.userId);

      setAdoptionPets(adoptionPetsFiltered);
      setWantedPets(wantedPetsFiltered);
      setMissingPets(missingPetsFiltered);
    }

   
    fetchPets();

    
    const intervalId = setInterval(fetchPets, 5000);

    
    return () => clearInterval(intervalId);

  }, [currentUser]);

  return (
    <div>
      {currentUser ? (
        <>
          <h1>{currentUser.UserName}</h1>
          <div id="profileInfo">
            <p>Phone number: {currentUser.userPhoneNumber}</p>
            <p>Gmail: {currentUser.userGmail}</p>
            <p>Ubication: {currentUser.userUbication}</p>
          </div>

          <div id="petsCards">
            {adoptionPets.map(pet => 
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
                  <BtnDelete petId={pet.id}/>
                  <BtnEditPets pet={pet}/>
                </Card.Footer>
              </Card>
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
                    <BtnDeleteSearching petId={pet.id}/>
                </Card.Footer>
              </Card>
            )}

            {missingPets.map(pet => 
              <Card key={pet.id} className="mb-2 p-2 shadow-sm" >
                <Card.Header className='photosContainer'>
                  <img className='petPhotos' src={pet.photos[0]} alt="" />
                </Card.Header>
                <Card.Body className='petCards'>
                  <p>{pet.breed} </p>
                  <p>{pet.ubication}</p>
                  <p>{pet.size}</p>
                </Card.Body>
                <Card.Footer>
                    <BtnDeleteWanted petId={pet.id}/>
                </Card.Footer>
              </Card>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile

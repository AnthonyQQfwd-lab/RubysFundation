import React,{useEffect, useState, version} from 'react'
import { getUsers } from '../services/ServicesUsers';
import { getPets } from '../services/ServicesAdoptionPets';
import { createMessage } from '../services/ServicesMessage';

function ContactBtn({userId, keeperId, petId }) {
    const [users,setUsers] = useState([])
    const [pets,setPets] = useState([])

    function sendMenssage() {
        

        const verifiedUser = users.find(u =>
            u.userId === userId
        )

        const verifiedKeeper = users.find(u =>
            u.userId === keeperId
        )

        const verifiedPet = pets.find(p => 
            p.id === petId
        )

        newChat(verifiedUser, verifiedKeeper, verifiedPet)
    }

    async function newChat(user, keeper, pet ) {
        console.log(user,  keeper, pet)

        const newConvertation = 
        {
            about: pet, 
            participants: [user, keeper],
            messages: []
        }
        await createMessage(newConvertation)
    }


    useEffect(() => {
        async function fetchUsuarios() {
            const users = await getUsers();
            const pets = await getPets();
            setUsers(users);
            setPets(pets)
        }
        fetchUsuarios()
    }, []);

    

    return (
        <div>
            
            <button onClick={sendMenssage}>Contact</button>
        </div>
    )
}

export default ContactBtn
import React,{useEffect, useState, version} from 'react'
import { getUsers } from '../services/ServicesUsers';
import { getPets } from '../services/ServicesAdoptionPets';
import { getMissingPets } from '../services/ServicesMissingPets';
import { getSearchingPets } from '../services/ServicesSearchingPets';
import { createMessage } from '../services/ServicesMessage';
import { getMessages } from '../services/ServicesMessage';
function ContactBtn({userId, keeperId, petId, petStatus }) {
    const [users,setUsers] = useState([])
    const [pets,setPets] = useState([])

    async function sendMenssage() {
        
        
        
        const verifiedUser = users.find(u => u.userId === userId)
        const verifiedKeeper = users.find(u => u.userId === keeperId)
        const verifiedPet = pets.find(p => p.id === petId)
        const conversations = await getMessages()

        const existingConversation = conversations.find(conversation => {
        const participantIds = conversation.participants.map(p => p.userId)
        const aboutMatch = conversation.about.id === verifiedPet.id
        return participantIds.includes(verifiedUser.userId) &&
                participantIds.includes(verifiedKeeper.userId) &&
                aboutMatch
        })

        if (!existingConversation) {
        newChat(verifiedUser, verifiedKeeper, verifiedPet)
        } else {
                 alert("")
        }

    }

    async function newChat(user, keeper, pet ) {
        

        
        const newConversation = 
        {
            about: pet, 
            participants: [user, keeper],
            messages: []
        }
        
        await createMessage(newConversation)
    }


    useEffect(() => {
        async function fetchUsuarios() {
            const users = await getUsers();
            
            const pets = petStatus === "Adoption"
            ? await getPets()
            : petStatus === "Wanted"
            ? await getSearchingPets()
            : petStatus === "Missing"
            ? await getMissingPets()
            : [];
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
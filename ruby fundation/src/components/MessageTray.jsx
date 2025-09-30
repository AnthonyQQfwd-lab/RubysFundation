import React, { useState, useEffect } from 'react'
import '../styles/MessagePage/MessagePage.css'
import { getMessages } from '../services/ServicesMessage'
import Card from 'react-bootstrap/Card';

function MessageTray({ setCurrentConversation }) {
    const [conversations, setConversations] = useState([])
    const [myConversations, setMyConversations] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conversations = await getMessages()
                setConversations(conversations)
            } catch (error) {
                console.error("Error getting conversations", error)
            }
        }

        fetchConversations()
        const interval = setInterval(fetchConversations, 5000) 
        return () => clearInterval(interval) 
    }, [])

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        setCurrentUser(user);

        const filterConversations = conversations.filter(conversation =>
            conversation.participants.some(participant => participant.userId === user.userId)
        );
        setMyConversations(filterConversations);
    }, [conversations])

    function aqui() {
        alert("si funciona ")
    }
    
    return (
        <div id="leftSide">
            {currentUser && myConversations.map(conversation => 
                <Card key={conversation.id} className="mb-2 p-2 shadow-sm" onClick={() => { setCurrentConversation(conversation)}}>
                    <Card.Header>
                        {conversation.participants.map(participant =>
                            participant.userId !== currentUser.userId ? <h1 className='tittleChat'>{participant.UserName}</h1> : null
                        )}
                    </Card.Header>
                    <Card.Body>
                        <p>conversation about:<br/> {conversation.about.name} </p>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            )}
        </div>
    )
}

export default MessageTray

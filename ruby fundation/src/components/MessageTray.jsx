import React, { useState, useEffect } from 'react'
import '../styles/MessagePage/MessagePage.css'
import { getMessages } from '../services/ServicesMessage'
import Card from 'react-bootstrap/Card';

function MessageTray({ setCurrentConversation, myConversations, currentUser }) {
    
    return (
        <div id="leftSide">
            {currentUser && myConversations.map(conversation => 
                <Card key={conversation.id} className="mb-2 p-2 shadow-sm" onClick={() => { setCurrentConversation(conversation)}}>
                    <Card.Header>
                        {conversation.participants.map(participant =>
                            participant.userId !== currentUser.userId ? (
                                <h1 key={participant.userId} className='tittleChat'>
                                {participant.UserName}
                                </h1>
                            ) : null
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

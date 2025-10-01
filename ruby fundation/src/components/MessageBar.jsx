import React, { useEffect, useState } from 'react'
import '../styles/MessagePage/MessagePage.css'


function MessageBar({ conversation, setCurrentConversation, currentUser }) {
    const [message, setMessage] = useState("")

    if (!conversation || !conversation.participants) {
        return <div className="chat-placeholder">Selecciona una conversación</div>
    }

    
    const issuingUser = conversation.participants.find(participant => participant.userId === currentUser.userId)
    const receivingUser = conversation.participants.find(participant => participant.userId !== currentUser.userId)

    function sendMessage()
    {

        if(message.trim() === '')
        {
            return
        }

        const newMessage =
        {
            messageBy: issuingUser,
            messageFor: receivingUser,
            message: message
        }

        const updatedConversation = {
            ...conversation,
            messages: [...conversation.messages, newMessage]
        }

        setCurrentConversation(updatedConversation)
        setMessage("")

    }

  return (
    <div>
        
        <input id="inputMessageBar" type="text" value={message}onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default MessageBar
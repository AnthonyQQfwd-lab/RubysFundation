import React from 'react'

function MessageChat({ conversation }) {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));


    if (!conversation || !conversation.about) {
        return <div className="chat-placeholder">Selecciona una conversación</div>
    }
    

  return (
    <div>
        {conversation.participants.map(participant =>
            
            participant.UserName
            
        )}
    </div>
  )
}

export default MessageChat

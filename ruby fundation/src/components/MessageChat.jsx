import React, { useEffect, useRef } from 'react'
import "../styles/MessagePage/MessagePage.css"

function MessageChat({ conversation, currentUser }) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight; 
      
    }
  }, [conversation?.messages]); 

  if (!conversation || !conversation.about) {
    return <div className="chat-placeholder">Selecciona una conversación</div>
  }

  return (
    <div id="chat" ref={chatRef}>
      {conversation.messages.map((message, index) =>
        message.messageBy.userId === currentUser.userId ? (
          <div key={index} className="messageByUser">{message.message}</div>
        ) : (
          <p key={index} className="messageForUser">{message.message}</p>
        )
      )}
    </div>
  )
}

export default MessageChat

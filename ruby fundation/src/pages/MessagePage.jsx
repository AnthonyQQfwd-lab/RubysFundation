import React,{useState} from 'react'
import NavBar from '../components/NavBar'
import MessageTray from '../components/MessageTray'
import '../styles/MessagePage/MessagePage.css'
import MessageChat from '../components/MessageChat'
function MessagePage() {

  const [currentConversation, setCurrentConversation] = useState(null)

  return (
    <div id="messagePageWrapper">
        <NavBar />
        <div id="messagePageContainer">
          <MessageTray setCurrentConversation={setCurrentConversation} />
          <div id="rightSide">
            <MessageChat conversation={currentConversation} />
          </div>
        </div>
    </div>
  )
}

export default MessagePage
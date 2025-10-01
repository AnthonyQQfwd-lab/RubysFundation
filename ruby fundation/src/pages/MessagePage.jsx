import React,{useEffect, useState} from 'react'
import NavBar from '../components/NavBar'
import MessageTray from '../components/MessageTray'
import '../styles/MessagePage/MessagePage.css'
import MessageChat from '../components/MessageChat'
import MessageBar from '../components/MessageBar'
import { updateMessages, getMessages } from '../services/ServicesMessage'


function MessagePage() {

  const [currentConversation, setCurrentConversation] = useState(null)
  const [conversations, setConversations] = useState([])
  const [myConversations, setMyConversations] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
          const user = JSON.parse(sessionStorage.getItem("currentUser"));
          setCurrentUser(user);
  
          const filterConversations = conversations.filter(conversation =>
              conversation.participants.some(participant => participant.userId === user.userId)
          );
          setMyConversations(filterConversations);
          
  }, [conversations])


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
      
      if(currentConversation)
      {
        const syncMessages = async () => {
          await updateMessages(currentConversation.id, currentConversation)
        }
        syncMessages()
      }
      
  }, [currentConversation])

  useEffect(() => {
    if (!currentConversation) return;

    const fetchUpdatedConversation = async () => {
      try {
        const updatedConversations = await getMessages(); 
        const updatedConversation = updatedConversations.find(conversation => conversation.id === currentConversation.id);
        if (updatedConversation) {
          setCurrentConversation(updatedConversation);
        }
      } catch (error) {
        console.error("Error updating current conversation", error);
      }
    };

    const interval = setInterval(fetchUpdatedConversation, 5000);
    return () => clearInterval(interval);
  }, [currentConversation]);


  return (
    <div id="messagePageWrapper">
        <NavBar />
        <div id="messagePageContainer">
          <MessageTray currentUser={currentUser} myConversations={myConversations} conversations={conversations} setConversations={setConversations} setCurrentConversation={setCurrentConversation} />
          <div id="rightSide">
            <div id="messageChatContainer">
                <MessageChat currentUser={currentUser} conversation={currentConversation} />
            </div>
            <div id="messageBarContainer">
              <MessageBar currentUser={JSON.parse(sessionStorage.getItem("currentUser"))} conversation={currentConversation} setCurrentConversation={setCurrentConversation} />
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default MessagePage
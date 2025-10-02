import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function MessageTray({ setCurrentConversation, myConversations, currentUser }) {
    return (
        <div className="d-flex flex-column" style={{ maxHeight: '90vh', overflowY: 'auto', padding: '10px' }}>
            {currentUser && myConversations.map(conversation => {
                const otherParticipants = conversation.participants.filter(p => p.userId !== currentUser.userId);

                return (
                    <Card 
                        key={conversation.id} 
                        className="mb-2 shadow-sm"
                        onClick={() => setCurrentConversation(conversation)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                {otherParticipants.map(participant => (
                                    <h6 key={participant.userId} className="mb-0">
                                        {participant.UserName}
                                    </h6>
                                ))}
                            </div>
                            <Badge bg="secondary">
                                {conversation?.about?.status || 'Pet'}
                            </Badge>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {conversation?.about?.status === "Adoption" && (
                                    <ListGroup.Item>
                                        Conversation about: {conversation.about.name}
                                    </ListGroup.Item>
                                )}
                                {conversation?.about?.status === "Wanted" && (
                                    <ListGroup.Item>Conversation about wanted pet</ListGroup.Item>
                                )}
                                {conversation?.about?.status === "Missing" && (
                                    <ListGroup.Item>Conversation about missing pet</ListGroup.Item>
                                )}
                                {!conversation?.about?.status && (
                                    <ListGroup.Item>Conversation about pet</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="outline-primary" size="sm">Open</Button>
                        </Card.Footer>
                    </Card>
                )
            })}
        </div>
    )
}

export default MessageTray

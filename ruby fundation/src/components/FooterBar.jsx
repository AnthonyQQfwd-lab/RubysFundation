import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

function FooterBar() {
    const navigate = useNavigate();

    function goToInformation() {
        navigate('/Information'); 
    }

    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                <Row className="text-center text-md-start align-items-center">
                    <Col md={4} className="mb-2 mb-md-0">
                        <span 
                            onClick={goToInformation} 
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Information – press here to know more
                        </span>
                    </Col>
                    <Col md={4} className="mb-2 mb-md-0">
                        <strong>Mission / Vision:</strong> Helping lost and abandoned pets find loving homes.
                    </Col>
                    <Col md={4}>
                        Contact: <a href="mailto:RubysFundation@gmail.com" className="text-light">RubysFundation@gmail.com</a> | +506 64114552
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterBar

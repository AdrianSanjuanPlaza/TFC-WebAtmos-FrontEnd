import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";


function Footer() {
  return (
    <footer className="py-4 footer" style={{backgroundColor: '#f0f5ff', width: '100%'}}>
      <Container fluid>
        <Row>
          <Col md={4} className="text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} WebAtmos. Todos los derechos reservados.</p>
          </Col>
          <Col md={4} className="text-center">
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="ms-3"><a className="link-dark text-decoration-none" href="/terminos">Términos de Servicio</a></li>
              <li className="ms-3"><a className="link-dark text-decoration-none" href="/privacidad">Política de Privacidad</a></li>
              <li className="ms-3"><a className="link-dark text-decoration-none" href="/contacto">Contacto</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-center">
            <a href="#" className="link-dark ms-3"><FaFacebook/></a>
            <a href="#" className="link-dark ms-3"><FaSquareXTwitter /></a>
            <a href="#" className="link-dark ms-3"><FaInstagram /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
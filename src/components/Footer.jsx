import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MyContext } from '../App';
import { useContext } from "react"

function Footer() {

  const { isDarkMode, setIsDarkMode } = useContext(MyContext)

  return (
    <footer className="py-4 footer w-100 shadow-lg" style={isDarkMode ? {backgroundColor: '#1d2021'} : {backgroundColor: '#f0f5ff'}}>
      <Container style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
        <Row >
          <Col md={4} className="text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} WebAtmos. Todos los derechos reservados.</p>
          </Col>
          <Col md={4} className="text-center">
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="ms-3"><a className=" text-decoration-none" href="/terminos">Términos de Servicio</a></li>
              <li className="ms-3"><a className=" text-decoration-none" href="/privacidad">Política de Privacidad</a></li>
              <li className="ms-3"><a className=" text-decoration-none" href="/contratacion">Contacto</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-center">
            <a href="https://www.facebook.com/?locale=es_ES" className=" ms-3"><FaFacebook/></a>
            <a href="https://x.com/home?lang=es" className=" ms-3"><FaSquareXTwitter /></a>
            <a href="https://www.instagram.com" className=" ms-3"><FaInstagram /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
import React, { useContext } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import teamPhoto1 from '../assets/images/team-member2.jpg';
import team from '../assets/images/team-2.jpg'
import teamPhoto2 from '../assets/images/team-member1.jpg';
import teamPhoto3 from '../assets/images/team-member3.jpg'
import missionImage from '../assets/images/mission.jpg';
import visionImage from '../assets/images/vision.jpg';
import { MyContext } from '../App';

function About() {

  const { isDarkMode, setIsDarkMode } = useContext(MyContext)

  return (
    <div className="about-us-page">
      <section className="py-5" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={team} alt="Nuestro Equipo" className="img-fluid rounded" />
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h2 className="mb-4">Sobre Nosotros - WebAtmos</h2>
              <p className="lead">
                En WebAtmos, somos un equipo apasionado y dedicado a la excelencia en el desarrollo web,
                mantenimiento de sitios y despliegue de aplicaciones. Nuestra misión es impulsar el éxito
                online de nuestros clientes a través de soluciones innovadoras y un servicio excepcional.
              </p>
              <p>
                Creemos en la colaboración, la transparencia y la calidad en cada proyecto que emprendemos.
                Nuestra experiencia y conocimientos nos permiten abordar desafíos complejos y entregar resultados
                que superan las expectativas.
              </p>
              <Button variant="primary" href="#our-team">Conoce a nuestro equipo</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
        <Container style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
          <Row className="align-items-center">
            <Col md={6} className="order-md-2 text-center">
              <Image src={missionImage} alt="Nuestra Misión" className="img-fluid rounded" style={{ maxWidth: '300px' }} />
            </Col>
            <Col md={6} className="order-md-1 mt-4 mt-md-0">
              <h2 className="mb-4">Nuestra Misión</h2>
              <p>
                Nuestra misión es proporcionar soluciones web integrales y de alta calidad que permitan a nuestros
                clientes alcanzar sus objetivos de negocio. Nos esforzamos por ser un socio tecnológico confiable,
                ofreciendo servicios que van desde la creación de sitios web atractivos y funcionales hasta el
                mantenimiento continuo y el despliegue eficiente de aplicaciones.
              </p>
              <p>
                Nos comprometemos a mantenernos a la vanguardia de las últimas tecnologías y tendencias para ofrecer
                soluciones innovadoras y adaptadas a las necesidades cambiantes del mercado.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={visionImage} alt="Nuestra Visión" className="img-fluid rounded" style={{ maxWidth: '300px' }} />
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h2 className="mb-4">Nuestra Visión</h2>
              <p>
                Nuestra visión es ser líderes en el sector del desarrollo web, reconocidos por nuestra excelencia técnica,
                nuestro compromiso con la satisfacción del cliente y nuestra capacidad para impulsar la transformación digital.
              </p>
              <p>
                Aspiramos a construir relaciones a largo plazo con nuestros clientes, basadas en la confianza y el éxito mutuo.
                Queremos ser el socio preferido para empresas que buscan una presencia online sólida, escalable y de alto rendimiento.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="our-team" className="py-5" style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
        <Container>
          <h2 className="text-center mb-4" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>Nuestro Equipo</h2>
          <Row className="justify-content-center">
            <Col lg={4} md={6} className="mb-4">
              <div className="team-member text-center rounded shadow-sm p-4" style={{backgroundColor: "#b9b9b9"}}>
                <Image src={teamPhoto2} alt="Miembro del Equipo 1" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                <h4>Adrián Sanjuán Plaza</h4>
                <p className='text-muted'>Project Manajer</p>
                <p className="text-muted">Desarrollador Full-Stack</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className="team-member text-center rounded shadow-sm p-4" style={{backgroundColor: "#b9b9b9"}}>
                <Image src={teamPhoto1} alt="Miembro del Equipo 2" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                <h4>Carolina Gutiérrez Sáez</h4>
                <p className="text-muted">Analista</p>
                <p className="text-muted">DBA</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className="team-member text-center rounded shadow-sm p-4" style={{backgroundColor: "#b9b9b9"}}>
                <Image src={teamPhoto3} alt="Miembro del Equipo 3" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                <h4>Daniel Collado Albert</h4>
                <p className="text-muted">Diseñador gráfico</p>
                <p className="text-muted">UX/UI</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
          <h2 className="text-center mb-4">Dónde Encontrarnos</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="map-responsive rounded shadow-sm" style={{ overflow: 'hidden', paddingBottom: '56.25%', position: 'relative', height: 0 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.60261649882!2d-0.8679203878085601!3d38.63502197166357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63df7663dc4241%3A0x54f76e34aa5dbc31!2sAv.%20Constituci%C3%B3n%2C%2070%2C%2003400%20Villena%2C%20Alicante!5e0!3m2!1ses!2ses!4v1747843364821!5m2!1ses!2ses"
                  width="600"
                  height="450"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WebAtmos Location - Villena"
                ></iframe>
              </div>
              <p className="text-center mt-3">
                Puedes encontrarnos en nuestra oficina central en Avenida de la Constitución, Nº 70, 03400 Villena, Alicante, España.</p>
              <p className="text-center">¡Esperamos verte pronto!</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default About;
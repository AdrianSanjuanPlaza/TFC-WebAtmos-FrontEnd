import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import webDevelopmentImage from '../assets/images/web-development.jpg';
import maintenanceImage from '../assets/images/maintenance.jpg';
import deploymentImage from '../assets/images/deployment.png';
import teamImage from '../assets/images/equipo.jpg';
import contactImage from '../assets/images/contactImage.png';
import supportImage from '../assets/images/supportImage.jpg'
import rendimientoImage from '../assets/images/rendimiento.jpg'
import index from '../assets/images/index.jpg'

function Index() {
  
  return (
    <div className="landing-page">
      <section className="py-5 mt-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={6} className="text-center text-md-start">
              <h2 className="mb-4">¿Quiénes Somos?</h2>
              <p className="lead">
                En WebAtmos, somos un equipo apasionado por la tecnología y la creación de experiencias web excepcionales.
                Nos dedicamos a impulsar el éxito online de nuestros clientes a través de soluciones de desarrollo web innovadoras,
                servicios de mantenimiento confiables y un despliegue de aplicaciones eficiente.
              </p>
              <p>
                Nuestra experiencia abarca desde la conceptualización y diseño hasta la implementación y el soporte continuo.
                Creemos en la colaboración estrecha con nuestros clientes para entender sus necesidades y ofrecer soluciones
                que superen sus expectativas.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start">
                <Button variant="primary" href="/sobre-nosotros">Conoce más sobre nosotros</Button>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <Image src={index} alt="Nuestro Equipo" className="img-fluid rounded shadow-sm mt-3" style={{ maxWidth: '300px' }} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Nuestros Servicios</h2>
          <Row className="justify-content-center">
            <Col md={4} className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '240px' }}>
                <Image src={webDevelopmentImage} alt="Desarrollo Web Icon" style={{ maxWidth: '180px' }} />
              </div>
              <h3>Desarrollo Web</h3>
              <p>Creamos sitios web a medida, desde landings atractivas hasta plataformas complejas. Nos enfocamos en la funcionalidad, la experiencia del usuario y el diseño responsive.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '240px' }}>
                <Image src={maintenanceImage} alt="Mantenimiento Web Icon" style={{ maxWidth: '180px' }} />
              </div>
              <h3>Mantenimiento Web</h3>
              <p>Mantén tu sitio web funcionando sin problemas con nuestros servicios de mantenimiento. Actualizaciones, seguridad, copias de seguridad y soporte técnico para tu tranquilidad.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '240px' }}>
                <Image src={deploymentImage} alt="Despliegue de Aplicaciones Icon" style={{ maxWidth: '180px' }} />
              </div>
              <h3>Despliegue de Aplicaciones</h3>
              <p>Implementamos tus aplicaciones web de forma segura y eficiente en la infraestructura que mejor se adapte a tus necesidades. Optimizamos el rendimiento y la escalabilidad.</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button variant="primary" href="/productos">Conoce nuestros servicios</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">¿Por qué elegir WebAtmos?</h2>
          <Row className="justify-content-center">
            <Col lg={10}>
              <ul className="list-unstyled">
                {[
                  {
                    image: teamImage,
                    alt: 'Equipo Profesional',
                    title: 'Experiencia y Profesionalismo',
                    description:
                      'Contamos con un equipo de profesionales apasionados y con amplia experiencia en el desarrollo, mantenimiento y despliegue de soluciones web.',
                  },
                  {
                    image: maintenanceImage,
                    alt: 'Soluciones Personalizadas',
                    title: 'Soluciones Personalizadas',
                    description:
                      'Entendemos que cada proyecto es único. Ofrecemos soluciones a medida que se adaptan a tus necesidades específicas y objetivos de negocio.',
                  },
                  {
                    image: rendimientoImage,
                    alt: 'Rendimiento y Eficiencia',
                    title: 'Rendimiento y Eficiencia',
                    description:
                      'Nos enfocamos en crear sitios web y desplegar aplicaciones con un alto rendimiento, optimizando la velocidad y la eficiencia en cada etapa del proceso.',
                  },
                  {
                    image: supportImage,
                    alt: 'Soporte Continuo',
                    title: 'Soporte Continuo',
                    description:
                      'No te dejamos solo después del lanzamiento. Ofrecemos un soporte continuo para asegurar el correcto funcionamiento y la evolución de tu presencia online.',
                  },
                ].map((item, index) => (
                  <Row key={index} className={`mb-4 align-items-center ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                    <Col md={4} className="text-center">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        className="rounded-circle"
                        style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col md={8} className={`text-center text-md-start ${index % 2 !== 0 ? 'text-md-end' : ''}`}>
                      <h5 className="mt-2">{item.title}</h5>
                      <p className="mb-0">{item.description}</p>
                    </Col>
                  </Row>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="contact-preview" className="py-5 bg-light">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={6} className="text-center">
              <Image src={contactImage} alt="Contacto" className="img-fluid" style={{ maxWidth: '300px' }} />
            </Col>
            <Col md={6} className="mt-4 mt-md-0 text-center text-md-start">
              <h2 className="mb-4">¿Tienes un proyecto en mente? ¡Hablemos!</h2>
              <p className="lead">
                En WebAtmos, estamos listos para ayudarte a hacer realidad tus ideas.
                Cuéntanos un poco sobre tu proyecto y cómo podemos colaborar para alcanzar tus objetivos.
              </p>
              <p>
                Nuestro equipo está preparado para ofrecerte soluciones personalizadas y un presupuesto adaptado a tus necesidades.
              </p>
              <Button variant="primary" size="lg" href="/contratacion">
                Envío de solicitudes
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Index
import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../functions';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCode, FaWrench, FaRocket, FaChartLine, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import webFoto from '../../assets/images/web-development.jpg'

function Index() {
  const [productos, setProductos] = useState([]);
  let contador = 0;

  const getProductos = async () => {
    Swal.fire({
      title: 'Cargando servicios...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await sendRequest("GET", "", "/products", "");
      if (res && res.products) {
        setProductos(res.products);
        Swal.close();
      } else {
        setProductos([]);
        Swal.close();
      }
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setProductos([]);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar',
        text: 'No se pudieron cargar los servicios.',
      });
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <>
      <section className="py-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={6} className="text-center text-md-start">
              <h1>Impulsa tu Éxito Online con Nuestros Servicios Web Integrales</h1>
              <p className="lead mt-3 mb-4">
                En WebAtmos, te ofrecemos un abanico completo de soluciones web diseñadas para llevar tu presencia digital al siguiente nivel.
                Desde la creación de sitios web atractivos y funcionales hasta el mantenimiento continuo y el despliegue eficiente de aplicaciones,
                nuestro equipo de expertos está listo para hacer realidad tus ideas y superar tus expectativas.
              </p>
              <p>
                Creemos en la colaboración estrecha contigo para entender tus necesidades únicas y ofrecerte servicios personalizados que se adapten
                perfectamente a tus objetivos de negocio. Explora nuestros servicios y descubre cómo podemos ayudarte a destacar en el competitivo mundo online.
              </p>
              <Button variant="primary" size="lg" as={Link} to="/contratacion" className="mt-3">
                ¡Hablemos de tu proyecto!
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <img src={webFoto} alt="Servicios Web Integrales" className="img-fluid rounded shadow-sm mt-3" style={{ maxWidth: '300px' }} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light py-5 mt-5">
        <Container>
          <h2 className="text-center mb-4">¿Por qué elegir nuestros servicios?</h2>
          <Row xs={1} md={2} className="g-4">
            <Col className="text-center">
              <FaCode size={50} className="text-primary mb-3" />
              <h3>Desarrollo a Medida</h3>
              <p>Creamos soluciones web únicas, adaptadas a tus necesidades específicas y objetivos de negocio. Desde sitios web corporativos hasta plataformas complejas.</p>
            </Col>
            <Col className="text-center">
              <FaWrench size={50} className="text-success mb-3" />
              <h3>Mantenimiento Confiable</h3>
              <p>Aseguramos el funcionamiento óptimo de tu sitio web con servicios de mantenimiento continuo, actualizaciones de seguridad y soporte técnico experto.</p>
            </Col>
            <Col className="text-center">
              <FaRocket size={50} className="text-warning mb-3" />
              <h3>Despliegue Eficiente</h3>
              <p>Implementamos tus aplicaciones web de forma segura y optimizada, garantizando un rendimiento superior y una escalabilidad adecuada.</p>
            </Col>
            <Col className="text-center">
              <FaChartLine size={50} className="text-info mb-3" />
              <h3>Estrategia Digital</h3>
              <p>Te ayudamos a definir y ejecutar una estrategia digital efectiva para alcanzar tus metas online, desde la consultoría inicial hasta el análisis de resultados.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='py-5 mt-5'>
        <Container>
        <h2 className="text-center mb-4">Nuestros servicios</h2>
        <p className='mb-1 text-mute small text-center'>Si el producto no es un servicio directo, se considera el precio por página</p>
        </Container>
      </section>

      <div className='tablaProductos'>

      <Container className="mt-5">
      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
        {productos.length === 0 ? (
          <Col xs={12}>
            <div className="text-center">
              <p>No hay servicios disponibles en este momento.</p>
            </div>
          </Col>
        ) : productos.length === 1 ? (

          <Col xs={12} md={6} lg={4}>
            <div className='card h-100 text-center border-primary bg-light shadow-sm'>
              <div className='card-body d-flex flex-column justify-content-center align-items-center p-3'>
                <Link to={`/contratacion?search=${encodeURIComponent(productos[0].name)}`} className='text-decoration-none text-primary'>
                  <h3 className='card-title mb-2'>{productos[0].name}</h3>
                  <p className='card-text small'>{productos[0].description}</p>
                </Link>
              </div>
            </div>
          </Col>
        ) : (
          productos.map((producto) => (
            <Col key={producto.id} xs={12} md={6} lg={4}>
              <div className='card h-100 text-center border-primary bg-light shadow-sm'>
                <div className='card-body d-flex flex-column justify-content-center align-items-center p-3'>
                  <Link to={`/contratacion?search=${encodeURIComponent(producto.name)}`} className='text-decoration-none text-primary'>
                    <h3 className='card-title mb-2'>{producto.name}</h3>
                    <p className='card-text small'>{producto.description}</p>
                    <p className='mb-1 text-mute small'>{producto.price}€</p>
                  </Link>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
      </div>

      

      <section className="py-5">
        <Container className="text-center">
          <h2>¿Listo para empezar?</h2>
          <p className="lead mb-4">Explora nuestros servicios en detalle y contáctanos para discutir tu proyecto.</p>
          <Button variant="primary" size="lg" as={Link} to="/contratacion">Contacta con nosotros</Button>
        </Container>
      </section>
    </>
  );
}

export default Index;
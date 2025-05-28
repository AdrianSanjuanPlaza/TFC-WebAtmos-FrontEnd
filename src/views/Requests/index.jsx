import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { sendRequest, show_alerta } from '../../functions';
import storage from '../../Storage/storage';
import { FaLightbulb, FaHandshake, FaPencilAlt, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import webMaintenanceImage from '../../assets/images/contratacion1.jpg'; 
import webServicesSummary from '../../assets/images/login.jpg'; 
import { useContext } from "react"
import { MyContext } from '../../App';

 function Index() {
  const [productId, setProductId] = useState('');
  const [description, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const authUser = storage.get("authUser");
  const { isDarkMode, setIsDarkMode } = useContext(MyContext)

  const userId = authUser._id

  const sendSolicitud = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError('');

   const form = { productId, userId, description };

   try {    
    const res = await sendRequest('POST', form, '/requests/new', "", true, "Solicitud enviada correctamente");
    console.log(res);

    if (res) {
     show_alerta("Solicitud enviada correctamente", "success");
     setProductId('');
     setDescripcion('');
    } else {
     setError(res?.error || "Solicitud denegada.");
     show_alerta(res?.error || "Solicitud denegada.", "error");
    }
   } catch (err) {
    console.error("Error al enviar la solicitud:", err);
    setError("Error al enviar la solicitud.");
    show_alerta("Error al enviar la solicitud.", "error");
   } finally {
    setLoading(false);
   }
  };

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
     <Container style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
      <Row className="align-items-center justify-content-center">
       <Col md={6} className="text-center text-md-start">
        <h1>Impulsa tu Éxito Web con Soluciones Personalizadas</h1>
        <p className="lead mt-3">
         ¿Listo para llevar tu proyecto al siguiente nivel? En WebAtmos, te ofrecemos soluciones web a medida,
         desde el diseño inicial hasta el mantenimiento continuo. Cuéntanos tu idea y la haremos realidad.
        </p>
        <Button variant="primary" size="lg" href="#form" className="mt-3 mb-3">
         ¡Solicita tu Presupuesto!
        </Button>
       </Col>
       <Col md={6} className="text-center">
            <img src={webMaintenanceImage} alt="Mantenimiento de Aplicaciones Móviles" className="img-fluid rounded shadow-sm" style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
      </Row>
     </Container>
    </section>

    <section className="py-5"  style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
     <Container className="text-center" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
      <h2>Beneficios de Contratar Nuestros Servicios</h2>
      <Row className="mt-4 justify-content-center">
       <Col md={4} className="mb-4">
        <FaCheckCircle size={40} className="text-success mb-3" />
        <h4>Soluciones Personalizadas</h4>
        <p>Adaptamos nuestros servicios a tus necesidades y objetivos específicos.</p>
       </Col>
       <Col md={4} className="mb-4">
        <FaClock size={40} className="text-info mb-3" />
        <h4>Entrega Eficiente</h4>
        <p>Trabajamos con rapidez y profesionalismo para cumplir con los plazos.</p>
       </Col>
       <Col md={4} className="mb-4">
        <FaUsers size={40} className="text-primary mb-3" />
        <h4>Equipo de Expertos</h4>
        <p>Contamos con profesionales cualificados y con experiencia en diversas áreas web.</p>
       </Col>
      </Row>
     </Container>
    </section>

    <section className="py-5">
     <Container className="text-center" id='how' style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
      <h2>¿Cómo Funciona?</h2>
      <Row className="mt-4 justify-content-center">
       <Col md={4} className="mb-4">
        <div className="d-flex align-items-center justify-content-center">
         <FaLightbulb size={40} className="text-primary me-3" />
         <h4>Comparte tu Idea</h4>
        </div>
        <p className="mt-2">Describe tu proyecto y tus necesidades en el formulario.</p>
       </Col>
       <Col md={4} className="mb-4">
        <div className="d-flex align-items-center justify-content-center">
         <FaHandshake size={40} className="text-primary me-3" />
         <h4>Recibe una Propuesta</h4>
        </div>
        <p className="mt-2">Te enviaremos una propuesta detallada y un presupuesto personalizado.</p>
       </Col>
       <Col md={4} className="mb-4">
        <div className="d-flex align-items-center justify-content-center">
         <FaPencilAlt size={40} className="text-primary me-3" />
         <h4>Creamos tu Web</h4>
        </div>
        <p className="mt-2">Una vez aceptada la propuesta, comenzaremos a construir tu visión.</p>
       </Col>
      </Row>
     </Container>
    </section>

    <Container className="mb-5 d-flex justify-content-center align-items-start" >
     <div className="card p-4 border border-primary rounded shadow w-90 shadow-sm" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff", maxWidth: '500px' } : { backgroundColor: '#f0f5ff', color: "#1d2021", maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Detalles de tu Solicitud</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={sendSolicitud} id='form'>
       <Form.Group className="mb-3" controlId="formPaquete">
        <Form.Label>Servicio Deseado</Form.Label>
        <Form.Control
         as="select"
         placeholder="Seleccione un servicio..."
         value={productId}
         onChange={(e) => setProductId(e.target.value)}
         required
        >
         <option value="">Seleccione un servicio</option>
         {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>{producto.name}</option>
         ))}
        </Form.Control>
        <Form.Text className="text-muted">Selecciona el servicio que mejor se ajuste a tu necesidad.</Form.Text>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formDescripcion">
        <Form.Label>Descripción del Proyecto</Form.Label>
        <Form.Control
         as="textarea"
         rows={5}
         placeholder="Describe tu proyecto en detalle..."
         value={description}
         onChange={(e) => setDescripcion(e.target.value)}
         required
        />
        <Form.Text className="text-muted">Proporciona la mayor cantidad de detalles posible para que podamos entender tu visión.</Form.Text>
       </Form.Group>

       <Button variant="primary" type="submit" className="w-100" disabled={loading || !productId || !description}>
        {loading ? 'Enviando solicitud...' : 'Enviar solicitud'}
       </Button>
      </Form>
     </div>
    </Container>

    

    
   </>
  );
 }

 export default Index;
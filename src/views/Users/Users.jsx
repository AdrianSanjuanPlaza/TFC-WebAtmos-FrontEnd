import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import storage from '../../Storage/storage';
import { useNavigate } from 'react-router-dom';
import { sendRequest, show_alerta } from '../../functions';
import { useContext } from "react"
import { MyContext } from '../../App';

function Users({ userData, onSave, onCancel }) {

  const authUser = storage.get("authUser");
  const authToken = storage.get("authToken");
  
  const [name, setName] = useState(authUser.name || '');
  const [surname, setSurname] = useState(authUser.surname || '');
  const [email, setEmail] = useState(authUser.email || '');
  const [phone, setPhone] = useState(authUser.phone || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isDarkMode, setIsDarkMode } = useContext(MyContext)

  const go = useNavigate();  

  function goLogin(){
    go("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const updatedData = {
      name,
      surname,
      phone,
      email
    };

    const res = await sendRequest('PATCH', updatedData, `/users/${authUser._id}`, '', true, "Información actualizada correctamente");
    
    if (res) {
      show_alerta("Información de usuario actualizada correctamente", "success")
      const newRes = await sendRequest('GET', "", `/users/${authUser._id}`, '', true, "Información actualizada correctamente");
      storage.set('authUser', newRes);
      go("/login")
    } else {
      show_alerta("No se ha podido actualizar la información del usuario", "error");
    }
  };

  return (
    <Container className="mt-5 mb-4" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
      <Row className="justify-content-center align-items-center">
        <Col md={8}>
          <div className='text-center mb-4'>
            <h2>Edición de Datos de Usuario</h2>
            <p className="lead">Aquí puedes modificar la información de tu cuenta.</p>
            <p>Revisa los campos y realiza los cambios que necesites.</p>
          </div>
          <div className='card p-4 shadow border border-primary rounded' style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', color: "#1d2021" }}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSurname">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese sus apellidos"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ingrese su número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={goLogin} className="me-2">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Guardar Cambios
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Users;
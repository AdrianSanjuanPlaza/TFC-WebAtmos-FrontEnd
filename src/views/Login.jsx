import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../functions';
import storage from '../Storage/storage';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { IoIosLogOut } from "react-icons/io";

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [contraMal, setContraMal] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const go = useNavigate();

  function goEditUser(){
    go("/user")
  }

  const login = async (e) => {
    e.preventDefault();
    const form = { name, password };

    const res = await sendRequest('POST', form, '/users/login', '', false, "Iniciado sesión correctamente");

    if (res.data) {
      storage.set('authToken', res.token);
      storage.set('authUser', res.data);
      storage.set('profile', res.data.profile);
      go("/")
    } else {
      show_alerta("Error al iniciar sesión, credenciales inválidas", "error");
    }
  };

  const logout = async () => {
    try {
      await sendRequest('POST', {}, '/users/logout', '', true);
      storage.remove("authToken");
      storage.remove("authUser");
      storage.remove("profile");
      setName("");
      setPassword("");
      show_alerta("Sesión cerrada con éxito", "success");
      go("/login");
    } catch (error) {
      show_alerta("No se pudo cerrar sesión", "error");
    }
  };

  function validarContrasena(e) {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    setContraMal(regex.test(e.target.value));
  }

  // Verifica si el usuario está autenticado
  const authUser = storage.get("authUser");
  const authToken = storage.get("authToken");

  if (authUser && authToken) {
    return (
      <>
      <div className="mt-5 text-center">
        <h2>¡Bienvenido a WebAtmos!</h2>
        <p className="lead">Inicia sesión para acceder a tu panel de control.</p>
        <ul className="list-unstyled mt-3">
          <li><i className="fa fa-check-circle text-success mr-2"></i> Realiza solicitudes de nuestros servicios.</li>
          <li><i className="fa fa-check-circle text-success mr-2"></i> Consulta el estado de tus solicitudes.</li>
          <li><i className="fa fa-check-circle text-success mr-2"></i> Contacta con nosotros fácilmente.</li>
        </ul>
      </div>

      <Container className="mt-5 d-flex justify-content-center align-items-center mb-5">
        <div className="card p-4 shadow bg-light border border-primary rounded" style={{ maxWidth: '400px', width: '90%' }}>
          <h1 className="text-center mb-4">Tu Perfil</h1>
          <div className="mb-3 text-center">
            <h5>{authUser.name}</h5>
            <p className="text-muted">{authUser.email}</p>
            <p><strong>Rol:</strong> <span className="badge bg-info">{authUser.profile}</span></p>
          </div>
          <Button variant="outline-primary" onClick={logout} className="w-100 mb-3">
            <i className="fa-solid fa-sign-out-alt me-2"><IoIosLogOut /></i> Cerrar Sesión
          </Button>
          <Button variant="outline-primary" onClick={goEditUser} className="w-100">
          <i className="fa-solid fa-sign-out-alt me-2"><IoIosLogOut /></i> Editar información
          </Button> 
        </div>
      </Container>
      </>
      
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="mt-3 text-center">
        <h2>¡Bienvenido a WebAtmos!</h2>
        <p className="lead">Inicia sesión para acceder a tu panel de control.</p>
        <ul className="list-unstyled mt-3">
          <li><i className="fa fa-check-circle text-success mr-2"></i> Realiza solicitudes de nuestros servicios.</li>
          <li><i className="fa fa-check-circle text-success mr-2"></i> Consulta el estado de tus solicitudes.</li>
          <li><i className="fa fa-check-circle text-success mr-2"></i> Contacta con nosotros fácilmente.</li>
        </ul>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="card p-4 shadow bg-light border border-primary rounded">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={login}>
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre de usuario"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={validarContrasena}
                  required
                />
                <Form.Text className="text-muted">
                  La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo.
                </Form.Text>
                <Alert variant="danger" className={`mt-2 ${contraMal ? 'd-none' : ''}`}>
                  La contraseña no cumple con los requisitos.
                </Alert>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading || !contraMal}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Form>
            <div className="mt-3 text-center">
              ¿No tienes una cuenta? <Link to="/register" className="text-primary">Regístrate aquí</Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/forgot-password" className="text-primary">¿Olvidaste tu contraseña?</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
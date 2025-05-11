import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../functions';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [password, setPassword] = useState('');
  const [pass2, setPass2] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [mal, setMal] = useState(true);
  const [contraMal, setContraMal] = useState(true);
  const go = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (password === pass2 && contraMal) {
      setMal(true);
      const form = { name, surname: surnames, birthday: date, phone, email, password };
      const res = await sendRequest('POST', form, '/users', '', false, "Usuario Registrado Correctamente");
      if (res) {
        go('/login');
      } else if (res.error) {
        setError(res.error);
      }
    } else {
      if (password !== pass2) {
        setMal(false);
      }
      if (!contraMal) {
        show_alerta("La contraseña no cumple con los requisitos.", "warning");
      }
    }
  };

  const validarContrasena = (e) => {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&.]{8,}$/;
    setContraMal(regex.test(e.target.value));
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow bg-light border border-primary rounded z-1" style={{ maxWidth: '500px', width: '90%' }}>
        <h2 className="text-center mb-4">Regístrate</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={register}>
          {/* -------------------- NAME -------------------- */}
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          {/* -------------------- SURNAME -------------------- */}
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos..."
              value={surnames}
              onChange={(e) => setSurnames(e.target.value)}
              required
            />
          </Form.Group>

          {/* -------------------- BIRTHDAY -------------------- */}
          <Form.Group className="mb-3" controlId="fromBirthday">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          {/* -------------------- PHONE -------------------- */}
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ej.: 633333333"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={9}
              maxLength={9}
            />
          </Form.Group>

          {/* -------------------- EMAIL -------------------- */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* -------------------- PASSWORD -------------------- */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña..."
              value={password}
              onChange={validarContrasena}
              required
            />
            <Form.Text className="text-muted">
              La contraseña debe contener al menos 8 carácteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&_.).
            </Form.Text>
            <Alert variant="danger" className={`mt-2 ${contraMal ? 'd-none' : ''}`}>
              La contraseña no cumple con los requisitos.
            </Alert>
          </Form.Group>

          {/* -------------------- PASSWORD2 -------------------- */}
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repetir contraseña..."
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              required
            />
            <Alert variant="danger" className={`mt-2 ${mal ? 'd-none' : ''}`}>
              Las contraseñas no coinciden.
            </Alert>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading || !contraMal || !mal}>
            {loading ? 'Registrando usuario...' : 'Registrarse'}
          </Button>
        </Form>
        <p className="mt-3 text-center">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
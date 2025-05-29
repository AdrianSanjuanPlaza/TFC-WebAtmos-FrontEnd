import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../functions';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MyContext } from '../App';

const Register = () => {
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [password, setPassword] = useState('');
  const [pass2, setPass2] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [mal, setMal] = useState(true); // true significa que coinciden (o aún no se ha escrito)
  const [contraMal, setContraMal] = useState(true); // true significa que cumple requisitos
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [dateValid, setDateValid] = useState(true); // New state for date validation
  const go = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(MyContext);

  // Función para manejar el cambio en la segunda contraseña
  const handlePass2Change = (e) => {
    const value = e.target.value;
    setPass2(value); // Actualiza el estado de pass2

    // Realiza la comparación inmediatamente
    // Compara el valor actual de 'password' con el valor recién escrito de 'pass2'
    setMal(password === value);
  };

  const register = async (e) => {
    e.preventDefault();

    // Re-validar todas las condiciones justo antes de enviar, por si acaso
    const passwordsMatch = password === pass2;
    const passwordMeetsRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&.]{8,}$/.test(password);
    
    // Re-validar la fecha de nacimiento
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isDateValid = selectedDate <= yesterday;

    setMal(passwordsMatch);
    setContraMal(passwordMeetsRequirements);
    setDateValid(isDateValid);

    if (passwordsMatch && passwordMeetsRequirements && isDateValid) {
      const form = { name, surname: surnames, birthday: date, phone, email, password };
      setLoading(true);

      try {
        const res = await sendRequest('POST', form, '/users', '', false, "Usuario Registrado Correctamente");
        setLoading(false);
        if (res) {
          go('/login');
        } else if (res && res.error) {
          setError(res.error);
        }
      } catch (err) {
        setLoading(false);
        setError('Error al registrar el usuario. Inténtalo de nuevo.');
        console.error('Error en el registro:', err);
      }
    } else {
      // Mostrar alertas específicas si alguna validación falla
      if (!passwordsMatch) {
        show_alerta("Las contraseñas no coinciden.", "warning");
      }
      if (!passwordMeetsRequirements) {
        show_alerta("La contraseña no cumple con los requisitos.", "warning");
      }
      if (!isDateValid) {
        show_alerta("La fecha de nacimiento no puede ser posterior al día de ayer.", "warning");
      }
    }
  };

  const validarContrasena = (e) => {
    const value = e.target.value;
    setPassword(value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&.]{8,}$/;
    setContraMal(regex.test(value));

    // También compara con pass2 cuando la primera contraseña cambia
    setMal(value === pass2);
  };

  const validarFechaNacimiento = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    setDate(e.target.value);

    // Actualiza el estado de validación de la fecha en tiempo real
    setDateValid(selectedDate <= yesterday);
  };

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow border border-primary rounded z-1 w-100" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff", maxWidth: "400px" } : { backgroundColor: '#f0f5ff', color: "#1d2021", maxWidth: "400px" }}>
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
              onChange={validarFechaNacimiento} // Use the validation function
              required
            />
            <Alert variant="danger" className={`mt-2 ${dateValid ? 'd-none' : ''}`}>
              La fecha de nacimiento no puede ser posterior al día de ayer.
            </Alert>
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
            <InputGroup>
              <Form.Control
                type={showPassword1 ? "text" : "password"}
                placeholder="Contraseña..."
                value={password}
                onChange={validarContrasena} // Usa la función que valida y compara
                required
              />
              <Button
                variant="outline-secondary"
                onClick={togglePassword1Visibility}
                aria-label={showPassword1 ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword1 ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <Form.Text style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
              La contraseña debe contener al menos 8 carácteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&_.).
            </Form.Text>
            <Alert variant="danger" className={`mt-2 ${contraMal ? 'd-none' : ''}`}>
              La contraseña no cumple con los requisitos.
            </Alert>
          </Form.Group>

          {/* -------------------- PASSWORD2 -------------------- */}
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Repetir contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword2 ? "text" : "password"}
                placeholder="Repetir contraseña..."
                value={pass2}
                onChange={handlePass2Change} // ¡Aquí está el cambio clave!
                required
              />
              <Button
                variant="outline-secondary"
                onClick={togglePassword2Visibility}
                aria-label={showPassword2 ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <Alert variant="danger" className={`mt-2 ${mal ? 'd-none' : ''}`}>
              Las contraseñas no coinciden.
            </Alert>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading || !contraMal || !mal || !dateValid || !name || !surnames || !phone || !email || !date}
            // Deshabilita el botón si alguna validación falla o si faltan campos requeridos
          >
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
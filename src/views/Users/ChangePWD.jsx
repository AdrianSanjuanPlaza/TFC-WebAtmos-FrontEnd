import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../../functions';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import storage from '../../Storage/storage';
import { MyContext } from '../../App';

const Register = () => {
  const [newPassword, setNewPassword] = useState('');
  const [pass2, setPass2] = useState('');
  const [mal, setMal] = useState(true); // true significa que coinciden (o aún no se ha escrito)
  const [contraMal, setContraMal] = useState(true); // true significa que cumple requisitos
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const go = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(MyContext);

  // Función para manejar el cambio en la segunda contraseña
  const handlePass2Change = (e) => {
    const value = e.target.value;
    setPass2(value); // Actualiza el estado de pass2

    // Realiza la comparación inmediatamente
    // Compara el valor actual de newPassword con el valor recién escrito de pass2
    setMal(newPassword === value);
  };

  const changePassword = async (e) => {
    e.preventDefault();

    // Re-validar las contraseñas justo antes de enviar, por si acaso
    const passwordsMatch = newPassword === pass2;
    const passwordMeetsRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&.]{8,}$/.test(newPassword);

    setMal(passwordsMatch);
    setContraMal(passwordMeetsRequirements);

    if (passwordsMatch && passwordMeetsRequirements) {
      setLoading(true);
      const user = storage.get("authUser");
      const form = { newPassword };

      try {
        const res = await sendRequest('PATCH', form, '/users/changepassword/' + user._id, '', false, "Contraseña cambiada correctamente");
        setLoading(false);
        if (res) {
          go('/login');
        } else if (res && res.error) {
          setError(res.error);
        }
      } catch (err) {
        setLoading(false);
        setError('Error al cambiar la contraseña. Inténtalo de nuevo.');
        console.error('Error en changePassword:', err);
      }
    } else {
      if (!passwordsMatch) {
        show_alerta("Las contraseñas no coinciden.", "warning");
      }
      if (!passwordMeetsRequirements) {
        show_alerta("La contraseña no cumple con los requisitos.", "warning");
      }
    }
  };

  const validarContrasena = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&.]{8,}$/;
    setContraMal(regex.test(value));

    // También compara con pass2 cuando la primera contraseña cambia
    setMal(value === pass2);
  };

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow border border-primary rounded z-1 w-100" style={isDarkMode? { backgroundColor: '#1d2021', maxWidth: '500px', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', maxWidth: '500px', color: "#1d2021" }}>
        <h2 className="text-center mb-4">Cambia tu contraseña</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={changePassword}>
          {/* -------------------- PASSWORD -------------------- */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword1 ? "text" : "password"}
                placeholder="Contraseña..."
                value={newPassword}
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
                onChange={handlePass2Change}
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

          <Button variant="primary" type="submit" className="w-100" disabled={loading || !contraMal || !mal}>
            {loading ? 'Cambiando contraseña...' : 'Cambia tu contraseña'}
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
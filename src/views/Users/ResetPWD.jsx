import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../../functions';
import storage from '../../Storage/storage';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { MyContext } from '../../App';

function ResetPWD() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const { isDarkMode, setIsDarkMode } = useContext(MyContext)

    const go = useNavigate();

    const solicitarCambioContraseña = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        let jsonEmail = {
            email
        }

        const res = await sendRequest('POST', jsonEmail, '/users/validateemail', '', false);
        setLoading(false);

        console.log(res)

        if (res._id) {
            if (!res.isActive) {
                show_alerta("Tu cuenta ha sido desactivada. Contacta con el administrador.", "error");
                return;
            }
            storage.set('authUser', res);

            go("/");
            window.location.reload();
            show_alerta("Petición enviada correctamente", "success");
        } else {
            show_alerta(res?.error || "Error al enviar la petición", "error");
            setError(res?.error || "Error al enviar la petición");
        }
    };

    return (
        <>
        <Container className="mt-5 mb-5">
            <div className="mt-3 text-center" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
                <h2>¡Bienvenido a WebAtmos!</h2>
                <p className="lead">Ingresa tu correo electrónico para enviarte la petición de cambio de contraseña</p>
            </div>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="card p-4 shadow border border-primary rounded" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', color: "#1d2021" }}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={solicitarCambioContraseña}>
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
                            <div className="mt-3 text-center">
                                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                            </div>
                            <div className="mt-3 text-center">
                                ¿No tienes una cuenta? <Link to="/register" className="text-primary">Regístrate aquí</Link>
                            </div>
                            <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                                    {loading ? 'Enviando petición...' : 'Enviar petición'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ResetPWD;
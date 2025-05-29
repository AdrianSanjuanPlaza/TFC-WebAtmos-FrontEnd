import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../functions';
import storage from '../Storage/storage';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap'; 
import { IoIosLogOut } from "react-icons/io";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useContext } from "react"
import { MyContext } from '../App';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [contraMal, setContraMal] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { isDarkMode, setIsDarkMode } = useContext(MyContext)

    const go = useNavigate();

    function goEditUser() {
        go("/user");
    }

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const form = { name, password };

        const res = await sendRequest('POST', form, '/users/login', '', false);
        setLoading(false);

        if (res.data) {
            if (!res.data.isActive) {
                show_alerta("Tu cuenta ha sido desactivada. Contacta con el administrador.", "error");
                return;
            }
            storage.set('authToken', res.token);
            storage.set('authUser', res.data);
            storage.set('profile', res.data.profile);
            go("/");
            window.location.reload();
            show_alerta("Iniciado sesión correctamente", "success");
        } else {
            show_alerta(res?.error || "Error al iniciar sesión, credenciales inválidas", "error");
            setError(res?.error || "Error al iniciar sesión, credenciales inválidas");
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
            go("/login");
            window.location.reload();
            show_alerta("Sesión cerrada con éxito", "success");
        } catch (error) {
            show_alerta("No se pudo cerrar sesión", "error");
        }
    };

    function validarContrasena(e) {
        setPassword(e.target.value);
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        setContraMal(regex.test(e.target.value));
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const authUser = storage.get("authUser");
    const authToken = storage.get("authToken");

    if (authUser && authToken) {
        return (
            <>
                <div className="mt-5 text-center" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
                    <h2>¡Bienvenido a WebAtmos!</h2>
                    <p className="lead">Inicia sesión para acceder a tu panel de control.</p>
                    <ul className="list-unstyled mt-3">
                        <li><i className="fa fa-check-circle text-success me-2"></i> Realiza solicitudes de nuestros servicios.</li>
                        <li><i className="fa fa-check-circle text-success me-2"></i> Consulta el estado de tus solicitudes.</li>
                        <li><i className="fa fa-check-circle text-success me-2"></i> Contacta con nosotros fácilmente.</li>
                    </ul>
                </div>

                <Container className="mt-5 d-flex justify-content-center align-items-center mb-5" >
                    <div className="card p-4 shadow border border-primary rounded w-100 mx-auto"  style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff", maxWidth: '400px' } : { backgroundColor: '#f0f5ff', color: "#1d2021", maxWidth: '400px' }}>
                        <h1 className="text-center mb-4">Tu Perfil</h1>
                        <div className="mb-3 text-center">
                            <h5>{authUser.name}</h5>
                            <p>{authUser.email}</p>
                            <p>Tlf: {authUser.phone}</p>
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
        <Container className="mt-5 mb-5" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
            <div className="mt-3 text-center">
                <h2>¡Bienvenido a WebAtmos!</h2>
                <p className="lead">Inicia sesión para acceder a tu panel de control.</p>
                <ul className="list-unstyled mt-3">
                    <li><i className="fa fa-check-circle text-success me-2"></i> Realiza solicitudes de nuestros servicios.</li>
                    <li><i className="fa fa-check-circle text-success me-2"></i> Consulta el estado de tus solicitudes.</li>
                    <li><i className="fa fa-check-circle text-success me-2"></i> Contacta con nosotros fácilmente.</li>
                </ul>
            </div>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="card p-4 shadow border border-primary rounded" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', color: "#1d2021" }}>
                        <h2 className="text-center mb-4" >Iniciar Sesión</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={login} >
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
                                <InputGroup> 
                                    <Form.Control
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={validarContrasena}
                                        required
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />} 
                                    </Button>
                                </InputGroup>
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
                            <Link to="/forgotpassword" className="text-primary">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
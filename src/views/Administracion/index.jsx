import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Form, Badge, Button, Pagination, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { sendRequest, show_alerta } from '../../functions';
import storage from '../../Storage/storage';
import { FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SearchBox from '../../components/SearchBox'
import { MyContext } from '../../App';

function AdminRequestsDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const authUser = storage.get('authUser');
    const [filterService, setFilterService] = useState('');
    const [filterUser, setFilterUser] = useState('');
    const [allServices, setAllServices] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 9;
    //Estados para la administración de usuarios
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [userPage, setUserPage] = useState(1);
    const usersPerPage = 5; // Cantidad de usuarios por página
    const { isDarkMode, setIsDarkMode } = useContext(MyContext)

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        Swal.fire({
            title: 'Cargando datos...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const [requestsRes, servicesRes, usersRes] = await Promise.all([
                sendRequest('GET', '', '/requests', '', true),
                sendRequest('GET', '', '/products', '', true),
                sendRequest('GET', '', '/users', '', true),
            ]);

            if (requestsRes) setRequests(requestsRes);
            if (servicesRes && servicesRes.products) setAllServices(servicesRes.products);
            if (usersRes) {
                setAllUsers(usersRes);
                const namesMap = {};
                usersRes.forEach(user => {
                    namesMap[user._id] = user.name || user.email || 'Nombre no disponible';
                });
                setUserNames(namesMap);
            }

            setLoading(false);
            Swal.close();
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar',
                text: 'No se pudieron cargar los datos iniciales.',
            });
        }
    };

    const updateRequestStatus = async (id, newStatus) => {
        const confirmationResult = await Swal.fire({
            title: `¿Seguro que deseas cambiar el estado a "${newStatus}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'No, cancelar',
        });

        if (confirmationResult.isConfirmed) {
            try {
                const res = await sendRequest('PATCH', { state: newStatus, id: id }, `/requests/state/${id}`, '', true, `Estado actualizado a "${newStatus}"`);
                if (res) {
                    show_alerta(`Estado de la solicitud ${id} actualizado a "${newStatus}"`, 'success');
                    fetchInitialData();
                } else {
                    show_alerta(res?.error || 'Error al actualizar el estado.', 'error');
                }
            } catch (error) {
                console.error('Error al actualizar el estado:', error);
                show_alerta('Error al actualizar el estado.', 'error');
            }
        }
    };

    const handleDisableUser = async (userId, currentIsActive) => {
        const newIsActive = !currentIsActive;
        const action = newIsActive ? 'habilitar' : 'deshabilitar';

        const confirmationResult = await Swal.fire({
            title: `¿Seguro que deseas ${action} este usuario?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Sí, ${action}`,
            cancelButtonText: 'No, cancelar',
        });

        if (confirmationResult.isConfirmed) {
            try {
                const res = await sendRequest('PATCH', { isActive: newIsActive }, `/users/toogle/${userId}`, '', true, `Usuario ${action}do`);
                if (res) {
                    show_alerta(`Usuario ${action}do correctamente.`, 'success');
                    fetchInitialData(); // Recargar datos para ver el cambio
                } else {
                    show_alerta(res?.error || `Error al ${action} el usuario.`, 'error');
                }
            } catch (error) {
                console.error(`Error al ${action} el usuario:`, error);
                show_alerta(`Error al ${action} el usuario.`, 'error');
            }
        }
    };

    const filteredRequests = requests.filter(request => {
        const serviceMatch = !filterService || request.productId === filterService;
        const userMatch = !filterUser || request.userId === filterUser;
        return serviceMatch && userMatch;
    });

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return pageNumbers;
    };

    const handleUserSearch = (searchTerm) => {
        setUserSearchTerm(searchTerm);
    };

    const filteredUsers = allUsers.filter(user =>
        user.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    ).filter(user => user.profile !== 'ADMIN');

    const indexOfLastUser = userPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginateUsers = (pageNumber) => setUserPage(pageNumber);
    const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);

    const renderUserPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalUserPages; i++) {
            pageNumbers.push(
                <Pagination.Item key={i} active={i === userPage} onClick={() => paginateUsers(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return pageNumbers;
    };

    if (loading) {
        return (
            <Container className="mt-5">
                <h2 className="text-center mb-4">Administración de Solicitudes</h2>
                <div className="text-center">Cargando datos...</div>
            </Container>
        );
    }

    if (!authUser || authUser.profile !== 'ADMIN') {
        return (
            <Container className="mt-5">
                <h2 className="text-center mb-4">Administración</h2>
                <div className="text-center text-danger">No autorizado para acceder a esta página.</div>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={isDarkMode? { color: "#f0f5ff" } : { color: "#1d2021"}}>
            <h2 className="text-center mb-4">Administración de Solicitudes</h2>

            <Row className="mb-4">
                <Col md={6}>
                    <Form.Group controlId="filterService">
                        <Form.Label>Filtrar por Servicio:</Form.Label>
                        <Form.Control
                            as="select"
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                        >
                            <option value="">Todos los servicios</option>
                            {allServices.map(service => (
                                <option key={service._id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="filterUser">
                        <Form.Label>Filtrar por Usuario:</Form.Label>
                        <Form.Control
                            as="select"
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                        >
                            <option value="">Todos los usuarios</option>
                            {allUsers.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name || user.email || 'Nombre no disponible'}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {filteredRequests.length === 0 ? (
                <div className="text-center">No hay solicitudes que coincidan con los filtros.</div>
            ) : (
                <>
                    <Row xs={1} md={3} className="g-4">
                        {currentRequests.map(request => (
                            <Col key={request._id}>
                                <Card className="shadow-sm h-100" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', color: "#1d2021"}}>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <div>
                                            <Card.Title className="mb-2">{request._id}</Card.Title>
                                            <Card.Subtitle className="mb-2 small">
                                                Usuario: {userNames[request.userId] || 'Cargando...'}
                                            </Card.Subtitle>
                                            <Card.Subtitle className="mb-2 small">
                                                Servicio ID: {request.productId}
                                            </Card.Subtitle>
                                            <Card.Text className="small">
                                                {request.description.substring(0, 80)}...
                                            </Card.Text>
                                        </div>
                                        <div className="mt-3">
                                            <Badge pill bg={
                                                request.state === 'pendiente' ? 'warning' :
                                                    request.state === 'aprobado' ? 'success' :
                                                        'danger'
                                            } className="mb-2 d-block text-center">
                                                {request.state}
                                            </Badge>
                                            <div className="d-flex justify-content-between">
                                                {request.state === 'pendiente' && (
                                                    <>
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-1"
                                                            onClick={() => updateRequestStatus(request._id, 'aprobado')}
                                                        >
                                                            <FaCheck /> Aprobar
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => updateRequestStatus(request._id, 'rechazado')}
                                                        >
                                                            <FaTimes /> Rechazar
                                                        </Button>
                                                    </>
                                                )}
                                                {request.state !== 'pendiente' && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => updateRequestStatus(request._id, 'pendiente')}
                                                    >
                                                        Revertir
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="text-muted small">
                                        Creado el: {request.createdDate}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {totalPages > 1 && (
                        <nav className="d-flex justify-content-center mt-4">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <FaChevronLeft />
                                </Pagination.Prev>
                                {renderPageNumbers()}
                                <Pagination.Next
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <FaChevronRight />
                                </Pagination.Next>
                            </Pagination>
                        </nav>
                    )}
                </>
            )}

            <Row className="mb-4">
                <h2 className="text-center mb-4 mt-5">Administración de Usuarios</h2>
                <Col>
                    <SearchBox onSearch={handleUserSearch} />
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {currentUsers.map(user => (
                    <Col key={user._id}>
                        <Card className="shadow-sm h-100" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', color: "#1d2021"}}>
                            <Card.Body>
                                <Card.Title>{user.name || user.email}</Card.Title>
                                <Card.Subtitle className="mb-2">{user.email}</Card.Subtitle>
                                <Card.Text>
                                    Rol: {user.profile} <br />
                                    Teléfono: {user.phone}<br/>
                                    Estado: <Badge bg={user.isActive ? 'success' : 'danger'}>
                                        {user.isActive ? 'Activo' : 'Deshabilitado'}
                                    </Badge>
                                </Card.Text>
                                <Button
                                    variant={user.isActive ? "danger" : "success"}
                                    size="sm"
                                    onClick={() => handleDisableUser(user._id, user.isActive)}
                                >
                                    {user.isActive ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {totalUserPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => setUserPage(Math.max(1, userPage - 1))}
                            disabled={userPage === 1}
                        >
                            <FaChevronLeft />
                        </Pagination.Prev>
                        {renderUserPageNumbers()}
                        <Pagination.Next
                            onClick={() => setUserPage(Math.min(totalUserPages, userPage + 1))}
                            disabled={userPage === totalUserPages}
                        >
                            <FaChevronRight />
                        </Pagination.Next>
                    </Pagination>
                </nav>
            )}
        </Container>
    );
}

export default AdminRequestsDashboard;
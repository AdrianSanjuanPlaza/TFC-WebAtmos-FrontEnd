import React, { useState, useEffect } from "react";
import storage from "../../Storage/storage";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { sendRequest, show_alerta, confirmation } from "../../functions";
import { Link } from "react-router-dom";
import { FaFileAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Requests() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const authUser = storage.get("authUser");
  const idUser = authUser?._id;

  const go = useNavigate();

  function goEdit(idUser) {
    go("/solicitudes/" + idUser);
  }

  const deleteSolicitud = async (newId) => {
    setId(newId);


    try {
      console.log(`/requests/${newId}`)
      const res = await confirmation(newId, `/requests/${newId}`, "");
      console.log(res)
      if (res) {
        show_alerta("Información actualizada correctamente", "success");
      } else {
        show_alerta(res?.error || "Solicitud denegada.", "error");
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      show_alerta("Error al enviar la solicitud.", "error");
    } finally {
      setLoading(false);
    }
    
  };

  const getSolicitudes = async () => {
    Swal.fire({
      title: "Cargando sus solicitudes...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await sendRequest("GET", "", "/requests", "");
      if (res) {
        const filteredRequests = res.filter((r) => r.userId === idUser);
        setSolicitudes(filteredRequests);
        setLoading(false);
        Swal.close();
      } else {
        setSolicitudes([]);
        setLoading(false);
        Swal.close();
      }
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
      setSolicitudes([]);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error al cargar",
        text: "No se pudieron cargar sus solicitudes.",
      });
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Panel de Solicitudes</h2>
      {loading ? (
        <div className="text-center">
          <p>Cargando sus solicitudes...</p>
        </div>
      ) : solicitudes.length === 0 ? (
        <div className="text-center">
          <p>Aún no ha realizado ninguna solicitud.</p>
          <p>
            ¿Necesita un presupuesto?
            <Link to="/contratacion" className="text-primary">
              Explore nuestros servicios
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="mb-3 text-center">Aquí puede revisar el estado de sus solicitudes de presupuesto.<br/> Si su solicitud ha sido aprobada, revise su correo electrónico.</p>
          <Row xs={1} md={2} className="g-4 justify-content-center">
            {solicitudes.map((s) => (
              <Col key={s._id} md={6} lg={4}>

                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="mb-2 d-flex align-items-center">
                        <FaFileAlt className="me-2 text-primary" />{s.productId}
                      </Card.Title>
                      <Card.Text className="small text-muted">
                        {s.description.substring(0, 80)}...
                      </Card.Text>
                    </div>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted d-block">
                          <FaClock className="me-1" />
                          Fecha de creación:
                          {s.createdDate}
                        </small>
                        <small className="text-muted d-block">
                          <FaClock className="me-1" /> Fecha de última
                          modificación:
                          {s.modifiedDate}
                        </small>
                        <small className="text-muted d-block">
                          Estado:
                          <Badge
                            pill
                            bg={s.state === "pendiente" ? "warning" : s.state === "aprobado" ? "success" : "danger"}>
                            {s.state === "pendiente" ? "Pendiente" : s.state === "aprobado" ? "Aprobado" : "Rechazado"}
                          </Badge>
                        </small>
                      </div>
                    </div>
                    <Button onClick={function() { goEdit(s._id); }} className="btn-primary btn-sm mt-2 mb-2">
                      Editar
                    </Button>
                    <Button value={s._id} onClick={() => deleteSolicitud(s._id)} className="btn-danger btn-sm"> 
                      Eliminar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
      <hr className="my-5" />
      <div className="text-center">
        <h5>Información Adicional</h5>
        <p className="text-muted small">
          Esta es su área personalizada donde puede realizar un seguimiento de
          sus solicitudes de presupuesto. Manténgase atento a las
          actualizaciones sobre el estado de sus solicitudes.
        </p>
      </div>
    </Container>
  );
}

export default Requests;

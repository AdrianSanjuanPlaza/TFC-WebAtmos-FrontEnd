import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { sendRequest, show_alerta } from "../../functions";
import storage from "../../Storage/storage";
import { FaLightbulb, FaHandshake, FaPencilAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"; // Importa useParams
import { useNavigate } from "react-router-dom";
import { MyContext } from '../../App';

function Index() {
  const [solicitud, setSolicitud] = useState(null); // Cambiado a un solo objeto solicitud
  const [productId, setProductId] = useState("");
  const [description, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const authUser = storage.get("authUser");
  const { id } = useParams(); // Obtiene el id de los parámetros de la URL
  const userId = authUser?._id; // Protección en caso de que authUser sea null
  const { isDarkMode, setIsDarkMode } = useContext(MyContext)

    const go = useNavigate();

  function goBack(idUser) {
    go("/solicitudes/");
  }

  const sendSolicitud = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = { productId, description };

    try {
      const res = await sendRequest(
        "PATCH", form, `/requests/${id}`, "", true, "Información actualizada correctamente"
      );
      console.log(res);

      if (res) {
        show_alerta("Información actualizada correctamente", "success");
        setProductId("");
        setDescripcion("");
        goBack()
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

  const getSolicitud = async () => { // Cambiado el nombre a getSolicitud y ahora obtiene una sola solicitud
    if (!id) {
      console.error("No se proporcionó un ID de solicitud en la URL.");
      setError("No se proporcionó un ID de solicitud.");
      setLoading(false);
      return;
    }

    Swal.fire({
      title: "Cargando solicitud...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await sendRequest("GET", "", `/requests/${id}`, ""); // Petición a la ruta específica con el ID
      if (res) {
        setSolicitud(res); // Asigna la respuesta directamente al estado solicitud
        setProductId(res.productId || ""); // Inicializa los campos del formulario con los datos de la solicitud
        setDescripcion(res.description || "");
        setLoading(false);
        Swal.close();
      } else {
        setSolicitud(null);
        setError("No se encontró la solicitud.");
        setLoading(false);
        Swal.close();
      }
    } catch (error) {
      console.error("Error al obtener la solicitud:", error);
      setError("Error al cargar la solicitud.");
      setSolicitud(null);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error al cargar",
        text: "No se pudo cargar la solicitud.",
      });
    }
  };

  useEffect(() => {
    if (id) { // Solo llama a getSolicitud si hay un ID en la URL
      getSolicitud();
    }
  }, [id]); // Dependencia en 'id' para que se vuelva a ejecutar si el ID cambia

  return (
    <>
      <Container className="mt-5 mb-5 d-flex justify-content-center align-items-start" >
        <div className="card p-4 border border-primary rounded shadow" style={isDarkMode? { backgroundColor: '#1d2021', color: "#f0f5ff" } : { backgroundColor: '#f0f5ff', color: "#1d2021" }}>
          <h2 className="text-center mb-4">
            {id ? "Edita tu solicitud" : "Nueva Solicitud"}
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={sendSolicitud} id="form" >
            <Form.Group className="mb-3" controlId="formPaquete">
              <Form.Label>Servicio Deseado</Form.Label>
              <Form.Control
                as="select"
                placeholder="Seleccione un servicio..."
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                disabled={true} // Deshabilita la selección si estamos editando
              >
                <option value={productId}>
                    {productId}
                </option>

              </Form.Control>
              <Form.Text style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
                El servicio seleccionado previamente no es editable.
              </Form.Text>
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
              <Form.Text className="text-muted">
                Proporciona la mayor cantidad de detalles posible para que
                podamos entender tu visión.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading || !productId || !description}>
              {loading ? "Enviando solicitud..." : id ? "Guardar Cambios" : "Enviar solicitud"}
            </Button>
            <Button variant="primary" className="btn-danger w-100 mt-3" onClick={goBack}>
              Cancelar
            </Button>
          </Form>
        </div>
      </Container>

      <section className="py-5" style={isDarkMode ? {color: "#f0f5ff"} : {color: "#1d2021"}}>
        <Container className="text-center" id="how">
          <h2>¿Cómo Funciona?</h2>
          <Row className="mt-4 justify-content-center">
            <Col md={4} className="mb-4">
              <div className="d-flex align-items-center justify-content-center">
                <FaLightbulb size={40} className="text-primary me-3" />
                <h4>Comparte tu Idea</h4>
              </div>
              <p className="mt-2">
                Describe tu proyecto y tus necesidades en el formulario.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="d-flex align-items-center justify-content-center">
                <FaHandshake size={40} className="text-primary me-3" />
                <h4>Recibe una Propuesta</h4>
              </div>
              <p className="mt-2">
                Te enviaremos una propuesta detallada y un presupuesto
                personalizado.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="d-flex align-items-center justify-content-center">
                <FaPencilAlt size={40} className="text-primary me-3" />
                <h4>Creamos tu Web</h4>
              </div>
              <p className="mt-2">
                Una vez aceptada la propuesta, comenzaremos a construir tu
                visión.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Index;
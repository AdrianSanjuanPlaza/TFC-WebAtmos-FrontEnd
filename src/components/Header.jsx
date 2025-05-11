import { Link, useNavigate } from "react-router-dom";
import { MyContext } from '../App';
import logo from "../assets/images/logo.png";
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";

import { useContext } from "react";

function Header() {
  const go = useNavigate();
  const { isToggleSidebar, setIsToggleSidebar } = useContext(MyContext);

  function goNosotros() {
    go("/sobre-nosotros");
  }

  function goLogin() {
    go("/login");
  }

  function goProductos() {
    go("/productos");
  }

  function goContratacion(){
    go("/contratacion")
  }

  function goSolicitudes(){
    go("/solicitudes")
  }

  return (
    <div className="fixed-top bg-light shadow-sm z-1000">
      <header className="container-fluid py-2 py-lg-3 d-flex align-items-center justify-content-between bg-f0f5ff" >
      <div className="d-flex align-items-center">
        <Link to={'/'} className="d-flex align-items-center text-decoration-none logo">
        <img src={logo} alt="logo" height="30" className="me-2" />
        <span className="logo-text fw-bold fs-4 text-primary">WebAtmos</span>
        </Link>
      </div>

      <div className="d-lg-none">
        <Button
        className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0"
        style={{ width: '40px', height: '40px', minWidth: 'auto' }}
        onClick={() => setIsToggleSidebar(!isToggleSidebar)}
        >
        {isToggleSidebar === false ? <MdMenuOpen size={24} /> : <MdOutlineMenu size={24} />}
        </Button>
      </div>

      <div className="d-none d-lg-flex align-items-center">
        <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0 me-3" style={{ width: '40px', height: '40px', minWidth: 'auto' }} title="Cambiar modo"><FiSun size={20} /></Button>
        <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Sobre nosotros" onClick={goNosotros}>Sobre nosotros</Button>
        <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Nuestros servicios" onClick={goProductos}>Nuestros servicios</Button>
        <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Contratación" onClick={goContratacion}>Contratación</Button>
        <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Mis solicitudes" onClick={goSolicitudes}>Mis solicitudes</Button>
        <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center bg-f0f5ff text-primary border-0" style={{ width: '40px', height: '40px', minWidth: 'auto' }} title="Aquí irá el nombre de usuario" onClick={goLogin}><FaRegCircleUser size={20} /></Button>
      </div>
      </header>
    </div>
  );
}

export default Header;
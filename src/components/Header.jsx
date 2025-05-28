import { Link, useNavigate } from "react-router-dom";
import { MyContext } from '../App';
import logo from "../assets/images/logo.png";
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useContext, useState, useEffect } from "react";
import storage from "../Storage/storage";

function Header() {
  const go = useNavigate();
  const { isToggleSidebar, setIsToggleSidebar } = useContext(MyContext);
  const { isDarkMode, setIsDarkMode } = useContext(MyContext)
  console.log(storage.get("authUser"))
  const [authUser, setAuthUser] = useState(storage.get("authUser"));

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthUser(storage.get("authUser"));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function changeMode(){
    if(isDarkMode){
      setIsDarkMode(!isDarkMode)
    }else{
      setIsDarkMode(true)
    }   
  }

  function goSite(site){
        go(site)
  }

  const isAdmin = authUser && authUser.profile === "ADMIN";
  
  return (
    <div className="fixed-top shadow-sm z-1000" style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
      <header className="container-fluid py-2 py-lg-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Link to={'/'} className="d-flex align-items-center text-decoration-none logo">
            <img src={logo} alt="logo" height="30" className="me-2" />
            <span className="logo-text fw-bold fs-4 text-primary">WebAtmos</span>
          </Link>
        </div>

        <div className="d-lg-none" style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
          <Button
            className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0"
            style={{ width: '40px', height: '40px', minWidth: 'auto' }}
            onClick={() => setIsToggleSidebar(!isToggleSidebar)}
          >
            {isToggleSidebar === false ? <MdMenuOpen size={24} /> : <MdOutlineMenu size={24} />}
          </Button>
        </div>

        <div className="d-none d-lg-flex align-items-center" style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
          <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center  text-primary border-0 me-3" style={{ width: '40px', height: '40px', minWidth: 'auto' }} title="Cambiar modo" onClick={changeMode}>{isDarkMode ? <FiMoon size={20}/> : <FiSun size={20} />}</Button>
          {isAdmin && 
              <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Administración" onClick={() => goSite("/administracion")}>Administración</Button>
          }
          <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Sobre nosotros" onClick={() => goSite("/sobre-nosotros")}>Sobre nosotros</Button>
          <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Nuestros servicios" onClick={() => goSite("/productos")}>Nuestros servicios</Button>
          <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Contratación" onClick={() => goSite("/contratacion")}>Contratación</Button>
          <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0 me-3" style={{ minWidth: 'auto' }} title="Mis solicitudes" onClick={() => goSite("/solicitudes")}>Mis solicitudes</Button>
          <Button className="rounded-circle p-0 d-flex align-items-center justify-content-center text-primary border-0" style={{ width: '40px', height: '40px', minWidth: 'auto' }} title="Aquí irá el nombre de usuario" onClick={() => goSite("/login")}><FaRegCircleUser size={20} /></Button>
        </div>
      </header>
    </div>
  );
}

export default Header;
import React, {useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import { AiOutlineTeam } from "react-icons/ai";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSquareQuestion } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md"; 
import storage from "../Storage/storage";
import { MyContext } from '../App';
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

function Nav() {
    const go = useNavigate();
    const { isToggleSidebar, setIsToggleSidebar } = useContext(MyContext);
    const { isDarkMode, setIsDarkMode } = useContext(MyContext)
    const { authUser, setAuthUser } = useContext(MyContext); 
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const currentUser = storage.get("authUser");
        if (currentUser && currentUser.profile === "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [authUser]);

    function goSite(site){
        setIsToggleSidebar(true)
        go(site)
    }

    function changeMode(){
        if(isDarkMode){
            setIsDarkMode(!isDarkMode)
        }else{
            setIsDarkMode(true)
        }

        setIsToggleSidebar(true)
    }

  return (
    <>
        <div className='sidebar z-3' style={isDarkMode? { backgroundColor: '#1d2021' } : { backgroundColor: '#f0f5ff' }}>
            <ul>
                <li>
                    <Button className='w-100' onClick={() => goSite("/")}>
                        <span className='icon'>
                        <GoHome />
                        </span>
                        Inicio
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                <li>
                    <Button className='w-100' onClick={() => goSite("sobre-nosotros")}>
                        <span className='icon'>
                            <AiOutlineTeam/>
                        </span>
                        Sobre nosotros
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                <li>
                    <Button className='w-100' onClick={() => goSite("/productos")}>
                        <span className='icon'>
                            <AiFillProduct/>
                        </span>
                        Nuestros Servicios
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                <li>
                    <Button className='w-100' onClick={() => goSite("/contratacion")}>
                        <span className='icon'>
                            <FaCartShopping />
                        </span>
                        Contratación
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                <li>
                    <Button className='w-100' onClick={() => goSite("/solicitudes")}>
                        <span className='icon'>
                        <CiSquareQuestion />
                        </span>
                        Mis solicitudes
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                {isAdmin && (
                    <li>
                        <Button className='w-100' onClick={() => goSite("/administracion")}>
                            <span className='icon'>
                                <MdAdminPanelSettings/>
                            </span>
                            Administración
                            <span className='arrow'>
                                <FaArrowRightFromBracket />
                            </span>
                        </Button>
                    </li>
                )}
                <li>
                    <Button className='w-100' onClick={() => goSite("/login")}>
                        <span className='icon'>
                            <FaRegCircleUser/>
                        </span>
                        Login
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                <li>
                    <Button className='w-100' onClick={changeMode}>
                        <span className='icon'>
                            {isDarkMode ? <FiMoon size={20}/> : <FiSun size={20} />}
                        </span>
                        {isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                    </Button>
                </li>
            </ul>
        </div>
    </>
  );
}

export default Nav;
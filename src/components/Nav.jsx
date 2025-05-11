import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
import { AiOutlineTeam } from "react-icons/ai";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSquareQuestion } from "react-icons/ci";


function Nav() {
    const go = useNavigate();

    function goProducts(){
        go("/productos")
    }

    function goHome(){
        go("/")
    }

    function goContratacion(){
        go("/contratacion")
    }

    function goAbout(){
        go("/sobre-nosotros")
    }

    function goLogin(){
        go("/login")
    }

    function goSolicitudes(){
        go("/solicitudes")
    }

  return (
    <>
        <div className='sidebar z-3'>
            <ul>
                <li>
                    <Button className='w-100' onClick={goHome}>
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
                    <Button className='w-100' onClick={goAbout}>
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
                    <Button className='w-100' onClick={goProducts}>
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
                    <Button className='w-100' onClick={goContratacion}>
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
                    <Button className='w-100' onClick={goSolicitudes}>
                        <span className='icon'>
                        <CiSquareQuestion />
                        </span>
                        Mis solicitudes
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
                <li>
                    <Button className='w-100' onClick={goLogin}>
                        <span className='icon'>
                            <FaRegCircleUser/>
                        </span>
                        Login
                        <span className='arrow'>
                            <FaArrowRightFromBracket />
                        </span>
                    </Button>
                </li>
            </ul>
        </div>
    </>
  )
}

export default Nav
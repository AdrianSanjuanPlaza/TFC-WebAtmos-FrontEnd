import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Index from './views/Index'
import Header from './components/Header'
import Productos from './views/Products/index'
import Nav from './components/Nav'
import Login from './views/Login'
import Footer from './components/Footer'
import ProtectedRoutes from './components/ProtectedRoutes'
import Register from './views/Register'
import Products from './views/Products/Products'
import Contratacion from './views/Requests/index'
import About from './views/About'
import Users from './views/Users/Users'
import Requests from './views/Requests/Requests'

export const MyContext = createContext()

function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(true);

  const values={
    isToggleSidebar,
    setIsToggleSidebar
  }

  return (
    <>
    <MyContext.Provider value={values}>
    <BrowserRouter>
      <Header/>
      <div className='main d-flex'>
        <div className='sidebarWrapper' hidden={isToggleSidebar}>
        <Nav/>
        </div>
      </div>
      <div className={'content pt-5 d-flex flex-column min-vh-100'}>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path='/sobre-nosotros' element={<About/>}/>
          <Route path='/productos' element={<Productos/> }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/productos/:id' element={<Products/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/contratacion' element={<Contratacion/>}/>
            <Route path='/user' element={<Users/>}/>
            <Route path='/solicitudes' element={<Requests/>}/>
          </Route>
        </Routes>
        <Footer/>
      </div>
      </BrowserRouter>
    </MyContext.Provider>
    </>
  )
}

export default App

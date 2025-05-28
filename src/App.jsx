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
import EditRequest from './views/Requests/edit'
import Administracion from './views/Administracion/index'
import ForgotPassword from './views/Users/ResetPWD'
import ChangePWD from './views/Users/ChangePWD'

export const MyContext = createContext()

function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [ isDarkMode, setIsDarkMode] = useState(false)

  const values={
    isToggleSidebar,
    setIsToggleSidebar,
    isDarkMode,
    setIsDarkMode
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
        <div className={'w-100 pt-5 d-flex flex-column min-vh-100'} style={isDarkMode? { background: 'linear-gradient(45deg, #0A1931, #183C5F, #215978)' } : { background: 'linear-gradient(45deg, #ADD8E6, #87CEEB, #6495ED)' }}>
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path='/sobre-nosotros' element={<About/>}/>
            <Route path='/productos' element={<Productos/> }/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/productos/:id' element={<Products/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/changepassword/:id' element={<ChangePWD/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/contratacion' element={<Contratacion/>}/>
              <Route path='/user' element={<Users/>}/>
              <Route path='/solicitudes' element={<Requests/>}/>
              <Route path='/solicitudes/:id' element={<EditRequest/>}/>
              <Route path='/administracion' element={<Administracion/>}/>
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

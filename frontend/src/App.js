import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import style from './style.module.css';
import Home from './pages/Home';
import Adm from './pages/Adm';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className={style.Container}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compras" element={"Compras"} />
          <Route path="/adm" element={<Adm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;

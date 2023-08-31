import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import style from './style.module.css';
import Home from './pages/Home';
import Adm from './pages/Adm';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api/api';
import AddUser from './components/AddUser';
import Produtos from './pages/Produtos';
import AddProduct from './components/AddProduct';


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const storageData = localStorage.getItem('authToken');

  useEffect(() => {
    api.get(`users/checkUser/${storageData}`)
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          setIsLogged(true);
        }
      })
  }, []);

  return (
    <div className={style.Container}>
      <Router>
        <NavBar 
          logged={isLogged}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compras" element={"Compras"} />
          <Route path="/adm" element={<Adm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/add/:id?" element={<AddUser />} />
          <Route path="/produtos" element={<Produtos/>}/>
          <Route path="/produtos/add/:id?" element={<AddProduct />} />

        </Routes>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;

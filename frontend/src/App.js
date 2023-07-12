import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import style from './style.module.css';
import Home from './pages/Home';


function App() {
  return (
    <div className={style.Container}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

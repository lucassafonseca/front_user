// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Pedidos from './components/Pedidos';
import Sacola from './components/Sacola';
import FinalizarPedido from './pages/FinalizarPedido';

function App() {
  return (
    <Router>
      <Routes>
        {/* Todas as páginas que usam o MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/sacola" element={<Sacola />} />
          <Route path="/finalizar-pedido" element={<FinalizarPedido />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

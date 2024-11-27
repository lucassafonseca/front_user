import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Pedidos from './components/Pedidos';
import Sacola from './components/Sacola';
import FinalizarPedido from './pages/FinalizarPedido';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home updateCart={setCartItems} />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route
            path="/sacola"
            element={<Sacola cartItems={cartItems} updateCart={setCartItems} />}
          />
          <Route
            path="/finalizar-pedido"
            element={<FinalizarPedido updateCart={setCartItems} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

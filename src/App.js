// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Pedidos from './components/Pedidos';
import Sacola from './components/Sacola';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/sacola" element={<Sacola />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

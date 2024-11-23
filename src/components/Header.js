// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/Hamburgu.png'; // Importa o logo
import './Header.css';

function Header() {
  const [totalValue, setTotalValue] = useState(0); // Estado para armazenar o valor total da sacola

  useEffect(() => {
    // Fazer a requisição ao backend para obter o valor da sacola
    fetch('http://seu-backend.com/api/sacola')
      .then((response) => response.json())
      .then((data) => {
        setTotalValue(data.total);
      })
      .catch((error) => console.error('Erro ao buscar o valor da sacola:', error));
  }, []);

  return (
    <header className="header">
      {/* Logo com o nome da marca */}
      <div className="brand">
        <span className="brand-text">oTaal</span>
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="brand-text">Hamburgueria</span>
      </div>
      
      {/* Navegação com botões */}
      <nav className="nav">
        <Link to="/pedidos" className="nav-button">Pedidos</Link>
        <div className="nav-button cart">
          <Link to="/sacola">
            <FaShoppingCart  />
            <span className="cart-value">R$ {totalValue.toFixed(2)}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

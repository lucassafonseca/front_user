import React, { useState, useEffect } from 'react';
import './Sacola.css';
import { getUserId } from '../utils/userUtils';
import { useNavigate } from 'react-router-dom';

function Sacola() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  // Carregar a sacola do backend
  useEffect(() => {
    fetch(`http://seu-backend.com/api/sacola?userId=${getUserId()}`)
      .then((response) => response.json())
      .then((data) => setCartItems(data.items || []))
      .catch((error) => console.error('Erro ao carregar a sacola:', error));
  }, []);

  // Atualizar a quantidade de um item
  const updateQuantity = (productId, newQuantity) => {
    fetch(`http://seu-backend.com/api/sacola/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity, userId: getUserId() }),
    })
      .then((response) => response.json())
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((error) => console.error('Erro ao atualizar quantidade:', error));
  };

  // Remover item da sacola
  const removeItem = (productId) => {
    fetch(`http://seu-backend.com/api/sacola/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: getUserId() }),
    })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      })
      .catch((error) => console.error('Erro ao remover item da sacola:', error));
  };

  // Redirecionar para página de finalização
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Sua sacola está vazia! Adicione itens antes de finalizar a compra.');
      return;
    }
    navigate('/finalizar-pedido');
  };

  return (
    <div className="sacola">
      <h2>Minha Sacola</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>R$ {item.price.toFixed(2)}</span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
                <button onClick={() => removeItem(item.id)}>Remover</button>
              </div>
            </div>
          ))
        ) : (
          <p>Sua sacola está vazia!</p>
        )}
      </div>
      <div className="cart-actions">
        <button className="continue-shopping" onClick={() => navigate('/')}>
          Continuar Comprando
        </button>
        <button className="checkout" onClick={handleCheckout}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Sacola;

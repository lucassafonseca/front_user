import React, { useState, useEffect } from 'react';
import './Pedidos.css';
import { getUserId } from '../utils/userUtils';

function Pedidos() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Pegar pedidos do backend
    fetch(`http://seu-backend.com/api/pedidos?userId=${getUserId()}`)
      .then((response) => response.json())
      .then((data) => setOrders(data.orders || []))
      .catch((error) => console.error('Erro ao carregar pedidos:', error));
  }, []);

  return (
    <div className="pedidos">
      <h2>Meus Pedidos</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="pedido">
            <h3>Pedido #{order.id}</h3>
            <p><strong>Nome:</strong> {order.name}</p>
            <p><strong>Celular:</strong> {order.phone}</p>
            <p><strong>Endereço:</strong> {order.address}</p>
            <p><strong>Método de Pagamento:</strong> {order.paymentMethod}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      ) : (
        <p>Você ainda não fez nenhum pedido.</p>
      )}
    </div>
  );
}

export default Pedidos;
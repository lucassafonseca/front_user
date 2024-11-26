import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalizarPedido.css';
import { getUserId } from '../utils/userUtils';

function FinalizarPedido() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isDelivery, setIsDelivery] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Verificar campos obrigatórios
    if (!name || !phone || (isDelivery && !address) || !paymentMethod) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true); // Evita cliques duplos

    const order = {
      userId: getUserId(),
      name,
      phone,
      address: isDelivery ? address : 'Retirada no local',
      paymentMethod,
    };

    // Enviar pedido para o backend
    fetch('http://seu-backend.com/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao enviar o pedido.');
        }
        return response.json();
      })
      .then((data) => {
        alert('Pedido realizado com sucesso!');
        navigate('/pedidos'); // Redirecionar para a página de pedidos
      })
      .catch((error) => {
        console.error('Erro ao finalizar o pedido:', error);
        alert('Ocorreu um erro ao finalizar o pedido. Tente novamente.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="finalizar-pedido">
      <h2>Finalizar Pedido</h2>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Celular:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="radio"
            name="deliveryOption"
            checked={!isDelivery}
            onChange={() => setIsDelivery(false)}
          />
          Retirar no local
        </label>
        <label>
          <input
            type="radio"
            name="deliveryOption"
            checked={isDelivery}
            onChange={() => setIsDelivery(true)}
          />
          Entrega
        </label>
        {isDelivery && (
          <label>
            Endereço:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
        )}
        <label>
          Método de Pagamento:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão">Cartão</option>
          </select>
        </label>
        <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
        </button>
      </form>
    </div>
  );
}

export default FinalizarPedido;

import React, { useState } from 'react';
import './Modal.css';

function Modal({ product, items, onClose, onAddToCart }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedItems); // Adiciona o produto + itens ao carrinho
    onClose(); // Fecha o modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <span>R$ {product.price}</span>

        <h3>Itens adicionais:</h3>
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item">
              <label>
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={() => toggleItem(item.id)}
                />
                {item.name} - R$ {item.price}
              </label>
            </div>
          ))}
        </div>

        <button onClick={handleAddToCart}>Adicionar à sacola</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;

import React, { useState, useEffect } from 'react';
import './Home.css';
import Modal from './Modal'; // Importa o Modal
import banner from '../assets/custom.png';
import { getUserId } from '../utils/userUtils'; // Importe a função getUserId para identificar o usuário

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Pega as categorias e produtos do backend
    fetch('http://seu-backend.com/api/categorias')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setProducts(data);
      })
      .catch((error) => console.error('Erro ao buscar categorias e produtos:', error));
  }, []);

  const handleSearch = () => {
    console.log('Buscar produtos');
  };

  const handleProductClick = (product) => {
    if (product.items && product.items.length > 0) {
      // Se o produto tem itens adicionais, abre o modal
      setSelectedProduct(product);
      setModalOpen(true);
    } else {
      // Caso contrário, adiciona diretamente ao carrinho
      addToCart(product);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const addToCart = (product, selectedItems = []) => {
    // Adiciona o produto e itens selecionados à sacola
    const userId = getUserId();
    fetch('http://seu-backend.com/api/sacola', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        productId: product.id,
        items: selectedItems,
        quantity: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Produto adicionado à sacola:', data))
      .catch((error) => console.error('Erro ao adicionar produto à sacola:', error));
  };

  const scrollToCategory = (categoryId) => {
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Banner */}
      <div className="banner">
        <img src={banner} alt="Banner" className="banner-image" />
      </div>

      {/* Barra de Pesquisa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar produtos..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Barra de Categorias */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className="category-button"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Exibindo os produtos por categoria */}
      {categories.map((category) => (
        <div key={category.id} id={category.id} className="category-section">
          <h2>{category.name}</h2>
          <div className="product-list">
            {category.products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>R$ {product.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <Modal
          product={selectedProduct}
          items={selectedProduct.items}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default Home;

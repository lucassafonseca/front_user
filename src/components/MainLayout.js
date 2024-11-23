// src/components/MainLayout.js
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Aqui, as páginas serão renderizadas */}
      </main>
    </div>
  );
}

export default MainLayout;

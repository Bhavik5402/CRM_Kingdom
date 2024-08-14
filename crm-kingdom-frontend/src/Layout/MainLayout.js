// src/components/MainLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default MainLayout;

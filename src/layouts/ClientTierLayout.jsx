import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer'; // Import it here

const ClientTierLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>
        <Sidebar />
      </div>

      <Footer /> {/* Add it here at the bottom */}
    </div>
  );
};

export default ClientTierLayout;
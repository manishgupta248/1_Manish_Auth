// components/Layout.js
import React from 'react';
import Navbar from './Navbar'; // Adjust the import path
import Footer from './Footer'; // Create a Footer component
import Sidebar from './Sidebar'; // Create a Sidebar component

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar className="w-64 bg-gray-200 p-4" /> {/* Fixed width sidebar */}

        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
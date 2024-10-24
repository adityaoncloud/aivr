// src/components/Layout.tsx
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">Header</header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white p-4">Footer</footer>
    </div>
  );
};

export default Layout;

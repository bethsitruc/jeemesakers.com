import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Layout component wraps the page with header, main content, and footer
export default function Layout({ children }) {
  return (
    <div className="site-wrapper">
      {/* Site header (navigation, branding, etc.) */}
      <Header />
      {/* Main content area where page content is rendered */}
      <main className="site-content">
        {children}
      </main>
      {/* Site footer */}
      <Footer />
    </div>
  );
}
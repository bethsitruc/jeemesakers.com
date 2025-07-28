import React from 'react';
import { Link } from 'react-router-dom';

// Header component displays the site title and navigation links
export default function Header() {
  return (
    <header>
      {/* Site title */}
      <h1>Jeemes Akers</h1>
      {/* Navigation bar with links to main site sections */}
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/books">Books</Link> |{' '}
        <Link to="/writings">Missives</Link> |{' '}
        <Link to="/testimonials">Testimonials</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>Jeemes Akers</h1>
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
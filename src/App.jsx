import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import About from './components/About';
import Writings from './components/Writings';   
import Contact from './components/Contact';
import Missive from './posts/Missive';
import Testimonials from './components/Testimonials';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/posts/:slug" element={<Missive />} />
        </Routes>
      </Layout>
    </Router>
  );
}
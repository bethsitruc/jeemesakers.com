import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./components/Home'));
const Books = lazy(() => import('./components/Books'));
const About = lazy(() => import('./components/About'));
const Writings = lazy(() => import('./components/Writings'));
const Contact = lazy(() => import('./components/Contact'));
const Missive = lazy(() => import('./posts/Missive'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Artwork = lazy(() => import('./components/Artwork'));

function RouteFallback() {
  return <p>Loading...</p>;
}

// Main App component that sets up routing for the site
export default function App() {
  return (
    // Set up React Router for client-side navigation with custom domain
    <Router basename="/">
      {/* Layout component wraps all pages (e.g., header, footer, nav) */}
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Define routes for each page/component */}
            <Route path="/" element={<Home />} />                    {/* Home page */}
            <Route path="/about" element={<About />} />              {/* About page */}
            <Route path="/books" element={<Books />} />              {/* Books page */}
            <Route path="/contact" element={<Contact />} />          {/* Contact page */}
            <Route path="/writings" element={<Writings />} />        {/* Writings/Missives list */}
            <Route path="/testimonials" element={<Testimonials />} />{/* Testimonials page */}
            <Route path="/posts/:slug" element={<Missive />} />      {/* Individual missive/post */}
            <Route path="/artwork" element={<Artwork />} />          {/* Artwork gallery */}
            <Route path="/post/:oldSlug" element={<Navigate to="/writings" replace />} />
            {/* Catch-all route - redirect any unmatched routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
            {/* Optionally, handle any other unmatched routes */}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

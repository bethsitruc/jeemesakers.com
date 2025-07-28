import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import About from './components/About';
import Writings from './components/Writings';   
import Contact from './components/Contact';
import Missive from './posts/Missive';
import Testimonials from './components/Testimonials';
import Artwork from './components/Artwork';

// Main App component that sets up routing for the site
export default function App() {
  return (
    // Set up React Router for client-side navigation with GitHub Pages basename
    <Router basename="/jeemesakers.com">
      {/* Layout component wraps all pages (e.g., header, footer, nav) */}
      <Layout>
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
      </Layout>
    </Router>
  );
}
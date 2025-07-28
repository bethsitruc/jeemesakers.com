import React from 'react';
import heroImage from '../assets/hero.jpg'; // Import the hero image

// Hero component displays a full-width hero section with a background image
export default function Hero() {
  // Inline style object for the hero section
  const heroStyle = {
    backgroundImage: `url(${heroImage})`, // Set background image
    backgroundSize: 'cover',              // Cover the entire section
    backgroundPosition: 'center',         // Center the image
    height: '60vh',                       // Set height to 60% of viewport height
    display: 'flex',                      // Use flexbox for centering
    alignItems: 'center',                 // Vertically center content
    justifyContent: 'center',             // Horizontally center content
    color: 'white',                       // White text color (if any content is added)
    textAlign: 'center',                  // Center text alignment
  };

  // Render the hero section with the background image
  return (
    <section style={heroStyle}></section>
  );
}
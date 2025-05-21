import React from 'react';
import heroImage from '../assets/hero.jpg'; // or wherever the image is placed

export default function Hero() {
  const heroStyle = {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <section style={heroStyle}></section>
  );
}
import React from 'react';
import heroImg from '../assets/hero.jpg';

// Home component displays the main landing page content
export default function Home() {
  return (
    <section className="home-page">
      <h1>Welcome</h1>
      <div className="home-tile-container">
        <div className="home-tile">
          {/* Left section with welcome text */}
          <div className="home-left">
            <div className="home-left-content">
              <p>
                Welcome fellow adventurer! Immerse yourself in the challenging future techno-world for believers. This is your gateway to a series of captivating novels that will transport you to exciting new realms. Let your next literary journey begin here.
              </p>
              <p>
                Check back often for fresh updates in the Missives section—where I share reflections, commentary, and creative insights.
              </p>
            </div>
          </div>
          {/* Right section with hero image */}
          <div className="home-right">
            <div className="home-image-wrapper">
              <img src={heroImg} alt="Hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
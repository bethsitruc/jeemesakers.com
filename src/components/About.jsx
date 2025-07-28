import React from 'react';
import coupleImg from '../assets/couple.jpg';
import signatureImg from '../assets/signature.jpg';

// About component displays information about the author and their work
export default function About() {
  return (
    <section className="about-page">
        <h1>About the Author</h1>
      <div className="about-tile">
        {/* Left section with author photo and names */}
        <div className="about-left">
          <img src={coupleImg} alt="Hero" />
          <h3>Jeemes and Imogene Akers</h3 >
        </div>
        {/* Right section with author bio and signature */}
        <div className="about-right">
          <div className="about-right-content">
            <p>
              Jeemes L. Akers is a visionary author and artist whose passion for storytelling and creativity shines through in every work. With a background in literature and a keen eye for detail, Jeemes crafts captivating narratives that explore futuristic worlds and complex characters.
            </p>
            <p>
              Alongside his wife, Imogene Akers, Jeemes has dedicated his life to producing original artistic works and engaging literary content that resonates with readers of all ages. Their collaborative efforts bring a unique blend of imagination and authenticity to their projects.
            </p>
            <p>
              Through his novels and artistic endeavors, Jeemes invites readers to embark on journeys that challenge the boundaries of reality and ignite the imagination. His commitment to non-AI artistry ensures that every piece is infused with genuine creativity and heartfelt expression.
            </p>
            <p>
              Join Jeemes and Imogene on this exciting adventure into the realms of future techno-worlds and beyond.
            </p>
            {/* Author signature image */}
            <div className="signature">
              <img src={signatureImg} alt="Jeemes signature"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
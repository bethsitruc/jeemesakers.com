import React from 'react';

// Footer component displays the site footer and copyright notice
function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-text">
        {/* Copyright and usage notice */}
        <p>
          © Jeemes Akers and jeemesakers.com, 2023. <br />
          Unauthorized use and/or duplication of this material without express and written permission from this site’s author and/or owner is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Jeemes Akers and jeemesakers.com with appropriate and specific direction to the original content.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
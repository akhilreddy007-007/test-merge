// src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} 🏋️ — Built by Akhil Reddy</p>
      <div className="footer-links">
        <a href="https://github.com/akhilreddy007-007" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/devu-akhil-reddy" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import '../App.css';

export default function Sidebar({ isOpen = false }) {
  return (
    <aside className={`site-sidebar ${isOpen ? 'open' : ''}`} aria-label="Side navigation">
      <nav>
        <a href="#about" className="side-link">About</a>
        <a href="#portfolio" className="side-link">Portfolio</a>
        <a href="#team" className="side-link">Team</a>
        <a href="#blog" className="side-link">Blog</a>
      </nav>
    </aside>
  );
}

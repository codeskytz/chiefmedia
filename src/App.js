import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(open => !open);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="site-root">
      <Header toggleSidebar={toggleSidebar} />
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} />
        {/* mobile overlay: clicking closes the sidebar */}
        <div
          className={`mobile-overlay ${sidebarOpen ? 'visible' : ''}`}
          onClick={closeSidebar}
          aria-hidden={!sidebarOpen}
        />
        <main className="main-content" id="main">
          <section className="hero">
            <h1>Welcome to CHIEF G MEDIA</h1>
            <p>
              This is a simple responsive web-first layout using solid colors
              (red, white, and black). The header is fixed, a navigation sidebar
              is present, and the footer contains a dynamic copyright.
            </p>
          </section>

          <section className="cards">
            <article className="card">
              <h2>About</h2>
              <p>Short description of your services, portfolio, or company.</p>
            </article>
            <article className="card">
              <h2>Services</h2>
              <p>List the core services offered by CHIEF G MEDIA.</p>
            </article>
            <article className="card">
              <h2>Contact</h2>
              <p>Place contact info or call-to-action links here.</p>
            </article>
          </section>
        </main>
      </div>

      <Footer />
      
    </div>
  );
}

export default App;

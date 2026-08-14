import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  // Guardamos en memoria si el tema actual es oscuro o claro
  const [theme, setTheme] = useState('dark');

  // Función mágica para cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Le inyectamos la etiqueta a la raíz de la página para que CSS cambie las variables
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="nav-header">
      <div className="nav-container">
        
        {/* El logo ahora funciona exactamente igual que el botón Home */}
        <div className="nav-logo">
          <a href="#home">
            HQ<span className="accent">.</span>
          </a>
        </div>
        
        <ul className="nav-links">
          <li>
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
              Contact
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          {/* Al hacer clic, ejecuta toggleTheme */}
          <button className="theme-toggle" title="Toggle theme" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
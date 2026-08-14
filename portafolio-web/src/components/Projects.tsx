import { useState, useEffect } from 'react';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        
        {/* ENCABEZADO ACTUALIZADO */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            WHAT I'VE BUILT
          </span>
          <h2 className="section-title" style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>
            My Projects
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            All projects below were entirely designed, developed and deployed by me.
          </p>
        </div>

        {/* CUADRICULA DE PROYECTOS */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id} style={{ background: 'var(--bg-card)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', transition: 'transform 0.3s ease' }}>
              
              <div className="project-image-wrapper" style={{ height: '200px', overflow: 'hidden' }}>
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div className="project-info" style={{ padding: '1.5rem' }}>
                <h3 className="project-name" style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                <p className="project-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{project.description}</p>
                
                <ul className="project-tags" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.technologies.split(',').map((tech: string, index: number) => (
                    <li key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {tech.trim()}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            Cargando proyectos...
          </p>
        )}

      </div>
    </section>
  );
}
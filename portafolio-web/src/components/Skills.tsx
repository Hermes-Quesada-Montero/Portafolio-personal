import { useState, useEffect } from 'react';
import './Skills.css';

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`);
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error('Error al cargar habilidades:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">What I know</span>
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-item" key={skill.id}>
              
              {/* Este es el círculo que habíamos perdido */}
              <div className="skill-circle">
                {skill.iconUrl.startsWith('http') ? (
                  <img 
                    src={skill.iconUrl} 
                    alt={skill.name} 
                    className="skill-image"
                  />
                ) : (
                  <span className="skill-emoji">{skill.iconUrl}</span>
                )}
              </div>
              
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            Aún no hay habilidades registradas.
          </p>
        )}

      </div>
    </section>
  );
}
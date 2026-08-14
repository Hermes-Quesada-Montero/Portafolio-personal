import { useState, useEffect } from 'react';

export default function Contact() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contactitems`);
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        }
      } catch (error) {
        console.error('Error al cargar contactos:', error);
      }
    };
    fetchContacts();
  }, []);

  // Función mágica para el botón de Copiar
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('¡Copiado al portapapeles!');
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">Contact Information</h2>
        </div>

        {/* LISTA DE CONTACTOS PÚBLICA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          {contacts.map((c) => (
            <div key={c.id} style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            >
              
              {/* Lado Izquierdo: Icono + Textos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  width: '64px', height: '64px', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.8rem' 
                }}>
                  {c.mainIcon.startsWith('http') ? <img src={c.mainIcon} alt="" style={{ width: '50%', height: '50%', objectFit: 'contain' }} /> : c.mainIcon}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600' }}>{c.title}</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{c.value}</p>
                </div>
              </div>

              {/* Lado Derecho: Botones Funcionales Reales */}
              <div style={{ display: 'flex', gap: '12px' }}>
                
                {/* Botón de Ir (Abre en pestaña nueva) */}
                {c.redirectUrl && (
                  <a href={c.redirectUrl} target="_blank" rel="noopener noreferrer" style={{ 
                    width: '40px', height: '40px', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '8px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: 'var(--accent)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  title={`Ir a ${c.title}`}
                  >
                    {c.redirectIcon || '↗️'}
                  </a>
                )}

                {/* Botón de Copiar */}
                {c.showCopyButton && (
                  <button onClick={() => handleCopy(c.value)} style={{ 
                    width: '40px', height: '40px', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '8px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: '#f59e0b', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  title={`Copiar ${c.value}`}
                  >
                    📋
                  </button>
                )}
              </div>

            </div>
          ))}

          {contacts.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Cargando información de contacto...</p>
          )}
        </div>

      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [profile, setProfile] = useState<any>(null);
  const [toast, setToast] = useState({ show: false, msg: '' });

  // Estados para la animación de la máquina de escribir
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = isDeleting ? 50 : 100; // Borra más rápido de lo que escribe

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/userprofile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  // Efecto de la máquina de escribir
  useEffect(() => {
    if (!profile?.role) return;
    
    // Separamos los roles por comas y limpiamos espacios
    const roles = profile.role.split(',').map((r: string) => r.trim()).filter(Boolean);
    if (roles.length === 0) return;

    // Si solo hay un rol, lo dejamos fijo sin animación
    if (roles.length === 1) {
      setText(roles[0]);
      return;
    }

    const i = loopNum % roles.length;
    const fullText = roles[i];

    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Pausa al completar la palabra
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, profile, loopNum]);

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 4000);
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    if (!profile?.cvBase64) {
      e.preventDefault();
      showToast('⚠️ Actualmente no hay un CV disponible para descargar.');
    } else {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = profile.cvBase64;
      link.download = `CV_${profile.name.replace(/\s+/g, '_')}.pdf`;
      link.click();
    }
  };

  // Función para obtener iniciales del nombre
  const getInitials = (name: string) => {
    if (!name) return 'HQ';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  if (!profile) return null;

  return (
    <section id="home" className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px', textAlign: 'center' }}>
      
      {toast.show && <div className="custom-toast">{toast.msg}</div>}

      <div className="container">
        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* FOTO DE PERFIL / INICIALES */}
          <div className="hero-avatar" style={{ marginBottom: '1.5rem' }}>
            {profile.avatarUrl ? (
               <img src={profile.avatarUrl} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)' }} />
            ) : (
               <div className="avatar-placeholder" style={{ 
                 width: '150px', height: '150px', borderRadius: '50%', 
                 background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 fontSize: '3.5rem', fontWeight: 'bold', color: 'white', letterSpacing: '2px'
               }}>
                 {getInitials(profile.name)}
               </div> 
            )}
          </div>
          
          <span className="hero-greeting" style={{ color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            HELLO, I'M
          </span>
          
          <h1 className="hero-name" style={{ fontSize: '3.5rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>
            {profile.name}
          </h1>
          
          {/* TEXTO ANIMADO */}
          <h2 className="hero-role" style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1.5rem', minHeight: '36px' }}>
            {text}<span style={{ borderRight: '3px solid var(--accent)', animation: 'blink 1s infinite', marginLeft: '2px' }}></span>
          </h2>
          
          <p className="hero-bio" style={{ maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {profile.bio}
          </p>
          
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={handleDownloadCV}>
              Download CV
            </button>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
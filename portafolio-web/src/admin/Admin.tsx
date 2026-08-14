import React, { useState, useEffect } from 'react';
import '../components/Projects.css';
import './Admin.css';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'contacts'>('profile');
  const [toast, setToast] = useState({ show: false, msg: '' });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 4000);
  };

  // ==========================================
  // LÓGICA DE PERFIL Y CV
  // ==========================================
  const [profile, setProfile] = useState({ name: '', role: '', bio: '', cvBase64: '', avatarUrl: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userprofile`);
      if (response.ok) setProfile(await response.json());
    } catch (error) { console.error(error); }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userprofile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (response.ok) {
        showToast('✅ Perfil y CV actualizados correctamente');
        setIsEditingProfile(false);
      }
    } catch (error) { showToast('❌ Error al guardar el perfil'); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showToast('❌ Solo se permiten archivos PDF');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, cvBase64: reader.result as string });
        showToast('📄 Archivo cargado. No olvides guardar.');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCV = () => {
    setProfile({ ...profile, cvBase64: '' });
    showToast('🗑️ CV removido. No olvides guardar.');
  };

  // ==========================================
  // LÓGICA DE PROYECTOS
  // ==========================================
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectFormData, setProjectFormData] = useState({ title: '', description: '', imageUrl: '', projectUrl: '', technologies: '' });

  const fetchProjects = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
    if (response.ok) setProjects(await response.json());
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectFormData({ ...projectFormData, [e.target.name]: e.target.value });
  };
  
  const resetProjectForm = () => { 
    setProjectFormData({ title: '', description: '', imageUrl: '', projectUrl: '', technologies: '' }); 
    setEditingProjectId(null); 
    setShowProjectForm(false); 
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProjectId ? `${import.meta.env.VITE_API_URL}/api/projects/${editingProjectId}` : `${import.meta.env.VITE_API_URL}/api/projects`;
    const response = await fetch(url, { method: editingProjectId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(projectFormData) });
    if (response.ok) { showToast('✅ Proyecto guardado'); resetProjectForm(); fetchProjects(); }
  };

  const deleteProject = async (id: number) => {
    if (window.confirm('⚠️ ¿Borrar proyecto?')) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) { showToast('🗑️ Proyecto eliminado'); fetchProjects(); }
    }
  };

  const editProject = (project: any) => {
    setProjectFormData(project); setEditingProjectId(project.id); setShowProjectForm(true);
  };

  // ==========================================
  // LÓGICA DE SKILLS
  // ==========================================
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [skillFormData, setSkillFormData] = useState({ name: '', iconUrl: '' });

  const fetchSkills = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`);
    if (response.ok) setSkills(await response.json());
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillFormData({ ...skillFormData, [e.target.name]: e.target.value });
  };

  const resetSkillForm = () => { 
    setSkillFormData({ name: '', iconUrl: '' }); 
    setEditingSkillId(null); 
    setShowSkillForm(false); 
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingSkillId ? `${import.meta.env.VITE_API_URL}/api/skills/${editingSkillId}` : `${import.meta.env.VITE_API_URL}/api/skills`;
    const response = await fetch(url, { method: editingSkillId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(skillFormData) });
    if (response.ok) { showToast('✅ Habilidad guardada'); resetSkillForm(); fetchSkills(); }
  };

  const deleteSkill = async (id: number) => {
    if (window.confirm('⚠️ ¿Borrar habilidad?')) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/${id}`, { method: 'DELETE' });
      if (response.ok) { showToast('🗑️ Habilidad eliminada'); fetchSkills(); }
    }
  };

  const editSkill = (skill: any) => {
    setSkillFormData(skill); setEditingSkillId(skill.id); setShowSkillForm(true);
  };

  // ==========================================
  // LÓGICA DE CONTACTOS
  // ==========================================
  const [contacts, setContacts] = useState<any[]>([]);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [editContactData, setEditContactData] = useState<any>({});

  const fetchContacts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contactitems`);
    if (response.ok) setContacts(await response.json());
  };

  const startEditContact = (contact: any) => {
    setEditingContactId(contact.id);
    setEditContactData({ ...contact });
  };

  const addNewContact = async () => {
    const newContact = { title: 'Nuevo Método', value: '', mainIcon: '🌟', redirectUrl: '', redirectIcon: '↗️', showCopyButton: true, orderIndex: contacts.length };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contactitems`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newContact) });
    if (response.ok) { const saved = await response.json(); await fetchContacts(); startEditContact(saved); }
  };

  const deleteContact = async (id: number) => {
    if (window.confirm('⚠️ ¿Borrar tarjeta?')) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contactitems/${id}`, { method: 'DELETE' });
      if (response.ok) { showToast('🗑️ Tarjeta eliminada'); fetchContacts(); }
    }
  };

  const handleEditContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEditContactData({ ...editContactData, [e.target.name]: value });
  };

  const saveContactEdit = async (id: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contactitems/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editContactData) });
    if (response.ok) { showToast('✅ Tarjeta actualizada'); setEditingContactId(null); fetchContacts(); }
  };

  const moveContact = async (index: number, direction: 'up' | 'down') => {
    const newContacts = [...contacts];
    if (direction === 'up' && index > 0) [newContacts[index - 1], newContacts[index]] = [newContacts[index], newContacts[index - 1]];
    else if (direction === 'down' && index < newContacts.length - 1) [newContacts[index + 1], newContacts[index]] = [newContacts[index], newContacts[index + 1]];
    else return;
    setContacts(newContacts);
    await Promise.all(newContacts.map((c, i) => {
      c.orderIndex = i;
      return fetch(`${import.meta.env.VITE_API_URL}/api/contactitems/${c.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(c) });
    }));
  };

  // --- EFECTO INICIAL ---
  useEffect(() => { 
    fetchProfile(); 
    fetchProjects(); 
    fetchSkills(); 
    fetchContacts(); 
  }, []);

  return (
    <div style={{ padding: '80px 0', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* TOAST FLOTANTE */}
      {toast.show && <div className="custom-toast">{toast.msg}</div>}

      <div className="container">
        
        {/* PESTAÑAS */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', overflowX: 'auto' }}>
          <button className={activeTab === 'profile' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => { setActiveTab('profile'); resetProjectForm(); resetSkillForm(); setEditingContactId(null); }}>Perfil y CV</button>
          <button className={activeTab === 'projects' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => { setActiveTab('projects'); resetSkillForm(); setEditingContactId(null); }}>Proyectos</button>
          <button className={activeTab === 'skills' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => { setActiveTab('skills'); resetProjectForm(); setEditingContactId(null); }}>Habilidades</button>
          <button className={activeTab === 'contacts' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => { setActiveTab('contacts'); resetProjectForm(); resetSkillForm(); }}>Contactos</button>
        </div>

        {/* ============================== */}
        {/* VISTA PERFIL Y CV (EDICIÓN VISUAL) */}
        {/* ============================== */}
        {activeTab === 'profile' && (
          <div style={{ position: 'relative', background: 'var(--bg-card)', border: isEditingProfile ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: '16px', padding: '3rem 1.5rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

            {!isEditingProfile && (
              <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <button style={{ background: '#eab308', color: '#000', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsEditingProfile(true)}>✏️ Editar Perfil</button>
              </div>
            )}

            {isEditingProfile ? (
              <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>URL de tu Foto (Opcional)</label>
                    <input type="text" value={profile.avatarUrl} onChange={e => setProfile({...profile, avatarUrl: e.target.value})} className="form-input" style={{ width: '100%', textAlign: 'center' }} placeholder="Link de tu foto..." />
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nombre</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="form-input" style={{ width: '100%', fontSize: '1.8rem', textAlign: 'center', fontWeight: 'bold' }} required />
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Puesto</label>
                    <input type="text" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className="form-input" style={{ width: '100%', fontSize: '1.2rem', textAlign: 'center', color: 'var(--accent)' }} required />
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Biografía</label>
                    <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="form-textarea" style={{ width: '100%', minHeight: '100px', textAlign: 'center' }} required />
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border)', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', textAlign: 'left' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>📄 Currículum Vitae (PDF)</h4>
                    {profile.cvBase64 ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '1rem', borderRadius: '8px' }}>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Tienes un CV guardado</span>
                        <button type="button" onClick={removeCV} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Borrar</button>
                      </div>
                    ) : (
                      <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ color: 'var(--text-primary)' }} />
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <button type="submit" style={{ background: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✅ Guardar Cambios</button>
                    <button type="button" onClick={() => setIsEditingProfile(false)} style={{ background: 'transparent', color: 'var(--text-muted)', padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}>❌ Cancelar</button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="hero-content" style={{ margin: 0, padding: 0 }}>
                <div className="hero-avatar" style={{ margin: '0 auto 1.5rem auto' }}>
                  {profile.avatarUrl ? (
                     <img src={profile.avatarUrl} alt="Avatar" />
                  ) : (
                     <div className="avatar-placeholder"></div> 
                  )}
                </div>
                
                <span className="hero-greeting">HELLO, I'M</span>
                <h1 className="hero-name">{profile.name || 'Tu Nombre'}</h1>
                <h2 className="hero-role">{profile.role || 'Tu Puesto'}</h2>
                <p className="hero-bio" style={{ margin: '0 auto 2rem auto', maxWidth: '600px' }}>{profile.bio || 'Tu biografía aparecerá aquí...'}</p>
                
                <div className="hero-cta" style={{ justifyContent: 'center' }}>
                  <button className="btn btn-primary" style={{ cursor: 'default' }}>Download CV</button>
                  <button className="btn btn-outline" style={{ cursor: 'default' }}>Contact Me</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================== */}
        {/* VISTA PROYECTOS */}
        {/* ============================== */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Proyectos</h2>
              <button className="btn btn-outline" onClick={() => showProjectForm ? resetProjectForm() : setShowProjectForm(true)}>{showProjectForm ? '✕ Cancelar' : '+ Nuevo'}</button>
            </div>
            {showProjectForm && (
              <form className="admin-panel" onSubmit={handleProjectSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem', borderLeft: `4px solid ${editingProjectId ? '#eab308' : 'var(--accent)'}` }}>
                 <input type="text" name="title" value={projectFormData.title} onChange={handleProjectChange} placeholder="Nombre" className="form-input" required />
                 <input type="url" name="projectUrl" value={projectFormData.projectUrl} onChange={handleProjectChange} placeholder="URL del Proyecto" className="form-input" required />
                 <input type="url" name="imageUrl" value={projectFormData.imageUrl} onChange={handleProjectChange} placeholder="URL de la Imagen" className="form-input" style={{ gridColumn: '1 / -1' }} required />
                 <input type="text" name="technologies" value={projectFormData.technologies} onChange={handleProjectChange} placeholder="Tecnologías (Ej: React, .NET)" className="form-input" style={{ gridColumn: '1 / -1' }} required />
                 <textarea name="description" value={projectFormData.description} onChange={handleProjectChange} placeholder="Descripción" className="form-textarea" style={{ gridColumn: '1 / -1' }} required></textarea>
                 <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', background: editingProjectId ? '#eab308' : '', color: editingProjectId ? '#000' : '' }}>Guardar</button>
              </form>
            )}
            <div className="projects-grid">
              {projects.map((p) => (
                <div className="project-card" key={p.id} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}><button onClick={() => editProject(p)}>✏️</button><button onClick={() => deleteProject(p.id)}>🗑️</button></div>
                  <img src={p.imageUrl} alt={p.title} className="project-image" />
                  <div className="project-info"><h3 className="project-name">{p.title}</h3></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* VISTA SKILLS */}
        {/* ============================== */}
        {activeTab === 'skills' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Habilidades</h2>
              <button className="btn btn-outline" onClick={() => showSkillForm ? resetSkillForm() : setShowSkillForm(true)}>{showSkillForm ? '✕ Cancelar' : '+ Nueva'}</button>
            </div>
            {showSkillForm && (
              <form className="admin-panel" onSubmit={handleSkillSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderLeft: `4px solid ${editingSkillId ? '#eab308' : 'var(--accent)'}` }}>
                <input type="text" name="name" value={skillFormData.name} onChange={handleSkillChange} placeholder="Nombre" className="form-input" required />
                <input type="text" name="iconUrl" value={skillFormData.iconUrl} onChange={handleSkillChange} placeholder="Emoji o URL Logo" className="form-input" required />
                <button type="submit" className="btn btn-primary" style={{ background: editingSkillId ? '#eab308' : '', color: editingSkillId ? '#000' : '' }}>Guardar</button>
              </form>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {skills.map((s) => (
                <div key={s.id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', position: 'relative', minWidth: '120px' }}>
                  <div style={{ position: 'absolute', top: '5px', right: '5px' }}><button onClick={() => editSkill(s)}>✏️</button><button onClick={() => deleteSkill(s.id)}>🗑️</button></div>
                  {s.iconUrl.startsWith('http') ? <img src={s.iconUrl} style={{ width: '40px', height: '40px' }} /> : <span style={{ fontSize: '2rem' }}>{s.iconUrl}</span>}
                  <div style={{ marginTop: '1rem' }}>{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* VISTA CONTACTOS */}
        {/* ============================== */}
        {activeTab === 'contacts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Tarjetas de Contacto</h2>
              <button className="btn btn-primary" onClick={addNewContact}>+ Nuevo Contacto</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              {contacts.map((c, index) => {
                const isEditing = editingContactId === c.id;
                return (
                  <div key={c.id} style={{ background: 'var(--bg-card)', border: isEditing ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', position: 'relative' }}>
                    {!isEditing && (
                      <div style={{ position: 'absolute', top: '-12px', right: '-12px', display: 'flex', gap: '8px' }}>
                         <button style={{ background: '#3b82f6', color: '#fff', padding: '6px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer', opacity: index === 0 ? 0.3 : 1 }} disabled={index === 0} onClick={() => moveContact(index, 'up')}>⬆️</button>
                         <button style={{ background: '#3b82f6', color: '#fff', padding: '6px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer', opacity: index === contacts.length - 1 ? 0.3 : 1 }} disabled={index === contacts.length - 1} onClick={() => moveContact(index, 'down')}>⬇️</button>
                         <button style={{ background: '#eab308', color: '#000', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => startEditContact(c)}>✏️ Editar</button>
                         <button style={{ background: '#ef4444', color: '#fff', padding: '6px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} onClick={() => deleteContact(c.id)}>🗑️</button>
                      </div>
                    )}
                    {isEditing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div><label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Título Visible</label><input type="text" name="title" value={editContactData.title} onChange={handleEditContactChange} className="form-input" style={{ width: '100%' }} /></div>
                          <div><label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Texto Descriptivo</label><input type="text" name="value" value={editContactData.value} onChange={handleEditContactChange} className="form-input" style={{ width: '100%' }} /></div>
                          <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Icono Principal</label><input type="text" name="mainIcon" value={editContactData.mainIcon} onChange={handleEditContactChange} className="form-input" style={{ width: '100%' }} /></div>
                          <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enlace Técnico</label><input type="text" name="redirectUrl" value={editContactData.redirectUrl} onChange={handleEditContactChange} className="form-input" style={{ width: '100%' }} /></div>
                          <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}><input type="checkbox" name="showCopyButton" checked={editContactData.showCopyButton} onChange={handleEditContactChange} style={{ width: '20px', height: '20px' }} />Mostrar botón de copiar</label></div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                           <button style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => saveContactEdit(c.id)}>✅ Guardar</button>
                           <button style={{ background: 'transparent', color: 'var(--text-muted)', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setEditingContactId(null)}>❌ Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>{c.mainIcon.startsWith('http') ? <img src={c.mainIcon} alt="" style={{ width: '50%', height: '50%', objectFit: 'contain' }} /> : c.mainIcon}</div>
                          <div><h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{c.title}</h4><p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{c.value}</p></div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {c.redirectUrl && <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', border: '1px solid rgba(255,255,255,0.05)' }}>{c.redirectIcon || '↗️'}</div>}
                          {c.showCopyButton && <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', border: '1px solid rgba(255,255,255,0.05)' }}>📋</div>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
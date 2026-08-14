import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Admin from './admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Tu portafolio normal */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Ruta privada: Tu panel de control */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import Alumnos from './components/Alumnos';
import Profesores from './components/Profesores';



import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div>

      <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/profesores" element={<Profesores />} />
              <Route path="/alumnos" element={<Alumnos />} />
              
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>

    
    </div>
  );
}

export default App;

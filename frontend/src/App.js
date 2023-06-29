import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import { Materias } from './components/materias/Materias';
import { Examenes } from "./components/examenes/Examenes";
import { Profesores } from './components/profesores/Profesores';
import { Alumnos } from './components/alumnos/Alumnos';
import { Comisiones } from './components/comisiones/Comisiones';
import ModalDialog from "./components/ModalDialog";

//Se importan componentes para el enrutamiento, permitiendo navegación entre paginas o de un SPA
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div>

      <BrowserRouter>
      <ModalDialog/>

          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/materias" element={<Materias />} />
              <Route path="/examenes" element={<Examenes />} />
              <Route path="/profesores" element={<Profesores />} />
              <Route path="/alumnos" element={<Alumnos />} />
              <Route path="/comisiones" element={<Comisiones />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>

    
    </div>
  );
}

export default App;

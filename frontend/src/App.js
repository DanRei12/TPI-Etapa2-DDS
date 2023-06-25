import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import { Materias } from './components/materias/Materias'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ModalDialog from "./components/ModalDialog";

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


              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>

    
    </div>
  );
}

export default App;

import axios from "axios";


const urlResource = "http://localhost:4000/api/alumnos";

async function Buscar(apellido) {
  const resp = await axios.get(urlResource, {
    params: { apellido },
  });
  return resp.data;
}

async function BuscarPorLegajo(item) {
  const resp = await axios.get(urlResource + "/" + item.legajoAlumno);
  return resp.data;
}

async function Eliminar(item) {
  await axios.delete(urlResource + "/" + item.legajoAlumno);
}

async function Grabar(item) {
  const resp = await axios.get(urlResource + "/" + item.legajoAlumno);
  const existeRegistro = resp.data;

    if (!existeRegistro) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.legajoAlumno, item);
    }
  }
  
  export const alumnosService = {
    Buscar,BuscarPorLegajo, Eliminar, Grabar
  };


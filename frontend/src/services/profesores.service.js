import axios from "axios";


const urlResource = "http://localhost:4000/api/profesores";

async function Buscar(apellido) {
  const resp = await axios.get(urlResource, {
    params: { apellido },
  });
  return resp.data;
}

async function BuscarPorLegajo(item) {
  const resp = await axios.get(urlResource + "/" + item.legajoProfesor);
  return resp.data;
}

async function Eliminar(item) {
  await axios.delete(urlResource + "/" + item.legajoProfesor);
}

async function Grabar(item) {
  const resp = await axios.get(urlResource + "/" + item.legajoProfesor);
  const existeRegistro = resp.data;

    if (!existeRegistro) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.legajoProfesor, item);
    }
  }
  
  export const profesoresService = {
    Buscar,BuscarPorLegajo, Eliminar, Grabar
  };


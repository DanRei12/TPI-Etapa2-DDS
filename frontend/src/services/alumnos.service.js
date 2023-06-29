//Este archivo se encarga de encapsular y organizar la lógica relacionada con las solicitudes y operaciones relacionadas con las solicitudes de una tabla.
import axios from "axios";

//Se establece una variable donde se almacena la ruta a usar
const urlResource = "http://localhost:4000/api/alumnos";

//Envía la solicitud get correspondiente al back
async function Buscar(apellido, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { apellido, Pagina },
  });
  return resp.data;
}

//Envía la solicitud get por id al back
async function BuscarPorLegajo(item) {
  const resp = await axios.get(urlResource + "/" + item.legajoAlumno);
  return resp.data;
}

//Envía la solicitud delete al back
async function Eliminar(item) {
  await axios.delete(urlResource + "/" + item.legajoAlumno);
}

//Envía la solicitud post o put, según corresponda, al back
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


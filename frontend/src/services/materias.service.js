import axios from "axios";

const urlResource = "http://localhost:4000/api/materias";

async function Buscar(Descripcion) {
  const resp = await axios.get(urlResource, {
    params: { Descripcion },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.nroMateria);
  return resp.data;
}
/*
async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticulo);
}
*/
async function Grabar(item) {
    if (item.nroMateria === 0) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.nroMateria, item);
    }
  }
  
  export const materiasService = {
    Buscar,BuscarPorId,Grabar
  };


import axios from "axios";

const urlResource = "http://localhost:4000/api/examenes";

async function Buscar(descripcion, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { descripcion, Pagina },
  });
  return resp.data;
}

async function BuscarPorNroMateria(item) {
  const resp = await axios.get(urlResource + "/" + item.nroMateria);
  return resp.data;
}

async function Eliminar(item) {
  await axios.delete(urlResource + "/" + item.nroMateria);
}

async function Grabar(item) {
  if (item.nroMateria === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.nroMateria, item);
  }
}

export const examenesService = {
  Buscar,BuscarPorNroMateria,Eliminar,Grabar
};
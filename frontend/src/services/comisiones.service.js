import axios from "axios";


const urlResource = "http://localhost:4000/api/comisiones";

async function Buscar(descripcion) {
  const resp = await axios.get(urlResource, {
    params: { descripcion },
  });
  return resp.data;
}

async function BuscarPorNroComision(item) {
  const resp = await axios.get(urlResource + "/" + item.nroComision);
  return resp.data;
}

async function Eliminar(item) {
  await axios.delete(urlResource + "/" + item.nroComision);
}

async function Grabar(item) {
  const resp = await axios.get(urlResource + "/" + item.nroComision);
  const existeRegistro = resp.data;

    if (!existeRegistro) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.nroComision, item);
    }
  }
  
  export const comisionesService = {
    Buscar,BuscarPorNroComision, Eliminar, Grabar
  };


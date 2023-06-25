import axios from "axios";

const urlResource = "http://localhost:4000/api/comisiones";

async function BuscarComisiones() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

export const comisionesService = {
  BuscarComisiones
};

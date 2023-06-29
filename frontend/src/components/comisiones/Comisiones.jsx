import React, { useState } from "react";
import ComisionesBuscar from "./ComisionesBuscar";
import ComisionesListado from "./ComisionesListado";
import ComisionesRegistro from "./ComisionesRegistro";
import moment from "moment";
import modalDialogService from "../../services/modalDialog.service";
import { comisionesService } from "../../services/comisiones.service";

function Comisiones() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  //Se establecen los useState de las variables controladas mediante estados.
  const [AccionABMC, setAccionABMC] = useState("L");
  const [descripcion, setDescripcion] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  //Función para buscar conforme al filtro pagina y descripcion
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // Página y cualquier estado se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    const data = await comisionesService.Buscar(descripcion, _pagina);
    setItems(data.Items);
    console.log("Items: ", data.Items);

    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  //Se busca por id y se actualiza el valor de estado de Item, y de la acción a usar para la misma.
  async function BuscarPorNroComision(item, accionABMC) {
    const data = await comisionesService.BuscarPorNroComision(item);
    setAccionABMC(accionABMC);
    setItem(data);
  }

  function Consultar(item) {
    BuscarPorNroComision(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Modificar(item) {
    BuscarPorNroComision(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  //Se inicializa los valores del registro que será agregado para que sea modificado por el usuario en el front.
  function Agregar() {
    setAccionABMC("A");
    setItem({
      nroComision: 0,
      fechaCreacion: moment(new Date()).format("YYYY-MM-DD"),
      descripcion: null,
    });
  }

  //Lleva a cabo la eliminación de un registro, confirmando primero la elección del usuario
  async function Eliminar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere eliminar el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await comisionesService.Eliminar(item);
        await Buscar();
      }
    );
  }

  //Función encargada de hacer el put o el post mediante la accion ABMC correspondiente
  async function Grabar(item) {
    // agregar o modificar
    await comisionesService.Grabar(item);
    await Buscar();
    Volver();

    modalDialogService.Alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente.",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "success"
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Comisiones <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {/* Búsqueda(mediante filtro) o incorporación de un registro*/}
      {AccionABMC === "L" && (
        <ComisionesBuscar
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resultados de busqueda y paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ComisionesListado
          {...{
            Items,
            Consultar,
            Modificar,
            Eliminar,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}
      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <ComisionesRegistro {...{ AccionABMC, Item, Grabar, Volver }} />
      )}
    </div>
  );
}

export { Comisiones };

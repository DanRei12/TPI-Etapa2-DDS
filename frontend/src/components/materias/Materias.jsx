import React, { useState, useEffect } from "react";
import MateriasBuscar from "./MateriasBuscar";
import MateriasListado from "./MateriasListado";
import MateriasRegistro from "./MateriasRegistro";
import { materiasService } from "../../services/materias.service";
import moment from "moment";
import modalDialogService from "../../services/modalDialog.service";
import { profesoresService } from "../../services/profesores.service";
import { alumnosService } from "../../services/alumnos.service";
import { comisionesService } from "../../services/comisiones.service";

function Materias() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  //Se establecen los useState de las variables controladas mediante estados.
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Descripcion, setDescripcion] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Profesores, setProfesores] = useState(null);
  const [Alumnos, setAlumnos] = useState(null);
  const [Comisiones, setComisiones] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])

  useEffect(() => {
    async function BuscarLegajoProfesor() {
      //Utiliza la solicitud con pagina -1 para traer todos los registros desde el back
      let data = await profesoresService.Buscar(undefined, -1);
      setProfesores(data.Items);
    }
    BuscarLegajoProfesor();
  }, []);

  useEffect(() => {
    async function BuscarLegajoAlumno() {
      //Utiliza la solicitud con pagina -1 para traer todos los registros desde el back
      let data = await alumnosService.Buscar(undefined, -1);
      setAlumnos(data.Items);
    }
    BuscarLegajoAlumno();
  }, []);

  useEffect(() => {
    async function BuscarComision() {
      //Utiliza la solicitud con pagina -1 para traer todos los registros desde el back
      let data = await comisionesService.Buscar(undefined, -1);
      console.log(data);
      setComisiones(data.Items);
    }
    BuscarComision();
  }, []);

  //Función para buscar conforme al filtro pagina y descripcion
  async function Buscar(_pagina) {
    //alert("Buscando...");
    // harcodeamos 2 articulos para probar
    /*setItems ([
        { "nroMateria":24,
          "legajoProfesor":10231,
          "legajoAlumno":75094,
          "nroComision":551,
          "fechaCreacion":"2005-12-05T09:00:00.000Z",
          "descripcion":"Algebra"},
        {
          "nroMateria":50,
          "legajoProfesor":12345,
          "legajoAlumno":83231,
          "nroComision":238,
          "fechaCreacion":"2017-06-13T14:51:00.000Z",
          "descripcion":"Análisis Numerico"},
      ]); */

    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // Página y cualquier estado se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    const data = await materiasService.Buscar(Descripcion, _pagina);
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
  async function BuscarPorId(item, accionABMC) {
    const data = await materiasService.BuscarPorId(item);
    setAccionABMC(accionABMC);
    setItem(data);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  //Se inicializa los valores del registro que será agregado para que sea modificado por el usuario en el front.
  function Agregar() {
    setAccionABMC("A");
    setItem({
      nroMateria: 0,
      legajoProfesor: null,
      legajoAlumno: null,
      nroComision: null,
      fechaCreacion: moment(new Date()).format("YYYY-MM-DD"),
      descripcion: null,
    });
  }

  //Lleva a cabo la eliminación de un registro, confirmando primero la elección del usuario
  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere eliminar el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await materiasService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  //Función encargada de hacer el put o el post mediante la accion ABMC correspondiente
  async function Grabar(item) {
    // agregar o modificar
    await materiasService.Grabar(item);
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
        Materias <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {/* Búsqueda(mediante filtro) o incorporación de un registro*/}
      {AccionABMC === "L" && (
        <MateriasBuscar
          Descripcion={Descripcion}
          setDescripcion={setDescripcion}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resultados de busqueda y paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <MateriasListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
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
        <MateriasRegistro
          {...{
            AccionABMC,
            Profesores,
            Alumnos,
            Comisiones,
            Item,
            Grabar,
            Volver,
          }}
        />
      )}
    </div>
  );
}

export { Materias };

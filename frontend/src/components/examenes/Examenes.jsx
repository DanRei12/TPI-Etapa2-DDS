import React, { useState, useEffect } from "react";
import moment from "moment";
import ExamenesBuscar from "./ExamenesBuscar";
import ExamenesListado from "./ExamenesListado";
import ExamenesRegistro from "./ExamenesRegistro";
import { materiasService } from "../../services/materias.service";
import { alumnosService } from "../../services/alumnos.service";
import { examenesService } from "../../services/examenes.service";
import modalDialogService from "../../services/modalDialog.service";

function Examenes() {
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
  const [Materias, setMaterias] = useState(null);
  const [Alumnos, setAlumnos] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    //console.log("mounting Materias");
    async function BuscarMaterias() {
      //Utiliza la solicitud con pagina -1 para traer todos los registros desde el back
      let data = await materiasService.Buscar(undefined, -1);
      console.log(data.Items);
      setMaterias(data.Items);
    }
    BuscarMaterias();
    return () => {};
  }, []);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    //console.log("mounting Materias");
    async function BuscarAlumnos() {
      //Utiliza la solicitud con pagina -1 para traer todos los registros desde el back
      let data = await alumnosService.Buscar(undefined, -1);
      setAlumnos(data.Items);
    }
    BuscarAlumnos();
    return () => {
      //console.log("unmounting Materias");
    };
  }, []);

  //Función para buscar conforme al filtro pagina y descripcion
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // Página y cualquier estado se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    const data = await examenesService.Buscar(descripcion, _pagina);
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
  async function BuscarPorNroMateria(item, accionABMC) {
    const data = await examenesService.BuscarPorNroMateria(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorNroMateria(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorNroMateria(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  //Se inicializa los valores del registro que será agregado para que sea modificado por el usuario en el front.
  function Agregar() {
    setAccionABMC("A");
    setItem({
      nroMateria: 0,
      legajoAlumno: null,
      fechaExamen: moment(new Date()).format("YYYY-MM-DD"),
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
        await examenesService.Eliminar(item);
        await Buscar();
      }
    );
  }

  //Función encargada de hacer el put o el post mediante la accion ABMC correspondiente
  async function Grabar(item) {
    // agregar o modificar
    await examenesService.Grabar(item);
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
        Examenes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {/* Búsqueda(mediante filtro) o incorporación de un registro*/}
      {AccionABMC === "L" && (
        <ExamenesBuscar
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resultados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ExamenesListado
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
        <ExamenesRegistro
          {...{ AccionABMC, Materias, Alumnos, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Examenes };

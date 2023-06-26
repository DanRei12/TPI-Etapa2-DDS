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
      let data = await materiasService.Buscar();
      setMaterias(data.Items);
    }
    BuscarMaterias();
    return () => {
      //console.log("unmounting Materias");
    };
  }, []);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    //console.log("mounting Materias");
    async function BuscarAlumnos() {
      let data = await alumnosService.Buscar();
      setAlumnos(data);
    }
    BuscarAlumnos();
    return () => {
      //console.log("unmounting Materias");
    };
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    /*     modalDialogService.BloquearPantalla(true);
     */ const data = await examenesService.Buscar(descripcion, _pagina);
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

  function Agregar() {
    setAccionABMC("A");
    setItem({
      nroMateria: 0,
      legajoAlumno: null,
      fechaExamen: moment(new Date()).format("YYYY-MM-DD"),
      descripcion: null,
    });
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function Eliminar(item) {
    // const resp = window.confirm(
    //   "Esta seguro que quiere " +
    //     (item.Activo ? "desactivar" : "activar") +
    //     " el registro?"
    // );
    // if (resp) {
    //     await articulosService.ActivarDesactivar(item);
    //     Buscar();
    // }

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

    // setTimeout(() => {
    //   alert(
    //     "Registro " +
    //       (AccionABMC === "A" ? "agregado" : "modificado") +
    //       " correctamente."
    //   );
    // }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  // mejorar performance
  // const memoArticulosListado = useMemo(
  //   () => (
  //     <ArticulosListado
  //       Items={Items}
  //       Consultar={Consultar}
  //       Modificar={Modificar}
  //       ActivarDesactivar={ActivarDesactivar}
  //       Imprimir={Imprimir}
  //       Pagina={Pagina}
  //       RegistrosTotal={RegistrosTotal}
  //       Paginas={Paginas}
  //       Buscar={Buscar}
  //     />
  //   ),
  //   [Items]
  // );

  return (
    <div>
      <div className="tituloPagina">
        Examenes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ExamenesBuscar
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ExamenesListado
          {...{
            Items,
            Consultar,
            Modificar,
            Eliminar,
            Imprimir,
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
        <ExamenesRegistro {...{ AccionABMC, Materias, Alumnos, Item, Grabar, Volver }} />
      )}
    </div>
  );
}

export { Examenes };

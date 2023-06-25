import React, { useState, useEffect } from "react";
//import moment from "moment";
import MateriasBuscar from "./MateriasBuscar";
import MateriasListado from "./MateriasListado";
import MateriasRegistro from "./MateriasRegistro";
import { materiasService } from "../../services/materias.service";
import moment from "moment";
import modalDialogService from "../../services/modalDialog.service";
//import { profesoresService } from "../../services/profesores.service";


function Materias() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Descripcion, setDescripcion] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  //const [RegistrosTotal, setRegistrosTotal] = useState(0);
  //const [Pagina, setPagina] = useState(1);
  //const [Paginas, setPaginas] = useState([]);

  // const [ArticulosFamilias, setArticulosFamilias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  /*
  useEffect(() => {
    async function BuscarLegajoProfesor() {
        let data = await profesoresService.Buscar();
        setArticulosFamilias(data);
      }
      BuscarLegajoProfesor();
    }, []);
    */
    async function Buscar() {
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
      const data = await materiasService.Buscar(Descripcion);
      setItems(data.Items);
      console.log("Items: ", data.Items);
    }

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
    
    
      function Agregar() {
        setAccionABMC("A");
        setItem({
            nroMateria: 0,
            legajoProfesor: null,
            legajoAlumno: null,
            nroComision: null,
            fechaCreacion: moment(new Date()).format("YYYY-MM-DD"),
            descripcion: null,
            activo: true,
          });
      
      }
    /*
      function Imprimir() {
        alert("En desarrollo...");
        }
      */
    async function ActivarDesactivar(item) {
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
          await materiasService.ActivarDesactivar(item);
          await Buscar();
        }
      );
    }
      
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
  
return (
      <div>
        <div className="tituloPagina">
          Materias <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>

    { AccionABMC === "L" && <MateriasBuscar
    Descripcion={Descripcion}
    setDescripcion={setDescripcion}
    Activo={Activo}
    setActivo={setActivo} 
    Buscar={Buscar}
    Agregar={Agregar}
    />
    }

    {/* Tabla de resutados de busqueda */}
    { AccionABMC === "L" && Items?.length > 0 && <MateriasListado
    {...{
        Items,
        Consultar,
        Modificar,
        ActivarDesactivar,
        /*Imprimir,
        Pagina,
        RegistrosTotal,
        Paginas,*/
        Buscar,
    }}
    />
    }

    { AccionABMC === "L" && Items?.length === 0 && 
    <div className="alert alert-info mensajesAlert">
    <i className="fa fa-exclamation-sign"></i>
    No se encontraron registros...
    </div>
    }
    {/* Formulario de alta/modificacion/consulta */}
    { AccionABMC !== "L" && (<MateriasRegistro
            {...{ AccionABMC, Item, Grabar, Volver }}
        />
        )}
    </div>

  )
}

export { Materias };
  
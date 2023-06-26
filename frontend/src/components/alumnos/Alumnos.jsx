import React, { useState} from "react";
import AlumnosBuscar from "./AlumnosBuscar";
import AlumnosListado from "./AlumnosListado";
import AlumnosRegistro from "./AlumnosRegistro";
import moment from "moment";
import modalDialogService from "../../services/modalDialog.service";
import { alumnosService } from '../../services/alumnos.service';

function Alumnos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [apellido, setApellido] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

    async function Buscar() {
      const data = await alumnosService.Buscar(apellido);
      setItems(data);
      console.log("Items: ", data);
    }

    async function BuscarPorLegajo(item, accionABMC) {
        const data = await alumnosService.BuscarPorLegajo(item);
        setAccionABMC(accionABMC);
        setItem(data);
      }
    
      function Consultar(item) {
        BuscarPorLegajo(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
      }

      function Modificar(item) {
        BuscarPorLegajo(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
      }
    
    
      function Agregar() {
        setAccionABMC("A");
        setItem({
            legajoAlumno: 0,
            nombre: null,
            apellido: null,
            fechaInscripcion: moment(new Date()).format("YYYY-MM-DD"),
            descripcion: null,
          });
      
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
          await alumnosService.Eliminar(item);
          await Buscar();
        }
      );
    }
      
    async function Grabar(item) {
      // agregar o modificar
      await alumnosService.Grabar(item);
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
          Alumnos <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>

    { AccionABMC === "L" && <AlumnosBuscar
    apellido={apellido}
    setApellido={setApellido}
    Buscar={Buscar}
    Agregar={Agregar}
    />
    }

    {/* Tabla de resutados de busqueda */}
    { AccionABMC === "L" && Items?.length > 0 && <AlumnosListado
    {...{
        Items,
        Consultar,
        Modificar,
        Eliminar,
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
    { AccionABMC !== "L" && (<AlumnosRegistro
            {...{ AccionABMC, Item, Grabar, Volver }}
        />
        )}
    </div>

  )
}

export { Alumnos };
  
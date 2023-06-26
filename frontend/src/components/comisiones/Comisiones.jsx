import React, { useState} from "react";
import ComisionesBuscar from "./ComisionesBuscar";
import ComisionesListado from "./ComisionesListado";
import ComisionesRegistro from "./ComisionesRegistro";
import moment from "moment";
import modalDialogService from "../../services/modalDialog.service";
import { comisionesService } from '../../services/comisiones.service';

function Comisiones() {
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

    async function Buscar() {
      const data = await comisionesService.Buscar(descripcion);
      setItems(data);
      console.log("Items: ", data);
    }

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
    
    
      function Agregar() {
        setAccionABMC("A");
        setItem({
            nroComision: 0,
            fechaCreacion: moment(new Date()).format("YYYY-MM-DD"),
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
          await comisionesService.Eliminar(item);
          await Buscar();
        }
      );
    }
      
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
          Comisiones <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>

    { AccionABMC === "L" && <ComisionesBuscar
    descripcion={descripcion}
    setDescripcion={setDescripcion}
    Buscar={Buscar}
    Agregar={Agregar}
    />
    }

    {/* Tabla de resutados de busqueda */}
    { AccionABMC === "L" && Items?.length > 0 && <ComisionesListado
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
    { AccionABMC !== "L" && (<ComisionesRegistro
            {...{ AccionABMC, Item, Grabar, Volver }}
        />
        )}
    </div>

  )
}

export { Comisiones };
  
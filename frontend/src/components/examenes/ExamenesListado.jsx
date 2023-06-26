import React from "react";
import moment from "moment";

export default function ExamenesListado({
  Items,
  Consultar,
  Modificar,
  Eliminar,
  Buscar,
}) {
  // mejorar performance
  //console.log("render ArticulosListado", [Items]); //para ver cuando se renderiza y luego mejoramos con el  hoock useMemo


  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Descripcion</th>
            <th className="text-center">NroMateria</th>
            <th className="text-center">LegajoAlumno</th>
            <th className="text-center">Fecha de Examen</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.nroMateria}>
                <td>{Item.descripcion}</td>
                <td className="text-end">{Item.nroMateria}</td>
                <td className="text-end">{Item.legajoAlumno}</td>
                <td className="text-end">
                  {moment(Item.fechaExamen).format("DD/MM/YYYY")}
                </td>
                {/* <td>{Item.Activo ? "SI" : "NO"}</td> */}
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm btn-outline-danger"
                    }
                    title={"Eliminar"}
                    onClick={() => Eliminar(Item)}
                  >
                    {/* <i
                      className={"fa fa-" + (Item.Activo ? "times" : "check")}
                    ></i> */}
                  </button>

                


                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

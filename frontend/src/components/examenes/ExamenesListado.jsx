import React from "react";
import moment from "moment";

export default function ExamenesListado({
  Items,
  Consultar,
  Modificar,
  Eliminar,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            {/*Se establecen los campos del listado*/}
            <th className="text-center">Descripcion</th>
            <th className="text-center">NroMateria</th>
            <th className="text-center">LegajoAlumno</th>
            <th className="text-center">Fecha de Examen</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/*Asignación de valores para cada campo */}
          {Items &&
            Items.map((Item) => (
              <tr key={Item.nroMateria}>
                <td>{Item.descripcion}</td>
                <td className="text-end">{Item.nroMateria}</td>
                <td className="text-end">{Item.legajoAlumno}</td>
                <td className="text-end">
                  {moment(Item.fechaExamen).format("DD/MM/YYYY")}
                </td>
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
                    className={"btn btn-sm btn-outline-danger"}
                    title={"Eliminar"}
                    onClick={() => Eliminar(Item)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
        </div>
      </div>
    </div>
  );
}

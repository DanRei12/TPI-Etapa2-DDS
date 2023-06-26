import React from "react";
import moment from "moment";

export default function AlumnosListado({
  Items,
  Consultar,
  Modificar,
  Eliminar,
  /*
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas, */
  Buscar,

}) {
    return (
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center">Lejago Alumno</th>
                <th className="text-center">nombre</th>
                <th className="text-center">apellido</th>
                <th className="text-center">Fecha de Inscripcion</th>
                <th className="text-center">Descripción</th>
                <th className="text-center text-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.legajoAlumno}>
                    <td className="text-center">{Item.legajoAlumno}</td>
                    <td className="text-center">{Item.nombre}</td>
                    <td className="text-center">{Item.apellido}</td>
                    <td className="text-center">{moment(Item.fechaInscripcion).format("DD/MM/YYYY")}</td>
                    <td className="text-center">{Item.descripcion}</td>
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
                        </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

      {/* Paginador*/}
      {/* <div className="paginador">
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

          <div className="col">
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
        </div> */}
        </div>
  );
}
    
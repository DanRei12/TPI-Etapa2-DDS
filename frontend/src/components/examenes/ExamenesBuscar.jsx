import React from "react";
export default function ExamenesBuscar({
  descripcion,
  setDescripcion,
  Buscar,
  Agregar,
}) {
  return (
    // Se inicia el form de busqueda con un onSubmit para evitar el comportamiento predeterminado y la carga automatica, permitiendo un manejo mas manual
    <form name="FormBusqueda" onSubmit={(e) => e.preventDefault()}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Descripcion:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
              maxLength="55"
              autoFocus
            />
          </div>
        </div>

        <hr />

        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => Buscar(1)}
            >
              <i className="fa fa-search"> </i> Buscar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => Agregar()}
            >
              <i className="fa fa-plus"> </i> Agregar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

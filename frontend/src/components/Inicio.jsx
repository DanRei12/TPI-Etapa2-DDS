import React from "react";

//Pagina de inicio
function Inicio() {
  return (
    <div className="container">
      <h1>Inicio</h1>
      <hr />
      <div
        className="mt-4 p-5 rounded"
        style={{ backgroundColor: "lightgray" }}
      >
        <h1>Trabajo Práctico DDS</h1>
        <p>UTN - FRC</p>
      </div>
    </div>
  );
}

export { Inicio };
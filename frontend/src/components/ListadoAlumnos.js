import React from 'react';

const ListadoAlumnos = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>legajoAlumno</th>
            <th>nombre</th>
            <th>apellido</th>
            <th>fechaInscripcion</th>
            <th>descripcion</th>
            
          </tr>
        </thead>
        <tbody>
          {lista.map((items) => (
             <tr key={items.legajoAlumno}>
              <td>{items.legajoAlumno}</td>
              <td>{items.nombre}</td>
              <td>{items.apellido}</td>
              <td>{items.fechaInscripcion}</td>
              <td>{items.descripcion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoAlumnos;

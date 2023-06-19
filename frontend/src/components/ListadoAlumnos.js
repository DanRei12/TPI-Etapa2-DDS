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
          {lista.map((item) => (
             <tr key={item.legajoAlumno}>
              <td>{item.legajoAlumno}</td>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
              <td>{item.fechaInscripcion}</td>
              <td>{item.descripcion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoAlumnos;

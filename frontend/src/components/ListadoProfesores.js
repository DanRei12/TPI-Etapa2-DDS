import React from 'react';

const ListadoProfesores = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>legajoProfesor</th>
            <th>nombre</th>
            <th>apellido</th>
            <th>descripcion</th>
            
          </tr>
        </thead>
        <tbody>
          {lista.map((prof) => (
             <tr key={prof.legajoProfesor}>
              <td>{prof.legajoProfesor}</td>
              <td>{prof.nombre}</td>
              <td>{prof.apellido}</td>
              <td>{prof.descripcion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoProfesores;

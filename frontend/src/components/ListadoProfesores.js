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
          {lista.map((item) => (
             <tr key={item.legajoProfesor}>
              <td>{item.legajoProfesor}</td>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
              <td>{item.descripcion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoProfesores;

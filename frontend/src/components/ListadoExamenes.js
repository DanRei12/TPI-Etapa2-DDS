import React from 'react';

const ListadoExamenes = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
          <th>nroMateria</th>
            <th>legajoAlumno</th>
            <th>fechaExamen</th>
            <th>descripcion</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((items) => (
             <tr key={items.nroMateria}>
                <td>{items.nroMateria}</td>
              <td>{items.legajoAlumno}</td>
              <td>{items.fechaExamen}</td>
              <td>{items.descripcion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoExamenes;

import React from "react";
import { useForm } from "react-hook-form";

export default function ExamenesRegistro({
  AccionABMC,
  Materias,
  Alumnos,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };
  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo descripcion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="descripcion">
                Descripcion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("descripcion", {
                  required: { value: true, message: "Descripcion es requerida" },
                  minLength: {
                    value: 4,
                    message: "Descripcion debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Descripcion debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.descripcion ? "is-invalid" : "")
                }
              />
              {errors?.descripcion && touchedFields.descripcion && (
                <div className="invalid-feedback">
                  {errors?.descripcion?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo legajoAlumno */}
          {/* <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="legajoAlumno">
                Legajo Alumno<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("legajoAlumno", {
                  required: { value: true, message: "legajoAlumno es requerido" },
                  min: {
                    value: 0,
                    message: "LegajoAlumno debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "LegajoAlumno debe ser menor o igual a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.legajoAlumno ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.legajoAlumno?.message}</div>
            </div>
          </div>
 */}

          {/* campo LegajoAlumno */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="legajoAlumno">
                Legajo Alumno<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("legajoAlumno", {
                  required: { value: true, message: "Alumno es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.nroMateria ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Alumnos?.map((x) => (
                  <option value={x.legajoAlumno} key={x.legajoAlumno}>
                    {x.legajoAlumno}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.legajoAlumno?.message}
              </div>
            </div>
          </div>

          {/* campo NroMateria */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nroMateria">
                Materia - NroMateria<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("nroMateria", {
                  required: { value: true, message: "Materia es requerida" },
                })}
                className={
                  "form-control " +
                  (errors?.nroMateria ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Materias?.map((x) => (
                  <option value={x.nroMateria} key={x.nroMateria}>
                    {x.descripcion+" - "+x.nroMateria}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.nroMateria?.message}
              </div>
            </div>
          </div>

          {/* campo FechaExamen */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaExamen">
                Fecha de Examen<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaExamen", {
                  required: { message: "Fecha examen es requerido" }
                })}
                className={
                  "form-control " + (errors?.fechaExamen ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaExamen?.message}
              </div>
            </div>
          </div>       

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

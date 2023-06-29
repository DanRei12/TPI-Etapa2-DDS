import React from "react";
import { useForm } from "react-hook-form";

export default function AlumnosRegistro({ AccionABMC, Item, Grabar, Volver }) {
  //Se inicializa funciones para la gestión de los datos del form
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
    //Se envia cuando los datos hayan sido validados correctamente
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*Se lleva a cabo la introducción de los campos del registro */}
      <div className="container-fluid">
        {/*Habilita el campo solo para el caso de agregar un nuevo registro */}
        <fieldset disabled={AccionABMC != "A"}>
          {/* campo Legajo Alumno */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="legajoAlumno">
                Legajo Alumno<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("legajoAlumno", {
                  required: {
                    value: true,
                    message: "Legajo Alumno es requerido",
                  },
                })}
                autoFocus
                className={
                  "form-control" + (errors?.legajoAlumno ? "is-invalid" : " ")
                }
              />
              {errors?.legajoAlumno && touchedFields.legajoAlumno && (
                <div className="invalid-feedback">
                  {errors?.legajoAlumno?.message}
                </div>
              )}
            </div>
          </div>
        </fieldset>

        {/*Desactiva los campos en caso de que este en opción de consulta*/}
        <fieldset disabled={AccionABMC === "C"}>
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.nombre?.message}</div>
            </div>
          </div>

          {/* campo apellido */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="apellido">
                Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("apellido", {
                  required: { value: true, message: "Apellido es requerido" },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.apellido ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.apellido?.message}
              </div>
            </div>
          </div>

          {/* campo Fecha Inscripcion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaInscripcion">
                Fecha Inscripcion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaInscripcion", {
                  required: {
                    value: true,
                    message: "Fecha Inscripcion es requerida",
                  },
                })}
                className={
                  "form-control" +
                  (errors?.fechaInscripcion ? "is-invalid" : " ")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaInscripcion?.message}
              </div>
            </div>
          </div>

          {/* campo Descripcion Alumno */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="descripcion">
                Descripcion del Alumno<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("descripcion", {
                  required: {
                    value: true,
                    message: "Descripcion es requerido",
                  },
                })}
                className={
                  "form-control" + (errors?.descripcion ? "is-invalid" : " ")
                }
              />
              <div className="invalid-feedback">
                {errors?.descripcion?.message}
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

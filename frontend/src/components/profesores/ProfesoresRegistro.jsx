import React from "react";
import { useForm } from "react-hook-form";

export default function ProfesoresRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
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
          {/* campo Legajo Profesor */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="legajoProfesor">
                Legajo Profesor<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                id="legajoProfesor"
                name="legajoProfesor"
                {...register("legajoProfesor", {
                  required: {
                    value: true,
                    message: "Legajo Profesor es requerido",
                  },
                  minLength: {
                    value: 1,
                    message: "Legajo Profesor debe tener al menos 1 caracter",
                  },
                  maxLength: {
                    value: 10,
                    message:
                      "Legajo Profesor debe tener menos de 10 caracteres",
                  },
                })}
                className={
                  "form-control" + (errors?.legajoProfesor ? "is-invalid" : " ")
                }
              />
              {errors?.legajoProfesor && touchedFields.legajoProfesor && (
                <div className="invalid-feedback">
                  {errors?.legajoProfesor?.message}
                </div>
              )}
            </div>
          </div>
        </fieldset>

        {/*Desactiva los campos en caso de que este en opción de consulta*/}
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
                  required: {
                    value: true,
                    message: "Descripcion es requerida",
                  },
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
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              {errors?.nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.nombre?.message}
                </div>
              )}
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
                  minLength: {
                    value: 4,
                    message: "Apellido debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Apellido debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.apellido ? "is-invalid" : "")
                }
              />
              {errors?.apellido && touchedFields.apellido && (
                <div className="invalid-feedback">
                  {errors?.apellido?.message}
                </div>
              )}
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

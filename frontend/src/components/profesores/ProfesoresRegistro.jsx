import React from "react";
import { useForm } from "react-hook-form";

export default function ProfesoresRegistro({
  AccionABMC,
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

        {/*
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
                {...register("legajoProfesor", { 
                    required: {value: true, message: "Legajo Profesor es requerido" },
                })}
                autoFocus
                className={"form-control" + (errors?.legajoProfesor ? "is-invalid" : " ")}
              />
              {errors?.legajoProfesor && touchedFields.legajoProfesor && (
                <div className="invalid-feedback">
                    {errors?.legajoProfesor?.message}
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
              <div className="invalid-feedback">{errors?.apellido?.message}</div>
            </div>
          </div>

          {/* campo Descripcion Profesor */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="descripcion">
                Descripcion del Profesor<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                    type="text"
                    {...register("descripcion", {
                        required: {value: true, message: "Descripcion es requerido"},
                    })}
                    className={"form-control" + (errors?.descripcion ? "is-invalid" : " ")}
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

import React from "react";
import { useForm } from "react-hook-form";

export default function ComisionesRegistro({
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
          {/* campo Nro Comision */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nroComision">
                Número de Comision<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("nroComision", { 
                    required: {value: true, message: "Número de Comision es requerido" },
                })}
                autoFocus
                className={"form-control" + (errors?.nroComision ? "is-invalid" : " ")}
              />
              {errors?.nroComision && touchedFields.nroComision && (
                <div className="invalid-feedback">
                    {errors?.nroComision?.message}
                </div>
              )}
            </div>
          </div>
          
          {/* campo Fecha Creacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaCreacion">
                Fecha Creacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaCreacion", {
                    required: {value: true, message: "Fecha Creacion es requerida"},
                })}
                className={"form-control" + (errors?.fechaCreacion ? "is-invalid" : " ")}
              />
              <div className="invalid-feedback">
                {errors?.fechaCreacion?.message}
              </div>
            </div>
          </div>

          {/* campo Descripcion*/}
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

import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";

export function EmpresasTienenContratosGob () {
    const { control } = useFormContext();
    /*
    5.- Empresas que tienen contratos con el gobierno
      - Nombre / Razón social
      - Bien o servicio que se otorgo al gobierno (TOOLTIP con descripción o botón informativo)
    */
    return (
      <>
        <Controller
          control={control}
          name="nombreRazonSocial"
          render={({ field }) => (
            <TextField
              id="nombreRazonSocial"
              label="Nombre o razón social"
              variant="outlined"
              placeholder="Ingresa el nombre o razón social"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
  
        <Controller
          control={control}
          name="bienServicioOtorgado"
          render={({ field }) => (
            <TextField
              id="bienServicioOtorgado"
              label="Bien o servicio que se otorgo al gobierno"
              variant="outlined"
              placeholder="Ingresa el bien o servicio que se otorgo al gobierno"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
  
      </>
    );
  };

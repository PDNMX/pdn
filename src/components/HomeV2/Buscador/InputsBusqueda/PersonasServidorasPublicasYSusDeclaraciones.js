import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";

export function PersonasServidorasPublicasYSusDeclaraciones () {
    const { control } = useFormContext();
    /*
    3.- Personas servidoras pub y declaraciones patri
      - Nombre
      - AP1
      - AP2
      - Institución
      - Empleo, cargo, comisión
    */
    return (
      <>
        <Controller
          control={control}
          name="nombres"
          render={({ field }) => (
            <TextField
              id="nombres"
              label="Nombre(s)"
              variant="outlined"
              placeholder="Ingresa el nombre o nombres"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
  
        <Controller
          control={control}
          name="primerApellido"
          render={({ field }) => (
            <TextField
              id="primerApellido"
              label="Primer Apellido"
              variant="outlined"
              placeholder="Ingresa el primer apellido"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="segundoApellido"
          render={({ field }) => (
            <TextField
              id="segundoApellido"
              label="Segundo Apellido"
              variant="outlined"
              placeholder="Ingresa el segundo apellido"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="institucion"
          render={({ field }) => (
            <TextField
              id="institucion"
              label="Institución"
              variant="outlined"
              placeholder="Ingresa la institución"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="empleoCargoComision"
          render={({ field }) => (
            <TextField
              id="empleoCargoComision"
              label="Empleo, cargo o comisión"
              variant="outlined"
              placeholder="Ingresa el empleo, cargo o comisión"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };

import React from "react";
import { InputLabel, FormControl, TextField, Select, MenuItem } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";

export function PersonasServidorasPublicasSancionados() {
    const { control } = useFormContext();
    /*
    1.- Servidores publicos sancionados
      - Nombre
      - AP1
      - AP2
      - Institución
      - Tipo de sanción (select)
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
          name="tipoSancion"
          render={({ field }) => (
            <FormControl fullWidth={true} margin={'normal'}>
            <InputLabel id="labelTipoSancion">Tipo de Sanción</InputLabel>
            <Select
              labelId="tipoSancion"
              id="tipoSancion"
              value={'Tipo Sanción'}
              label="Tipo de Sanción"
              autoWidth
              {...field}
            >
              <MenuItem value={10}>Inhabilitación</MenuItem>
              <MenuItem value={20}>Multa</MenuItem>
              <MenuItem value={30}>Suspención</MenuItem>
              <MenuItem value={40}>Destitución del empleo, cargo o comisión</MenuItem>
              <MenuItem value={50}>Indemnización resarcitoria</MenuItem>
              <MenuItem value={60}>Sanción económica</MenuItem>
              <MenuItem value={70}>Otro</MenuItem>
            </Select>
          </FormControl>
            
          )}
        />
      </>
    );
  };

import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../ThemeV2";

import Autocomplete from '@mui/material/Autocomplete';

export function PersonasServidorasPublicasSancionados() {
    const { control } = useFormContext();
    const tiposSancion = [
      {label: 'Inhabilitado', value: 'I'},
      {label: 'Multado', value: 'M'},
      {label: 'Suspensión del empleo, cargo o comisión', value: 'S'},
      {label: 'Destitución del empleo, cargo o comisión', value: 'D'},
      {label: 'Indemnización resarcitoria', value: 'IRSC'},
      {label: 'Sanción económica', value: 'SE'},
      {label: 'Otro', value: 'O'}
    ];
    /*
    1.- Servidores publicos sancionados
      - Nombre
      - AP1
      - AP2
      - Institución
      - Tipo de sanción (multi select)
    */
    return (
      <ThemeProvider theme={ThemeV2}>
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
        name="tipoSancion"
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            disableClearable
            disablePortal
            filterSelectedOptions
            multiple
            getOptionDisabled={(option) => option.disabled}
            getOptionLabel={(option) => option.label}
            id="tipoSancion-autocomplete"
            onChange={(event, value) => field.onChange(value)}
            options={tiposSancion}
            /* getOptionSelected={(option, value) => option === value} */
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderInput={(params) => (
              <TextField
                error={!!error}
                helperText={error?.message}
                id="tipoSancion"
                label="Tipos de Sanción"
                name="tipoSancion"
                type="Buscar"
                inputRef={ref}
                {...params}
              />
            )}
          />
        )}
      />
      </ThemeProvider>
    );
  };

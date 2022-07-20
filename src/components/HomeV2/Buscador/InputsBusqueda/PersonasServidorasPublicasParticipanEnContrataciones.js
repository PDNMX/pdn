import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../ThemeV2";
import Autocomplete from '@mui/material/Autocomplete';

export function PersonasServidorasPublicasParticipanEnContrataciones() {
    const { control } = useFormContext();
    /*
    2.- Personas servidoras pub que participan contrataciones
      - Nombre
      - AP1
      - AP2
      - Institución
      - Tipo de procedimiento (select)
    */
      const procedimientos = [ { key: 1, value: 'Contrataciones' }, { key: 2, value: 'Concesiones' }, { key: 3, value: 'Enajenaciones' }, { key: 4, value: 'Dictámenes' } ]; return (
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
        name="tipoProcedimientoContratacion"
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
            getOptionLabel={(option) => option.value}
            id="tipoSancion-autocomplete"
            onChange={(event, value) => field.onChange(value)}
            options={procedimientos}
            /* getOptionSelected={(option, value) => option === value} */
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => (
              <TextField
                error={!!error}
                helperText={error?.message}
                id="tipoProcedimientoContratacion"
                label="Tipos de Procedimiento"
                name="tipoProcedimientoContratacion"
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

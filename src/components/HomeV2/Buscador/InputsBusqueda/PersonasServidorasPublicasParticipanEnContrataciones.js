import React from "react";
import { InputLabel, FormControl, TextField, Select, MenuItem } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../ThemeV2";

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
          control={control}
          name="tipoProcedimientoContratacion"
          render={({ field }) => (
            <FormControl fullWidth={true} margin={'normal'}>
              <InputLabel id="demo-simple-select-label">Tipo de Procedimiento</InputLabel>
              <Select
                labelId="tipoProcedimientoContratacion"
                id="tipoProcedimientoContratacion"
                value={'Tipo de Procedimiento de contratación'}
                label="Tipo de Procedimiento de contratación"
                autoWidth
                {...field}
              >
                <MenuItem value={10}>Adjudicación directa</MenuItem>
                <MenuItem value={20}>Invitación restringida</MenuItem>
                <MenuItem value={30}>Licitación pública</MenuItem>
              </Select>
            </FormControl>
            
          )}
        />
      </ThemeProvider>
    );
  };

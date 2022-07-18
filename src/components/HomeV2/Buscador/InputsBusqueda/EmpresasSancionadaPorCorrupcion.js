import React from "react";
import { InputLabel, FormControl, TextField, MenuItem, Select } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../ThemeV2";

export function EmpresasSancionadaPorCorrupcion () {
    const { control } = useFormContext();
    /*
    4.- Empresas sancionadas por actos de corrupción
      - Nombre / Razón social
      - Intitución donde presto el servicio
      - Tipo de sanción (select)
    */
    return (
      <ThemeProvider theme={ThemeV2}>
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
          name="institucion"
          render={({ field }) => (
            <TextField
              id="institucion"
              label="Institución"
              variant="outlined"
              placeholder="Ingresa la institución donde presto el servicio"
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
                <MenuItem value={30}>Suspención de actividades</MenuItem>
                <MenuItem value={40}>Disolución de la sociedad</MenuItem>
                <MenuItem value={50}>Amonestación</MenuItem>
                <MenuItem value={60}>Indemnización por los daños y perjuicios ocasionados a la Hacienda Pública Federal, local o municipal, o al patrimonio de los entes públicos</MenuItem>
                <MenuItem value={70}>Sanción económica</MenuItem>
                <MenuItem value={80}>Otro</MenuItem>
              </Select>
            </FormControl>
            
          )}
        />
      </ThemeProvider>
    );
  };

import React from "react";
import { InputLabel, FormControl, TextField, MenuItem, Select, } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../ThemeV2";

export function EmpresasTienenContratosGob () {
    const { control } = useFormContext();
    /*
    5.- Empresas que tienen contratos con el gobierno
      - Nombre / Razón social
      - Bien o servicio que se otorgo al gobierno (TOOLTIP con descripción o botón informativo)
    */
    return (
      <ThemeProvider theme={ThemeV2}>
        <Controller
          control={control}
          name="empresas-contratos.supplier"
          defaultValue="SHCP"
          render={({ field }) => (
            <FormControl fullWidth={true} margin={'normal'}>
              <InputLabel>Proveedor de información</InputLabel>
              <Select
                /* value={'Tipo de contratación'} */
                label="Selecciona el proveedor de información"
                autoWidth
                {...field}
              >
                <MenuItem default value="SHCP">Secretaría de Hacienda y Crédito Público</MenuItem>
                <MenuItem value="SESEA_AGS">Secretaría Ejecutiva del Sistema Estatal Anticorrupción de Aguascalientes</MenuItem>
              </Select>
            </FormControl>
            
          )}
        />
        <Controller
          control={control}
          name="empresas-contratos.nombreRazonSocial"
          defaultValue=""
          render={({ field }) => (
            <TextField
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
          defaultValue=""
          name="empresas-contratos.bienServicioOtorgado"
          render={({ field }) => (
            <TextField
              label="Bien o servicio que se otorgo al gobierno"
              variant="outlined"
              placeholder="Ingresa el bien o servicio que se otorgo al gobierno"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </ThemeProvider>
    );
  };

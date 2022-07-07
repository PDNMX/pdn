import React from "react";
import { InputLabel, FormControl, TextField, MenuItem, Select } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";

export function InstitucionesRealizaronContrataciones() {
    const { control } = useFormContext();
    /*
    6.- Instituciones que realizan contrataciones públicas
      - Institución contratante
      - Bien o servicio que se otorgo al goobierno (TOOLTIP con descripción o botón informativo) 
      - Tipo de procedimiento de contratación (select)
    */
    return (
      <>
        <Controller
          control={control}
          name="institucionContratante"
          render={({ field }) => (
            <TextField
              id="institucionContratante"
              label="Institución contratante"
              variant="outlined"
              placeholder="Ingresa la institución contratante"
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
              label="Bien o servicio"
              variant="outlined"
              placeholder="Ingresa el bien o servicio que se otorgo al gobierno"
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
                <MenuItem value={20}>Invitación a tres</MenuItem>
                <MenuItem value={30}>Licitación pública</MenuItem>
              </Select>
            </FormControl>
            
          )}
        />
  
      </>
    );
  };
  
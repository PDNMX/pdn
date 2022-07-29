import React from "react";
import { InputLabel, FormControl, TextField, MenuItem, Select, } from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";

export function InstitucionesRealizaronContrataciones() {
  const { control } = useFormContext();
  /*
    6.- Instituciones que realizan contrataciones públicas
      - Institución contratante
      - Bien o servicio que se otorgo al goobierno (TOOLTIP con descripción o botón informativo) 
      - Tipo de procedimiento de contratación (select)
    */
  return (
    <ThemeProvider theme={ThemeV2}>
      <Controller
        control={control}
        name="instituciones-contrataciones.supplier"
        defaultValue="SHCP"
        render={({ field }) => (
          <FormControl fullWidth={true} margin={"normal"}>
            <InputLabel>Proveedor de información</InputLabel>
            <Select
              /* value={'Tipo de contratación'} */
              label="Selecciona el proveedor de información"
              autoWidth
              {...field}
            >
              <MenuItem default value="SHCP">
                Secretaría de Hacienda y Crédito Público
              </MenuItem>
              <MenuItem value="SESEA_AGS">
                Secretaría Ejecutiva del Sistema Estatal Anticorrupción de
                Aguascalientes
              </MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="instituciones-contrataciones.institucionContratante"
        defaultValue=""
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
        name="instituciones-contrataciones.bienServicioOtorgado"
        defaultValue=""
        render={({ field }) => (
          <TextField
            id="bienServicioOtorgado"
            label="Bien, servicio u obra pública"
            variant="outlined"
            placeholder="Ingresa el bien, servicio u obra pública que se otorgo al gobierno"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="instituciones-contrataciones.tipoContratacion"
        defaultValue="any"
        render={({ field }) => (
          <FormControl fullWidth={true} margin={"normal"}>
            <InputLabel>Tipo de Procedimiento</InputLabel>
            <Select
              /* value={'Tipo de contratación'} */
              label="Tipo de contratación"
              fullWidth
              {...field}
            >
              <MenuItem value="any">
                <em>Cualquiera</em>
              </MenuItem>
              <MenuItem value="direct">Adjudicación directa</MenuItem>
              <MenuItem value="selective">Invitación a tres</MenuItem>
              <MenuItem value="open">Licitación pública</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </ThemeProvider>
  );
}

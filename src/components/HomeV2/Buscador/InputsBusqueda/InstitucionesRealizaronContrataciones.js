import React from "react";
import {
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
  Select,
} from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";
import Fade from "@mui/material/Fade";
import Autocomplete from "@mui/material/Autocomplete";

import CircularProgress from "@mui/material/CircularProgress";

const KEY = "pdn.camposBusqueda";
const axios = require("axios");

export function InstitucionesRealizaronContrataciones() {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const storedCampos = JSON.parse(localStorage.getItem(KEY));
  const [supplier, setSupplier] = React.useState("SHCP");

  let tempInstitucion = null;

  if (
    storedCampos &&
    storedCampos["instituciones-contrataciones"]["buyer_name"] &&
    storedCampos["instituciones-contrataciones"]["buyer_name"]  !== null &&
    storedCampos["instituciones-contrataciones"]["buyer_name"]  !== ""
  ) {
    tempInstitucion = storedCampos["instituciones-contrataciones"]["buyer_name"];
  }
  const [valueInstitucion, setValueInstitucion] = React.useState(
    tempInstitucion
  );

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    /* if (valueInstitucion === "") {
      setOptions(valueInstitucion ? [valueInstitucion] : []);
      return undefined;
    } */
    //const supplierSelected = document.querySelector("input[name='instituciones-contrataciones.supplier']").value;

    (async () => {
      if (active) {
        let sug = [];
        let options = {
          url: process.env.REACT_APP_S6_BACKEND +'/api/v1/buyers',
          params: {
            supplier_id: supplier
          },
          json: true,
          method: "GET",
        };

        axios(options)
          .then((data) => {
            data.data.forEach((item, index) => {
              if (item.name){
                //console.log(item)
                sug.push({ ...item, key: index });
              }
            });
            setOptions([...sug]);
          })
          .catch((err) => {
            //setError(true);
          });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    
  }, [valueInstitucion]);

  /*
    6.- Instituciones que realizan contrataciones públicas
      - Institución contratante
      - Bien o servicio que se otorgo al goobierno (TOOLTIP con descripción o botón informativo) 
      - Tipo de procedimiento de contratación (select)
  */
     
  return (
    <Fade in={true} timeout={1200}>
      <div>
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
                  fullWidth                  
                  {...field}
                  onChange={(e)  => {
                    setValueInstitucion(null);
                    setOptions([]);
                    setSupplier(e.target.value);
                    field.onChange(e);
                  }}
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
            name="instituciones-contrataciones.buyer_name"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Autocomplete
                {...field}
                id="buyer_Name"
                open={open}
                value={valueInstitucion || null}
                onOpen={() => { setOpen(true); }}
                onClose={() => { setOpen(false); }}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.name === value.name
                }
                options={options}
                loading={loading}
                onChange={(e, newValue) => {
                  //console.log(newValue, newValue);
                  setOptions(newValue ? [newValue, ...options] : options);
                  setValueInstitucion(newValue);
                  field.onChange(newValue);
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.key}>
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin={"normal"}
                    label="Institución contratante"
                    placeholder="Ingresa la institución contratante"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
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
                  {...field}
                >
                  <MenuItem default value="any">
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
      </div>
    </Fade>
  );
}

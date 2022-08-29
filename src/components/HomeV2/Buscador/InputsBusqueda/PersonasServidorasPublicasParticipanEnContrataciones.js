import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";
import Autocomplete from "@mui/material/Autocomplete";

import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

const KEY = "pdn.camposBusqueda";
const axios = require("axios");

export function PersonasServidorasPublicasParticipanEnContrataciones() {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

const storedCampos = JSON.parse(localStorage.getItem(KEY));

//console.log(storedCampos["psp-participan"]["institucionS2"]["nombre"]);

  let tempInstitucion = null

  if (storedCampos && storedCampos["psp-participan"]["institucionS2"] && storedCampos["psp-participan"]["institucionS2"] !== null && storedCampos["psp-participan"]["institucionS2"]["nombre"]) {
    tempInstitucion = storedCampos["psp-participan"]["institucionS2"]["nombre"]
  } 
  const [valueInstitucion, setValueInstitucion] = React.useState(tempInstitucion);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    /* if (valueInstitucion === "") {
      setOptions(valueInstitucion ? [valueInstitucion] : []);
      return undefined;
    } */

    (async () => {
      if (active) {
        let sug = [];
        let options = {
          url: "https://raw.githubusercontent.com/PDNMX/bulk-generator/main/Reporte%20de%20validador%20de%20buscador/reporte_s2.json",
          json: true,
          method: "GET",
        };

        axios(options)
          .then((data) => {
            data.data.forEach((item, index) => {
              if (item.nombre){
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
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  /*
    2.- Personas servidoras pub que participan contrataciones
      - Nombre
      - AP1
      - AP2
      - Institución
      - Tipo de procedimiento (select)
    */
  const procedimientos = [
    { key: 1, value: "Contrataciones" },
    { key: 2, value: "Concesiones" },
    { key: 3, value: "Enajenaciones" },
    { key: 4, value: "Dictámenes" },
  ];
  return (
    <Fade in={true} timeout={1200}>
      <div>
        <ThemeProvider theme={ThemeV2}>
          <Controller
            control={control}
            name="psp-participan.nombres"
            defaultValue=""
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
            name="psp-participan.primerApellido"
            defaultValue=""
            render={({ field }) => (
              <TextField
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
            name="psp-participan.segundoApellido"
            defaultValue=""
            render={({ field }) => (
              <TextField
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
            name="psp-participan.institucionS2"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Autocomplete
                {...field}
                open={open}
                value={valueInstitucion || null}
                onOpen={() => { setOpen(true); }}
                onClose={() => { setOpen(false); }}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.nombre
                }
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.nombre === value.nombre
                }
                options={options}
                loading={loading}
                onChange={(e, newValue) => {
                  //console.log(newValue, newValue);
                  setOptions(newValue ? [newValue, ...options] : options);
                  setValueInstitucion(newValue);
                  field.onChange(newValue);
                }}
                /* onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }} */
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.key}>
                      {option.nombre}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin={"normal"}
                    label="Institución"
                    placeholder="Ingresa la Institución"
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
            name="psp-participan.tipoProcedimientoContratacion"
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
                onChange={(e, value) => field.onChange(value)}
                options={procedimientos}
                /* getOptionSelected={(option, value) => option === value} */
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    margin={"normal"}
                    error={!!error}
                    helperText={error?.message}
                    label="Tipos de Procedimiento"
                    type="Buscar"
                    inputRef={ref}
                    {...params}
                  />
                )}
              />
            )}
          />
        </ThemeProvider>
      </div>
    </Fade>
  );
}

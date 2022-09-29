import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";

import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

const KEY = "pdn.camposBusqueda";
const axios = require("axios");

export function PersonasServidorasPublicasSancionados() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const storedCampos = JSON.parse(localStorage.getItem(KEY));
  let tempInstitucion = null
  if (storedCampos && storedCampos["psp-sancionados"]["institucion"] && storedCampos["psp-sancionados"]["institucion"] !== null && storedCampos["psp-sancionados"]["institucion"]["nombre"]) {
    tempInstitucion = storedCampos["psp-sancionados"]["institucion"]["nombre"]
  } 
  const [valueInstitucion, setValueInstitucion] = React.useState(tempInstitucion);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        let sug = [];
        let options = {
          url: "https://raw.githubusercontent.com/PDNMX/bulk-generator/main/Reporte%20de%20validador%20de%20buscador/reporte_s3s.json",
          json: true,
          method: "GET"
        };

        axios(options)
          .then((data) => {
            data.data.forEach((item, index) => {
              /* console.log(index) */
              if (item.nombre && item.status === true){
                //console.log(item)
                sug.push({ ...item, key: index });
              }
              //sug.push({ value: item.nombre, label: item.nombre, key: index });
            });
            /* console.log(sug) */
            setOptions([...sug]);
          })
          .catch((err) => {
            console.log(err);
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

  const { control } = useFormContext();
  const tiposSancion = [
    { label: "Inhabilitado", value: "I" },
    { label: "Multado", value: "M" },
    { label: "Suspensión del empleo, cargo o comisión", value: "S" },
    { label: "Destitución del empleo, cargo o comisión", value: "D" },
    { label: "Indemnización resarcitoria", value: "IRSC" },
    { label: "Sanción económica", value: "SE" },
    { label: "Otro", value: "O" },
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
    <Fade in={true} timeout={1200}>
      <div>
        <ThemeProvider theme={ThemeV2}>
          <Controller
            control={control}
            name="psp-sancionados.nombres"
            defaultValue=""
            render={({ field }) => (
              <TextField
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
            name="psp-sancionados.primerApellido"
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
            name="psp-sancionados.segundoApellido"
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
            name="psp-sancionados.institucion"
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
            name="psp-sancionados.tipoSancion"
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
                onChange={(e, value) => field.onChange(value)}
                options={tiposSancion}
                /* getOptionSelected={(option, value) => option === value} */
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                renderInput={(params) => (
                  <TextField
                    margin={"normal"}
                    error={!!error}
                    helperText={error?.message}
                    label="Tipos de Sanción"
                    placeholder="Ingresa el Tipo de Sanción"
                    name="psp-sancionados.tipoSancion"
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

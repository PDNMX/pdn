import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";

/* import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
const axios = require("axios");
 */
export function PersonasServidorasPublicasYSusDeclaraciones() {
  const { control } = useFormContext();
  /*     const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        if (active) {
          let sug = [];
          let options = {
            url: process.env.REACT_APP_S2_BACKEND + "/api/v1/entities",
            json: true,
            method: "POST",
            data: {}
          };
  
          axios(options)
            .then((data) => {
              data.data.forEach((item, index) => {
                sug.push({ value: item.nombre, label: item.nombre, key: index });
              });
              //console.log(data.data)
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
    }, [open]); */
  /*
    3.- Personas servidoras pub y declaraciones patri
      - Nombre
      - AP1
      - AP2
      - Institución
      - Empleo, cargo, comisión
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
      {/* <Controller
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
        /> */}
      {/*         <Controller
        name="institucion"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="institucion"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={null}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            options={options}
            loading={loading}
            onChange={(e, value) => field.onChange(value.value)}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.key}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
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
      /> */}

      <Controller
        control={control}
        name="empleoCargoComision"
        render={({ field }) => (
          <TextField
            id="empleoCargoComision"
            label="Empleo, cargo o comisión"
            variant="outlined"
            placeholder="Ingresa el empleo, cargo o comisión"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </ThemeProvider>
  );
}

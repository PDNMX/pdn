import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";
import Autocomplete from "@mui/material/Autocomplete";

import CircularProgress from "@mui/material/CircularProgress";

const axios = require("axios");

export function PersonasServidorasPublicasParticipanEnContrataciones() {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);
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
        name="psp-participan.institucion"
        control={control}
        defaultValue=""
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
            /* getOptionLabel={(option) => option.label} */
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
  );
}

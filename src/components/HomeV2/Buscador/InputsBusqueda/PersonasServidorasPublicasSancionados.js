import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../../../ThemeV2";

import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const axios = require("axios");

export function PersonasServidorasPublicasSancionados() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  /* const [institutionsList, setInstitutionsList] = React.useState([]); */
  /* const [error, setError] = React.useState(false);
  const [filter, setFilter] = React.useState(); */

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3); // For demo purposes.

      if (active) {
        //setOptions([...topFilms]);
        let sug = [];
        let options = {
          url: process.env.REACT_APP_S3S_BACKEND + "/api/v1/entities",
          json: true,
          method: "post",
          data: {},
        };

        axios(options)
          .then((data) => {
            data.data.forEach((item, index) => {
              /* console.log(index) */
              sug.push({ value: item.nombre, label: item.nombre, key: index });
            });
            console.log(sug)
            setOptions([...sug]);
            /* setInstitutionsList(sug);
                setFilter({...filter, institucionDependencia: 'any'}); */
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
    <ThemeProvider theme={ThemeV2}>
      <Controller
        control={control}
        name="test.nombres"
        render={({ field }) => (
          <TextField
            id="test.nombres"
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
      <Controller
        name="institucion"
        control={control}
        /* defaultValue={''} */
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="institucion"
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            value={null}
            isOptionEqualToValue={(option, value) => option.value === value.value}
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
                      {loading ? ( <CircularProgress color="inherit" size={20} /> ) : null}
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
        name="tipoSancion"
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
            id="tipoSancion-autocomplete"
            onChange={(event, value) => field.onChange(value)}
            options={tiposSancion}
            /* getOptionSelected={(option, value) => option === value} */
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField
                error={!!error}
                helperText={error?.message}
                id="tipoSancion"
                label="Tipos de Sanción"
                placeholder="Ingresa el Tipo de Sanción"
                name="tipoSancion"
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

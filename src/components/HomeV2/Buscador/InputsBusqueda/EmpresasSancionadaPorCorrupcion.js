import React from "react";
import { TextField } from "@mui/material/";
import { Controller, useFormContext, } from "react-hook-form";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../ThemeV2";
import Autocomplete from '@mui/material/Autocomplete';

import CircularProgress from "@mui/material/CircularProgress";
const axios = require("axios");

export function EmpresasSancionadaPorCorrupcion () {
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
          url: process.env.REACT_APP_S3P_BACKEND + '/api/v1/entities',
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
    4.- Empresas sancionadas por actos de corrupción
      - Nombre / Razón social
      - Intitución donde presto el servicio
      - Tipo de sanción (select)
    */
    const tiposSancion = [
      {label: 'Inhabilitado', value: 'I'},
      {label: 'Multado', value: 'M'},
      {label: 'Suspensión de actividades', value: 'S'},
      {label: 'Disolución de la sociedad', value: 'D'},
      {label: 'Amonestación', value: 'A'},
      {label: 'Indemnización por los daños y perjuicios ocasionados a la Hacienda Pública Federal, local o municipal, o al patrimonio de los entes públicos', value: 'IND' },
      {label: 'Sanción económica', value: 'SE'},
      {label: 'Otro', value: 'O'}
    ]
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
  
        {/* <Controller
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
                label="Institución donde presto el servicio"
                placeholder="Ingresa la institución donde presto el servicio"
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
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderInput={(params) => (
              <TextField
                error={!!error}
                helperText={error?.message}
                id="tipoSancion"
                label="Tipos de Sanción"
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
  };

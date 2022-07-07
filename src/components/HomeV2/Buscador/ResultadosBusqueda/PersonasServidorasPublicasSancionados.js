import React from "react";
//import { InputLabel, FormControl, TextField, Select, MenuItem } from "@mui/material/";
//import { useFormContext, } from "react-hook-form";

export function ResultadosPersonasServidorasPublicasSancionados(props) {
    //const { control } = useFormContext();
    let data = props.data;
    /*
    1.- Servidores publicos sancionados
      - Nombre
      - AP1
      - AP2
      - Institución
      - Tipo de sanción (select)
    */
    return (
      <>
        <p>{data}</p><br/>
      </>
    );
  };

import React from "react";
//import { InputLabel, FormControl, TextField, Select, MenuItem } from "@mui/material/";
//import { useFormContext, } from "react-hook-form";

export function ResultadosPersonasServidorasPublicasSancionados(props) {
    //const { control } = useFormContext();
    let data = JSON.parse(props.data);
    //console.log(data);
    return (
      <>
        <p>{data.tipoBusqueda}</p><br/>
      </>
    );
  };

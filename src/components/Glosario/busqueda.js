import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

const glosarioData = process.env.REACT_APP_GLOSARIO;

export default function Busqueda() {
  const [palabras, setPalabras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPalabras, setFilteredPalabras] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(glosarioData)
      .then((res) => {
        res.data.values.shift();
        setPalabras(res.data.values);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredPalabras(
      palabras.filter((text) =>
        //text.gsx$palabra.$t.toLowerCase().includes(search.toLowerCase());
        // busca al inicio del string
        text[0].toLowerCase().startsWith(search.toLowerCase(''))
      )
    );

  }, [search, palabras]);

  if (loading) {
    return <p>Cargando Información...</p>;
  }

  const abecedario = ['a','b','c','ch','d','e','f','g','h','i','j','k','l','ll','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
  return (
    <div>
      <TextField
        //clearable
        style={{ width: '100%' }}
        type="text"
        value={search}
        placeholder="Escribe la letra o palabra a buscar"
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => {
                setSearch('')
                }}>
              <ClearIcon />
            </IconButton>
          )
        }}
        /* InputAdornmentProps={{
          position: "start"
        }} */
      />
      
      <br/>
      <br/>
      <Typography style={{ wordWrap: "break-word" }}  >      
        {abecedario.map((palabra, index) => {
          return <Link key={index} style={{ marginRight: 16 }}  href={palabra} onClick={(e) => { e.preventDefault(); setSearch(palabra)} }><b>{palabra}</b></Link>;
        })}
      </Typography>
      <br/>
      <Divider />
      <br/>
      {filteredPalabras.length === 0 ? <Typography><i>Sin resultados</i></Typography> : filteredPalabras.map((queryString, idx) => ( <ResultDetail key={idx} {...queryString} /> ))}
    </div>
  );
}

const ResultDetail = (props) => {
    return (
        <>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography variant="body1">
                {props[1]}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body2">
                <i><b>Fuente: </b>{props[2]}</i>
              </Typography>
            </Grid>
          </Grid>
          

        </AccordionDetails>
        </Accordion>
        </>
    );
};




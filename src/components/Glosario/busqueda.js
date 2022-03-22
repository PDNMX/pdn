import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

const glosarioData = process.env.REACT_APP_GLOSARIO;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    background: '#f5f8fb',
  },
  abecedario: {
    wordWrap: "break-word", 
    color: theme.palette.background.opaque
  },
  palabra: {
    wordWrap: "break-word", 
    background: '#f5f8fb',
  },
  text: {
    color: '#55575a'
  }
}));

export default function Busqueda() {
  const [palabras, setPalabras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPalabras, setFilteredPalabras] = useState([]);
  const classes = useStyles();

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
            <IconButton
              onClick={() => {
                  setSearch('')
                  }}
              size="large">
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
      <Typography style={{ wordWrap: "break-word"}} >      
        {abecedario.map((palabra, index) => {
          return <Link key={index} className={classes.abecedario} style={{ marginRight: 16 }}  href={palabra} onClick={(e) => { e.preventDefault(); setSearch(palabra)} }><b>{palabra}</b></Link>;
        })}
      </Typography>
      <br/>
      <Divider />
      <br/>
      {filteredPalabras.length === 0 ? <Typography className={classes.text}><i>Sin resultados</i></Typography> : filteredPalabras.map((queryString, idx) => ( <ResultDetail className={classes.palabra} key={idx} {...queryString} /> ))}
    </div>
  );
}

const ResultDetail = (props) => {
    const classes = useStyles();
    return (
        <>
        <Accordion className={classes.palabra}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.text}>{props[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography className={classes.text} variant="body1">
                {props[1]}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography className={classes.text} variant="body2">
                <i><b>Fuente: </b>{props[2]}</i>
              </Typography>
            </Grid>
          </Grid>
          

        </AccordionDetails>
        </Accordion>
        </>
    );
};




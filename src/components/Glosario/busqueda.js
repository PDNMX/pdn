import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
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
        setPalabras(res.data.feed.entry);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredPalabras(
      palabras.filter((country) =>
        //country.gsx$palabra.$t.toLowerCase().includes(search.toLowerCase());
        // busca al inicio del string
        country.gsx$palabra.$t.toLowerCase().startsWith(search.toLowerCase(''))
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
        clearable
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
        InputAdornmentProps={{
          position: "start"
        }}
      />
      
      <br/>
      <br/>
      <Typography style={{ wordWrap: "break-word" }}  >      
        {abecedario.map(palabra => {
          return <Link style={{ marginRight: 16 }}  href={palabra} onClick={(e) => { e.preventDefault(); setSearch(palabra)} }><b>{palabra}</b></Link>;
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
    const { gsx$palabra, gsx$descripción, gsx$fuente } = props;
    return (
        <>
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{gsx$palabra.$t}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography variant="body1">
                {gsx$descripción.$t}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body2">
                <i><b>Fuente: </b>{gsx$fuente.$t}</i>
              </Typography>
            </Grid>
          </Grid>
          

        </ExpansionPanelDetails>
        </ExpansionPanel>
        </>
    );
};




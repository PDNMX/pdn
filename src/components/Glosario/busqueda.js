import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

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
        country.gsx$palabra.$t.toLowerCase().startsWith(search.toLowerCase())
      )
    );

  }, [search, palabras]);

  if (loading) {
    return <p>Cargando Información...</p>;
  }
  return (
    <div>
      <TextField
        clearable
        type="text"
        value={search}
        placeholder="Escribe la palabra a buscar"
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
      {/* <a href='a' onClick={(e) => {
          e.preventDefault();
          setSearch('abuso')}
          }>
              A
      </a>
      <br/>
      <br/> */}
      <Divider />
      <br/>
      {filteredPalabras.map((country, idx) => (
        <ResultDetail key={idx} {...country} />
      ))}
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
          <Typography>
            {gsx$descripción.$t}
          </Typography>
          {/* <br/>
          <br/>
          <Typography>
          {gsx$fuente.$t}
          </Typography> */}
        </ExpansionPanelDetails>
        </ExpansionPanel>
        </>
    );
};




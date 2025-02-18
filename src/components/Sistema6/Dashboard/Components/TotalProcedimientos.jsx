// Components/TotalProcedimientos.jsx
import React from 'react';
import { Paper, Typography, Box, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';
import { Business } from '@mui/icons-material';

const styles = theme => ({
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(0deg, hsla(197, 58%, 53%, .3) 43%, hsla(197, 83%, 66%, .8) 100%)',
    color: theme.palette.primary.contrastText
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2)
  },
  number: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  }
});

const TotalProcedimientos = ({ 
  classes, 
  totalCases, 
  selectedState, 
  setSelectedState, 
  estados 
}) => {
  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <Paper className={classes.paper} elevation={3}>


      <Business className={classes.icon} />
      <Typography variant="h6" gutterBottom>
        Total de Procedimientos
      </Typography>
      <Box className={classes.number}>
        <CountUp end={totalCases} separator="," duration={2.5} />
      </Box>

      <FormControl className={classes.formControl}>
        <InputLabel id="estado-select-label">
          Selecciona el estado que deseas consultar
        </InputLabel>
        <Select
          labelId="estado-select-label"
          value={selectedState}
          onChange={handleChange}
          label="Selecciona el estado que deseas consultar"
        >
          <MenuItem value="todos">Todos los Estados</MenuItem>
          {estados.map((estado) => (
            <MenuItem value={estado.id} key={estado.id}>
              {estado.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default withStyles(styles)(TotalProcedimientos);
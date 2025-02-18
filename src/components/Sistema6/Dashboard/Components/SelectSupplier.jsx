// Components/SelectSupplier.jsx
import React from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  formControl: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

const SelectSupplier = ({ classes, selectedState, setSelectedState, estados }) => {
  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default withStyles(styles)(SelectSupplier);
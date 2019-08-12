import React, { Component } from "react";

import {
  TextField,
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  MenuItem,
  Button,
  FormLabel,
  RadioGroup
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

import * as ConstClass from "../ConstValues.js";

class BusquedaFromMaterialUI extends Component {
  state = {
    names: "",
    surname_a: "",
    office: "",
    nivel: ""
  };

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.root} style={{ marginBottom: 30 }}>
        <form onSubmit={this.searchUsers}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                style={{ width: "100%" }}
                id="standard-select-currency"
                select
                label="Institución"
                className={classes.textField}
                value={this.state.office}
                onChange={this.handleInputChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  },
                  name: "office",
                  id: "age-simple"
                }}
                margin="normal"
                fullWidth
              >
                <MenuItem value="">Todos</MenuItem>
                {ConstClass.OFICINAS.map((d, i) => (
                  <MenuItem key={"oficina-" + i} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="mui-name"
                label="Nombres"
                value={this.state.names}
                className={classes.textField}
                name="names"
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="mui-surname_a"
                name="surname_a"
                value={this.state.surname_a}
                className={classes.textField}
                onChange={this.handleInputChange}
                label="Primer apellido"
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Nivel de gobierno:</FormLabel>
                <RadioGroup
                  aria-label="nivel"
                  name="nivel"
                  className={classes.group}
                  value={this.state.nivel}
                  onChange={this.handleInputChange}
                  row
                >
                  <FormControlLabel
                    value=""
                    control={<Radio color="primary" />}
                    label="Todos"
                  />
                  <FormControlLabel
                    value="FED"
                    control={<Radio color="primary" />}
                    label="Federal"
                  />
                  <FormControlLabel
                    value="EST"
                    control={<Radio color="primary" />}
                    label="Estatal"
                  />
                  <FormControlLabel
                    value="MUN"
                    control={<Radio color="primary" />}
                    label="Municipal"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }

  /*
  
  /
  /  pasa los argumentos de la búsqueda a una 
  /  función que llama al api de búsqueda 
  /  (definidia en Busqueda, el parent)
  /
  
  */
  searchUsers = event => {
    event.preventDefault();
    this.props.getUsers(this.state);
  };

  /*
  
  /
  /  genera una sola "source of truth" para los 
  /  valores del formulario. En vue es lo de 
  /  v-model
  /
  
  */
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
}

export default withStyles(styles)(BusquedaFromMaterialUI);

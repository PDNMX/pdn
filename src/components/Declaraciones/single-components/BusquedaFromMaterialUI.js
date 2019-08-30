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
      <form onSubmit={this.searchUsers}>
        <Grid
          container
          spacing={0}
          className={classes.root}
          style={{ marginBottom: 30 }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-select-currency"
              select
              label="Institución"
              className={classes.textField}
              value={this.state.office}
              onChange={this.handleInputChange}
              SelectProps={{
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
            {/* <FormControl className={classes.formControl}>
              <InputLabel htmlFor={"office"}>Institución</InputLabel>
              <Select
                style={{ marginTop: "0px" }}
                value={this.state.office}
                onChange={this.handleInputChange}
                inputProps={{
                  name: "office",
                  id: "age-simple"
                }}
              >
                {ConstClass.OFICINAS.map((d, i) => {
                  return (
                    <MenuItem key={"oficina-" + i} value={d}>
                      {d}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}
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
              InputLabelProps={{
                className: classes.inputShrink,
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="mui-surname_a"
              name="surname_a"
              value={this.state.surname_a}
              className={classes.textField}
              onChange={this.handleInputChange}
              label="Apellido uno"
              margin="normal"
              fullWidth
              InputLabelProps={{
                className: classes.inputShrink,
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Nivel:</FormLabel>
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
                  control={<Radio color="secondary" />}
                  label="Todos"
                />
                <FormControlLabel
                  value="FED"
                  control={<Radio color="secondary" />}
                  label="Federal"
                />
                <FormControlLabel
                  value="EST"
                  control={<Radio color="secondary" />}
                  label="Entidades federativas"
                />
                <FormControlLabel
                  value="MUN"
                  control={<Radio color="secondary" />}
                  label="Municipal"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <br />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
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

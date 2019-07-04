/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";

import {
  Typography,
  TextField,
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";

import * as ConstClass from "../ConstValues.js";
/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class BusquedaFromMaterialUI extends Component {
  state = {
    names: "",
    surname_a: "",
    office: "",
    nivel: ""
  };

  render() {
    return (
      <form onSubmit={this.searchUsers}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="mui-name"
              label="Nombres"
              value={this.state.names}
              name="names"
              onChange={this.handleInputChange}
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="mui-surname_a"
              name="surname_a"
              value={this.state.surname_a}
              onChange={this.handleInputChange}
              label="Primer apellido"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="age-simple">Oficina</InputLabel>
              <Select
                style={{ paddingTop: 15 }}
                value={this.state.office}
                onChange={this.handleInputChange}
                inputProps={{
                  name: "office",
                  id: "age-simple"
                }}
              >
                <MenuItem value="">
                  <em>Selecciona una oficina</em>
                </MenuItem>
                $
                {ConstClass.OFICINAS.map((d, i) => (
                  <MenuItem key={"oficina-" + i} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={8}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"> Nivel de gobierno:</Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      value=""
                      control={
                        <Radio
                          checked={this.state.nivel === ""}
                          name="nivel"
                          onChange={this.handleInputChange}
                        />
                      }
                      label="Todos"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      value="FED"
                      control={
                        <Radio
                          checked={this.state.nivel === "FED"}
                          name="nivel"
                          onChange={this.handleInputChange}
                        />
                      }
                      label="Federal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      value="EST"
                      control={
                        <Radio
                          checked={this.state.nivel === "EST"}
                          name="nivel"
                          onChange={this.handleInputChange}
                        />
                      }
                      label="Estatal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      value="MUN"
                      control={
                        <Radio
                          checked={this.state.nivel === "MUN"}
                          name="nivel"
                          onChange={this.handleInputChange}
                        />
                      }
                      label="Municipal"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  pasa los argumentos de la búsqueda a una 
  /  función que llama al api de búsqueda 
  /  (definidia en Busqueda, el parent)
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  searchUsers = event => {
    event.preventDefault();
    this.props.getUsers(this.state);
  };

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  genera una sola "source of truth" para los 
  /  valores del formulario. En vue es lo de 
  /  v-model
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
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

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default BusquedaFromMaterialUI;

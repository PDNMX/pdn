/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles, lighten } from "@material-ui/core/styles";
import styles from "../style";

import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 19,
    backgroundColor: lighten("#808080", 0.5)
  },
  bar: {
    borderRadius: 20
  }
})(LinearProgress);
/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class ActivosBienesMueblesNoRegistrables extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.activos.bienes_muebles_no_registrables.map(
      d => {
        // let item = d;
        d.show = true;

        return d;
      }
    );

    this.state = {
      items: elems
    };

    this.toggl = this.toggl.bind(this);
  }
  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>
              Bienes muebles no registrables ({this.items().length})
            </strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((mueble, i) => (
              <Grid item xs={12} md={6} key={"mueble-" + i}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.tituloFondo}>
                      Declarante
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Tipo de bien
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {mueble.tipo_bien.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Precio de adquisición
                            </Typography>
                            <Typography className={classes.dataCard}>
                              ${mueble.precio_adquisicion.valor}{" "}
                              {mueble.precio_adquisicion.moneda.codigo}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Descripción
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {mueble.descripcion}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de adquisición
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {mueble.fecha_adquisicion}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Forma de adquisición
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {mueble.forma_adquisicion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de operación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {mueble.tipo_operacion.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Relación con la persona que lo adquirio
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {mueble.relacion_quien_adquirio.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Porcentaje de la propiedad
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {mueble.porcentaje_propiedad}%
                              <BorderLinearProgress
                                className={classes.marginProgressbar}
                                variant="determinate"
                                color="primary"
                                value={mueble.porcentaje_propiedad}
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */
  toggl(item, index, e) {
    console.log(item, index, e);

    let items = this.state.items,
      newItems = items.map(d => {
        if (item === d) {
          d.show = !item.show;
        }

        return d;
      });

    this.setState({ items: newItems });
  }
  items() {
    return this.props.profile.activos.bienes_muebles_no_registrables;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(ActivosBienesMueblesNoRegistrables);

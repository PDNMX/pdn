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

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";
/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class IngresosActividadEconomica extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.ingresos.actividad_economica_menor.map(d => {
      // let item = d;
      d.show = true;

      return d;
    });

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
            <strong>Actividad económica menor ({this.items().length})</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((sueldo, i) => (
              <Grid item xs={12} md={6} key={"sueldo-" + i}>
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
                              Tipo de actividad o servicio
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {sueldo.tipo_actividad_servicio.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Ingreso bruto anual
                            </Typography>
                            <Typography className={classes.dataCard}>
                              ${sueldo.ingreso_bruto_anual.valor}{" "}
                              {sueldo.ingreso_bruto_anual.moneda.codigo}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Sector o industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {sueldo.sector_industria.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Duración / frecuencia
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {sueldo.ingreso_bruto_anual.duracion_frecuencia}{" "}
                              {sueldo.ingreso_bruto_anual.unidad_temporal.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de transacción
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {sueldo.ingreso_bruto_anual.fecha_transaccion}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Descripción de actividad o servicio
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {sueldo.descripcion_actividad_servicio}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {sueldo.observaciones}
                        </Typography>
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
    return this.props.profile.ingresos.actividad_economica_menor;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(IngresosActividadEconomica);

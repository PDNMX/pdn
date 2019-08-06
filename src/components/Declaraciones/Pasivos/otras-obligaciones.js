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
class PasivosObligaciones extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.pasivos.otras_obligaciones.map(d => {
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
            <strong>Otras obligaciones ({this.items().length})</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((pasivo, i) => (
              <Grid item xs={12} md={6} key={"pasivo-" + i}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansion}
                  >
                    <Typography>Declarante</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.expansionpaneldetails}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de obligación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.tipo_obligacion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Monto original
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {new Intl.NumberFormat("es-MX", {
                                style: "currency",
                                currency: "MXN"
                              }).format(pasivo.monto_original)}{" "}
                              {pasivo.tipo_moneda.codigo}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Saldo pendiente
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {new Intl.NumberFormat("es-MX", {
                                style: "currency",
                                currency: "MXN"
                              }).format(pasivo.saldo_pendiente)}{" "}
                              {pasivo.tipo_moneda.codigo}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de acreedor
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.tipo_acreedor.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tasa de interés
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.tasa_interes}%
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de obligación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.fecha_obligacion}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              País
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.nacional_extranjero.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Sector o industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.sector_industria.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de operación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.tipo_operacion.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={3}>
                            <Typography className={classes.tituloCard}>
                              Garantía
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.garantia ? "Sí" : "No"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.tituloCard}>
                              Porcentaje de obligación del titular
                            </Typography>
                            <Typography
                              component="div"
                              className={classes.dataCard}
                            >
                              {pasivo.porcentaje_obligacion_titular}%
                              <BorderLinearProgress
                                className={classes.marginProgressbar}
                                variant="determinate"
                                color="primary"
                                value={pasivo.porcentaje_obligacion_titular}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.tituloCard}>
                              Plazo del obligación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.plazo_obligacion +
                                " " +
                                pasivo.unidad_medida_plazo.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.tituloCard}>
                              Montos abonados
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {pasivo.montos_abonados.map((monto, j) => (
                                <span key={"monto-" + j}>
                                  {new Intl.NumberFormat("es-MX", {
                                    style: "currency",
                                    currency: "MXN"
                                  }).format(monto)}{" "}
                                  <br />
                                </span>
                              ))}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {pasivo.observaciones}
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
    return this.props.profile.pasivos.otras_obligaciones;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(PasivosObligaciones);

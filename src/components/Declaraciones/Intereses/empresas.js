/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Grid, Typography } from "@material-ui/core";
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
class InteresesEmpresas extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.intereses.empresas_sociedades_asociaciones.map(
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
              Empresas, sociedades o asociaciones ({this.items().length})
            </strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((interes, i) => (
              <Grid item xs={12} md={6} key={"interes-" + i}>
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
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Nombre de la empresa, sociedad o asociación
                            </Typography>
                            <Typography className={classes.dataCard}>
                              <strong>
                                {interes.nombre_empresa_sociedad_asociacion}
                              </strong>
                              <br />
                              {interes.domicilio.vialidad.tipo_vial +
                                " " +
                                interes.domicilio.vialidad.nom_vial +
                                " No." +
                                interes.domicilio.numExt +
                                " No. Int." +
                                interes.domicilio.numInt}
                              <br />{" "}
                              {interes.domicilio.localidad.nom_loc +
                                ", " +
                                interes.domicilio.municipio.nom_mun +
                                ", " +
                                interes.domicilio.entidad_federativa.nom_agee +
                                ", " +
                                interes.domicilio.pais.valor +
                                " C.P. " +
                                interes.domicilio.cp}{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de constitución
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.fecha_constitucion}
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
                              {interes.pais_registro.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              R.F.C.
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.rfc}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Número de registro
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.numero_registro}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Rol
                            </Typography>
                            <Typography className={classes.dataCard}>
                              <strong>{interes.rol}</strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Actividad económica
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.actividad_economica ? "Sí" : "No"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <Typography className={classes.tituloCard}>
                                Porcentaje de participación
                              </Typography>
                              <Typography
                                component="div"
                                className={classes.dataCard}
                              >
                                {interes.porcentaje_participacion}%
                                <BorderLinearProgress
                                  className={classes.marginProgressbar}
                                  variant="determinate"
                                  color="primary"
                                  value={interes.porcentaje_participacion}
                                />
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography className={classes.tituloCard}>
                                Sector o industria
                              </Typography>
                              <Typography className={classes.dataCard}>
                                {interes.sector_industria.valor}
                              </Typography>
                            </Grid>
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
    return this.props.profile.intereses.empresas_sociedades_asociaciones;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(InteresesEmpresas);

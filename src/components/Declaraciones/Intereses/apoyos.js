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
class InteresesApoyos extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.intereses.apoyos_beneficios_publicos.map(
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
            <strong>Apoyos ({this.items().length})</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((interes, i) => (
              <Grid item xs={12} md={6} key={"interes-" + i}>
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
                              Programa
                            </Typography>
                            <Typography className={classes.dataCard}>
                              <strong>{interes.programa}</strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Valor anual del apoyo
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {new Intl.NumberFormat("es-MX", {
                                style: "currency",
                                currency: "MXN"
                              }).format(interes.valor_anual_apoyo)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Institución otorgante
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.institucion_otorgante}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Nivel de Gobierno
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.nivel_orden_gobierno.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={8}>
                            <Typography className={classes.tituloCard}>
                              Tipo de Apoyo
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.tipo_apoyo.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Es beneficiario
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.es_beneficiario ? "Sí" : "No"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Explicación
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {interes.observaciones}
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
    return this.props.profile.intereses.apoyos_beneficios_publicos;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(InteresesApoyos);

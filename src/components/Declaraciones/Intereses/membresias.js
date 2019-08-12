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

class InteresesMembresias extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.intereses.membresias.map(d => {
      
      d.show = true;

      return d;
    });

    this.state = {
      items: elems
    };

    this.toggl = this.toggl.bind(this);
  }

  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Membresías ({this.items().length})</strong>
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
                      <Grid item xs={12} className={classes.lineCard}>
                        <Typography className={classes.tituloCard}>
                          Nombre de institución
                        </Typography>
                        <Typography className={classes.dataCard}>
                          <strong>{interes.nombre_institucion}</strong>
                          <br />
                          {interes.domicilio.vialidad.tipo_vial +
                            " " +
                            interes.domicilio.vialidad.nom_vial +
                            " No." +
                            interes.domicilio.numExt +
                            " No. Int." +
                            interes.domicilio.numInt}{" "}
                          {interes.domicilio.localidad.nom_loc +
                            ", " +
                            interes.domicilio.municipio.nom_mun +
                            ", " +
                            interes.domicilio.entidad_federativa.nom_agee +
                            ", " +
                            interes.domicilio.pais.valor +
                            " C.P. " +
                            interes.domicilio.cp}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Fecha de inicio
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.fecha_inicio}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Tipo de institución
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.tipo_institucion.valor}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Naturaleza de membresía
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.naturaleza_membresia.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* aaaaa */}

                      <Grid item xs={12} className={classes.lineCard}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Puesto o rol
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.puesto_rol}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Pagado
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.pagado ? "Sí" : "No"}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.tituloCard}>
                              Sector o industria
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.sector_industria.valor}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.tituloCard}>
                          Observaciones
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
    return this.props.profile.intereses.membresias;
  }
}

export default withStyles(styles)(InteresesMembresias);

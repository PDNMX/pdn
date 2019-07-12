/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Fragment, Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 15
  },
  titulo: {
    color: "#34b3eb",
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 30
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  tituloCard: {
    fontSize: 13,
    color: "#cccccc",
    fontWeight: 400,
    marginBottom: 0
  },
  dataCard: {
    fontSize: 14,
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  },
  tituloGeneralCard: {
    fontWeight: 600,
    fontSize: 16,
    color: "#606060",
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  },
  gridCard: {
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  },
  gridEndCard: {
    borderBottom: "0px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  }
});

class InfoDependientes extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.titulo}>
            <strong>Dependientes económicos ({this.items().length})</strong>
          </Typography>
          <Grid container spacing={3}>
            {this.items().map((dependiente, i) => (
              <Grid item xs={12} md={6} key={"dependientes-" + i}>
                <Paper className={classes.paper}>
                  <Typography className={classes.tituloGeneralCard}>
                    <span
                      style={{
                        backgroundColor: "#ccc",
                        color: "white",
                        padding: "5px 10px",
                        fontSize: 12,
                        marginBottom: 20,
                        fontWeight: 700
                      }}
                    >
                      {dependiente.tipo_relacion.valor}
                    </span>
                    <br />
                    <br />
                  </Typography>
                  <Grid container spacing={3} className={classes.gridCard}>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Sector / Industria
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{dependiente.sector_industria.valor}</li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Proveedor o Contratista de Gobierno
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>
                            {!dependiente.proveedor_contratista_gobierno
                              ? "No"
                              : "Sí"}
                          </li>
                        </ul>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} className={classes.gridCard}>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Intereses en el mismo Sector/Industria
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>
                            {!dependiente.tiene_intereses_mismo_sector_declarante
                              ? "No"
                              : "Sí"}
                          </li>
                        </ul>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.tituloCard}>
                        Desarrolla actividades de cabildeo en el mismo
                        Sector/Industria
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>
                            {!dependiente.desarrolla_cabildeo_sector_declarante
                              ? "No"
                              : "Sí"}
                          </li>
                        </ul>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} className={classes.gridCard}>
                    <Grid item xs={12} sm={12}>
                      <Typography className={classes.tituloCard}>
                        Observaciones
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.dataCard}
                      >
                        <ul>
                          <li>{dependiente.observaciones}</li>
                        </ul>
                      </Typography>
                    </Grid>
                  </Grid>
                  {dependiente.beneficiario_programa_publico.map(
                    (programa, j) => (
                      <div key={"programa-" + i + "-" + j}>
                        <Grid
                          container
                          spacing={3}
                          className={classes.gridCard}
                        >
                          <Grid item xs={12} sm={6}>
                            <Typography className={classes.tituloCard}>
                              Beneficiaro de programa
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>{programa.nombre_programa}</li>
                              </ul>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography className={classes.tituloCard}>
                              Orden de Gobierno que otorga el apoyo
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>{programa.institucion_otorga_apoyo}</li>
                              </ul>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          spacing={3}
                          className={classes.gridEndCard}
                        >
                          <Grid item xs={12} sm={6}>
                            <Typography className={classes.tituloCard}>
                              Tipo de apoyo
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>{programa.tipo_apoyo.valor}</li>
                              </ul>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography className={classes.tituloCard}>
                              Valor del Apoyo
                            </Typography>
                            <Typography
                              component={"span"}
                              className={classes.dataCard}
                            >
                              <ul>
                                <li>
                                  {new Intl.NumberFormat("es-MX", {
                                    style: "currency",
                                    currency: "MXN"
                                  }).format(programa.valor_apoyo)}
                                </li>
                              </ul>
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    )
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  items() {
    return this.props.profile.informacion_personal.dependientes_economicos;
  }
}

export default withStyles(styles)(InfoDependientes);

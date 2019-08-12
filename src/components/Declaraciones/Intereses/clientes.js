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

class InteresesClientes extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.intereses.clientes_principales.map(d => {
      // let item = d;
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
            <strong>Clientes principales ({this.items().length})</strong>
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
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Nombre del negocio
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.nombre_negocio}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className={classes.tituloCard}>
                              Número de registro
                            </Typography>
                            <Typography className={classes.dataCard}>
                              {interes.numero_registro}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.lineCard}>
                        <Typography className={classes.tituloCard}>
                          Sector o industria
                        </Typography>
                        <Typography className={classes.dataCard}>
                          {interes.sector_industria.valor}
                        </Typography>
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
    return this.props.profile.intereses.clientes_principales;
  }
}

export default withStyles(styles)(InteresesClientes);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Icono from "./Iconos";
import classNames from "classnames";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "#f2f2f2"
  },
  card: {
    height: 80
  },
  clean: {
    background: "#f2f2f2",
    color: "#666666",
    fontWeight: 300
  },
  selected: {
    color: "white",
    background: "#34b3eb",
    fontWeight: 700
  }
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} style={{ maxWidth: 1200 }}>
        <Grid container spacing={0} justify="center">
          <Grid
            item
            xs={4}
            xl={2}
            className={classNames(
              classes.card,
              props.menu_superior === 0 ? classes.selected : classes.clean
            )}
            onClick={event => {
              event.preventDefault();
              props.change(0);
            }}
          >
            <Typography align="center">
              <Icono
                name={
                  props.menu_superior === 0 ? "informacion2" : "informacion"
                }
              />
            </Typography>
            <Typography align="center">Información</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            xl={2}
            className={classNames(
              classes.card,
              props.menu_superior === 1 ? classes.selected : classes.clean
            )}
            onClick={event => {
              event.preventDefault();
              props.change(1);
            }}
          >
            <Typography align="center">
              <Icono
                name={props.menu_superior === 1 ? "intereses2" : "intereses"}
              />
            </Typography>
            <Typography align="center">Intereses</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            xl={2}
            className={classNames(
              classes.card,
              props.menu_superior === 2 ? classes.selected : classes.clean
            )}
            onClick={event => {
              event.preventDefault();
              props.change(2);
            }}
          >
            <Typography align="center">
              <Icono
                name={props.menu_superior === 2 ? "ingresos2" : "ingresos"}
              />
            </Typography>
            <Typography align="center">Ingresos</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            xl={2}
            className={classNames(
              classes.card,
              props.menu_superior === 3 ? classes.selected : classes.clean
            )}
            onClick={event => {
              event.preventDefault();
              props.change(3);
            }}
          >
            <Typography align="center">
              <Icono
                name={props.menu_superior === 3 ? "activos2" : "activos"}
              />
            </Typography>
            <Typography align="center">Activos</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            xl={2}
            className={classNames(
              classes.card,
              props.menu_superior === 4 ? classes.selected : classes.clean
            )}
            onClick={event => {
              event.preventDefault();
              props.change(4);
            }}
          >
            <Typography align="center">
              <Icono
                name={props.menu_superior === 4 ? "pasivos2" : "pasivos"}
              />
            </Typography>
            <Typography align="center">Pasivos</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

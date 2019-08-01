import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Icono from "./Iconos";

const useStyles = makeStyles({
  root: {
    background: "#f2f2f2",
    color: "#666666",
    "&$selected": {
      color: "white",
      background: "#34b3eb",
      fontWeight: 700
    },
    height: 80
  },
  selected: {
    color: "white",
    background: "#34b3eb",
    fontWeight: 700
  },
  label: {
    fontFamily: ["Noto Sans SC", '"Helvetica"', '"Arial"', '"sans-serif"'].join(
      ","
    ),
    fontSize: 14,
    "&$selected": {
      fontSize: 14
    }
  }
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={props.menu_superior}
      onChange={(event, newValue) => {
        props.change(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        classes={classes}
        label="Edad"
        icon={<Icono name={props.menu_superior === 0 ? "edad2" : "edad"} />}
      />

      <BottomNavigationAction
        classes={classes}
        label="Nivel de gobierno"
        icon={<Icono name={props.menu_superior === 1 ? "nivel2" : "nivel"} />}
      />

      <BottomNavigationAction
        classes={classes}
        label="Entidad"
        icon={
          <Icono name={props.menu_superior === 2 ? "entidad2" : "entidad"} />
        }
      />
      <BottomNavigationAction
        classes={classes}
        label="Educación"
        icon={
          <Icono
            name={props.menu_superior === 3 ? "educacion2" : "educacion"}
          />
        }
      />
      <BottomNavigationAction
        classes={classes}
        label="Bienes"
        icon={<Icono name={props.menu_superior === 4 ? "bienes2" : "bienes"} />}
      />
      <BottomNavigationAction
        classes={classes}
        label="Ingresos"
        icon={
          <Icono name={props.menu_superior === 5 ? "ingresos2" : "ingresos"} />
        }
      />
    </BottomNavigation>
  );
}

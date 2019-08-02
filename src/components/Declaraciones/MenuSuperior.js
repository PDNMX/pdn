import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// import Info from "@material-ui/icons/InfoOutlined";
// import Interes from "@material-ui/icons/AssignmentOutlined";
// import Money from "@material-ui/icons/MonetizationOnOutlined";
// import Domain from "@material-ui/icons/DomainOutlined";
// import Business from "@material-ui/icons/BusinessCenterOutlined";

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
        label="Información"
        icon={
          <Icono
            name={props.menu_superior === 0 ? "informacion2" : "informacion"}
          />
        }
      />

      <BottomNavigationAction
        classes={classes}
        label="Intereses"
        icon={
          <Icono
            name={props.menu_superior === 1 ? "intereses2" : "intereses"}
          />
        }
      />

      <BottomNavigationAction
        classes={classes}
        label="Ingresos"
        icon={
          <Icono name={props.menu_superior === 2 ? "ingresos2" : "ingresos"} />
        }
      />
      <BottomNavigationAction
        classes={classes}
        label="Activos"
        icon={
          <Icono name={props.menu_superior === 3 ? "activos2" : "activos"} />
        }
      />
      <BottomNavigationAction
        classes={classes}
        label="Pasivos"
        icon={
          <Icono name={props.menu_superior === 4 ? "pasivos2" : "pasivos"} />
        }
      />
    </BottomNavigation>
  );
}

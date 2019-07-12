import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Info from "@material-ui/icons/InfoOutlined";
import Interes from "@material-ui/icons/AssignmentOutlined";
import Money from "@material-ui/icons/MonetizationOnOutlined";
import Domain from "@material-ui/icons/DomainOutlined";
import Business from "@material-ui/icons/BusinessCenterOutlined";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "#f2f2f2",
    color: "#666666",
    "&$selected": {
      color: "white",
      background: "#34b3eb",
      fontWeight: 700
    }
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
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        component={Link}
        to={`/declaraciones/perfil/${props.id}/informacion`}
        classes={classes}
        label="Información"
        icon={<Info />}
      />

      <BottomNavigationAction
        component={Link}
        to={`/declaraciones/perfil/${props.id}/intereses`}
        classes={classes}
        label="Intereses"
        icon={<Interes />}
      />

      <BottomNavigationAction
        component={Link}
        to={`/declaraciones/perfil/${props.id}/ingresos`}
        classes={classes}
        label="Ingresos"
        icon={<Money />}
      />
      <BottomNavigationAction
        component={Link}
        to={`/declaraciones/perfil/${props.id}/activos`}
        classes={classes}
        label="Activos"
        icon={<Domain />}
      />
      <BottomNavigationAction
        component={Link}
        to={`/declaraciones/perfil/${props.id}/pasivos`}
        classes={classes}
        label="Pasivos"
        icon={<Business />}
      />
    </BottomNavigation>
  );
}

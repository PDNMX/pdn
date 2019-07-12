import React from "react";

import { MenuList, MenuItem, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    // display: "block"
  },
  chip: {
    margin: 0,
    backgroundColor: "#34b3eb",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.6)",
    padding: "15 0"
  },
  chipSelected: {
    backgroundColor: "#c3e8f4",
    fontWeight: "bold",
    color: "#34b3eb",
    padding: "15 0"
  }
}));

export default function MenuListComposition(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuList>
        {props.menu.map((option, index) => {
          return (
            <MenuItem
              key={"menuLateral-" + index}
              component={Link}
              to={`/declaraciones/perfil/${props.id}${option.to}`}
            >
              <Chip
                label={option.label}
                className={
                  props.path === `/declaraciones/perfil/${props.id}${option.to}`
                    ? classes.chipSelected
                    : classes.chip
                }
              />
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
}

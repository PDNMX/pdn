import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#34b3eb",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.6)"
  },
  selected: {
    backgroundColor: "#c3e8f4",
    fontWeight: "bold",
    fontSize: 14,
    color: "#FFF"
  }
}));

export default function MenuListComposition(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        {props.menu.map((option, index) => {
          return (
            <ListItem
              key={"menuLateral-" + index}
              button
              selected={props.value === index}
              onClick={event => props.change(index)}
              classes={classes}
            >
              <ListItemText primary={option} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Typography, Grid } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#34b3eb",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.6)",
  },
  selected: {
    backgroundColor: "#c3e8f4",
    fontWeight: "bold",
    fontSize: 14,
    color: "#FFF"
  }
}));

const MyBadge = withStyles(theme => ({
  root: {  
    padding: theme.spacing(0, 2),
  },
  badge: {
    marginTop: theme.spacing(2),  
  }
}))(Badge);

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
              <MyBadge
                badgeContent={option.value ? option.value : 0}
                color="error"
                anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
              >
                {/* <ListItemText primary={option.name} />                 */}
                <Typography component="span">
                  {option.name}
                </Typography>
              </MyBadge>
            </ListItem>
          );
        })}
      </List>
    </div> 
  );
}

import React from "react";
import { Typography, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@mui/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const styles = () => ({
  card: {
    /* border: "1px solid",
    borderRadius: "0.6em", */
    borderRadius: "0.6em",
    boxShadow:
      "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
    transition: "all ease 200ms",
    
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow:
        "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
    },
    
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

const SysCard = (props) => {
  const { classes, sys } = props;

  return (
    <Grid item lg={2} sm={4} xs={6} p={1}>
      <Card className={classes.card}>
        <CardActionArea component={RouterLink} to={sys.url} >
          <CardMedia
            component="img"
            /* height="auto" */
            image={sys.icon}
            alt={sys.name}
            sx={{ backgroundColor: sys.color, objectFit: "scale-down", padding: '2rem', width: "auto" }}
          />
          <CardContent >
            <Typography variant="body1">{sys.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(SysCard);

import React from "react";
import { withStyles } from "@mui/styles";
import { Typography, Grid, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  descarga: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  jsonLabel: {
    color: theme.palette.secondary.main,
    fontSize: "2rem",
  },
  iconDownload: {
    color: theme.palette.primary.main,
    fontSize: 60,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
});

const DescargaSistema4 = ({ classes, fileName, data }) => {
  const handleDownload = () => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el JSON:", error);
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12} align="center">
          <Typography className={classes.descarga} variant="h5">
            Descarga todos los datos
          </Typography>
          <Typography className={classes.jsonLabel} variant="h6">
            {"{ JSON }"}
          </Typography>
          <IconButton onClick={handleDownload} size="large">
            <DownloadIcon className={classes.iconDownload} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

DescargaSistema4.propTypes = {
  classes: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(DescargaSistema4);

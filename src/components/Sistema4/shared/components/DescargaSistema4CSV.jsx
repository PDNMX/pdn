import React from "react";
import { withStyles } from "@mui/styles";
import { Typography, Grid, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
  descarga: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  csvLabel: {
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

const DescargaSistema4CSV = ({ classes, fileName, data }) => {
  const handleDownloadCSV = () => {
    try {
      if (!data || data.length === 0) {
        console.warn("No hay datos para descargar");
        return;
      }

      // Obtener las cabeceras (keys del primer objeto)
      const headers = Object.keys(data[0]);

      // Crear la línea de cabeceras
      const csvHeaders = headers.join(",");

      // Crear las filas de datos
      const csvRows = data.map((row) => {
        return headers
          .map((header) => {
            const value = row[header];
            // Escapar valores que contienen comas, comillas o saltos de línea
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",");
      });

      // Combinar cabeceras y filas
      const csvContent = [csvHeaders, ...csvRows].join("\n");

      // Crear el Blob con BOM para UTF-8 (para Excel)
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el CSV:", error);
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
          <Typography className={classes.csvLabel} variant="h6">
            {"{ CSV }"}
          </Typography>
          <IconButton onClick={handleDownloadCSV} size="large">
            <DownloadIcon className={classes.iconDownload} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

DescargaSistema4CSV.propTypes = {
  classes: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(DescargaSistema4CSV);

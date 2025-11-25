import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { Typography, Grid, IconButton, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import PropTypes from "prop-types";
import XLSX from "xlsx-js-style"; // <--- Librería nueva
import { saveAs } from "file-saver";
import TableViewIcon from "@mui/icons-material/TableView";

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
  excelLabel: {
    color: theme.palette.secondary.main,
    fontSize: "2rem",
  },
  iconDownload: {
    color: theme.palette.primary.main,
    fontSize: 60,
  },
});

const DescargaSistema4Excel = ({ classes, fileName, data }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadExcel = () => {
    if (!data || data.length === 0) {
      console.warn("No hay datos para descargar");
      return;
    }

    setLoading(true);

    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);

      // --- CÁLCULO DE ANCHO AUTOMÁTICO ---

      // 1. Obtenemos las llaves (nombres de columnas)
      const keys = Object.keys(data[0]);

      // 2. Calculamos el ancho máximo para cada columna
      const colWidths = keys.map((key) => {
        // Empezamos asumiendo que el ancho es el largo del Título
        let maxLength = key.length;

        // Recorremos todos los datos para ver si hay algún texto más largo
        data.forEach((row) => {
          const value = row[key];
          // Convertimos a string para medir, cuidando los nulos
          const cellLength = value ? String(value).length : 0;

          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        });

        // wch = Width CHaracters
        return { wch: maxLength + 2 };
      });

      // 3. Asignamos los anchos a la hoja
      ws["!cols"] = colWidths;
      const rowHeights = new Array(data.length + 1).fill({ hpt: 24 });
      ws["!rows"] = rowHeights;
      // --- ESTILOS Y FILTROS (Igual que antes) ---

      const range = XLSX.utils.decode_range(ws["!ref"]);
      ws["!autofilter"] = { ref: ws["!ref"] };

      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const address = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[address]) continue;

          let cellStyle = {
            font: { name: "Calibri", sz: 11 }, // Fuente base para datos
            alignment: {
              vertical: "center", // <--- Centrado Vertical
              horizontal: "center", // <--- Centrado Horizontal
            },
          };

          if (R === 0) {
            cellStyle.fill = { fgColor: { rgb: "713972" } };
            cellStyle.font = {
              name: "Calibri",
              sz: 12,
              color: { rgb: "FFFFFF" },
              bold: true,
            };
          }

          ws[address].s = cellStyle;
        }
      }

      XLSX.utils.book_append_sheet(wb, ws, "Datos");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Error al generar el Excel:", error);
    } finally {
      setLoading(false);
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
          <Typography className={classes.excelLabel} variant="h6">
            {"[ EXCEL ]"}
          </Typography>

          <IconButton
            onClick={handleDownloadExcel}
            size="large"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={60} color="success" />
            ) : (
              <DownloadIcon className={classes.iconDownload} />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

DescargaSistema4Excel.propTypes = {
  classes: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(DescargaSistema4Excel);

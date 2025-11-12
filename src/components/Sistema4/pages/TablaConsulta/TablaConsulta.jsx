import React from "react";
import { withStyles } from "@mui/styles";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Grid,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  sectionTitle: {
    color: "#666",
    marginBottom: theme.spacing(3),
  },
  tableContainer: {
    marginBottom: theme.spacing(4),
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  tableHeader: {
    backgroundColor: "#713972",
    "& th": {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1rem",
      padding: theme.spacing(2),
    },
  },
  tableHeaderTitle: {
    backgroundColor: "#713972",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  tableCell: {
    padding: theme.spacing(2),
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  downloadSection: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(1),
  },
  downloadTitle: {
    color: "#713972",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  downloadLink: {
    display: "flex",
    alignItems: "center",
    color: "#713972",
    textDecoration: "none",
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    backgroundColor: "#fff",
    borderRadius: theme.spacing(0.5),
    border: "1px solid #713972",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#713972",
      color: "#fff",
      "& svg": {
        color: "#fff",
      },
    },
  },
  pdfIcon: {
    marginRight: theme.spacing(1),
    color: "#713972",
  },
});

const TablaConsulta = ({ classes }) => {
  const asofisMembers = [
    "Auditoría Superior de la Federación",
    "Órgano Superior de Auditoría y Fiscalización Gubernamental de Colima",
    "Auditoría Superior del Estado de Hidalgo",
    "Auditoría Superior del Estado de Jalisco",
    "Auditoría Superior del Estado de Sinaloa",
  ];

  const cpcefMembers = [
    "Secretaría de la Función Pública",
    "Contraloría General del Estado de Baja California Sur",
    "Secretaría de la Contraloría del Estado de Campeche",
    "Secretaría de la Contraloría General del Estado de Sonora",
  ];

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.sectionTitle}>
        Intercambio de Información entre los Miembros del Sistema Nacional de
        Fiscalización
      </Typography>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                className={classes.tableHeaderTitle}
              >
                Comité Rector del SNF
              </TableCell>
            </TableRow>
            <TableRow className={classes.tableHeader}>
              <TableCell>ASOFIS</TableCell>
              <TableCell>CPCE-F</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Math.max(asofisMembers.length, cpcefMembers.length) >
              0 &&
              Array.from({
                length: Math.max(asofisMembers.length, cpcefMembers.length),
              }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableCell}>
                    {asofisMembers[index] || ""}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {cpcefMembers[index] || ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={classes.downloadSection}>
        <Typography variant="h6" className={classes.downloadTitle}>
          Documentos disponibles para descarga
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Link
              href="https://www.snf.org.mx/SharedFiles/Download.aspx?pageid=13&mid=212&fileid=485"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.downloadLink}
            >
              <PictureAsPdfIcon className={classes.pdfIcon} />
              <Typography variant="body1">
                Directorio EFSL v.Jul 2024.pdf
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              href="https://www.snf.org.mx/SharedFiles/Download.aspx?pageid=13&mid=212&fileid=486"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.downloadLink}
            >
              <PictureAsPdfIcon className={classes.pdfIcon} />
              <Typography variant="body1">
                Directorio OEC v. Jul 2024.pdf
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(TablaConsulta);

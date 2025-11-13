import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import ButtonPDN from "../Compartidos/ButtonPDN";
const snfInfoLink = "https://www.snf.org.mx/";
const styles = (theme) => ({
  paper: {
    backgroundColor: "#fff",
    border: "2px solid #713972",
  },
  title: {
    color: "#713972",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderBottom: "2px solid #713972",
  },
  subtitle: {
    color: "#713972",
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  text: {
    color: "#333",
    textAlign: "justify",
    marginBottom: theme.spacing(2),
  },
  enlaces: {
    color: "#713972",
    fontWeight: "bold",
    textDecoration: "underline",
    "&:hover": {
      color: "#9c4a9d",
    },
  },
  listItem: {
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  actions: {
    padding: theme.spacing(2),
    justifyContent: "center",
    borderTop: "1px solid #e0e0e0",
  },
});

const DisclaimerSistema4 = ({ classes, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="disclaimer-dialog-title"
    >
      <Paper className={classes.paper} style={{ margin: 0, borderRadius: 0 }}>
        <DialogTitle id="disclaimer-dialog-title" className={classes.title}>
          AVISO IMPORTANTE - PROTOTIPO EN DESARROLLO
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.text}>
            El presente sistema constituye un prototipo conceptual del módulo de
            consulta y transparencia para el{" "}
            <strong>
              Sistema de Información y Comunicación del Sistema Nacional
              Anticorrupción y del Sistema Nacional de Fiscalización
            </strong>
            , integrado a la Plataforma Digital Nacional (PDN).
          </DialogContentText>

          <DialogContentText className={classes.subtitle}>
            Naturaleza del Prototipo
          </DialogContentText>
          <DialogContentText className={classes.text}>
            Este desarrollo se presenta como una propuesta de concepto que busca
            materializar las funcionalidades requeridas para dar cumplimiento al{" "}
            <strong>
              artículo 55 de la Ley General del Sistema Nacional Anticorrupción
              (LGSNA)
            </strong>
            , específicamente en lo concerniente a la publicación y consulta de:
          </DialogContentText>
          <List dense>
            <ListItem className={classes.listItem}>
              <ListItemText primary="• Programas Anuales de Auditoría (PAA)" />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary="• Programas Anuales de Fiscalización" />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary="• Programas Anuales de Trabajo" />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary="• Instrumentos homólogos de planeación institucional" />
            </ListItem>
          </List>

          <DialogContentText className={classes.subtitle}>
            Consideraciones Importantes
          </DialogContentText>
          <Box mb={2}>
            <DialogContentText className={classes.text}>
              <strong>Estado de Desarrollo:</strong> La presente versión es un
              prototipo sujeto a revisión, validación y aprobación por parte de
              las autoridades competentes del{" "}
              <Link
                href={snfInfoLink}
                target="_blank"
                underline="none"
                className={classes.enlaces}
              >
                Sistema Nacional de Fiscalización (SNF).
              </Link>{" "}
            </DialogContentText>
            <DialogContentText className={classes.text}>
              <strong>Modificaciones Esperadas:</strong> Se anticipan ajustes,
              correcciones y especificaciones técnicas derivadas de:
            </DialogContentText>
            <List dense>
              <ListItem className={classes.listItem}>
                <ListItemText primary="• Retroalimentación del SNF y sus integrantes" />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="• Requerimientos normativos adicionales" />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="• Necesidades operativas identificadas durante la fase de pruebas" />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="• Estándares técnicos de la PDN" />
              </ListItem>
            </List>
            <DialogContentText className={classes.text}>
              <strong>Compromiso de Cumplimiento:</strong> Este prototipo tiene
              como objetivo fundamental apegarse a los lineamientos establecidos
              en el marco normativo aplicable y proporcionar productos que
              satisfagan los requerimientos del artículo 55 de la LGSNA.
            </DialogContentText>
          </Box>

          <DialogContentText className={classes.subtitle}>
            Alcance del Prototipo
          </DialogContentText>
          <DialogContentText className={classes.text}>
            Los datos, funcionalidades y resultados mostrados en este sistema
            son ilustrativos y de carácter demostrativo. La información
            definitiva estará disponible una vez que el sistema sea formalmente
            validado e implementado por las instancias correspondientes.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <ButtonPDN onClick={handleClose}>Aceptar</ButtonPDN>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default withStyles(styles)(DisclaimerSistema4);

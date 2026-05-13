import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const snfInfoLink = "https://www.snf.org.mx/";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    maxWidth: "md",
    padding: theme.spacing(1.5),
  },
}));

const Highlight = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingTop: 0,
  paddingBottom: theme.spacing(1),
  listStyleType: "disc",
  "& .MuiListItemText-root": {
    display: "list-item",
    marginLeft: theme.spacing(2),
  },
  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
    color: theme.palette.text.primary,
  },
}));

const DisclaimerSistema4 = ({ open, handleClose }) => {
  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="disclaimer-dialog-title"
    >
      <Paper>
        <DialogTitle id="disclaimer-dialog-title">
          <Typography variant="h5" component="div" textAlign="center">
            <Highlight>AVISO IMPORTANTE - PROTOTIPO EN DESARROLLO</Highlight>
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "justify" }}>
          <Typography paragraph>
            El presente sistema constituye un prototipo conceptual del módulo de
            consulta y transparencia para el{" "}
            <Highlight>
              Sistema de Información y Comunicación del Sistema Nacional
              Anticorrupción y del Sistema Nacional de Fiscalización
            </Highlight>
            , integrado a la Plataforma Digital Nacional (PDN).
          </Typography>

          <Typography>
            <Highlight>Naturaleza del Prototipo</Highlight>
          </Typography>
          <Typography paragraph>
            Este desarrollo se presenta como una propuesta de concepto que busca materializar las funcionalidades mínimas requeridas para dar cumplimiento al{" "}
            <Highlight>
              artículo 55 de la Ley General del Sistema Nacional Anticorrupción (LGSNA)
            </Highlight>
            , específicamente en lo concerniente a la publicación y consulta de:
          </Typography>
          <StyledList>
            <ListItemText>Programas Anuales de Auditoría (PAA)</ListItemText>
            <ListItemText>Programas Anuales de Fiscalización</ListItemText>
            <ListItemText>Programas Anuales de Trabajo</ListItemText>
            <ListItemText>
              Instrumentos homólogos de planeación institucional
            </ListItemText>
          </StyledList>

          <Typography>
            <Highlight>Consideraciones Importantes</Highlight>
          </Typography>
          <Box mb={2}>
            <Typography paragraph>
              <Highlight>Estado de Desarrollo:</Highlight> La presente versión es un prototipo sujeto a revisión, validación y aprobación por parte de las autoridades competentes del Comité Coordinador (CC) y de los integrantes del{" "}
              <Link
                href={snfInfoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sistema Nacional de Fiscalización (SNF).
              </Link>
            </Typography>
            <Typography paragraph>
              <Highlight>Modificaciones Esperadas:</Highlight> Se anticipan
              ajustes, correcciones y especificaciones técnicas derivadas de:
            </Typography>
            <StyledList>
              <ListItemText>
                La retroalimentación de los integrantes del SNF
              </ListItemText>
              <ListItemText>Requerimientos normativos adicionales</ListItemText>
              <ListItemText>
                Necesidades operativas identificadas durante el pilotaje
              </ListItemText>
              <ListItemText>Estándares técnicos de la PDN</ListItemText>
            </StyledList>
            <Typography paragraph>
              <Highlight>Compromiso de Cumplimiento:</Highlight> Este prototipo tiene como objetivo fundamental poder ser un precedente que contemple al menos lo mencionado en el artículo 55 de la LGSNA y las Bases para el Funcionamiento de la Plataforma Digital Nacional.
            </Typography>
          </Box>

          <Typography>
            <Highlight>Alcance del Prototipo</Highlight>
          </Typography>
          <Typography paragraph>
            Los datos, funcionalidades y resultados mostrados en este sistema son ilustrativos y de carácter demostrativo. La información definitiva estará disponible una vez que el sistema sea formalmente capturado y validado por los entes públicos participantes en el pilotaje.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Aceptar
            </Button>
          </Box>
        </DialogActions>
      </Paper>
    </StyledDialog>
  );
};

export default DisclaimerSistema4;

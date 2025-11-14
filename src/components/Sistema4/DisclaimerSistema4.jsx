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
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: 'md',
    padding: theme.spacing(1.5),
  },
}));

const Highlight = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const StyledList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  '& .MuiListItem-root': {
    padding: theme.spacing(0.5, 0),
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    color: theme.palette.text.primary,
  },
}));

const DisclaimerSistema4 = ({ open, handleClose }) => {
  return (
    <StyledDialog open={open} onClose={handleClose} aria-labelledby="disclaimer-dialog-title">
      <Paper>
        <DialogTitle id="disclaimer-dialog-title">
          <Typography variant="h5" component="div" textAlign="center">
            <Highlight>AVISO IMPORTANTE - PROTOTIPO EN DESARROLLO</Highlight>
          </Typography>
        </DialogTitle>
        <DialogContent>
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
            Este desarrollo se presenta como una propuesta de concepto que busca
            materializar las funcionalidades requeridas para dar cumplimiento al{" "}
            <Highlight>
              artículo 55 de la Ley General del Sistema Nacional Anticorrupción
              (LGSNA)
            </Highlight>
            , específicamente en lo concerniente a la publicación y consulta de:
          </Typography>
          <StyledList>
            <List sx={{ listStyleType: 'disc', pl: 3}}>
              <ListItemText sx={{ display: 'list-item' }}>
                Programas Anuales de Auditoría (PAA)
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                Programas Anuales de Fiscalización
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                Programas Anuales de Trabajo
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                Instrumentos homólogos de planeación institucional
              </ListItemText>
            </List>
          </StyledList>

          <Typography>
            <Highlight>Consideraciones Importantes</Highlight>
          </Typography>
          <Box mb={2}>
            <Typography paragraph>
              <Highlight>Estado de Desarrollo:</Highlight> La presente versión es un
              prototipo sujeto a revisión, validación y aprobación por parte de
              las autoridades competentes del{" "}
              <Link
                href={snfInfoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sistema Nacional de Fiscalización (SNF).
              </Link>
            </Typography>
            <Typography paragraph>
              <Highlight>Modificaciones Esperadas:</Highlight> Se anticipan ajustes,
              correcciones y especificaciones técnicas derivadas de:
            </Typography>
            <StyledList>
              <List sx={{ listStyleType: 'disc', pl: 3}}>
                <ListItemText sx={{ display: 'list-item' }}>
                  Retroalimentación del SNF y sus integrantes
                </ListItemText>
                <ListItemText sx={{ display: 'list-item' }}>
                  Requerimientos normativos adicionales
                </ListItemText>
                <ListItemText sx={{ display: 'list-item' }}>
                  Necesidades operativas identificadas durante la fase de pruebas
                </ListItemText>
                <ListItemText sx={{ display: 'list-item' }}>
                  Estándares técnicos de la PDN
                </ListItemText>
              </List>
            </StyledList>
            <Typography paragraph>
              <Highlight>Compromiso de Cumplimiento:</Highlight> Este prototipo tiene
              como objetivo fundamental apegarse a los lineamientos establecidos
              en el marco normativo aplicable y proporcionar productos que
              satisfagan los requerimientos del artículo 55 de la LGSNA.
            </Typography>
          </Box>

          <Typography>
            <Highlight>Alcance del Prototipo</Highlight>
          </Typography>
          <Typography paragraph>
            Los datos, funcionalidades y resultados mostrados en este sistema
            son ilustrativos y de carácter demostrativo. La información
            definitiva estará disponible una vez que el sistema sea formalmente
            validado e implementado por las instancias correspondientes.
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

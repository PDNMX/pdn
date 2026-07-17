import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Link, List, Box, Button, Paper, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: 'sm',
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

const AlertDialog = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
      <Paper>
        <DialogTitle id="dialog-title">
          <Typography variant="h5" component="div" textAlign="center">
            <Highlight>La Plataforma Digital Nacional evoluciona de manera continua.</Highlight>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            <Highlight>Esta versión 1.2 incluye:</Highlight>
          </Typography>
          <StyledList>
          <List sx={{ listStyleType: 'disc', pl: 3}}>
            <ListItemText sx={{ display: 'list-item' }}>
              Más datos disponibles: ampliación en la cantidad y calidad de los datos en los Sistemas 1, 2, 3 y 6.
            </ListItemText>
            <ListItemText sx={{ display: 'list-item' }}>
              Nuevas secciones y funcionalidades: herramientas mejoradas para consulta y análisis.
            </ListItemText>
            <ListItemText sx={{ display: 'list-item' }}>
              Tablero Estadístico de Interconexión Nacional: visualiza en tiempo real el avance de los Entes Públicos en la conexión con los sistemas de la PDN.
            </ListItemText>
            <ListItemText sx={{ display: 'list-item' }}>
              Mejor experiencia de usuario: una interfaz más intuitiva y accesible diseñada para facilitar la navegación y el aprovechamiento de la plataforma.
            </ListItemText>
            <ListItemText sx={{ display: 'list-item' }}>
              Nueva imagen: una paleta de colores renovada que mejora la claridad visual, haciendo que la interacción sea más amigable y moderna.
            </ListItemText>
          </List>
          </StyledList>
          <Typography paragraph>
          <Highlight>Recuerda</Highlight> que la PDN es modular y escalable; esta versión es un paso más en su constante desarrollo y no debe considerarse como definitiva.
          </Typography>
          {/* <Typography>
            <Highlight>Compromiso con la protección de datos personales</Highlight>
          </Typography> */}
          <Typography paragraph>
            El uso de la PDN debe privilegiar los intereses de las personas titulares de los datos personales. Está <Highlight>prohibido el tratamiento de los datos</Highlight> para actos de discriminación, trato injusto, arbitrario o cualquier uso contrario a lo establecido en la{' '}
            <Highlight href="https://example.com" target="_blank" rel="noopener noreferrer">
              Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados
            </Highlight>.
          </Typography>
          {/* <Typography>
            <Highlight>Conoce más y participa</Highlight>
          </Typography> */}
          <Typography paragraph>
            Consulta los{' '}
            <Link component={RouterLink} to="/terminos">
              Términos y Condiciones de Uso
            </Link>{' '}
            y el{' '}
            <Link href="https://drive.google.com/file/d/18Y_bcTXFqwIX0j96efeLchUIBsUFfmZr/view" target="_blank" rel="noopener noreferrer">
              Aviso de Privacidad
            </Link>{' '}
            para comprender los lineamientos bajo los cuales se protege la información de la PDN.
          </Typography>
          <Typography paragraph>
            Comparte tus comentarios y sugerencias sobre las funcionalidades o tu experiencia de usuario a través de la liga{' '}
            <Link href={process.env.REACT_APP_LINK_GOOGLEFORM} target="_blank" rel="noopener noreferrer">
              Comenta
            </Link>.
          </Typography>
          {/* <Typography>
            <Highlight>Aporta al desarrollo de la PDN</Highlight>
          </Typography> */}
          {/* <Typography>
            Tu retroalimentación es clave para seguir construyendo una herramienta que responda a las necesidades de las personas usuarias. Además, si detectas áreas de mejora, errores o tienes ideas innovadoras, ¡no dudes en hacérnoslas saber!
          </Typography> */}
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

export default AlertDialog;

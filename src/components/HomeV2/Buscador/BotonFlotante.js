import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import Fab from '@mui/material/Fab';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';

import { Grid } from "@mui/material";
import Stepper from "./LinearStepper";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: '10px',
    top: 'auto',
    right: 25,
    bottom: 180,
    left: 'auto',
    position: 'fixed',
    background: '#3d6575',
    zIndex: 10,
  },
  container: {
    padding: "2% 3%",
    backgroundColor: 'rgba(29, 80, 109, 0.95)',
  },
  titulo: {
    color: '#fff',
    backgroundColor: 'rgba(29, 80, 109, 0.95)',
    fontSize: "1.12rem"
  },

}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle  {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="cerrar"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 7,
            top: 7,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [titulo, setTitulo] = React.useState("Asistente de búsqueda");
  //console.log(titulo);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab className={classes.fab} onClick={handleClickOpen} color="primary" aria-label="add" >
          <SearchIcon style={{ color: "#f5f8fb" }} />
        </Fab>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.titulo} >
          <span>{titulo}</span>
        </BootstrapDialogTitle>
        <DialogContent>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="center"
              className={classes.container}
              spacing={2}
            >
              <Grid item md={12} sm={12} xs={12} align="center">
                <Stepper stateChanger={setTitulo} />
              </Grid>
            </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}


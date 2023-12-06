import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
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
  container: {
    padding: "2% 3%",
    backgroundColor: '#eef7ff',
  },
  titulo: {
    color: '#fff',
    backgroundColor: '#ccdef2',
    fontSize: "1.12rem",
    background: 'linear-gradient(230deg, rgb(28, 124, 191) 0%, rgb(28, 124, 191) 4%, rgb(159, 88, 226) 49%, rgb(109, 64, 97) 100%) 0% 0% no-repeat padding-box padding-box transparent',
    border: '0px',
    boxShadow: 'none'
  },
  btnPDN: {
    marginBottom: theme.spacing(2),
    background: "#f230b9",
    borderRadius: "50px",
    fontWeight: "bold",
    fontStyle: "italic",
    "&:hover": {
      backgroundColor: "#56a3bf",
    },
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
  /* "&.MuiPaper-root": {
    backgroundColor: "red",
    color: "red"
  } */
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
            color: 'white',
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
    <>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={handleClickOpen}
      >
        Asistente de búsqueda
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.titulo} >
          <span style={{ color: 'white' }}>{titulo}</span>
        </BootstrapDialogTitle>
        <DialogContent /* dividers */>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              className={classes.container}
              spacing={0}
            >
              <Grid item md={12} sm={12} xs={12} align="center">
                <Stepper stateChanger={setTitulo} />
              </Grid>
            </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

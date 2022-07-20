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
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

import { Grid } from "@mui/material";
import Stepper from "./LinearStepper";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2% 3%",
    backgroundColor: 'rgba(29, 80, 109, 0.95)',
  },
  titulo: {
    backgroundColor: 'rgba(29, 80, 109, 0.95)',
  },
  bg: {
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  headingText: {
    color: "#ced8db",
    fontWeight: "700",
    fontSize: "52px",
    [theme.breakpoints.down("md")]: {
      fontSize: "40px",
    },
  },
  subTitle: {
    fontSize: "30px",
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#ced8db",
    "& b": {
      color: "#3bb1e6",
    },
  },
  text: {
    fontSize: "18px",
    fontWeight: 100,
    color: "#d0d7d9",
    "& b": {
      fontWeight: 500,
    },
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  btnPDN: {
    margin: theme.spacing(0),
    background: "rgb(255,255,255,0.5)",
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
            right: 8,
            top: 8,
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
      <Button
        className={classes.btnPDN}
        variant="contained"
        size="large"
        endIcon={<ScreenSearchDesktopOutlinedIcon />}
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
          {titulo}
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
    </div>
  );
}
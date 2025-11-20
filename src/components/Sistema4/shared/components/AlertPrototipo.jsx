import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertPrototipo = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    // Solo cerrar cuando el usuario hace clic en el botón de cerrar
    // No cerrar automáticamente por clickaway
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        marginTop: "80px", // Espacio desde el top para evitar sobreposición con headers
        zIndex: 1200,
      }}
    >
      <Alert
        severity="info"
        sx={{
          backgroundColor: "#1976d2", // Azul informativo
          color: "#fff",
          fontWeight: 600,
          fontSize: "0.875rem",
          boxShadow: 4,
          "& .MuiAlert-icon": {
            color: "#fff",
          },
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        Prototipo Versión Beta 0.4
      </Alert>
    </Snackbar>
  );
};

export default AlertPrototipo;

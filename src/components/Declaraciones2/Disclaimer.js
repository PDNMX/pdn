import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
export default function AlertDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Plataforma Digital Nacional"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    style={{ textAlign: "justify" }}
                >
                    La información contenida en esta sección{" "}
                    <span
                        style={{
                            fontWeight: "bold",
                            backgroundColor: "red",
                            color: "#FFF",
                            padding: "3px 10px"
                        }}
                    >
                        NO ES REAL
            </span>
            , fue generada de forma aleatoria y sirve unicamente para poder
            visualizar las diferentes funcionalidades propuestas para este
            sistema.
          </DialogContentText>
                <DialogContentText style={{ textAlign: "justify" }}>
                    <b>
                        El formato actual está basado en la última versión de las
                        especificaciones técnicas publicadas en este sitio, mismas que
                        fueron elaboradas bajo los últimos formatos publicados en el Diario
                        Oficial de la Federación.
            </b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={props.handleClose}
                    style={{ background: "#ffe01b" }}
                >
                    Aceptar
          </Button>
            </DialogActions>
        </Dialog>
    );
}


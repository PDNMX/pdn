import React from 'react';
import {TableRow, TableCell, IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Acusado = (acusado) => (
    <TableRow key={acusado.id}>
        <TableCell>{acusado.nombre}</TableCell>
        <TableCell>
            <IconButton color="primary" component="span">
                <ClearIcon />
            </IconButton>
        </TableCell>
    </TableRow>
);


export default Acusado


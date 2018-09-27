import React from 'react';
import PropTypes from 'prop-types';
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const Acusado = (acusado) => (
    <TableRow key={acusado.id}>
        <TableCell>{acusado.nombre}</TableCell>
        <TableCell>{acusado.descripcionFisica}</TableCell>
        <TableCell>
            <IconButton color="primary" component="span">
                <ClearIcon />
            </IconButton>
        </TableCell>
    </TableRow>
);


export default Acusado


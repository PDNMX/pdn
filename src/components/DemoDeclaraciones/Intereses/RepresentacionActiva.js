import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import React from "react";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    tableContainer: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }
});

class RepresentacionActiva extends React.Component {
    render() {
        const {representacionesActivas, classes} = this.props;
        return (
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre parte representada</TableCell>
                            <TableCell>Tipo representación</TableCell>
                            <TableCell>CURP</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>Fecha nacimiento</TableCell>
                            <TableCell>Sector industria</TableCell>
                            <TableCell>Fecha inicio</TableCell>
                            <TableCell>Pagado</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            representacionesActivas.map((row, index = 0) => {
                                return (
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_parte_representada}</TableCell>
                                        <TableCell>{row.tipo_representacion.valor}</TableCell>
                                        <TableCell>{row.curp_parte}</TableCell>
                                        <TableCell>{row.rfc_parte}</TableCell>
                                        <TableCell>{row.fecha_nacimiento_parte}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.fecha_inicio}</TableCell>
                                        <TableCell><Checkbox disabled checked={row.pagado}
                                                             value="checkedE"/></TableCell>
                                        <TableCell>{row.observaciones}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

            </div>
        );
    }
}

export default withStyles(styles)(RepresentacionActiva);
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import React from "react";
import {withStyles} from '@material-ui/core/styles/index';

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

class RepresentacionPasiva extends React.Component {
    render() {
        const {representacionesPasivas, classes} = this.props;
        return (
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre representante</TableCell>
                            <TableCell>Tipo representación</TableCell>
                            <TableCell>Fecha inicio representación</TableCell>
                            <TableCell>Nacionalidades</TableCell>
                            <TableCell>CURP</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>Fecha nacimiento</TableCell>
                            <TableCell>Tiene intereses</TableCell>
                            <TableCell>Ocupación/Profesión</TableCell>
                            <TableCell>Sector industria</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            representacionesPasivas.map((row, index = 0) => {
                                return (
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_representante}</TableCell>
                                        <TableCell>{row.tipo_representacion.valor}</TableCell>
                                        <TableCell>{row.fecha_inicio_representacion}</TableCell>
                                        <TableCell>{row.nacionalidades_representante.map(n=>{return n.valor})}</TableCell>
                                        <TableCell>{row.curp_representante}</TableCell>
                                        <TableCell>{row.rfc_representante}</TableCell>
                                        <TableCell>{row.fecha_nacimiento_representante}</TableCell>
                                        <TableCell><Checkbox disabled checked={row.tiene_intereses} value="Checked"/>
                                        </TableCell>
                                        <TableCell>{row.ocupacion_profesion}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
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

export default withStyles(styles)(RepresentacionPasiva);
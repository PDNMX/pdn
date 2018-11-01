import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    tableContainer :{
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }
});
class SueldosSalariosPublicos extends  React.Component{
    render(){
        const {sueldosSalariosPublicos,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ente público</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>Ingreso bruto anual</TableCell>
                            <TableCell>Unidad temporal</TableCell>
                            <TableCell>Duración/Frecuencia</TableCell>
                            <TableCell>Fecha transacción</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sueldosSalariosPublicos.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.ente_publico}</TableCell>
                                        <TableCell>{row.rfc}</TableCell>
                                        <TableCell>{row.ingreso_bruto_anual.valor+' '+row.ingreso_bruto_anual.moneda.moneda}</TableCell>
                                        <TableCell>{row.ingreso_bruto_anual.unidad_temporal.valor}</TableCell>
                                        <TableCell>{row.ingreso_bruto_anual.duracion_frecuencia}</TableCell>
                                        <TableCell>{row.ingreso_bruto_anual.fecha_transaccion}</TableCell>
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

export default withStyles(styles)(SueldosSalariosPublicos);
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({

    table: {
        minWidth: 700,
    },
    tableContainer :{
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    }
});
class EfectivoMetales extends  React.Component{
    render(){
        const {efectivoMetales,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Tipo metal</TableCell>
                            <TableCell>Unidades</TableCell>
                            <TableCell>Forma adquisición</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            efectivoMetales.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.monto+' '+row.tipo_moneda.moneda}</TableCell>
                                        <TableCell>{row.tipo_metal.valor}</TableCell>
                                        <TableCell>{row.unidades}</TableCell>
                                        <TableCell>{row.forma_adquisicion.valor}</TableCell>
                                        <TableCell>{row.observaciones_comentarios}</TableCell>
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

export default withStyles(styles)(EfectivoMetales);
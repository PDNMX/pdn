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
class BienesIntangibles extends  React.Component{
    render(){
        const {bienesIntangibles,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Propietario registrado</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Ente público encargado</TableCell>
                            <TableCell>Número registro</TableCell>
                            <TableCell>Fecha registro</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Precio adquisición</TableCell>
                            <TableCell>Forma adquisición</TableCell>
                            <TableCell>Fecha vencimiento</TableCell>
                            <TableCell>Porcentaje copropiedad</TableCell>
                            <TableCell>Precio total copropiedad</TableCell>
                            <TableCell>Copropietario</TableCell>
                            <TableCell>Porcentaje propiedad copropietario</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bienesIntangibles.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.propietario_registrado}</TableCell>
                                        <TableCell>{row.descripcion}</TableCell>
                                        <TableCell>{row.ente_publico_encargado.nombres+' '+row.ente_publico_encargado.primer_apellido+' '+row.ente_publico_encargado.segundo_apellido}</TableCell>
                                        <TableCell>{row.numero_registro}</TableCell>
                                        <TableCell>{row.fecha_registro}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.precio_adquisicion.valor+' '+row.precio_adquisicion.moneda.moneda}</TableCell>
                                        <TableCell>{row.forma_adquisicion.valor}</TableCell>
                                        <TableCell>{row.fecha_vencimiento}</TableCell>
                                        <TableCell>{row.porcentaje_copropiedad}</TableCell>
                                        <TableCell>{row.precio_total_copropiedad.valor+' '+row.precio_total_copropiedad.moneda.moneda}</TableCell>
                                        <TableCell>{row.nombre_copropietario}</TableCell>
                                        <TableCell>{row.porcentaje_propiedad_copropietario}</TableCell>
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

export default withStyles(styles)(BienesIntangibles);
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
class CuentasCobrar extends  React.Component{
    render(){
        const {cuentasCobrar,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre prestatario</TableCell>
                            <TableCell>Numero registro</TableCell>
                            <TableCell>Domicilio prestatarios</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Fecha prestamo</TableCell>
                            <TableCell>Monto original</TableCell>
                            <TableCell>Tasa interes</TableCell>
                            <TableCell>Saldo pendiente</TableCell>
                            <TableCell>Fecha vencimiento</TableCell>
                            <TableCell>Porcentaje copropiedad</TableCell>
                            <TableCell>Nombre copropietario</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cuentasCobrar.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_prestatario}</TableCell>
                                        <TableCell>{row.numero_registro}</TableCell>
                                        <TableCell>{row.domicilio_prestatarios.vialidad.tipo_vial+' '+row.domicilio_prestatarios.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_prestatarios.numExt+' No.int:'+row.domicilio_prestatarios.numInt+ ' '+row.domicilio_prestatarios.localidad.nom_loc
                                        +', '+row.domicilio_prestatarios.municipio.nom_mun+', '+", "+row.domicilio_prestatarios.entidad_federativa.nom_ent
                                        +". "+row.domicilio_prestatarios.pais.valor+". C.P."+row.domicilio_prestatarios.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.fecha_prestamo}</TableCell>
                                        <TableCell>{row.monto_original_prestamo}</TableCell>
                                        <TableCell>{row.tasa_interes}</TableCell>
                                        <TableCell>{row.saldo_pendiente}</TableCell>
                                        <TableCell>{row.fecha_vencimiento}</TableCell>
                                        <TableCell>{row.porcentaje_copropiedad}</TableCell>
                                        <TableCell>{row.nombre_copropietario}</TableCell>
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

export default withStyles(styles)(CuentasCobrar);
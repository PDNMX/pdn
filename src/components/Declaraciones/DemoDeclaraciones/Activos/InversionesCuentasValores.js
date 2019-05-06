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
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }
});
class InversionesCuentasValores extends  React.Component{
    render(){
        const {inversionesCuentasValores,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Tipo inversión</TableCell>
                            <TableCell>Tipo específico</TableCell>
                            <TableCell>Número cuenta</TableCell>
                            <TableCell>Nacional/Extranjero</TableCell>
                            <TableCell>Nombre institución</TableCell>
                            <TableCell>RFC institución</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Domicilio institución</TableCell>
                            <TableCell>Forma adquisición</TableCell>
                            <TableCell>Fecha inicio</TableCell>
                            <TableCell>Monto original</TableCell>
                            <TableCell>Tasa interes</TableCell>
                            <TableCell>Saldo anual</TableCell>
                            <TableCell>Plazo</TableCell>
                            <TableCell>Titular</TableCell>
                            <TableCell>Porcentaje inversión</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            inversionesCuentasValores.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.tipo_inversion.valor}</TableCell>
                                        <TableCell>{row.tipo_especifico_inversion.valor}</TableCell>
                                        <TableCell>{row.numero_cuenta}</TableCell>
                                        <TableCell>{row.nacional_extranjero.valor}</TableCell>
                                        <TableCell>{row.nombre_institucion}</TableCell>
                                        <TableCell>{row.rfc_institucion}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.domicilio_institucion.vialidad.tipo_vial+' '+row.domicilio_institucion.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_institucion.numExt+' No.int:'+row.domicilio_institucion.numInt+ ' '+row.domicilio_institucion.localidad.nom_loc
                                        +', '+row.domicilio_institucion.municipio.nom_mun+', '+", "+row.domicilio_institucion.entidad_federativa.nom_ent
                                        +". "+row.domicilio_institucion.pais.valor+". C.P."+row.domicilio_institucion.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.forma_adquisicion.valor}</TableCell>
                                        <TableCell>{row.fecha_inicio}</TableCell>
                                        <TableCell>{row.monto_original+' '+row.tipo_moneda.moneda}</TableCell>
                                        <TableCell>{row.tasa_interes}</TableCell>
                                        <TableCell>{row.saldo_anual}</TableCell>
                                        <TableCell>{row.plazo+' '+row.unidad_medida_plazo.valor}</TableCell>
                                        <TableCell>{row.titular_bien.valor}</TableCell>
                                        <TableCell>{row.porcentaje_inversion}</TableCell>
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

export default withStyles(styles)(InversionesCuentasValores);
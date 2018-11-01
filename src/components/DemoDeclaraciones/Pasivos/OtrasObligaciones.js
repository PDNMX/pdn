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
    tableContainer :{
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }
});
class OtrasObligaciones extends  React.Component{
    render(){
        const {otrasObligaciones,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Tipo acreedor</TableCell>
                            <TableCell>Tipo obligación</TableCell>
                            <TableCell>Identificador obligación</TableCell>
                            <TableCell>Nacional/Extranjero</TableCell>
                            <TableCell>Nombre acreedor</TableCell>
                            <TableCell>RFC acreedor</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Domicilio acreedor</TableCell>
                            <TableCell>Fecha obligación</TableCell>
                            <TableCell>Monto original</TableCell>
                            <TableCell>Tasa interes</TableCell>
                            <TableCell>Saldo pendiente</TableCell>
                            <TableCell>Montos abonados</TableCell>
                            <TableCell>Plazo obligación</TableCell>
                            <TableCell>Titularidad obligación</TableCell>
                            <TableCell>Porcentaje obligación titular</TableCell>
                            <TableCell>Garantía</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            otrasObligaciones.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.tipo_acreedor.valor}</TableCell>
                                        <TableCell>{row.tipo_obligacion}</TableCell>
                                        <TableCell>{row.identificador_obligacion}</TableCell>
                                        <TableCell>{row.nacional_extranjero.valor}</TableCell>
                                        <TableCell>{row.nombre_acreedor}</TableCell>
                                        <TableCell>{row.rfc_acreedor}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.domicilio_acreedor.vialidad.tipo_vial+' '+row.domicilio_acreedor.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_acreedor.numExt+' No.int:'+row.domicilio_acreedor.numInt+ ' '+row.domicilio_acreedor.localidad.nom_loc
                                        +', '+row.domicilio_acreedor.municipio.nom_mun+', '+", "+row.domicilio_acreedor.entidad_federativa.nom_ent
                                        +". "+row.domicilio_acreedor.pais.valor+". C.P."+row.domicilio_acreedor.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.fecha_obligacion}</TableCell>
                                        <TableCell>{row.monto_original+' '+row.tipo_moneda.moneda}</TableCell>
                                        <TableCell>{row.tasa_interes}</TableCell>
                                        <TableCell>{row.saldo_pendiente}</TableCell>
                                        <TableCell>{row.montos_abonados.map(m=>{return m.toString()})}</TableCell>
                                        <TableCell>{row.plazo_obligacion+' '+row.unidad_medida_plazo.valor}</TableCell>
                                        <TableCell>{row.titularidad_obligacion.valor}</TableCell>
                                        <TableCell>{row.porcentaje_obligacion_titular}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.garantia} value="checkedE" /></TableCell>
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

export default withStyles(styles)(OtrasObligaciones);
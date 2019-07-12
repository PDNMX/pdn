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
class ActividadProfesional extends  React.Component{
    render(){
        const {actividadProfesional,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre/Denominación/Razón social</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>CURP</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Tipo Actividad/Servicio</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Domicilio</TableCell>
                            <TableCell>Ingreso bruto anual</TableCell>
                            <TableCell>Unidad temporal</TableCell>
                            <TableCell>Duración/Frecuencia</TableCell>
                            <TableCell>Fecha transacción</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            actividadProfesional.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_denominacion_razon_social}</TableCell>
                                        <TableCell>{row.rfc}</TableCell>
                                        <TableCell>{row.curp}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.tipo_actividad_servicio.valor}</TableCell>
                                        <TableCell>{row.descripcion_actividad_servicio}</TableCell>
                                        <TableCell>{row.domicilio_persona_recibe_ingreso.vialidad.tipo_vial+' '+row.domicilio_persona_recibe_ingreso.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_persona_recibe_ingreso.numExt+' No.int:'+row.domicilio_persona_recibe_ingreso.numInt+ ' '+row.domicilio_persona_recibe_ingreso.localidad.nom_loc
                                        +', '+row.domicilio_persona_recibe_ingreso.municipio.nom_mun+', '+", "+row.domicilio_persona_recibe_ingreso.entidad_federativa.nom_agee
                                        +". "+row.domicilio_persona_recibe_ingreso.pais.valor+". C.P."+row.domicilio_persona_recibe_ingreso.cp
                                        }
                                        </TableCell>
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

export default withStyles(styles)(ActividadProfesional);
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
class Fideicomisos extends  React.Component{
    render(){
        const {fideicomisos,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Identificador</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Objetivo</TableCell>
                            <TableCell>Número registro</TableCell>
                            <TableCell>Fecha creación</TableCell>
                            <TableCell>Vigencia</TableCell>
                            <TableCell>Residencia</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Porcentaje propiedad</TableCell>
                            <TableCell>Ingreso obtenido</TableCell>
                            <TableCell>Institución fiduciaria</TableCell>
                            <TableCell>Fideicomitente</TableCell>
                            <TableCell>Fideicomisario</TableCell>
                            <TableCell>Fiduciario</TableCell>
                            <TableCell>RFC fideicomitente</TableCell>
                            <TableCell>RFC fideicomisario</TableCell>
                            <TableCell>RFC fiduciario</TableCell>
                            <TableCell>CURP fideicomitente</TableCell>
                            <TableCell>CURP fideicomisario</TableCell>
                            <TableCell>CURP fiduciario</TableCell>
                            <TableCell>Domicilio fideicomitente</TableCell>
                            <TableCell>Domicilio fideicomisario</TableCell>
                            <TableCell>Domicilio fiduciario</TableCell>
                            <TableCell>Fecha nacimiento fideicomitente</TableCell>
                            <TableCell>Fecha nacimiento fideicomisario</TableCell>
                            <TableCell>Fecha nacimiento fiduciario</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            fideicomisos.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.identificador_fideicomiso}</TableCell>
                                        <TableCell>{row.tipo_fideicomiso.valor}</TableCell>
                                        <TableCell>{row.objetivo}</TableCell>
                                        <TableCell>{row.numero_registro}</TableCell>
                                        <TableCell>{row.fecha_creacion}</TableCell>
                                        <TableCell>{row.vigencia}</TableCell>
                                        <TableCell>{row.residencia.valor}</TableCell>
                                        <TableCell>{row.valor+' '+row.moneda.moneda}</TableCell>
                                        <TableCell>{row.porcentaje_propiedad_derechos_fiduciarios}</TableCell>
                                        <TableCell>{row.ingreso_monetario_obtenido}</TableCell>
                                        <TableCell>{row.institucion_fiduciaria}</TableCell>
                                        <TableCell>{row.nombre_fideicomitente}</TableCell>
                                        <TableCell>{row.nombre_fideicomisario}</TableCell>
                                        <TableCell>{row.nombre_fiduciario}</TableCell>
                                        <TableCell>{row.rfc_fideicomitente}</TableCell>
                                        <TableCell>{row.rfc_fideicomsario}</TableCell>
                                        <TableCell>{row.rfc_fiduciario}</TableCell>
                                        <TableCell>{row.curp_fideicomitente}</TableCell>
                                        <TableCell>{row.curp_fideicomisario}</TableCell>
                                        <TableCell>{row.curp_fiduciario}</TableCell>
                                        <TableCell>{row.domicilio_fideicomitente.vialidad.tipo_vial+' '+row.domicilio_fideicomitente.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_fideicomitente.numExt+' No.int:'+row.domicilio_fideicomitente.numInt+ ' '+row.domicilio_fideicomitente.localidad.nom_loc
                                        +', '+row.domicilio_fideicomitente.municipio.nom_mun+', '+", "+row.domicilio_fideicomitente.entidad_federativa.nom_agee
                                        +". "+row.domicilio_fideicomitente.pais.valor+". C.P."+row.domicilio_fideicomitente.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.domicilio_fideicomisario.vialidad.tipo_vial+' '+row.domicilio_fideicomisario.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_fideicomisario.numExt+' No.int:'+row.domicilio_fideicomisario.numInt+ ' '+row.domicilio_fideicomisario.localidad.nom_loc
                                        +', '+row.domicilio_fideicomisario.municipio.nom_mun+', '+", "+row.domicilio_fideicomisario.entidad_federativa.nom_agee
                                        +". "+row.domicilio_fideicomisario.pais.valor+". C.P."+row.domicilio_fideicomisario.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.domicilio_fiduciario.vialidad.tipo_vial+' '+row.domicilio_fiduciario.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_fiduciario.numExt+' No.int:'+row.domicilio_fiduciario.numInt+ ' '+row.domicilio_fiduciario.localidad.nom_loc
                                        +', '+row.domicilio_fiduciario.municipio.nom_mun+', '+", "+row.domicilio_fiduciario.entidad_federativa.nom_agee
                                        +". "+row.domicilio_fiduciario.pais.valor+". C.P."+row.domicilio_fiduciario.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.fecha_nacimiento_constitucion_fideicomitente}</TableCell>
                                        <TableCell>{row.fecha_nacimiento_constitucion_fideicomisario}</TableCell>
                                        <TableCell>{row.fecha_nacimiento_constitucion_fiduciario}</TableCell>
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

export default withStyles(styles)(Fideicomisos);
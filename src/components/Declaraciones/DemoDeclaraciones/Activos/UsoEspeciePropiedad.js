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
class UsoEspeciePropiedad extends  React.Component{
    render(){
        const {usoEspeciePropiedad,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo bien</TableCell>
                            <TableCell>Valor mercado</TableCell>
                            <TableCell>Nombre tercero propietario</TableCell>
                            <TableCell>RFC tercero propietario</TableCell>
                            <TableCell>CURP tercero propietario</TableCell>
                            <TableCell>Relación persona</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Fecha inicio</TableCell>
                            <TableCell>Domicilio persona</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            usoEspeciePropiedad.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_bien.valor}</TableCell>
                                        <TableCell>{row.valor_mercado.valor+' '+row.valor_mercado.moneda.moneda}</TableCell>
                                        <TableCell>{row.nombre_tercero_propietario}</TableCell>
                                        <TableCell>{row.rfc_tercero_propietario}</TableCell>
                                        <TableCell>{row.curp_tercero_propietario}</TableCell>
                                        <TableCell>{row.relacion_persona.valor}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.fecha_inicio}</TableCell>
                                        <TableCell>{row.domicilio_persona.vialidad.tipo_vial+' '+row.domicilio_persona.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_persona.numExt+' No.int:'+row.domicilio_persona.numInt+ ' '+row.domicilio_persona.localidad.nom_loc
                                        +', '+row.domicilio_persona.municipio.nom_mun+', '+", "+row.domicilio_persona.entidad_federativa.nom_ent
                                        +". "+row.domicilio_persona.pais.valor+". C.P."+row.domicilio_persona.cp
                                        }
                                        </TableCell>
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

export default withStyles(styles)(UsoEspeciePropiedad);
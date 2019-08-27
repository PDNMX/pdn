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
    tableContainer :{
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    }
});
class Empresas extends  React.Component{
    render(){
        const {empresas,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>País registro</TableCell>
                            <TableCell>Fecha constitución</TableCell>
                            <TableCell>Número registro</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>Domicilio</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Actividad económica</TableCell>
                            <TableCell>sector/industria</TableCell>
                            <TableCell>Porcentaje participación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            empresas.map((row,index=0) => {
                                console.log("ROW: ",row);
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_empresa_sociedad_asociacion}</TableCell>
                                        <TableCell>{row.pais_registro.valor}</TableCell>
                                        <TableCell>{row.fecha_constitucion}</TableCell>
                                        <TableCell>{row.numero_registro}</TableCell>
                                        <TableCell>{row.rfc}</TableCell>
                                        <TableCell>{row.domicilio.vialidad.tipo_vial+' '+row.domicilio.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio.numExt+' No.int:'+row.domicilio.numInt+ ' '+row.domicilio.localidad.nom_loc
                                        +', '+row.domicilio.municipio.nom_mun+', '+", "+row.domicilio.entidad_federativa.nom_agee
                                        +". "+row.domicilio.pais.valor+". C.P."+row.domicilio.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.rol}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.actividad_economica} value="checkedE" /></TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.porcentaje_participacion}</TableCell>
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

export default withStyles(styles)(Empresas);
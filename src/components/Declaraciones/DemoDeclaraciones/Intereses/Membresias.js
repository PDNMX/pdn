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
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }
});
class Membresias extends  React.Component{
    render(){
        const {membresias,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo institución</TableCell>
                            <TableCell>Naturaleza membresia</TableCell>
                            <TableCell>Domicilio</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Fecha inicio</TableCell>
                            <TableCell>Pagado</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            membresias.map((row,index=0) => {
                                console.log("ROW: ",row);
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_institucion}</TableCell>
                                        <TableCell>{row.tipo_institucion.valor}</TableCell>
                                        <TableCell>{row.naturaleza_membresia}</TableCell>
                                        <TableCell>{row.domicilio.vialidad.tipo_vial+' '+row.domicilio.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio.numExt+' No.int:'+row.domicilio.numInt+ ' '+row.domicilio.localidad.nom_loc
                                        +', '+row.domicilio.municipio.nom_mun+', '+", "+row.domicilio.entidad_federativa.nom_ent
                                        +". "+row.domicilio.pais.valor+". C.P."+row.domicilio.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.puesto_rol}</TableCell>
                                        <TableCell>{row.fecha_inicio}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.pagado} value="checkedE" /></TableCell>
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

export default withStyles(styles)(Membresias);
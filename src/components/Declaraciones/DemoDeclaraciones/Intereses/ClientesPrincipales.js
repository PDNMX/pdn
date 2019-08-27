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
class ClientesPrincipales extends  React.Component{
    render(){
        const {clientesPrincipales,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre negocio</TableCell>
                            <TableCell>Número registro</TableCell>
                            <TableCell>Dueño/Encargado</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>RFC cliente</TableCell>
                            <TableCell>Domicilio cliente</TableCell>
                            <TableCell>sector/industria</TableCell>
                            <TableCell>Porcentaje participación</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            clientesPrincipales.map((row,index=0) => {
                                console.log("ROW: ",row);
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_negocio}</TableCell>
                                        <TableCell>{row.numero_Registro}</TableCell>
                                        <TableCell>{row.dueno_encargado}</TableCell>
                                        <TableCell>{row.nombre_cliente}</TableCell>
                                        <TableCell>{row.rfc_cliente}</TableCell>
                                        <TableCell>{row.domicilio_cliente.vialidad.tipo_vial+' '+row.domicilio_cliente.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_cliente.numExt+' No.int:'+row.domicilio_cliente.numInt+ ' '+row.domicilio_cliente.localidad.nom_loc
                                        +', '+row.domicilio_cliente.municipio.nom_mun+', '+", "+row.domicilio_cliente.entidad_federativa.nom_agee
                                        +". "+row.domicilio_cliente.pais.valor+". C.P."+row.domicilio_cliente.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.porcentaje_participacion}</TableCell>
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

export default withStyles(styles)(ClientesPrincipales);
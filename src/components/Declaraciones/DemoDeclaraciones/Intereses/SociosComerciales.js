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
class SociosComerciales extends  React.Component{
    render(){
        const {sociosComerciales,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actividad</TableCell>
                            <TableCell>Vínculo</TableCell>
                            <TableCell>Antigüedad</TableCell>
                            <TableCell>RFC entidad</TableCell>
                            <TableCell>Nombre socio</TableCell>
                            <TableCell>CURP socio</TableCell>
                            <TableCell>RFC socio</TableCell>
                            <TableCell>Lugar nacimiento</TableCell>
                            <TableCell>Fecha nacimiento</TableCell>
                            <TableCell>Porcentaje participación</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sociosComerciales.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_actividad}</TableCell>
                                        <TableCell>{row.tipo_vinculo}</TableCell>
                                        <TableCell>{row.antiguedad_vinculo}</TableCell>
                                        <TableCell>{row.rfc_entidad}</TableCell>
                                        <TableCell>{row.nombre_socio}</TableCell>
                                        <TableCell>{row.curp_socio}</TableCell>
                                        <TableCell>{row.rfc_socio}</TableCell>
                                        <TableCell>{row.lugar_nacimiento_socio.entidad.nom_ent+'. '+row.lugar_nacimiento_socio.pais.valor}</TableCell>
                                        <TableCell>{row.fecha_nacimiento_socio}</TableCell>
                                        <TableCell>{row.porcentaje_participacion}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
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

export default withStyles(styles)(SociosComerciales);
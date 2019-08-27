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
class OtrasPartes extends  React.Component{
    render(){
        const {otrasPartes,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre/Denominación parte</TableCell>
                            <TableCell>Tipo relación</TableCell>
                            <TableCell>Fecha inicio</TableCell>
                            <TableCell>Nacionalidades</TableCell>
                            <TableCell>CURP</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>Fecha nacimiento</TableCell>
                            <TableCell>Ocupación</TableCell>
                            <TableCell>Tiene intereses</TableCell>
                            <TableCell>sector/industria</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            otrasPartes.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.nombre_denominacion_parte}</TableCell>
                                         <TableCell>{row.tipo_relacion.valor}</TableCell>
                                        <TableCell>{row.fecha_inicio_relacion}</TableCell>
                                        <TableCell>{row.nacionalidades.map(n=>{return n.valor+','})}</TableCell>
                                        <TableCell>{row.curp}</TableCell>
                                        <TableCell>{row.rfc}</TableCell>
                                        <TableCell>{row.fecha_nacimiento}</TableCell>
                                        <TableCell>{row.ocupacion}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.tiene_intereses} value="checkedE" /></TableCell>
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

export default withStyles(styles)(OtrasPartes);
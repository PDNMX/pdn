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
class Apoyos extends  React.Component{
    render(){
        const {apoyos,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Programa</TableCell>
                            <TableCell>Es beneficiario</TableCell>
                            <TableCell>Institución otorgante</TableCell>
                            <TableCell>Nivel/Orden gobierno</TableCell>
                            <TableCell>Tipo apoyo</TableCell>
                            <TableCell>Valor anual</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            apoyos.map((row,index=0) => {
                                console.log("ROW: ",row);
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.programa}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.es_beneficiario} value="checkedE" /></TableCell>
                                        <TableCell>{row.institucion_otorgante}</TableCell>
                                        <TableCell>{row.nivel_orden_gobierno.valor}</TableCell>
                                        <TableCell>{row.tipo_apoyo.valor}</TableCell>
                                        <TableCell>{row.valor_anual_apoyo}</TableCell>
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

export default withStyles(styles)(Apoyos);
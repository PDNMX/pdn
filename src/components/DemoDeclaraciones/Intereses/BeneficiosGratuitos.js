import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
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
class BeneficiosGratuitos extends  React.Component{
    render(){
        const {beneficios,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo beneficio</TableCell>
                            <TableCell>Origen</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Valor</TableCell>
                           <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            beneficios.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_beneficio.valor}</TableCell>
                                        <TableCell>{row.origen_beneficio}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.valor_beneficio}</TableCell>
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

export default withStyles(styles)(BeneficiosGratuitos);
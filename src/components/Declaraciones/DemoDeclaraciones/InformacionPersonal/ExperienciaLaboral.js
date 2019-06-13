import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Table from "@material-ui/core/Table/Table";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";

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

class ExperienciaLaboral extends React.Component {

    render() {
        const {classes, experiencias} = this.props;
        return (
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ámbito</TableCell>
                            <TableCell>Nivel gobierno</TableCell>
                            <TableCell>Poder</TableCell>
                            <TableCell>Institución</TableCell>
                            <TableCell>Unidad</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Jerarquía</TableCell>
                            <TableCell>Cargo/Puesto</TableCell>
                            <TableCell>Fecha ingreso</TableCell>
                            <TableCell>Fecha salida</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Funciones principales</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            experiencias.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.ambito.valor}</TableCell>
                                        <TableCell>{row.nivel_gobierno.valor}</TableCell>
                                        <TableCell>{row.poder_ente.valor}</TableCell>
                                        <TableCell>{row.nombre_institucion}</TableCell>
                                        <TableCell>{row.unidad_administrativa}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.jerarquia_rango}</TableCell>
                                        <TableCell>{row.cargo_puesto}</TableCell>
                                        <TableCell>{row.fecha_ingreso}</TableCell>
                                        <TableCell>{row.fecha_salida}</TableCell>
                                        <TableCell>{row.direccion.vialidad.tipo_vial+' '+row.direccion.vialidad.nom_vial+ ' No.ext: '
                                                +row.direccion.numExt+' No.int:'+row.direccion.numInt+ ' '+row.direccion.localidad.nom_loc
                                            +', '+row.direccion.municipio.nom_mun+', '+", "+row.direccion.entidad_federativa.nom_ent
                                        +". "+row.direccion.pais.valor+". C.P."+row.direccion.cp
                                                }
                                    </TableCell>
                                        <TableCell>{row.funciones_principales.map(item=>item.valor+" ")}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default withStyles(styles)(ExperienciaLaboral);
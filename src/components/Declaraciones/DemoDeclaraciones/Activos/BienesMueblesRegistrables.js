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
class BienesMueblesRegistrables extends  React.Component{
    render(){
        const {bienesMuebles,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Tipo bien</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Submarca</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Numero serie</TableCell>
                            <TableCell>Lugar registro</TableCell>
                            <TableCell>Titular</TableCell>
                            <TableCell>Porcentaje propiedad</TableCell>
                            <TableCell>Copropietarios</TableCell>
                            <TableCell>Registro vehicular</TableCell>
                            <TableCell>Forma adquisición</TableCell>
                            <TableCell>Nombre/Denominación adquirio</TableCell>
                            <TableCell>RFC adquirio</TableCell>
                             <TableCell>Relación</TableCell>
                            <TableCell>sector/industria</TableCell>
                            <TableCell>Fecha adquisición</TableCell>
                            <TableCell>Precio adquisición</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bienesMuebles.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.tipo_bien_mueble.valor}</TableCell>
                                        <TableCell>{row.marca}</TableCell>
                                        <TableCell>{row.submarca}</TableCell>
                                        <TableCell>{row.modelo}</TableCell>
                                        <TableCell>{row.numero_serie}</TableCell>
                                        <TableCell>{row.lugar_registro.entidad.nom_agee+' .'+row.lugar_registro.pais.valor}</TableCell>
                                        <TableCell>{row.titular_bien.valor}</TableCell>
                                        <TableCell>{row.porcentaje_propiedad}</TableCell>
                                        <TableCell>{row.nombres_copropietarios.map(n=>{return n.toString()+' ,'})}</TableCell>
                                        <TableCell>{row.numero_registro_vehicular}</TableCell>
                                        <TableCell>{row.forma_adquisicion.valor}</TableCell>
                                        <TableCell>{row.nombre_denominacion_adquirio}</TableCell>
                                        <TableCell>{row.rfc_quien_adquirio}</TableCell>
                                        <TableCell>{row.relacion_persona_quien_adquirio.valor}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.fecha_adquisicion}</TableCell>
                                        <TableCell>{row.precio_adquisicion.valor +' '+row.precio_adquisicion.moneda.moneda}</TableCell>
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

export default withStyles(styles)(BienesMueblesRegistrables);
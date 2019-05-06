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
class BienesInmuebles extends  React.Component{
    render(){
        const {bienesInmuebles,classes} = this.props;
        return(
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo operación</TableCell>
                            <TableCell>Tipo bien</TableCell>
                            <TableCell>Superficie terreno</TableCell>
                            <TableCell>Superficie construcción</TableCell>
                            <TableCell>Porcentaje propiedad</TableCell>
                            <TableCell>Copropietario</TableCell>
                            <TableCell>Numero escritura pública</TableCell>
                            <TableCell>Numero registro público</TableCell>
                            <TableCell>Folio real</TableCell>
                            <TableCell>Fecha contrato</TableCell>
                            <TableCell>Domicilio</TableCell>
                            <TableCell>Forma adquisición</TableCell>
                            <TableCell>Nombre/Denominación adquirio</TableCell>
                            <TableCell>RFC adquirio</TableCell>
                            <TableCell>CURP adquirio</TableCell>
                            <TableCell>Relación</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Fecha adquisición</TableCell>
                            <TableCell>Precio adquisición</TableCell>
                            <TableCell>Valor catastral</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bienesInmuebles.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_operacion.valor}</TableCell>
                                        <TableCell>{row.tipo_bien.valor}</TableCell>
                                        <TableCell>{row.superficie_terreno}</TableCell>
                                        <TableCell>{row.superficie_construccion}</TableCell>
                                        <TableCell>{row.porcentaje_propiedad}</TableCell>
                                        <TableCell>{row.nombre_copropietario.nombres+' '+row.nombre_copropietario.primer_apellido+' '+row.nombre_copropietario.segundo_apellido}</TableCell>
                                        <TableCell>{row.identificacion_bien.numero_escritura_publica}</TableCell>
                                        <TableCell>{row.identificacion_bien.numero_registro_publico}</TableCell>
                                        <TableCell>{row.identificacion_bien.folio_real}</TableCell>
                                        <TableCell>{row.identificacion_bien.fecha_contrato}</TableCell>
                                        <TableCell>{row.domicilio_bien.vialidad.tipo_vial+' '+row.domicilio_bien.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio_bien.numExt+' No.int:'+row.domicilio_bien.numInt+ ' '+row.domicilio_bien.localidad.nom_loc
                                        +', '+row.domicilio_bien.municipio.nom_mun+', '+", "+row.domicilio_bien.entidad_federativa.nom_ent
                                        +". "+row.domicilio_bien.pais.valor+". C.P."+row.domicilio_bien.cp
                                        }
                                        </TableCell>
                                        <TableCell>{row.forma_adquisicion.valor}</TableCell>
                                        <TableCell>{row.nombre_denominacion_quien_adquirio}</TableCell>
                                        <TableCell>{row.rfc_quien_adquirio}</TableCell>
                                        <TableCell>{row.curp_quien_adquirio}</TableCell>
                                        <TableCell>{row.relacion_persona_adquirio.valor}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell>{row.fecha_adquisicion}</TableCell>
                                        <TableCell>{row.precio_adquisicion.valor +' '+row.precio_adquisicion.moneda.moneda}</TableCell>
                                        <TableCell>{row.valor_catastral}</TableCell>
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

export default withStyles(styles)(BienesInmuebles);
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table/Table";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

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

class DependientesEconomicos extends React.Component {

    render() {
        const {classes, dependientes} = this.props;
        return (
            <div className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Relación</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Nacionalidad</TableCell>
                            <TableCell>CURP</TableCell>
                            <TableCell>RFC</TableCell>
                            <TableCell>Fecha nacimiento</TableCell>
                            <TableCell>Identificación nacional</TableCell>
                            <TableCell>¿Domicilio declarante?</TableCell>
                            <TableCell>Domicilio</TableCell>
                            <TableCell>Ingresos propios</TableCell>
                            <TableCell>Ocupación/Profesión</TableCell>
                            <TableCell>Sector/Industria</TableCell>
                            <TableCell>Proveedor/Contratista gobierno</TableCell>
                            <TableCell>¿Intereses en mismo sector?</TableCell>
                            <TableCell>¿Cabildeo?</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dependientes.map((row,index=0) => {
                                return(
                                    <TableRow key={index++}>
                                        <TableCell>{row.tipo_relacion.valor}</TableCell>
                                        <TableCell>{row.nombres + ' '+row.primer_apellido+' '+row.segundo_apellido+' '}</TableCell>
                                        <TableCell>{row.nacionalidades.map(item=>{return item.valor+', '})}</TableCell>
                                        <TableCell>{row.curp}</TableCell>
                                        <TableCell>{row.rfc}</TableCell>
                                        <TableCell>{row.fecha_nacimiento}</TableCell>
                                        <TableCell>{row.numero_identificacion_nacional}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.habita_domicilio_declarante} value="checkedE" /></TableCell>
                                        <TableCell>{row.domicilio.vialidad.tipo_vial+' '+row.domicilio.vialidad.nom_vial+ ' No.ext: '
                                        +row.domicilio.numExt+' No.int:'+row.domicilio.numInt+ ' '+row.domicilio.localidad.nom_loc
                                        +', '+row.domicilio.municipio.nom_mun+', '+", "+row.domicilio.entidad_federativa.nom_ent
                                        +". "+row.domicilio.pais.valor+". C.P."+row.domicilio.cp
                                        }
                                        </TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.ingresos_propios} value="checkedE" /></TableCell>
                                        <TableCell>{row.ocupacion_profesion}</TableCell>
                                        <TableCell>{row.sector_industria.valor}</TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.proveedor_contratista_gobierno} value="checkedE" /></TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.tiene_intereses_mismo_sector_declarante} value="checkedE" /></TableCell>
                                        <TableCell><Checkbox disabled checked =  {row.desarrolla_cabildeo_sector_declarante} value="checkedE" /></TableCell>
                                        <TableCell>{row.observaciones}</TableCell>
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

export default withStyles(styles)(DependientesEconomicos);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import IconSubdirectory from "@material-ui/icons/SubdirectoryArrowRight";
import Tooltip from "@material-ui/core/Tooltip";
import IconSunny from "@material-ui/icons/WbSunny";

const styles = theme => ({

    table: {
        tableLayout: 'fixed',
    },
    gridTable: {
        marginBottom: '27px',
        color: theme.palette.textGrey.color
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
    },
    iconoVer:{
        color: theme.palette.secondary.dark
    },
    tableHead: {
        color: theme.palette.fontLight.color
    },
});

class Previos extends React.Component {


    render() {
        const {previos,classes} = this.props;
        return (
            <div>
                <Grid container justify='center' spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>
                        {previos && previos.length > 0 &&
                        <Typography variant="body1" >Pulsa en <IconSubdirectory className={classes.iconoVer}/> para ver el detalle<br/></Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {previos && previos.length > 0 &&
                        <div className={classes.container}>
                            <Table className={classes.table}>
                                <TableHead style={{backgroundColor:'rgb(52, 179, 235)'}}>
                                    <TableRow>
                                        <TableCell align="left" variant={"body1"} className={classes.tableHead}>Sujeto obligado</TableCell>
                                        <TableCell align="center" variant={"body1"} className={classes.tableHead}>Estatus</TableCell>
                                        <TableCell align="center" variant={"body1"} className={classes.tableHead}>Número de registros</TableCell>
                                        <TableCell align="center" variant={"body1"} className={classes.tableHead}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{backgroundColor:'#f2f2f2'}}>
                                    {previos.map(row => (
                                        <TableRow key={row.sujeto_obligado}>
                                            <TableCell align="left">{row.sujeto_obligado}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={row.estatus?" Conectado":" No conectado"}>
                                                    <IconSunny color={row.estatus?"primary":"disabled"}/>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">{row.totalRows}</TableCell>
                                            <TableCell align="center">
                                                {row.estatus  && row.totalRows>0 &&
                                                <Tooltip title={"Ver"}>
                                                    <IconSubdirectory className={classes.iconoVer} onClick={()=>{
                                                        this.props.handleChangeAPI(row.clave_api);
                                                    }}/>
                                                </Tooltip>

                                                }
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        }

                    </Grid>

                </Grid>
            </div>
        );
    }

}


Previos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Previos);

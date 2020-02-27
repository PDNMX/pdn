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
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Tooltip from "@material-ui/core/Tooltip";
import IconSunny from "@material-ui/icons/WbSunny";
import Fab from "@material-ui/core/Fab";

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
    tableCell: {
        color: theme.palette.fontLight.color
    },
    tableHead: {
      backgroundColor: "#34B3EB"
    },
    tableBody:{
        backgroundColor: '#f2f2f2'
    },
    fab: {
        margin: theme.spacing(1),
        backgroundColor: '#ffe01b'
    }
});

class TablaResumen extends React.Component {

    render() {
        const {
            summaryData,
            classes,
            handleSearchSupplier
        } = this.props;

        return (
            <div>
                {summaryData && summaryData.length > 0 &&
                <Grid container justify='center' spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>

                        <Typography variant="body1" paragraph>
                            La siguiente tabla muestra un resumen de resultados por cada Proveedor de información
                            disponible. Pulsa en <SubdirectoryArrowRightIcon/> para ver más
                        </Typography>

                    </Grid>

                    <Grid item xs={12}>
                        <div className={classes.container}>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell align="left" variant={"head"} className={classes.tableCell}>
                                            <Typography variant={"body1"}>Nivel</Typography>
                                        </TableCell>
                                        <TableCell align="left" variant={"head"} className={classes.tableCell}>
                                            <Typography variant={"body1"}> Proveedor de información</Typography>
                                        </TableCell>
                                        <TableCell align="center" variant={"head"} className={classes.tableCell}>
                                            <Typography variant={"body1"}>Estatus</Typography>
                                        </TableCell>
                                        <TableCell align="center" variant={"head"} className={classes.tableCell}>
                                            <Typography variant={"body1"}>Número de registros</Typography>
                                        </TableCell>
                                        <TableCell align="center" variant={"head"} className={classes.tableCell}>
                                            <Typography variant={"body1"}>Acciones</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className={classes.tableBody}>
                                    {summaryData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{row.levels}</TableCell>
                                            <TableCell align="left">{row.supplier_name}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={row.error ? " No conectado" : " Conectado"}>
                                                    <IconSunny color={row.error ? "disabled" : "primary"}/>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">{row.totalRows}</TableCell>
                                            <TableCell align="center">
                                                {row.error? "No disponible":
                                                    <Tooltip title={"Ver"}>
                                                        <Fab size="small" className={classes.fab} onClick={() => {
                                                            handleSearchSupplier(row.supplier_id);
                                                        }}>
                                                            <SubdirectoryArrowRightIcon/>
                                                        </Fab>
                                                    </Tooltip>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Grid>
                </Grid>
                }
            </div>
        );
    }
}

TablaResumen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablaResumen);

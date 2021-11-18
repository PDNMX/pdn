import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Tooltip from "@mui/material/Tooltip";
import IconSunny from "@mui/icons-material/WbSunny";
import Fab from "@mui/material/Fab";

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

const TablaResumen = props => {

    const {
        summaryData,
        classes,
        handleSearchSupplier
    } = props;

    return (
        <div>
            {summaryData && summaryData.length > 0 &&
            <Grid container justifyContent='center' spacing={0} className={classes.gridTable}>
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

export default withStyles(styles)(TablaResumen);

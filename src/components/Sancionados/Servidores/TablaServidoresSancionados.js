import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import BusquedaServidor from "./BusquedaServidor";
import DetalleServidorSancionado2 from "./DetalleServidorSancionado";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal";
import rp from "request-promise";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";
import MensajeNoRegistros from "../../Tablas/MensajeNoRegistros";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import Previos from "../../Tablas/Previos";
import Descarga from "../../Compartidos/Descarga";
import TableHead from "@material-ui/core/TableHead";
import Paper from '@material-ui/core/Paper';


const columnData = [
    {id: 'expediente', label: 'Expediente'},
    {id: 'servidorPublico.nombreCompleto', label: 'Servidor público'},
    {id: 'institucion.nombre', label: 'Institución/Dependencia'},
    {id: 'tipoSancion', label: 'Tipo sanción'}
];

const styles = theme => ({
    progress: {
        position: 'fixed',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
    },
    section: {
        maxWidth: '1200px',
        overflowX: 'auto',
        padding: theme.spacing(1)
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px',
        padding: theme.spacing(1)
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    containerPrevios: {
        marginLeft: theme.spacing(2)
    },
    ul: {
        listStyle: "none",
        paddingLeft: "20px"
    },
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        backgroundColor: "white"
    },
    toolBarStyle: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 3,
        paddingTop: '53px',
        paddingBottom: '61px',
        maxWidth: '1200px',
    },
    li: {
        "&:before": {
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
    },
    itemD: {
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    },
    containerD: {
        backgroundColor: '#fff'
    },
});

class TablaServidoresSancionados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            /*filterData: null,*/
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: null,
            loading: false,
            totalRows: 0,
            error: false,
            previos: [],
            //       panelPrevios: true,
            api: '',
            //Filtros
            /* nombresServidor: '',
             primerApellido: '',
             segundoApellido: '',
             tipoSancion: [],
             rfc: '',
             curp: '',
             institucionDependencia: "",
             nivel: 'todos',
             campoOrden: '',
             tipoOrden: '',
             institucionesLista: []
             */
        };

    }

    setStateP = (varState, val) => {
        this.setState({
            [varState]: val
        })
    }
    handleChangeDetail = () => {
        this.setState({elementoSeleccionado: null});
    };

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento, open: true});
    };


    isSelected = id => this.state.selected.indexOf(id) !== -1;


    render() {
        const {classes, data, rowsPerPage, page, totalRows} = this.props;
        return (
            <div>
                {(data && data.length <= 0) &&
                <MensajeNoRegistros/>
                }

                {
                    data && data.length > 0 &&
                    <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                        detalle<br/></Typography>
                }
                {
                    data && data.length > 0 &&
                        <Table>
                            <TableHead style={{backgroundColor: '#f5f5f5'}}>
                                <TableRow>
                                    {
                                        columnData.map(column => {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                >
                                                    <Typography className={classes.tableHead}
                                                                variant={"body1"}>
                                                        {column.label}
                                                    </Typography>
                                                </TableCell>
                                            );

                                            return true;
                                        }, this)
                                    }
                                    {
                                        this.props.acciones &&
                                        <TableCell>
                                            {
                                                <Typography className={classes.tableHead} variant={"body1"}>
                                                    Acciones
                                                </Typography>
                                            }
                                        </TableCell>
                                    }

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.props.verDetalle(event, n)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell component="th" scope="row"
                                                           padding="default">{n.expediente}</TableCell>
                                                <TableCell>{n.servidorPublicoSancionado.nombres + " " + n.servidorPublicoSancionado.primerApellido + " " + n.servidorPublicoSancionado.segundoApellido}</TableCell>
                                                <TableCell>{n.institucionDependencia.nombre}</TableCell>
                                                <TableCell
                                                    style={{width: '25%'}}>{n.tipoSancion.join(', ')}</TableCell>

                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        className={classes.tablePagination}
                                        colSpan={4}
                                        count={totalRows}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.props.handleChangePage}
                                        onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                                        labelRowsPerPage='Registros por página'
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} de ${count}`;
                                        }}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                }
            </div>
        )
            ;
    }
}


export default withStyles(styles)(TablaServidoresSancionados);

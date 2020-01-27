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
import DetalleServidorSancionado2 from "./DetalleServidorSancionado2";
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

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.btnDownloadAll = React.createRef();
        this.state = {
            selected: [],
            filterData: null,
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: null,
            loading: false,
            totalRows: 0,
            error: false,
            previos: [],
            panelPrevios: true,
            api: '',
            //Filtros
            nombresServidor: '',
            primerApellido: '',
            segundoApellido: '',
            tipoSancion: [],
            rfc: '',
            curp: '',
            institucionDependencia: "",
            nivel: 'todos',
            campoOrden: "",
            tipoOrden: '',
            institucionesLista: []
        };

    }

    componentDidMount() {
        this.loadInstituciones();
    }

    handleChange = () => {
        this.setState({
            panelPrevios: !this.state.panelPrevios
        })
    }

    handleError = (val) => {
        this.setState({
            error: val
        })
    }

    handleChangeDetail = () => {
        this.setState({elementoSeleccionado: null});
    };

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento, open: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.handleSearchAPI('CHANGE_PAGE');
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value}, () => {
            this.handleSearchAPI('FIELD_FILTER');
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    makeFiltros = () => {
        let filtros = {};
        let {institucionDependencia, nombresServidor, primerApellido, segundoApellido, rfc, curp, tipoSancion} = this.state;
        if (nombresServidor) filtros.nombres = nombresServidor;
        if (primerApellido) filtros.primer_apellido = primerApellido;
        if (segundoApellido) filtros.segundo_apellido = segundoApellido;
        if (rfc) filtros.rfc = rfc;
        if (curp) filtros.curp = curp;
        if (institucionDependencia && institucionDependencia !== '') filtros.nombre = institucionDependencia;
        if (tipoSancion.length > 0) filtros.tipoSancion = tipoSancion.map(item => item.value);
        return filtros;
    }

    handleSearchPrevios = () => {
        this.setState({
            loading: true,
            filterData: null,
            previos: null,
        });
        let body =
            {
                "filtros": this.makeFiltros(),
                "limit": 1,
                "offset": 0,
                "nivel": this.state.nivel
            };

        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getPrevioServidoresSancionados',
            json: true,
            body: body
        };
        rp(options)
            .then(res => {
                this.setState({previos: res, loading: false, error: false})
            }).catch(err => {
            this.setState({loading: false, error: true});
        });
    };
    handleSearchAPI = (typeSearch) => {
        this.setState({loading: true});
        let body =
            {
                "filtros": this.makeFiltros(),
                "limit": this.state.rowsPerPage,
                "offset": (typeSearch === 'CHANGE_PAGE') ? (this.state.rowsPerPage * this.state.page) : 0,
                "clave_api": this.state.api
            };

        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getServidoresSancionados',
            json: true,
            body: body
        };

        rp(options)
            .then(res => {
                this.setState({
                    filterData: res.data,
                    loading: false,
                    totalRows: res.totalRows
                })
            }).catch(err => {
            this.setState({loading: false, error: true});
        });
    };

    handleChangeAPI = (val) => {
        this.setState({
            api: val,
            page: 0
        }, () => {
            this.handleSearchAPI('FIELD_FILTER')
        });
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        }, () => {
            if (varState === 'nivel') this.loadInstituciones();
        })
    };
    handleCleanAll = () => {
        this.setState(
            {
                filterData: null,
                previos: null,
                nivel: 'todos',
                tipoSancion: [],
                nombreServidor: '',
                institucionDependencia: '',
                primerApellido: '',
                segundoApellido: '',
                rfc: '',
                curp: '',
                campoOrden: '',
                tipoOrden: ''
            }, () => {
                this.loadInstituciones();
            })
    };
    loadInstituciones = () => {
        let sug = [];
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getDependenciasServidores',
            json: true,
            method: "post",
            body: {
                nivel: this.state.nivel
            }
        };
        rp(options)
            .then(data => {
                data.data.forEach((item, index) => {
                    sug.push({value: item, label: item, key: index});
                });
                this.setState({institucionesLista: sug, institucionDependencia: ''});
            }).catch(err => {
            this.props.handleError(true);
        });
    }

    render() {
        const {classes} = this.props;
        const {rowsPerPage, page, filterData, totalRows} = this.state;

        return (
            <div>
                {
                    this.state.elementoSeleccionado === null &&
                    <div>
                        <Grid container spacing={0} className={classes.infoBusqueda}>
                            <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                                <Typography paragraph>
                                    <b>Aquí encontrarás la siguiente información:</b>
                                </Typography>
                                <ul className={classes.ul}>
                                    <li className={classes.li}><Typography color="textPrimary" display='inline'>Consulta
                                        los servidores sancionados (inhabilitados) por institución, a nivel federal y/o
                                        estatal</Typography></li>
                                    <li className={classes.li}>
                                        <Typography color="textPrimary" display='inline'>
                                            Obtén datos del servidor como: nombre, puesto, institución donde cometió la
                                            falta
                                        </Typography>
                                    </li>
                                    <li className={classes.li}>
                                        <Typography color="textPrimary" display='inline'>
                                            Obtén los datos de la sanción impuesta al servidor: plazo, tipo de falta,
                                            causa,
                                            etc.
                                        </Typography>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                        <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                            <Grid item xs={12} className={classes.toolBarStyle}>
                                <BusquedaServidor handleCleanAll={this.handleCleanAll}
                                                  handleSearch={this.handleSearchPrevios}
                                                  handleChangeCampo={this.handleChangeCampo}
                                                  nombreServidor={this.state.nombresServidor}
                                                  apellidoUno={this.state.primerApellido}
                                                  apellidoDos={this.state.segundoApellido}
                                                  institucion={this.state.institucionDependencia} rfc={this.state.rfc}
                                                  curp={this.state.curp} handleError={this.handleError}
                                                  nivel={this.state.nivel}
                                                  institucionesLista={this.state.institucionesLista}
                                                  tipoSancion={this.state.tipoSancion}
                                                  campoOrden={this.state.campoOrden} tipoOrden={this.state.tipoOrden}/>
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    this.state.loading &&
                                    <Modal
                                        open={this.state.loading}
                                        disableAutoFocus={true}
                                    >
                                        <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                                    </Modal>

                                }
                                {
                                    this.state.error && <MensajeErrorDatos/>
                                }
                            </Grid>
                            <Grid item xs={12} className={classes.section}>
                                {this.state.previos && this.state.previos.length > 0 &&
                                <div>
                                    <FormControlLabel
                                        control={<Switch className={classes.containerPrevios}
                                                         checked={this.state.panelPrevios}
                                                         onChange={() => this.handleChange()}/>}
                                        label={
                                            <Typography variant="h6" className={classes.desc}>
                                                {this.state.panelPrevios ? 'Ocultar resultados generales' : 'Mostrar resultados generales'}</Typography>}
                                    />
                                    <div className={classes.container}>
                                        <Collapse in={this.state.panelPrevios}>
                                            <Previos previos={this.state.previos}
                                                     handleChangeAPI={this.handleChangeAPI}/>
                                        </Collapse>

                                    </div>
                                </div>
                                }

                            </Grid>
                            <Grid item xs={12} className={classes.section}>
                                {(filterData && filterData.length <= 0) &&
                                <MensajeNoRegistros/>
                                }

                            </Grid>
                            <Grid item xs={12} className={classes.section}>
                                {filterData && filterData.length > 0 &&
                                <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                                    detalle<br/></Typography>
                                }

                            </Grid>
                            <Grid item xs={12} className={classes.section}>
                                {filterData && filterData.length > 0 &&
                                <div className={classes.container}>
                                    <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                                           aria-busy={this.state.loading} aria-labelledby="tableTitle">
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
                                            {filterData
                                                .map(n => {
                                                    const isSelected = this.isSelected(n.id);
                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={event => this.handleClick(event, n)}
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
                                                    onChangePage={this.handleChangePage}
                                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    labelRowsPerPage='Registros por página'
                                                    labelDisplayedRows={({from, to, count}) => {
                                                        return `${from}-${to} de ${count}`;
                                                    }}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                                }

                            </Grid>


                        </Grid>
                        <Grid container spacing={0} justify="center" className={classes.containerD}
                              style={{backgroundColor: '#f6f6f6'}}>
                            <Grid item xs={12} className={classes.itemD}>
                                <Descarga url={process.env.REACT_APP_BULK_S3_SERVIDORES}/>
                            </Grid>
                        </Grid>
                    </div>
                }
                {
                    this.state.elementoSeleccionado !== null &&
                    <DetalleServidorSancionado2 handleChangeDetail={this.handleChangeDetail}
                                                servidor={this.state.elementoSeleccionado}
                                                control={this.state.open}/>
                }
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);

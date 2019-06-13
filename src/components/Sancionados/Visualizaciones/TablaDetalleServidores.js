import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../../Tablas/BajarCSV";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import Typography from "@material-ui/core/Typography/Typography";
import DetalleServidorSancionado from "../Servidores/DetalleServidorSancionado";
import Modal from "@material-ui/core/Modal/Modal";

let counter = 0;

let createData = (item) => {
    let leyenda = "NO EXISTE DATO EN LA BASE DE DATOS RSPS";
    counter += 1;
    return {
        id: counter,
        servidor: item.servidor_publico ? item.servidor_publico : leyenda,
        institucion: item.dependencia ? item.dependencia : leyenda,
        autoridad: item.autoridad ? item.autoridad : leyenda,
        expediente: item.expediente ? item.expediente : leyenda,
        fecha_resolucion: item.fecha_resolucion ? item.fecha_resolucion : leyenda,
        sancion_impuesta: item.sancion_impuesta ? item.sancion_impuesta : leyenda,
        fecha_inicio: item.inicio ? item.inicio : leyenda,
        fecha_fin: item.fin ? item.fin : leyenda,
        monto: item.monto ? item.monto : leyenda,
        causa: item.causa ? item.causa : leyenda
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'servidor',disablePadding: false, label: 'Servidor público', position: 1, mostrar: true},
    {id: 'institucion',  disablePadding: false, label: 'Institución', position: 2, mostrar: true},
    {id: 'autoridad', disablePadding: false, label: 'Autoridad', position: 3, mostrar: true},
    {id: 'expediente', disablePadding: false, label: 'Expediente', position: 4, mostrar: true},
    {
        id: 'fecha_resolucion',
        disablePadding: false,
        label: 'Fecha resolución',
        position: 5,
        mostrar: false
    },
    {
        id: 'sancion_impuesta',
        disablePadding: false,
        label: 'Sanción impuesta',
        position: 6,
        mostrar: false
    },
    {id: 'fecha_inicio', disablePadding: false, label: 'Fecha inicio', position: 7, mostrar: false},
    {id: 'fecha_fin',  disablePadding: false, label: 'Fecha fin', position: 8, mostrar: false},
    {id: 'monto', disablePadding: false, label: 'Monto', position: 9, mostrar: false},
    {id: 'causa',  disablePadding: false, label: 'Causa', position: 10, mostrar: false},
    {id: 'constancia',  disablePadding: true, label: 'Constancia', position: 11, mostrar: false}
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    tableWrapper: {
        overflowX: 'scroll',
    },
    tableFooter: {
        display: 'flow-root',
        flexWrap: 'wrap',
    },
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
        overflowX: 'auto'
    },
    table: {
        tableLayout: 'fixed',
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px'
    },
    titleTable: {
        marginBottom: '61px'
    },
    desc: {
        color: theme.palette.primary.dark,
    }

});


class EnhancedTable extends React.Component {

    componentDidMount() {
        this.handleSearchAPI('FIELD_FILTER', this.props.institucion);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.institucion !== this.props.institucion) {
            this.handleSearchAPI('FIELD_FILTER', nextProps.institucion);
        }
    }


    constructor(props) {
        super(props);
        this.btnDownloadAll = React.createRef();
        this.state = {
            order: 'asc',
            orderBy: 'servidor',
            selected: [],
            nombreParticular: '',
            data: [],
            filterData: [],
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: {},
            institucion: null,
            loading: true,
            totalRows: 0,
            filterDataAll: []
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento, open: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.handleSearchAPI('CHANGE_PAGE', this.props.institucion);
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value}, () => {
            this.handleSearchAPI('FIELD_FILTER', null);
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getTotalRows = (params) => {
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/rsps?select=count=eq.exact',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                this.setState({totalRows: data[0].count, loading: false});
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });
    };
    handleSearchAPI = (type, inst) => {
        this.setState({loading: true});
        let URI = 'https://plataformadigitalnacional.org/api/rsps?';

        let params = {};
        if(inst)  params.dependencia = 'eq.' + inst;
        if(type === 'ALL' && !inst) params.dependencia = 'eq.' + this.state.institucion;
        if(type !== "ALL") params.limit = this.state.rowsPerPage;
        if(type === "CHANGE_PAGE") params.offset = (this.state.rowsPerPage * this.state.page);
        if(type !== 'ALL' && type !== "CHANGE_PAGE") this.getTotalRows(params);


        let options = {
            uri: URI,
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                if( type === 'ALL' ){
                    this.setState({data: dataAux, loading: false}, () => {
                        this.btnDownloadAll.triggerDown();
                    })
                }
                else if(type === 'FIELD_FILTER' || type === 'CHANGE_PAGE'){
                    this.setState({
                        filterData: dataAux,
                        loading: false,
                        institucion: inst
                    })
                }
                return true;
            })
            .catch(err => {
                this.setState({loading: false});
                alert("_No se pudó obtener la información");
                console.log(err);
            });

    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows} = this.state;

        return (
            <div className={classes.container}>
                <div className={classes.tableWrapper}>
                <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>
                        <DetalleServidorSancionado handleClose={this.handleClose} servidor={this.state.elementoSeleccionado}
                                                   control={this.state.open}/>
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
                    </Grid>
                    <Grid item xs={12} className={classes.titleTable}>
                        <Typography variant={'h6'} className={classes.title}>
                            Detalle</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                               aria-busy={this.state.loading} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                columnData={columnData}
                            />
                            <TableBody>
                                {filterData
                                    .sort(getSorting(order, orderBy))
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
                                                           padding="default">{n.servidor}</TableCell>
                                                <TableCell>{n.institucion}</TableCell>
                                                <TableCell>{n.autoridad}</TableCell>
                                                <TableCell>{n.expediente}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data} filtrado={false}
                                  columnas={columnData} fnSearch={this.handleSearchAPI}
                                  fileName={'Detalle'}/>
                    </Grid>
                    <Grid item md={3} xs={12}/>
                    <Grid item md={6} xs={12}>
                        <TablePagination
                            className={classes.tablePagination}
                            component="div"
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
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"caption"} style={{fontStyle: 'italic'}}>Fuente:
                            https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados</Typography>
                    </Grid>
                </Grid>
            </div>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);

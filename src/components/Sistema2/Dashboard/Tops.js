import React from 'react';
import {withStyles} from '@mui/styles';
import {Grid, Select, MenuItem, FormControl, Typography, InputLabel,Button, Alert} from '@mui/material';
import axios from 'axios';
import {BarChart} from "d3plus-react";
import ThemeV2 from "../../../ThemeV2";
import { ThemeProvider } from '@mui/material/styles';

const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    },
    item: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    formControl: {
        width: '90%'
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },

});

let color = [
    "#F44336", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336",
    "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"
];

class Tops extends React.Component {
    state = {
        ejercicio: 'any',
        ejercicios: [],
        ramo: 'any',
        ramos: [],
        institucion: 'any',
        instituciones: [],
        top: 'INSTITUCION',
        error: false
    };

    componentDidMount() {
        //OJO: todas son promises e invocan a setState por separado
        this.loadEjercicios();
        this.loadRamos();
        this.loadInstituciones();
        this.loadData();
    };

    //OJO: todas son promises e invocan a setState por separado
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.ejercicio !== this.state.ejercicio) {
            if (this.state.ejercicio)
                this.loadRamos();
            this.loadData();
        }
        if (prevState.ramo !== this.state.ramo) {
            if (this.state.ramo)
                this.loadInstituciones();
            this.loadData();
        }
        if(prevState.institucion !== this.state.institucion){
            this.loadData();
        }
        if(prevState.top !== this.state.top){
            this.loadData();
        }
    }

    // No debería hacer setState
    loadEjercicios = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getEjercicios',
            json: true,
            method: "get"
        };

        axios(options).then(res => {
            let ejercicios = res.data.data.map( (item, index) => ({id: index, ejercicio: item.ejercicio}));
            this.setState({ejercicios: ejercicios});
        }).catch(err => {
            console.log(err);
            this.setState({error: true});
        })
    };

    // No debería hacer setState
    loadRamos = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getRamos',
            json: true,
            method: "post",
            data: {
                filtros: this.state.ejercicio !== 'any' ? ("ejercicio= '" + this.state.ejercicio + "'") : null
            }
        };

        axios(options).then(res => {
            let ramos = res.data.data.map( (item, index) => ({id: index, ramo: item.ramo}) );
            this.setState({ramos: ramos, ramo: 'any', institucion: 'any'});
        }).catch(err => {
            console.log(err);
            this.setState({error: true});
        })
    };

    // No debería hacer setState
    loadInstituciones = () => {
        let filtros = [];
        if (this.state.ejercicio) filtros.push("ejercicio='" + this.state.ejercicio + "'");
        if (this.state.ramo) filtros.push("ramo='" + this.state.ramo + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getInstituciones',
            json: true,
            method: "post",
            data: {
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        axios(options).then(res => {
            let instituciones = res.data.data.map( (item, index) => ({id: index, institucion: item.institucion}));
            this.setState({instituciones: instituciones, institucion: 'any'});
        }).catch(err => {
            console.log(err);
            this.setState({error: true});
        })
    };

    // No debería hacer setState
    loadData = () => {
        let filtros = [];
        if (this.state.ejercicio !== "any") filtros.push("ejercicio='" + this.state.ejercicio + "'");
        if (this.state.ramo !== "any") filtros.push("ramo='" + this.state.ramo + "'");
        if (this.state.institucion !== "any") filtros.push("institucion='" + this.state.institucion + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getTop',
            json: true,
            method: "post",
            data: {
                top: this.state.top,
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        axios(options).then(res => {
            let aux = res.data.data.map(item => ({
                "top": item.top?item.top:'NO ESPECIFICADO',
                "total": parseInt(item.total,10),
                "case": item.case ? item.case : null
            }));

            this.setState({
                methods: {
                    data: aux.reverse(),
                    discrete: "y",
                    groupBy: "top",
                    x: "total",
                    y: "top",
                    yConfig: {
                        title: this.state.top === "id_procedimiento" ? "PROCEDIMIENTO" : this.state.top === "UR" ? "UNIDADES RESPONSABLES" : this.state.top,
                        tickFormat: function (d) {
                            return "";
                        },
                    },
                    xConfig: {
                        title: "NÚMERO DE REGISTROS"
                    },
                    tooltipConfig: {
                        title: this.state.top === "id_procedimiento" ? function (d) {
                            return d["case"];
                        } : function (d) {
                            return d["top"];
                        },
                        tbody: [

                            ["Número de registros: ", function (d) {
                                return d["total"]
                            }
                            ]
                        ]
                    },
                    height: 400,
                    shapeConfig: {
                        label: function (d) {
                            return d["case"] ? d["case"] : d["top"]
                        },
                        fill: (d, i) => {
                            return color[i]
                        }
                    },
                    axes: {
                        fill: "#666672"
                    },
                    title: "TOP 10 " + (this.state.top === "id_procedimiento" ? "PROCEDIMIENTO" : this.state.top === "UR" ? "UNIDADES RESPONSABLES" : this.state.top),

                }
            });
        }).catch(err => {
            console.log(err);
            this.setState({error: true})
        });
    }

    limpiarBusqueda = () => {
        this.setState({
            ejercicio: 'any',
            ramo: 'any',
            institucion: 'any',
            error: false,
            top: 'INSTITUCION',
            label: null,
        })
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : 'any'
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={ThemeV2}>
                <Grid container>
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant={"h6"} className={classes.titulo} paragraph>
                            Top 10
                        </Typography>

                        <Typography variant={"body1"} paragraph>
                            En esta gráfica puedes conocer los procedimientos, las instituciones y unidades responsables o puestos con más personas servidoras públicas en
                            contrataciones de manera general o bien podrás seleccionar por ejercicio, ramo, o institución.
                        </Typography>

                        <Typography>
                            Selecciona una categoría y da clic en el botón <b>Buscar</b>
                        </Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectEjercicio">Ejercicio</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={this.state.ejercicio}
                                    onChange={(e) => this.handleChangeCampo('ejercicio', e)}
                                    label = {'Ejercicio'}
                            >
                                <MenuItem key={'any'} value={'any'}> TODOS</MenuItem>
                                {
                                    this.state.ejercicios.map(item => {
                                        return <MenuItem key={item.ejercicio} value={item.ejercicio}>
                                            {item.ejercicio}
                                        </MenuItem>
                                    })
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectRamo">Ramo</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={this.state.ramo}
                                    onChange={(e) => this.handleChangeCampo('ramo', e)}
                                    label = {'Ramo'}
                            >
                                <MenuItem value={'any'}>TODOS</MenuItem>
                                {
                                    this.state.ramos.map(item => {
                                        return <MenuItem value={item.ramo} key={item.ramo}>
                                            {item.ramo}
                                        </MenuItem>
                                    })
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectInstitucion">Institución</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={this.state.institucion}
                                    onChange={(e) => this.handleChangeCampo('institucion', e)}
                                    label = {'Institución'}
                            >
                                <MenuItem value={'any'}>TODAS</MenuItem>
                                {
                                    this.state.instituciones.map(item => {
                                        return <MenuItem value={item.institucion} key={item.institucion}>
                                            {item.institucion}
                                        </MenuItem>
                                    })
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="selectTop">Top</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={this.state.top}
                                    onChange={(e) => this.handleChangeCampo('top', e)}
                                    label = {'Top'}
                            >
                                <MenuItem key={0} value={"id_procedimiento"}>PROCEDIMIENTO</MenuItem>
                                <MenuItem key={1} value={"INSTITUCION"}>INSTITUCIONES</MenuItem>
                                <MenuItem key={2} value={"UR"}>UNIDADES RESPONSABLES</MenuItem>
                                <MenuItem key={3} value={"PUESTO"}>PUESTOS</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={11}/>

                    <Grid item xs={12} md={1} className={classes.buttonContainer}>
                        <Button variant="contained" color="secundario" className={classes.button}
                                onClick={this.limpiarBusqueda}>
                            Limpiar
                        </Button>
                    </Grid>
                    <Grid item xs={12} id={"grafica"}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                        {
                            this.state.error &&
                            <Alert severity="error">No disponible por el momento, intente más tarde.</Alert>
                        }
                    </Grid>
                </Grid>
            </ThemeProvider>
        )
    }
}


export default withStyles(styles)(Tops);
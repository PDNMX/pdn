import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import rp from "request-promise";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";
import {BarChart} from "d3plus-react";


const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: "30px",
    },
    descripcion: {
        display: "flex",
        /* justifyContent: "center",*/
        alignItems: "center",
        marginTop: "15px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "30px"
    },
    btnDownload: {
        textAlign: "right"
    },
    formControl: {
        width: '100%'
    },
    buttonContainer: {
        textAlign: "center"
    },

});


let color = ["#F44336","#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];


class Tops extends React.Component {
    state = {
        ejercicio: null,
        ejercicios: [],
        ramo: null,
        ramos: [],
        institucion: null,
        instituciones: [],
        top: null,
        error: false
    };

    componentDidMount() {
        this.loadEjercicios();
        this.loadRamos();
        this.loadInstituciones();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.ejercicio != this.state.ejercicio) {
            this.loadRamos();
        }
        if (prevState.ramo != this.state.ramo) {
            this.loadInstituciones();
        }
    }

    loadEjercicios = () => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getEjercicios',
            json: true,
            method: "get"
        };

        rp(options).then(data => {
            let ejercicios = [];
            let idEjercicio = 0;
            data.data.forEach(item => {
                ejercicios.push({id: idEjercicio++, ejercicio: item.ejercicio});
            });
            this.setState({ejercicios: ejercicios});
        }).catch(err => {
            console.log(err);
            this.setState({error: true})
        })
    };

    loadRamos = () => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getRamos',
            json: true,
            method: "post",
            body: {
                filtros: this.state.ejercicio ? ("ejercicio= '" + this.state.ejercicio + "'") : null
            }
        };

        rp(options).then(data => {
            let ramos = [];
            let idRamo = 0;
            data.data.forEach(item => {
                ramos.push({id: idRamo++, ramo: item.ramo});
            });
            this.setState({ramos: ramos, ramo: null, institucion: null});
        }).catch(err => {
            console.log(err);
            this.setState({error: true})
        })
    };

    loadInstituciones = () => {
        let filtros = [];
        if (this.state.ejercicio) filtros.push("ejercicio='" + this.state.ejercicio + "'");
        if (this.state.ramo) filtros.push("ramo='" + this.state.ramo + "'");

        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getInstituciones',
            json: true,
            method: "post",
            body: {
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        rp(options).then(data => {
            let instituciones = [];
            let idInstitucion = 0;
            data.data.forEach(item => {
                instituciones.push({id: idInstitucion++, institucion: item.institucion});
            });
            this.setState({instituciones: instituciones, institucion: null});
        }).catch(err => {
            console.log(err);
            this.setState({error: true})
        })
    };


    limpiarBusqueda = () => {
        this.setState({
            ejercicio: null,
            ramo: null,
            institucion: null,
            error: false,
            top: null,
            label: null,
        })
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };
    loadData = () => {
        return new Promise((resolve, reject) => {
            let filtros = [];
            if (this.state.ejercicio) filtros.push("ejercicio='" + this.state.ejercicio + "'");
            if (this.state.ramo) filtros.push("ramo='" + this.state.ramo + "'");
            if (this.state.institucion) filtros.push("institucion='" + this.state.institucion + "'");

            let options = {
                uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getTop',
                json: true,
                method: "post",
                body: {
                    top: this.state.top,
                    filtros: filtros.length > 0 ? filtros : null
                }
            };

            rp(options)
                .then(data => {
                    let aux = data.data.map(item => {
                        return {
                            "top": item.top,
                            "total": parseInt(item.total),
                            "case" : item.case ? item.case : null
                        }
                    })
                    this.setState({
                        methods: {
                            data: aux.reverse(),
                            discrete: "y",
                            groupBy: "top",
                            x: "total",
                            y: "top",
                            yConfig: {
                                title: this.state.top==="id_procedimiento"?"PROCEDIMIENTO": this.state.top==="UR"?"UNIDADES RESPONSABLES": this.state.top,
                                tickFormat: function(d) {
                                    return  "";
                                },
                            },
                            xConfig: {
                                title: "NÚMERO DE REGISTROS"
                            },
                            tooltipConfig: {
                                title: this.state.top==="id_procedimiento" ? function (d) {
                                    return d["case"];
                                }: function (d) {
                                    return d["top"];
                                },
                                tbody: [

                                    ["NÚMERO DE REGISTROS: ", function (d) {
                                        return d["total"]
                                    }
                                    ]
                                ]
                            },
                            height: 400,
                            shapeConfig: {
                                label: function(d){return d["case"]? d["case"] : d["top"]},
                                fill: (d, i) => {
                                    return color[i]
                                }
                            },
                            axes: {
                                fill: "#666672"
                            },
                            title: "TOP 10 " + (this.state.top==="id_procedimiento"?"PROCEDIMIENTO": this.state.top==="UR"?"UNIDADES RESPONSABLES": this.state.top),

                        }
                    })
                    resolve(data);
                }).catch(err => {

                console.log(err);
                this.setState({error: true})
            });
        });
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Toolbar>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} className={classes.titulo}>
                                <b>{"Top 10"}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.descripcion}>
                            <Typography variant={"body1"}>
                                Debido a la gran cantidad de datos presentes, en está gráfica puedes observar el Top 10 de
                                una serie de valores representantivos como: Procedimiento, Instituciones,
                                Unidades Responsables y Puestos.<br/>
                                Adicionalmente, puedes profundizar los resultados seleccionando algún Ejercicio fiscal, Ramo o Institución
                                <br/><br/>Para comenzar, selecciona un top y da clic en el botón <b>Buscar</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectEjercicio">Ejercicio</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.ejercicio}
                                        onChange={(e) => this.handleChangeCampo('ejercicio', e)}
                                        inputProps={{
                                            name: 'campoSelectEjercicio',
                                            id: 'campoSelectEjercicio',
                                        }}
                                >
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
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectRamo">Ramo</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.ramo}
                                        onChange={(e) => this.handleChangeCampo('ramo', e)}
                                        inputProps={{
                                            name: 'campoSelectRamo',
                                            id: 'campoSelectRamo',
                                        }}
                                >
                                    <MenuItem value={null}> TODOS</MenuItem>
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
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectInstitucion">Institución</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.institucion}
                                        onChange={(e) => this.handleChangeCampo('institucion', e)}
                                        inputProps={{
                                            name: 'campoSelectInstitucion',
                                            id: 'campoSelectInstitucion',
                                        }}
                                >
                                    <MenuItem value={null} key={"all"}> TODAS</MenuItem>
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
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="selectTop">Top</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.top}
                                        onChange={(e) => this.handleChangeCampo('top', e)}
                                        inputProps={{
                                            name: 'selectTop',
                                            id: 'selectTop',
                                        }}
                                >
                                    <MenuItem key={0} value={"id_procedimiento"}>PROCEDIMIENTO</MenuItem>
                                    <MenuItem key={1} value={"INSTITUCION"}>INSTITUCIONES</MenuItem>
                                    <MenuItem key={2} value={"UR"}>UNIDADES RESPONSABLES</MenuItem>
                                    <MenuItem key={3} value={"PUESTO"}>PUESTOS</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={10}/>
                        <Grid item md={1} xs={12} className={classes.buttonContainer}>
                            <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={this.loadData}
                                    disabled={!this.state.top}>
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={1} className={classes.buttonContainer}>
                            <Button variant="contained" color="secondary" className={classes.button}
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
                                <MensajeErrorDatos/>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>

            </div>
        )
    }

}


export default withStyles(styles)(Tops);
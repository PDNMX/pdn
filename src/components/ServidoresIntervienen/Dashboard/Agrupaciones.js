import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import rp from "request-promise";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import {Treemap} from "d3plus-react";
import * as d3 from "d3";

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
});


let color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

let z = d3.scaleOrdinal()
    .range(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
        "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
        "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
        "#FF5722", "#795548", "#9E9E9E", "#607D8B"]);

class Agrupaciones extends React.Component {
    state = {
        ejercicio: null,
        ejercicios: [],
        ramo: null,
        ramos: [],
        institucion: null,
        instituciones: []
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
            alert("_No se pudó obtener la información");
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
            alert("_No se pudó obtener la información");
        })
    };

    loadInstituciones = () => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getInstituciones',
            json: true,
            method: "post",
            body: {
                filtros: this.state.ramo ? ("ramo='" + this.state.ramo + "'") : null
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
            alert("_No se pudó obtener la información");
        })
    };


    loadData = () => {
        return new Promise((resolve, reject) => {
            let filtros = [];
            if (this.state.ejercicio) filtros.push("ejercicio='" + this.state.ejercicio + "'");
            if (this.state.ramo) filtros.push("ramo='" + this.state.ramo + "'");
            if (this.state.institucion) filtros.push("institucion='" + this.state.institucion + "'");

            let grupos = " institucion";

            let options = {
                uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getAgrupaciones',
                json: true,
                method: "post",
                body: {
                    filtros: filtros,
                    grupos: grupos
                }
            };
            rp(options)
                .then(data => {
                    let aux2 = data.data.map(item => {
                        return {
                            "value": parseInt(item.total),
                            "subgroup": item.institucion,
                            "group": item.ramo,
                            "parent": item.ejercicio,

                        }
                    });
                    this.setState({
                        config: {
                            data: aux2,
                            height: 400,
                            groupBy: this.state.ramo?["parent", "group","subgroup"]:["parent", "group"],
                            sum: "value",
                            zoom: {
                                click: true
                            },
                            tooltipConfig: {
                                tbody: [
                                    ["Número de sanciones: ", function (d) {
                                        return d["value"]
                                    }
                                    ]
                                ]
                            },
                            legend: true,
                            shapeConfig: {
                                labelConfig: {
                                    fontMax: 18,
                                    fontMin: 10
                                },
                                fill: (d) => {
                                    return this.state.ramo? z(d.subgroup): z(d.group)
                                }
                            },
                        }
                    })
                    resolve(data);
                }).catch(err => {
                alert("_No se pudo obtener la información");
                console.log(err);
            });
        });
    }


    limpiarBusqueda = () => {
        this.setState({
            ejercicio: null,
            ramo: null,
            institucion: null
        })
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Toolbar>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} className={classes.titulo}>
                                <b>{"Agrupaciones"}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.descripcion}>
                            <Typography>
                                En esta sección podrás interactuar con diferentes variables como : Ejericio fiscal,
                                Ramo,
                                Institución.<br/>

                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
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
                                            return <MenuItem value={item.ejercicio}>
                                                {item.ejercicio}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                                    {
                                        this.state.ramos.map(item => {
                                            return <MenuItem value={item.ramo}>
                                                {item.ramo}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                                    {
                                        this.state.instituciones.map(item => {
                                            return <MenuItem value={item.institucion}>
                                                {item.institucion}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={10}/>
                        <Grid item xs={1}>
                            <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={this.loadData}>
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={1} className={classes.centrado}>
                            <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={this.limpiarBusqueda}>
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                this.state.config && this.state.config.data &&
                                <Treemap config={this.state.config}/>
                            }

                        </Grid>
                    </Grid>
                </Toolbar>

            </div>


        )
    }

}

export default withStyles(styles)(Agrupaciones);
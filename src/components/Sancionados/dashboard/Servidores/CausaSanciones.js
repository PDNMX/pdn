import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import * as d3 from "d3";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";

const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },

    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    graph: {
        marginBottom: theme.spacing(4)
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_S3S_BACKEND + '/charts/getCausasSanciones',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}


function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_S3S_BACKEND + '/charts/getCausasAnio',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}


let color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

let z = d3.scaleOrdinal()
    .range(color);
z.domain(["NEGLIGENCIA ADMINISTRATIVA", "ABUSO DE AUTORIDAD", "VIOLACION LEYES Y NORMATIVIDAD PRESUPUESTAL", "COHECHO O EXTORSION", "INCUMPLIMIENTO EN DECLARACION DE SITUACION PATRIMONIAL", "VIOLACION PROCEDIMIENTOS DE CONTRATACION", "VIOLACIÓN A LOS DERECHOS HUMANOS", "EJERCICIO INDEBIDO DE SUS FUNCIONES EN MATERIA MIGRATORIA"])

class CausasSanciones extends React.Component {
    state = {
        errorG1: false,
        errorG2: false,
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "causa": item.causa,
                    "total": parseInt(item.total, 10)
                }
            });

            this.setState({
                methods: {
                    data: aux,
                    groupBy: "causa",
                    x: "causa",
                    y: "total",
                    xConfig: {
                        title: "Año de resolución de la sanción",
                    },
                    yConfig: {
                        title: "Número de sanciones"
                    },
                    tooltipConfig: {
                        title: function (d) {
                            return "Datos";
                        },
                        tbody: [
                            ["Causa de la sanción: ", function (d) {
                                return d["causa"]
                            }
                            ],
                            ["Número de sanciones: ", function (d) {
                                return d["total"]
                            }
                            ]
                        ]
                    },
                    legend: false,
                    height: 400,
                    shapeConfig: {
                        label: false,
                        fill: (d, i) => {
                            return color[i]
                        }
                    },
                    title: "Historico"
                }
            })
        }).catch(err => {
            console.error(err);
            this.setState({errorG1: true})
        });

        loadData2().then(result => {
            let aux2 = result.data.map(item => {
                return {
                    id: item.causa,
                    y: parseInt(item.total, 10),
                    x: item.anio
                }
            });

            this.setState({
                config2: {
                    data: aux2,
                    xConfig: {
                        title: "Causa de la sanción",
                    },
                    yConfig: {
                        title: "Número de sanciones"
                    },
                    tooltipConfig: {
                        title: function (d) {
                            return "Datos";
                        },
                        tbody: [
                            ["Causa de la sanción: ", function (d) {
                                return d["id"]
                            }
                            ],
                            ["Número de sanciones: ", function (d) {
                                return d["y"]
                            }
                            ]
                        ]
                    },
                    legend: true,
                    height: 400,
                    shapeConfig: {
                        label: false,
                        fill: (d) => {
                            return z(d.id)
                        }

                    },
                    stacked: true,
                    title: "Por año"
                },

            })
        }).catch(err => {
            console.error(err);
            this.setState({errorG2: true})
        });


    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>Causa de las sanciones de 2013 a la fecha</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.graph}>
                        {
                            this.state && this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                        {this.state.errorG1 &&
                        <MensajeErrorDatos/>
                        }
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            {"Como se puede apreciar en la gráfica de la izquierda, del año 2013 a mayo 2021, la causa de la mayoría de las sanciones fue la negligencia administrativa con 743 sanciones, representando el 61.62% del total. Por otro lado, la violación a los derechos humanos y otras causas cuentan únicamente con 1 y 2 sanciones respectivamente, representando únicamente el 0.16% del total.\n"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Existe una tendencia en Negligencia administrativa, siendo esta la causa más común a lo largo del tiempo, exceptuando el 2021, en donde hasta el momento, las 5 sanciones corresponden a incumplimiento en declaración de situación patrimonial.
                            <br/>Por otro lado, se observa un aumento en el abuso de autoridad, del año 2013 con 26 sanciones al 2014 con 57 sanciones, disminuyendo en el 2018 año en que se registraron las últimas 8 sanciones de esta causa.
                            <br/>Respecto a la Violación leyes y normatividad presupuestal, los años 2013 y 2014 registraron el máximo con 33 y 35 sanciones respectivamente, disminuyendo hasta el 2019 donde se registraron únicamente dos sanciones por esta causa.
                            <br/>De manera similar, el cohecho o extorsión registró 27 y 20 sanciones en los años 2013 y 2014 respectivamente, disminuyendo a 12 y 5 en los años 2016 a 2017 respectivamente, siendo este el último año con sanciones por esta causa.
                            <br/>Por incumplimiento en declaración de situación patrimonial tuvo su pico en 2016 con 11 sanciones, para mayo 2021 se tienen registradas 5 sanciones .
                            <br/>El ejercicio indebido de sus funciones en materia migratoria tuvo su pico en 2016 con 5 sanciones, registrando en 2018 una última sanción por esta causa.
                            <br/>Por otra parte, únicamente se cuenta con una sanción por violación  a los derechos humanos y dos por otra causa no especificada en los años 2016 y 2018 respectivamente.

                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {
                            this.state && this.state.config2 && this.state.config2.data &&
                            <BarChart config={this.state.config2}/>
                        }
                        {this.state.errorG2 &&
                        <MensajeErrorDatos/>
                        }
                    </Grid>
                </Grid>

            </div>
        )
    }

}

CausasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CausasSanciones);
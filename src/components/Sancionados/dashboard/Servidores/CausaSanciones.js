import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
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
                            Como se puede apreciar en la gráfica de la izquierda, la causa de la mayoría de las sanciones firmes a enero 2022 fue la <b>negligencia administrativa</b> con 761 registros, representando el <b>62.47%</b> del total.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Algunos datos que refleja la siguiente gráfica son:
                            <ul>
                                <li>La <b>negligencia administrativa</b> es la causa de la mayoría de las inhabilitaciones firmes a enero 2022 con 761 registros, sin embargo, existe un decremento en el número de sancionados por esta causa  tomando como muestra el año 2017 con 139 sanciones en contraste con el año 2020 con tan solo 8.</li>
                                <li>En el caso del <b>abuso de autoridad</b> hay 181 registros, 55 de ellos corresponden al año 2014, en contraste con los 2 registros del año 2020, cabe señalar que en año 2019 y 2021 no hay registros que correspondan a esta causa.</li>
                                <li>El <b>cohecho o extorsión</b>, cuenta con un total de 73 registros, 27 pertenecen  a inhabilitaciones resueltas en 2013, en contraste con 1 del 2019, a partir del 2019 no se tienen más sanciones firmes por esta causa, cabe señalar que no hay sanciones firmes resueltas en el 2018 que coincidan con esta causa.</li>
                                <li>Por su parte, la <b>violación en procedimientos de contratación</b> cuenta con 58 sanciones firmes, habiendo sido resueltas en su mayoría (22) en el año 2015, a partir del año 2017 no hay más registros coincidentes.</li>
                                <li>A causa de <b>ejercicio indebido de sus funciones en materia migratoria</b> hay 7 sanciones firmes a enero 2022, 4 resueltas en 2016, 2 en 2017 y 1 en 2018.</li>
                            </ul>
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
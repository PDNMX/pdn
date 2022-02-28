import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import 'react-vis/dist/style.css';
// import VerticalBarSeries from "react-vis/es/plot/series/vertical-bar-series";
import * as d3 from "d3";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";


const styles = theme => ({
    frameChart: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
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
            uri: process.env.REACT_APP_S3P_BACKEND + '/charts/getSentidoSanciones',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            reject(err);
        });
    });
}


function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_S3P_BACKEND + '/charts/getSentidosAnio',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            reject(err);
        });
    });
}

let color = ["#2196F3", "#9C27B0", "#009688", "#FF9800", "#E91E63", "#FF5722"];
let z = d3.scaleOrdinal()
    .range(["#2196F3", "#9C27B0", "#009688", "#FF9800", "#E91E63", "#FF5722"]);
z.domain(["SANCIONATORIA CON MULTA E INHABILITACIÓN", "SANCIONATORIA CON MULTA", "SANCIONATORIA", "ABSOLUTORIA", "NO ESPECIFICA", "ABSOLUTORIA"])

class SentidoResoluciones extends React.Component {
    state = {
        errorG1: false,
        errorG2: false
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "x": item.sentido_de_resolucion ? item.sentido_de_resolucion : "NO ESPECIFICA",
                    "y": parseInt(item.total,10)
                }
            });
            this.setState({
                    methods: {
                        data: aux,
                        groupBy: "x",
                        x: "x",
                        y: "y",
                        xConfig: {
                            title: "Sentido de la resolución de la sanción",
                        },
                        yConfig: {
                            title: "Número de sanciones",

                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Resolución: ", function (d) {
                                    return d["x"]
                                }
                                ],
                                ["Número de resoluciones: ", function (d) {
                                    return d["y"]
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
                        title: "Historico",
                    },


                }
            )
        }).catch(err => {
            console.error(err);
            this.setState({errorG1: true})
        });

        loadData2().then(temp2 => {
            let aux2 = temp2.data.map(item => {
                return {
                    id: item.sentido_de_resolucion,
                    y: parseInt(item.total,10),
                    x: item.anio,
                }
            });
            this.setState({
                    config2: {
                        data: aux2,
                        xConfig: {
                            title: "Sentido de la resolución de la sanción",
                        },
                        yConfig: {
                            title: "Número de sanciones"
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Resolución: ", function (d) {
                                    return d["id"]
                                }
                                ],
                                ["Número de resoluciones: ", function (d) {
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
                        title: "Por año",
                    },

                }
            )
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
                            <b> Sentido de las resoluciones</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.graph}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                        {this.state.errorG1 && <MensajeErrorDatos/>}
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Se engloba el sentido de las resoluciones en: Absolutoria, Sancionatoria, Sancionatoria con multa, Sancionatoria con multa e inhabilitación, y se agrega
                            la categoría "No especifica" por aquellos registros que no incluyen dicho valor. Como muestra la gráfica de la izquierda, del 2004 a mayo 2021,
                            de las 1,974 resoluciones en total, la mayoría derivó en sanción con multa e inhabilitación (1,516 en total), seguido por sanciones con multa con un total de 427,
                            5 sancionatorias, 1 absolutoria y 24 que no especifican el sentido de la resolución.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            A lo largo del tiempo, se aprecia que del total de resoluciones por año, el mayor número de sanciones a particulares termina en Sancionatorias con multa e inhabilitación, que ha aparecido en todos los años, teniendo el año 2010 el mayor número de registros con 186 sanciones.
                            <br/>La Sancionatoria con multa se ha presentado del 2008 al 2021, teniendo mayor presencia en 2011 con 54 resoluciones.
                            <br/>De la Sancionatoria únicamente aparecen registros en 2015, 2019 y 2020, siendo el 2019 el año con mayor número de resoluciones siendo igual a 3.
                            <br/>Respecto a la Absolutoria, se tiene un único registro en 2019.

                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {
                            this.state.config2 && this.state.config2.data &&
                            <BarChart config={this.state.config2}/>
                        }
                        {this.state.errorG2 && <MensajeErrorDatos/>}
                    </Grid>

                </Grid>

            </div>
        )
    }

}

SentidoResoluciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentidoResoluciones);
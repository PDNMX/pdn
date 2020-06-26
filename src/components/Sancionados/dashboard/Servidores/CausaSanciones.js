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
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidores/getCausasSanciones',
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
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidores/getCausasAnio',
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
            this.setState({errorG2: true})
        });


    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
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
                            Como se puede apreciar en la gráfica de la izquierda, de 2013 a 2018, la causa de la mayoría de las sanciones fue la negligencia administrativa, con aproximadamente 1,500 sanciones, representando casi el 60% del total. Por otro lado, la violación por procedimientos de contratación, el cohecho o extorsión, el ejercicio indebido de sus funciones en materia migratoria y la violación a los derechos humanos representan únicamente 10% del total.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            De 2013 a 2016 la distribución entre las causas de las sanciones se mantienen similares; sin embargo, en 2017 aumentan en más del doble las sanciones por negligencia administrativa. Es decir, que en gran medida el crecimiento atípico de los funcionarios sancionados en 2017 se debe a faltas de este tipo. Para 2018 las sanciones por negligencia administrativa disminuyen considerablemente; asimismo, casi todos los otros tipos de sanción bajan a excepción de la de incumplimiento por declaración patrimonial, la cual se dispara más de 5 veces con respecto a 2017.

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
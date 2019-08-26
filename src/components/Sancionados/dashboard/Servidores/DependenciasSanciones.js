import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import {Treemap} from "d3plus-react";
import rp from "request-promise";
import * as d3 from "d3";
import MensajeErrorDatos from "../../../Tablas/MensajeErrorDatos";

const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    desc: {
        textAlign: "center"
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
    }
});


function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidores/getDependenciaMayor',
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
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidores/getSancionesAnualesDependencia',
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


let z = d3.scaleOrdinal()
    .range(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
        "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
        "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
        "#FF5722", "#795548", "#9E9E9E", "#607D8B"]);

class DependenciasSanciones extends React.Component {
    state = {
        errorG1: false,
        errorG2: false
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "value": parseInt(item.total_sanciones,10),
                    "group": item.dependencia
                }
            });


            this.setState({
                methods: {
                    data: aux,
                    height: 400,
                    groupBy: ["group"],
                    sum: "value",
                    tooltipConfig: {
                        tbody: [
                            ["Número de sanciones: ", function (d) {
                                return d["value"]
                            }
                            ]
                        ]
                    },
                    legend: false,
                    shapeConfig: {
                        label: function (d) {
                            return d["group"] + "\n" + d["value"] + " sanciones"
                        },
                        labelConfig: {
                            fontMax: 18,
                            fontMin: 10
                        },
                        fill: (d) => {
                            return z(d.group)
                        }
                    }
                }
            })
        }).catch(err => {
this.setState({errorG1: true})
        });

        loadData2().then(result2 => {
            let aux2 = result2.data.map(item => {
                return {
                    "value": parseInt(item.total,10),
                    "group": item.dependencia,
                    "parent": item.anio
                }
            });

            this.setState({
                config2: {
                    data: aux2,
                    height: 400,
                    groupBy: ["parent", "group"],
                    sum: "value",
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
                        label: function (d) {
                            return d["group"] + "\n" + d["value"] + " sanciones"
                        },
                        labelConfig: {
                            fontMax: 18,
                            fontMin: 10
                        },
                        fill: (d) => {
                            return z(d.parent)
                        }
                    },
                }
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
                            <b>{"Dependencias con mayor número de sanciones"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Con respecto a las dependencias con más sanciones, la Policía Federal, la Secretaría de
                            Educación Pública, el Instituto Mexicano del Seguro Social y la Comisión Federal de
                            Electricidad representan juntas casi el 40% del total de funcionarios sancionados.

                            Dado que en estas instituciones además laboran un número muy alto de funcionarios públicos,
                            sería relevante también tomar en cuenta el volumen de la institución para obtener la tasa de
                            sanción por dependencia. De esta manera podríamos comparar la tasa de sanción entre
                            distintas dependencias.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <Treemap config={this.state.methods}/>
                        }
                        {
                            this.state.errorG1 && <MensajeErrorDatos/>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Si, consideramos el año con más sanciones desde 2013, es decir, el 2017, podemos observar que el Fideicomiso Fondo Nacional de Habitaciones Populares, el Instituto Mexicano del Seguro Social y el Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado son las tres instituciones con más sanciones en este año. En 2018 las instituciones más sancionadas fueron la Procuraduría Federal del Consumidor y el Instituto Mexicano del Seguro Social. Dado que en estas instituciones además laboran un número muy alto de funcionarios públicos, sería relevante también tomar en cuenta el volumen de la institución para obtener la tasa de sanción por dependencia. De esta manera, podríamos comparar la tasa de sanción entre distintas dependencias.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.config2 && this.state.config2.data &&
                            <Treemap config={this.state.config2}/>
                        }
                        {
                            this.state.errorG2 && <MensajeErrorDatos/>
                        }
                    </Grid>
                </Grid>

            </div>
        )
    }

}

DependenciasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependenciasSanciones);
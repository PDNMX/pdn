import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {Treemap} from "d3plus-react";
import axios from 'axios';
import * as d3 from "d3";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";

const styles = theme => ({
    frameChart: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
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
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getDependenciaMayor',
            json: true,
            method: "GET"
        };
        axios(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            reject(err)
        });
    });
}


function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getResolucionesAnualesDependencia',
            json: true,
            method: "GET"
        };
        axios(options)
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
        errorG2: false,
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "value": parseInt(item.total,10),
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
                        },

                    }
                }
            )
        }).catch(err => {
            console.error(err);
            this.setState({errorG1: true})
        });

        loadData2().then(result2 => {
            let aux2 = result2.data.data.map(item => {
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
                            <b>{"Dependencias con mayor número de sanciones"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Con respecto a las dependencias que más sanciones dieron a particulares , de manera general, el Instituto Mexicano del Seguro Social es la dependencia que más sanciones dio con un total de 343 sanciones, seguida  por la Secretaría de la Función Pública con 242 sanciones, la Comisión Federal de Electricidad con 168 sanciones, Pemex exploración y producción con 100 sanciones.

                            <br/>El resto de las dependencias en el top, presentan un total de sanciones menor a 100.
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
                    <Grid item xs={12} >
                        <Typography variant={"body1"}>
                            En la siguiente gráfica, se puede apreciar las dependencias que más sanciones dieron a particulares por año, los años a su vez, se encuentran ordenados
                            del año en que se dio más sanciones al año en que se dio menos sanciones.
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
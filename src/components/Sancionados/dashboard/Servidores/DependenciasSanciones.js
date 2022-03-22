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
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getDependenciaMayor',
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

function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getSancionesAnualesDependencia',
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

const DependenciasSanciones = (props) => {
    const [errorG1, setErrorG1] = React.useState(false);
    const [errorG2, setErrorG2] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const [config2, setConfig2] = React.useState({});
    const {classes} = props;

    React.useEffect(()=> {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "value": parseInt(item.total_sanciones, 10),
                    "group": item.dependencia
                }
            });
            setMethods({
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

            })
        }).catch(err => {
            console.error(err);
            setErrorG1(true)
        });

        loadData2().then(result2 => {
            let aux2 = result2.data.data.map(item => {
                return {
                    "value": parseInt(item.total, 10),
                    "group": item.dependencia,
                    "parent": item.anio
                }
            });

           setConfig2({
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

            })
        }).catch(err => {
            console.error(err);
            setErrorG2(true)
        });

    }, []);

        return (
            <div>
                <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Dependencias con mayor número de sanciones"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Cuatro instituciones públicas registran la mayor cantidad de personas servidoras públicas sancionadas con una inhabilitación a enero 2022: la Policía Federal, la Secretaría de Educación Pública, Telecomunicaciones de México y el Instituto de Seguridad y Servicios Sociales de los Trabajadores que en conjunto representan el <b>36.78%</b> del total
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        {
                            methods && methods.data &&
                            <Treemap config={methods}/>
                        }
                        {
                            errorG1 && <MensajeErrorDatos/>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            La siguiente gráfica  muestra las dependencias con mayor número de sanciones firmes que fueron resueltas en cada año del 2013 a enero 2022.
                            Los años 2013, 2015 y 2016 los encabeza la Policía Federal, 2014 Telecomunicaciones de México, de 2017  a 2020 el Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado, y finalmente la única sanción del 2021 corresponde a la Secretaría de Agricultura y Desarrollo Rural.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            config2 && config2.data &&
                            <Treemap config={config2}/>
                        }
                        {
                            errorG2 && <MensajeErrorDatos/>
                        }
                    </Grid>
                </Grid>

            </div>
        )


}

DependenciasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependenciasSanciones);
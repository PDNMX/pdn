import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import 'react-vis/dist/style.css';
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
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getSentidoSanciones',
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
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getSentidosAnio',
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

let color = ["#2196F3", "#9C27B0", "#009688", "#FF9800", "#E91E63", "#FF5722"];
let z = d3.scaleOrdinal()
    .range(["#2196F3", "#9C27B0", "#009688", "#FF9800", "#E91E63", "#FF5722"]);
z.domain(["SANCIONATORIA CON MULTA E INHABILITACIÓN", "SANCIONATORIA CON MULTA", "SANCIONATORIA", "ABSOLUTORIA", "NO ESPECIFICA", "ABSOLUTORIA"])

const SentidoResoluciones = (props) => {
    const [errorG1, setErrorG1] = React.useState(false);
    const [errorG2, setErrorG2] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const [config2, setConfig2] = React.useState({});
    const {classes} = props;

    React.useEffect(() => {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "x": item.sentido_de_resolucion ? item.sentido_de_resolucion : "NO ESPECIFICA",
                    "y": parseInt(item.total, 10)
                }
            });
            setMethods({
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
            })
        }).catch(err => {
            console.error(err);
            setErrorG1(true);
        });

        loadData2().then(temp2 => {
            let aux2 = temp2.data.data.map(item => {
                return {
                    id: item.sentido_de_resolucion,
                    y: parseInt(item.total, 10),
                    x: item.anio,
                }
            });
            setConfig2({
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
            })

        }).catch(err => {
            console.error(err);
            setErrorG2(true);
        });

    }, []);

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
                        methods && methods.data &&
                        <BarChart config={methods}/>
                    }
                    {errorG1 && <MensajeErrorDatos/>}
                </Grid>
                <Grid item xs={12} md={4} className={classes.descripcion}>
                    <Typography variant={"body1"}>
                        Las resoluciones son : Absolutoria, Sancionatoria, Sancionatoria con multa, Sancionatoria
                        con multa e inhabilitación, y se agrega la categoría "No específica" por aquellos registros
                        que no incluyen dicho valor.
                        Como muestra la gráfica de la izquierda, del 2004 a mayo 2021, de las <b>2,074
                        resoluciones</b> la mayoría finalizó en <b>sanción con multa e inhabilitación</b> con un
                        total de <b>1,516</b> en total, seguido por <b>462</b> sanciones con
                        multa, <b>9</b> sancionatorias, <b>2</b> absolutorias y <b>24</b> no especifican el sentido
                        de la resolución.
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.descripcion}>
                    <Typography variant={"body1"}>
                        A lo largo del tiempo, se aprecia que cada año el mayor número de sanciones a particulares
                        son <b>Sancionatorias con multa e inhabilitación</b>.
                        Seguido de la resolución <b>Sancionatoria con multa</b> que cuenta con registros a
                        partir del año 2008 hasta el 2021
                        Posteriormente se tiene la resolución <b>Sancionatoria</b>, la cual aparece en el año
                        2009, 2015 y del 2019 a 2021.
                        Por otra parte, se tienen dos registros de resolución <b>Absolutoria</b>, las cuales
                        fueron resueltas en 2019.
                        <br/><br/>Cabe señalar que las 24 sanciones que no especifican el tipo de resolución, tampoco
                        cuentan con información respecto a su fecha de resolución, por lo que, no se encuentran
                        graficadas.

                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    {
                        config2 && config2.data &&
                        <BarChart config={config2}/>
                    }
                    {errorG2 && <MensajeErrorDatos/>}
                </Grid>

            </Grid>
        </div>
    )


}

SentidoResoluciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentidoResoluciones);
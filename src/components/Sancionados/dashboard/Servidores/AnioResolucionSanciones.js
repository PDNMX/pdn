import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {LinePlot, Pie} from "d3plus-react";
import axios from 'axios';
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";
import {FlexibleXYPlot} from "react-vis/es";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import XAxis from "react-vis/es/plot/axis/x-axis";
import YAxis from "react-vis/es/plot/axis/y-axis";
import LineMarkSeries from "react-vis/es/plot/series/line-mark-series";
import Hint from "react-vis/es/plot/hint";

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
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getAnioSancion',
            json: true,
            method: "GET"
        };
        axios(options)
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

const AnioResolucionSanciones = (props) => {
    const [error, setError] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const [configPie, setConfigPie] = React.useState({});
    const [hoveredCell, setHoveredCell] = React.useState(false);
    const {classes} = props;

    React.useEffect(() => {
        aux().then(result => {
            let total = 0;
            let aux = result.data.data.map(item => {
                total += parseInt(item.count, 10);
                return {
                    anio: item.anio_resolucion.toString(),
                    x: item.anio_resolucion,
                    y: parseInt(item.count, 10)
                }
            })
            setConfigPie({
                data: aux,
                groupBy: "anio",
                value: function (d) {
                    return d["y"]
                },
                height: 300,
                label: function (d) {
                    return d["anio"] + "\n (" + (((d["y"] * 100) / total).toFixed(2)) + "%)"
                },
                legend: false,
                tooltipConfig: {
                    tbody: [
                        ["Número de sanciones: ", function (d) {
                            return d["y"]
                        }
                        ]
                    ]
                },
                shapeConfig: {
                    fill: (d, i) => {
                        return color[i]
                    }
                }
            });
            setMethods({
                data: aux,
                xConfig: {
                    title: "Año de la sanción",
                    gridConfig: {stroke: "black"},
                },
                yConfig: {
                    title: "Número de sanciones",

                },
                legend: false,
                height: 400,
                shapeConfig: {
                    Line: {
                        strokeWidth: 2,
                        stroke: "blue",
                    },
                    Circle: {}
                },
                tooltipConfig: {
                    title: function (d) {
                        return "Datos";
                    },
                    tbody: [
                        ["Año de la sanción: ", function (d) {
                            return d["anio"]
                        }
                        ],
                        ["Número de sanciones: ", function (d) {
                            return d["y"]
                        }
                        ]
                    ]
                },
                title: "Número de sanciones por año",
            });

        }).catch(err => {
            console.error(err);
            setError(true);
        });
    }, []);
    return (
        <div>
            <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                <Grid item xs={12} md={12}>
                    <Typography variant={"h6"} className={classes.titulo}>
                        <b>{"Cantidad de sanciones"}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.descripcion}>
                    <Typography >
                        De acuerdo con las siguientes gráficas, la mayor cantidad de inhabilitaciones vigentes (firmes) fueron resueltas en el año 2014. En contraste, el 2021 representa tan solo el <b>0.082%</b> del total de inhabilitaciones firmes a enero de 2022.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    {
                        methods && methods.data &&
                        <LinePlot config={methods}/> &&
                        <FlexibleXYPlot height={400}>
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis
                                title={"Año de la sanción"}
                                tickValues={methods.data.map(item => {
                                    return item.x
                                })} tickFormat={v => `${v}`}
                                style={{
                                    line: {fill: '#ced8db'},
                                    ticks: {fill: '#ced8db'},
                                    text: {fill: '#ced8db', fontWeight: 600},
                                    title: {fill: '#ced8db'},
                                }}
                            />
                            <YAxis title={"Número de sanciones"}
                                   style={{
                                       line: {fill: '#ced8db'},
                                       ticks: {fill: '#ced8db'},
                                       text: {fill: '#ced8db', fontWeight: 600},
                                       title: {fill: '#ced8db'},
                                   }}
                            />

                            <LineMarkSeries
                                className="linemark-series-example"
                                style={{
                                    strokeWidth: '3px'
                                }}
                                lineStyle={{stroke: '#5fb1e6'}}
                                markStyle={{stroke: 'orange'}}
                                data={methods.data}
                                onValueMouseOver={(datapoint, event) =>
                                    setHoveredCell(datapoint)
                                }
                                onValueMouseOut={(datapoint, event) => {
                                    setHoveredCell(null)
                                }}
                            >
                            </LineMarkSeries>
                            {hoveredCell ? (
                                <Hint value={hoveredCell}>
                                    <div style={{background: 'white'}}>
                                        <table style={{border: '1px solid black', color: 'black'}}>
                                            <thead style={{textAlign: 'center'}}>
                                            <tr>
                                                <th>Datos</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>Año:</td>
                                                <td>{hoveredCell.x}</td>
                                            </tr>
                                            <tr>
                                                <td>Número de sanciones:</td>
                                                <td>{hoveredCell.y}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Hint>
                            ) : null}
                        </FlexibleXYPlot>

                    }
                </Grid>
                <Grid item xs={12} md={4}>
                    {
                        methods && methods.data &&
                        <Pie config={configPie}/>
                    }
                </Grid>
                <Grid item xs={12} md={4}>
                    {
                        error &&
                        <MensajeErrorDatos/>
                    }
                </Grid>

            </Grid>

        </div>
    )
}

AnioResolucionSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnioResolucionSanciones);
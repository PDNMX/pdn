import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Typography} from "@mui/material";
import LineMarkSeries from "react-vis/es/plot/series/line-mark-series";
import YAxis from "react-vis/es/plot/axis/y-axis";
import XAxis from "react-vis/es/plot/axis/x-axis";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import 'react-vis/dist/style.css';
import {FlexibleXYPlot} from "react-vis/es";
import Hint from "react-vis/es/plot/hint";
import MensajeErrorDatos from "@Mensajes/MensajeErrorDatos";
//import {Pie} from "d3plus-react";
import axios from 'axios';
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";

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
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getAnioSancion',
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
/*
let color =["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];
 */

const AnioResolucionSanciones = (props) => {
    const [hoveredCell, setHoveredCell] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    //const [configPie, setConfigPie] = React.useState({});
    const {classes} = props;

    React.useEffect(() => {
            let total = 0;
            aux().then(result => {
                let temp = result.data.data.slice(1);
                let aux = temp.map(item => {
                    total += parseInt(item.count, 10);
                    return {
                        anio: item.anio_resolucion.toString(),
                        x: item.anio_resolucion,
                        y: parseInt(item.count, 10)
                    }
                });
                setMethods({
                    data: aux,
                });
                /*setConfigPie({
                    data: aux,
                    groupBy: "anio",
                    value: function (d) {
                        return d["y"]
                    },
                    height: 300,
                    label: function (d) {
                        return d["anio"] + "\n (" + ((d["y"] * 100) / total).toFixed(2) + "%)"
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
                })*/
            }).catch(err => {
                console.error(err);
                setError(true);
            });
        }, []);


    return (
        <div>
            <ContainerChart>
                <Typography variant={"h6"} className={classes.titulo}>
                    <b> {"Cantidad de sanciones resueltas por año"}</b>
                </Typography>
                {
                    methods && methods.data &&
                    <FlexibleXYPlot height={400}>
                        <VerticalGridLines/>
                        <HorizontalGridLines/>
                        <XAxis title={"Año de la sanción"} tickValues={methods.data.map(item => {
                            return item.x
                        })} tickFormat={v => `${v}`}/>
                        <YAxis title={"Número de sanciones"}/>

                        <LineMarkSeries
                            className="linemark-series-example"
                            style={{
                                strokeWidth: '3px'
                            }}
                            lineStyle={{stroke: 'rgb(63 227 250)'}}
                            markStyle={{stroke: 'rgb(251 89 147)'}}
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
                                        Datos
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
                {
                    error && <MensajeErrorDatos/>
                }
            </ContainerChart>
        </div>
    )


}

AnioResolucionSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnioResolucionSanciones);
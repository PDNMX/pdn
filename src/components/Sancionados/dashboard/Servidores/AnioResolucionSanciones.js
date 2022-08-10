import React, {useState} from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {LinePlot} from "d3plus-react";
import axios from 'axios';
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";
import {FlexibleXYPlot} from "react-vis/es";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import XAxis from "react-vis/es/plot/axis/x-axis";
import YAxis from "react-vis/es/plot/axis/y-axis";
import LineMarkSeries from "react-vis/es/plot/series/line-mark-series";
import Hint from "react-vis/es/plot/hint";
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";
import ModalInfo from "@Compartidos/Dashboards/ModalInfo";
import TiempoSanciones from "./TiemposSanciones";

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
/*
let color =["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];*/

const AnioResolucionSanciones = (props) => {
    const [error, setError] = useState(false);
    const [methods, setMethods] = useState({});
    //const [configPie, setConfigPie] = useState({});
    const [hoveredCell, setHoveredCell] = useState(false);
    const {classes} = props;
    const [open, setOpen] = useState(false);

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
            /*setConfigPie({
                data: aux,
                groupBy: "anio",
                value: function (d) {
                    return d["y"]
                },
                height: 400,
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
            });*/
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
                        stroke: "rgb(41 183 165)",
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
    const handleOpen = () => setOpen(true);
    return (
        <div>
            <ModalInfo open={open} setOpen={setOpen}>
                Conoce el número de personas servidoras públicas  sancionadas (inhabilitadas) y cuya fecha de resolución de la sanción fue efectuada a partir del año 2013.
            </ModalInfo>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} md={6}>
                    <ContainerChart handleOpen={handleOpen}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Cantidad de sanciones resueltas por año"}</b>
                        </Typography>
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
                                        line: {fill: '#E1E8EB'},
                                        ticks: {fill: '#E1E8EB'},
                                        text: {fill: '#E1E8EB', fontWeight: 600},
                                        title: {fill: '#E1E8EB'},
                                    }}
                                />
                                <YAxis title={"Número de sanciones"}
                                       style={{
                                           line: {fill: '#E1E8EB'},
                                           ticks: {fill: '#E1E8EB'},
                                           text: {fill: '#E1E8EB', fontWeight: 600},
                                           title: {fill: '#E1E8EB'},
                                       }}
                                />

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
                    </ContainerChart>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TiempoSanciones/>

                        {
                            /*
                            <ContainerChart>
                             <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Cantidad de sanciones"}</b>
                        </Typography>
                        {
                            methods && methods.data &&
                            <Pie config={configPie}/>
                        }
                        </ContainerChart>
                             */
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
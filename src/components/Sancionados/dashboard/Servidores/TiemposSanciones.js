import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import MensajeErrorDatos from "@Mensajes/MensajeErrorDatos";
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";
import * as d3 from 'd3';

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
    },
    btnDownload: {
        textAlign: "right"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getTemporalidadSanciones',
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

let color = ["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];

let yScale = d3.scaleSymlog()
    .domain([0,1070])
    .range([0,1070]);

const TiemposSanciones = (props) => {
    const [error, setError] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const {classes} = props;

    React.useEffect(() => {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "anios": item.anios,
                    "total": parseInt(item.total, 10)
                }
            });

            setMethods({
                data: aux,
                groupBy: "anios",
                x: "anios",
                y: function (d){
                    return yScale(d.total)
                },
                xConfig: {
                    title: "Duración en años de la sanción",
                    domain: aux.map(d=>d.anios),
                    labels: aux.map(d=>d.anios)
                },
                yConfig: {
                    title: "Número de sanciones",
                    labels: [0,1070]
                },
                tooltipConfig: {
                    title: function (d) {
                        return "Datos";
                    },
                    tbody: [
                        ["Duración de la sanción: ", function (d) {
                            return d["anios"] + " años"
                        }
                        ],
                        ["Número de sanciones: ", function (d) {
                            return d["total"]
                        }
                        ]
                    ]
                },
                height: 400,
                shapeConfig: {
                    label: false,
                    fill: (d, i) => {
                        return color[i]
                    }
                },
                legend: false,
                axes: {
                    fill: "#666672"
                }
            })
        }).catch(err => {
            console.error(err);
            setError(true);
        });
    }, [])


    return (
        <div>
                    <ContainerChart>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Duración de las sanciones en años"}</b>
                        </Typography>
                        {
                            methods && methods.data &&
                            <BarChart config={methods}/>
                        }
                        {
                            error && <MensajeErrorDatos/>
                        }
                    </ContainerChart>
        </div>
    )
}

TiemposSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TiemposSanciones);
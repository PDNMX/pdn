import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import * as d3 from "d3";
import MensajeErrorDatos from "@components/Mensajes/MensajeErrorDatos";
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";

const styles = theme => ({
    test: {
        fill: "#f2f2f2 !important",
        '&text': {
            fill: "#f2f2f2 !important"
        }
    },
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
    graph: {
        marginBottom: theme.spacing(4)
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getCausasSanciones',
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

function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getCausasAnio',
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

let color =["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];

let z = d3.scaleOrdinal()
    .range(color);
z.domain(["NEGLIGENCIA ADMINISTRATIVA", "ABUSO DE AUTORIDAD", "VIOLACION LEYES Y NORMATIVIDAD PRESUPUESTAL", "COHECHO O EXTORSION", "INCUMPLIMIENTO EN DECLARACION DE SITUACION PATRIMONIAL", "VIOLACION PROCEDIMIENTOS DE CONTRATACION", "VIOLACIÓN A LOS DERECHOS HUMANOS", "EJERCICIO INDEBIDO DE SUS FUNCIONES EN MATERIA MIGRATORIA"])

const CausasSanciones = (props) => {
    const [errorG1, setErrorG1] = React.useState(false);
    const [errorG2, setErrorG2] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const [config2, setConfig2] = React.useState({});
    const {classes} = props;

    React.useEffect(() => {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "causa": item.causa,
                    "total": parseInt(item.total, 10)
                }
            });
            setMethods({
                data: aux,
                groupBy: "causa",
                x: "causa",
                y: "total",
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
                    fill: (d, i) => {
                        return color[i]
                    }
                },
                title: "",

            })
        },).catch(err => {
            console.error(err);
            setErrorG1(true)
        });

        loadData2().then(result => {
            let aux2 = result.data.data.map(item => {
                return {
                    id: item.causa,
                    y: parseInt(item.total, 10),
                    x: item.anio
                }
            });
            setConfig2({
                data: aux2,
                titleConfig: {
                    fontColor: "#f2f2f2"
                },
                xConfig: {
                    title: "Causa de la sanción",
                    titleConfig: {
                        fontColor: "#f2f2f2"
                    },
                },
                yConfig: {
                    title: "Número de sanciones",
                    titleConfig: {
                        fontColor: "#f2f2f2"
                    },
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
                stacked: true
            })
        }).catch(err => {
            console.error(err);
            setErrorG2(true);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3} justifyContent='center' >
                <Grid item xs={10} >
                    <ContainerChart>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>Causa de las sanciones de 2013 a la fecha</b>
                        </Typography>
                        {
                            methods && methods.data &&
                            <BarChart className={classes.test} config={methods}/>
                        }
                        {errorG1 &&
                        <MensajeErrorDatos/>
                        }
                    </ContainerChart>
                </Grid>
                <Grid item xs={10}>
                    <ContainerChart>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>Causa de las sanciones por año</b>
                        </Typography>
                        {
                            config2 && config2.data &&
                            <BarChart config={config2}/>
                        }
                        {errorG2 &&
                        <MensajeErrorDatos/>
                        }
                    </ContainerChart>
                </Grid>
            </Grid>

        </div>
    )


}

CausasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CausasSanciones);
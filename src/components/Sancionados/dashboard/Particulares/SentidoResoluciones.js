import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import 'react-vis/dist/style.css';
import * as d3 from "d3";
import MensajeErrorDatos from "@Mensajes/MensajeErrorDatos";
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

let color =  ["#52B1FF", "#DD70F0", "#07B6A5", "#FFB647", "#FF5C92", "#F97D58"];
let z = d3.scaleOrdinal()
    .range( ["#52B1FF", "#DD70F0", "#07B6A5", "#FFB647", "#FF5C92", "#F97D58"]);
z.domain(["SANCIONATORIA CON MULTA E INHABILITACIÓN", "SANCIONATORIA CON MULTA", "SANCIONATORIA", "ABSOLUTORIA", "NO ESPECIFICA", "ABSOLUTORIA"])

const SentidoResoluciones = (props) => {
    const [errorG1, setErrorG1] = React.useState(false);
    const [methods, setMethods] = React.useState({});
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

    }, []);

    return (
        <div>
            <ContainerChart>
                <Typography variant={"h6"} className={classes.titulo}>
                    <b> Sentido de las resoluciones</b>
                </Typography>
                {
                    methods && methods.data &&
                    <BarChart config={methods}/>
                }
                {errorG1 && <MensajeErrorDatos/>}
            </ContainerChart>
        </div>
    )


}

SentidoResoluciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentidoResoluciones);
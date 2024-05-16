import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import 'react-vis/dist/style.css';
import MensajeErrorDatos from "@Mensajes/MensajeErrorDatos";
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";
import * as d3 from "d3";

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

let color =  ["#F87268", "#DC6AF0", "#B286FD",
"#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
"#8BC34A", "#FFC107", "#FF9800", "#FF7247",
"#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
"#AD94D6", "#8A9BF9", "#6DBCFD"]
let yScale = d3.scaleSymlog()
    .domain([0,1599])
    .range([0,1599]);

const SentidoResoluciones = (props) => {
    const [errorG1, setErrorG1] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const {classes} = props;

    React.useEffect(() => {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "x": item.anios,
                    "y": parseInt(item.total, 10)
                }
            });
            console.log(aux)
            setMethods({
                data: aux,
                groupBy: "x",
                x: "x",
                y: function(d){
                    return yScale(d.y)
                },
                xConfig: {
                    title: "Duración en años de la sanción",
                },
                yConfig: {
                    title: "Número de sanciones",
                    labels: [0,1599]
                },
                tooltipConfig: {
                    title: function (d) {
                        return "Datos";
                    },
                    tbody: [
                        ["Años: ", function (d) {
                            return d["x"]
                        }
                        ],
                        ["Número de sanciones: ", function (d) {
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
                    <b> Duración de las sanciones en años</b>
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
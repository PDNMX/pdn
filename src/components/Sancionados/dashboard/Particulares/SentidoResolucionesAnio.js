import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import 'react-vis/dist/style.css';
import * as d3 from "d3";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";
import ContainerChart from "../../../Compartidos/Dashboards/ContainerChart";

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

//let color =  ["#52B1FF", "#DD70F0", "#07B6A5", "#FFB647", "#FF5C92", "#F97D58"];
let z = d3.scaleOrdinal()
    .range( ["#52B1FF", "#DD70F0", "#07B6A5", "#FFB647", "#FF5C92", "#F97D58"]);
z.domain(["sancionatoria con multa e inhabilitación", "sancionatoria con multa", "sancionatoria", "absolutoria", "no especificado", "absolutoria"])

const SentidoResolucionesAnio = (props) => {
    const [errorG2, setErrorG2] = React.useState(false);
    const [config2, setConfig2] = React.useState({});
    const {classes} = props;

    React.useEffect(() => {
      loadData2().then(temp2 => {
            let aux2 = temp2.data.data.map(item => {
                return {
                    id: item.sentido_de_resolucion.toLowerCase(),
                    y: parseInt(item.total, 10),
                    x: item.anio,
                }
            });
            setConfig2({
                data: aux2,
                xConfig: {
                    title: "Año",
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
                height: 400,
                shapeConfig: {
                    label: false,
                    fill: (d) => {
                        return z(d.id)
                    }
                },
                stacked: true,

            })

        }).catch(err => {
            console.error(err);
            setErrorG2(true);
        });

    }, []);

    return (
        <div>
            <ContainerChart>
                <Typography variant={"h6"} className={classes.titulo}>
                    <b> Sentido de las resoluciones por año</b>
                </Typography>
                {
                    config2 && config2.data &&
                    <BarChart config={config2}/>
                }
                {errorG2 && <MensajeErrorDatos/>}
            </ContainerChart>
           
        </div>
    )


}

SentidoResolucionesAnio.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentidoResolucionesAnio);
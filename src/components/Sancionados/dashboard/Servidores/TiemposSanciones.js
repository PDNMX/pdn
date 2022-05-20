import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";

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
            })
            setMethods({
                data: aux,
                groupBy: "anios",
                x: "anios",
                y: "total",
                xConfig: {
                    title: "Duración en años de la sanción",
                },
                yConfig: {
                    title: "Número de sanciones"
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
                },
                title: "Duración de las sanciones en años",
            })
        }).catch(err => {
            console.error(err);
            setError(true);
        });
    }, [])


    return (
        <div>
            <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                <Grid item xs={12}>
                    <Typography variant={"h6"} className={classes.titulo}>
                        <b>{"Duración de las sanciones"}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.descripcion}>
                    <Typography>
                        La siguiente gráfica muestra la duración de las inhabilitaciones,que van de un año hasta veinte.
                        Observamos que un <b>86.2%</b> de las inhabilitaciones son por 10 años, <b>4.5%</b> tienen una duración menor a 10 años y <b>8.94%</b> una duración mayor a 10 años.
                    </Typography>
                </Grid>
                <Grid item xs={12} id={"graf"}>
                    {
                        methods && methods.data &&
                        <BarChart config={methods}/>
                    }
                    {
                        error && <MensajeErrorDatos/>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

TiemposSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TiemposSanciones);
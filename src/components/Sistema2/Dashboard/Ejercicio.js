import React from 'react';
import {Alert} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";

const aux = () => axios({
    url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupacionEjercicio',
    json: true,
    method: "GET"
});

let colores = ["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];
let color = colores[Math.floor(Math.random()* (colores.length-1))]

const Ejercicio = props => {
    const [state, setState] = React.useState({
        error: false
    });

    React.useEffect(() => {
        aux().then(res => {
            let aux = res.data.data.map(item => ({
                "ejercicio": item.ejercicio,
                "total": parseInt(item.total,10)
            }));

            setState({
                methods: {
                    data: aux,
                    groupBy: "ejercicio",
                    x: "ejercicio",
                    y: "total",
                    xConfig: {
                        title: "Ejercicio fiscal",

                    },
                    yConfig: {
                        title: "Número de registros"
                    },
                    tooltipConfig: {
                        title: d => 'Datos',
                        tbody: [
                            [ "Ejercicio fiscal: ", d => d["ejercicio"] ],
                            [ "Número de registros: ", d => d["total"]  ]
                        ]
                    },
                    height: 400,
                    shapeConfig: {
                        label: false,
                        fill:color
                    },
                    legend: false,
                    axes: {
                        fill: "#666672"
                    },
                    title: "Personas servidoras públicas en contrataciones por año"
                }
                }
            )
        }).catch(error => {
            console.error(error);
            setState({
                error: true
            });
        });
    },[]);

    return (
        <div>
            <ContainerChart>
                {
                    state.methods && state.methods.data &&
                        <BarChart config={state.methods}/>
                }
                {
                    state.error &&
                    <Alert severity="error"> No disponible por el momento, intente más tarde.</Alert>
                }
            </ContainerChart>
        </div>
    );
};

export default (Ejercicio);
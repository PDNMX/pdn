import React from 'react';
import {Alert} from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
/* import {BarChart} from "d3plus-react"; */
import axios from 'axios';
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";

const aux = () => axios({
    url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupacionEjercicio',
    json: true,
    method: "GET"
});

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
            //console.log(aux);
            setState({ data: aux})
        }).catch(error => {
            console.error(error);
            setState({
                error: true
            });
        });
    },[]);

    return (
        <>
            <ContainerChart>
                {
                    state.data &&
                         <ResponsiveBar
                          data={state.data}
                          keys={["total"]}
                          indexBy="ejercicio"
                          margin={{ top: 10, right: 10, bottom: 50, left: 65 }}
                          padding={0.1}
                          colors={{ scheme: "nivo" }}

                          /* borderColor={{ from: "color", modifiers: [["darker", 1.6]] }} */
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "ejercicio",
                            legendPosition: "middle",
                            legendOffset: 32
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "total",
                            legendPosition: "middle",
                            legendOffset: -60
                          }}

                          animate={true}
                          /* motionStiffness={90}
                          motionDamping={15} */
                          />
                }
                {
                    state.error &&
                    <Alert severity="error"> No disponible por el momento, intente más tarde.</Alert>
                }
            </ContainerChart>
        </>
    );
};

export default (Ejercicio);

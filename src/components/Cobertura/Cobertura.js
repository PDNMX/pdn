import React from 'react';
import {Typography, Link, Grid} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

const estados = [
    {route: "/cobertura/aguascalientes", name: "Aguascalientes"},
    {route: "/cobertura/bcs", name: "Baja California Sur"},
    {route: "/cobertura/chiapas", name: "Chiapas"},
    {route: "/cobertura/chihuahua", name: "Chihuahua"},
    {route: "/cobertura/durango", name: "Durango"},
    {route: "/cobertura/edomex", name: "Estado de México"},
    {route: "/cobertura/guanajuato", name: "Guanajuato"},
    {route: "/cobertura/jalisco", name: "Jalisco"},
    {route: "/cobertura/oaxaca", name: "Oaxaca"},
    {route: "/cobertura/puebla", name: "Puebla"},
    {route: "/cobertura/qroo", name: "Quintana Roo"},
    {route: "/cobertura/slp", name: "San Luis Potosí"},
    {route: "/cobertura/sinaloa", name: "Sinaloa"},
    {route: "/cobertura/sonora", name: "Sonora"},
    {route: "/cobertura/tabasco", name: "Tabasco"},
    {route: "/cobertura/tlaxcala", name: "Tlaxcala"},
    {route: "/cobertura/yucatan", name: "Yucatan"},
    {route: "/cobertura/zacatecas", name: "Zacatecas"}
];

const Cobertura = () => {

    return (<div>


            <Grid container spacing={0} alignContent="center">
                <Grid item xs={12}>
                    <Typography>Cobertura</Typography>
                    <ul>
                        {estados.map( e =>{
                            return <li><Link component={RouterLink} to={e.route}>{e.name}</Link></li>
                        })
                        }
                    </ul>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cobertura;
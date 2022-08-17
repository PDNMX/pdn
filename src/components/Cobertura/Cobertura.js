import React from 'react';
import {Typography, Link, Grid} from "@mui/material";
import {Link as RouterLink, useParams} from 'react-router-dom';
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import estados from "./estados.json";

const Cobertura = () => {
    const section = pdnRoutes.find(r => r.path === '/cobertura');
    return (<div>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} style={{maxWidth: 1200}}>
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
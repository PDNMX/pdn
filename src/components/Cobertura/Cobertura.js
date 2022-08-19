import React from 'react';
import {Typography,Box, Link, Grid, Paper, Tabs, Tab} from "@mui/material";
import {Link as RouterLink, useParams} from 'react-router-dom';
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import estados from "./estados.json";

import withStyles from "@mui/styles/withStyles";
const styles = theme => ({
    estado: {
        width:"150px", borderStyle: 'solid', border: '1px', borderRadius: 10, color: '#d3d3d3',
        background: theme.palette.background.opaque
    },
    link:{
        textDecoration: 'none'
    }
});

const Cobertura = props => {
    const section = pdnRoutes.find(r => r.path === '/cobertura');
    const {classes} = props;
    return (<div>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} style={{maxWidth: 1200}}>

                    {/*<Paper elevation={15}>*/}
                    <Box display="flex" flexWrap="wrap">
                        {estados.map( e =>{
                            const icon = require(`../../assets/Cobertura/iconos_estados/${e.icon}`)
                            return <Box textAlign="center" p={1} m={1} className={classes.estado}>
                                <Link component={RouterLink} to={e.route} className={classes.link}>
                                    <img src={icon} style={{width: 100}}/>
                                    <Typography>{e.name}</Typography>
                                </Link>
                            </Box>
                        })
                        }
                    </Box>
                    {/*</Paper>*/}

                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Cobertura);